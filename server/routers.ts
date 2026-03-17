import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router } from "./_core/trpc";
import { z } from "zod";
import { appendToSheet, ensureSheetHeaders } from "./googleSheets";
import { notifyOwner } from "./_core/notification";

const NEWSLETTER_SHEET_ID = process.env.NEWSLETTER_SHEET_ID ?? "";
const DEMO_SHEET_ID = process.env.DEMO_SHEET_ID ?? "";

export const appRouter = router({
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return { success: true } as const;
    }),
  }),

  // Newsletter signup — appends to Newsletter Signups Google Sheet
  newsletter: router({
    subscribe: publicProcedure
      .input(
        z.object({
          email: z.string().email(),
          name: z.string().optional(),
        })
      )
      .mutation(async ({ input }) => {
        const timestamp = new Date().toISOString();
        await ensureSheetHeaders(NEWSLETTER_SHEET_ID, "Sheet1", [
          "Timestamp",
          "Email",
          "Name",
        ]);
        await appendToSheet(NEWSLETTER_SHEET_ID, "Sheet1!A:C", [
          [timestamp, input.email, input.name ?? ""],
        ]);
        await notifyOwner({
          title: "New Newsletter Subscriber",
          content: `${input.email}${input.name ? ` (${input.name})` : ""} subscribed to the Social Native newsletter.`,
        });
        return { success: true };
      }),
  }),

  // Demo request — appends to Demo Requests / Website Leads Google Sheet
  demo: router({
    submit: publicProcedure
      .input(
        z.object({
          firstName: z.string().min(1),
          lastName: z.string().min(1),
          email: z.string().email(),
          company: z.string().min(1),
          jobTitle: z.string().optional(),
          monthlyBudget: z.string().min(1),
          message: z.string().optional(),
          subscribeNewsletter: z.boolean().optional(),
        })
      )
      .mutation(async ({ input }) => {
        const timestamp = new Date().toISOString();

        // Write to Demo Requests sheet
        await ensureSheetHeaders(DEMO_SHEET_ID, "Sheet1", [
          "Timestamp",
          "First Name",
          "Last Name",
          "Email",
          "Company",
          "Job Title",
          "Monthly Budget",
          "Message",
          "Newsletter Opt-In",
        ]);
        await appendToSheet(DEMO_SHEET_ID, "Sheet1!A:I", [
          [
            timestamp,
            input.firstName,
            input.lastName,
            input.email,
            input.company,
            input.jobTitle ?? "",
            input.monthlyBudget,
            input.message ?? "",
            input.subscribeNewsletter ? "Yes" : "No",
          ],
        ]);

        // If they opted into newsletter, also add to newsletter sheet
        if (input.subscribeNewsletter) {
          await ensureSheetHeaders(NEWSLETTER_SHEET_ID, "Sheet1", [
            "Timestamp",
            "Email",
            "Name",
          ]);
          await appendToSheet(NEWSLETTER_SHEET_ID, "Sheet1!A:C", [
            [timestamp, input.email, `${input.firstName} ${input.lastName}`],
          ]);
        }

        // Notify owner
        await notifyOwner({
          title: "New Demo Request",
          content: `${input.firstName} ${input.lastName} (${input.email}) from ${input.company} requested a demo. Budget: ${input.monthlyBudget}.`,
        });

        return { success: true };
      }),
  }),
});

export type AppRouter = typeof appRouter;
