import { describe, it, expect, vi, beforeEach } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";

// Mock Google Sheets module so tests don't make real API calls
vi.mock("./googleSheets", () => ({
  appendToSheet: vi.fn().mockResolvedValue(undefined),
  ensureSheetHeaders: vi.fn().mockResolvedValue(undefined),
}));

// Mock notification module
vi.mock("./_core/notification", () => ({
  notifyOwner: vi.fn().mockResolvedValue(true),
}));

function createPublicContext(): TrpcContext {
  return {
    user: null,
    req: { protocol: "https", headers: {} } as TrpcContext["req"],
    res: { clearCookie: vi.fn() } as unknown as TrpcContext["res"],
  };
}

describe("newsletter.subscribe", () => {
  it("accepts a valid email and returns success", async () => {
    const caller = appRouter.createCaller(createPublicContext());
    const result = await caller.newsletter.subscribe({ email: "test@example.com" });
    expect(result).toEqual({ success: true });
  });

  it("accepts email with optional name", async () => {
    const caller = appRouter.createCaller(createPublicContext());
    const result = await caller.newsletter.subscribe({
      email: "jane@brand.com",
      name: "Jane Smith",
    });
    expect(result).toEqual({ success: true });
  });

  it("rejects an invalid email", async () => {
    const caller = appRouter.createCaller(createPublicContext());
    await expect(
      caller.newsletter.subscribe({ email: "not-an-email" })
    ).rejects.toThrow();
  });
});

describe("demo.submit", () => {
  it("accepts a valid demo request and returns success", async () => {
    const caller = appRouter.createCaller(createPublicContext());
    const result = await caller.demo.submit({
      firstName: "Jane",
      lastName: "Smith",
      email: "jane@brand.com",
      company: "Acme Corp",
      monthlyBudget: "$50,000–$100,000",
      subscribeNewsletter: false,
    });
    expect(result).toEqual({ success: true });
  });

  it("accepts a demo request with newsletter opt-in", async () => {
    const caller = appRouter.createCaller(createPublicContext());
    const result = await caller.demo.submit({
      firstName: "John",
      lastName: "Doe",
      email: "john@brand.com",
      company: "Brand Co",
      jobTitle: "VP Marketing",
      monthlyBudget: "$250,000+",
      message: "Looking for a full creator program.",
      subscribeNewsletter: true,
    });
    expect(result).toEqual({ success: true });
  });

  it("rejects missing required fields", async () => {
    const caller = appRouter.createCaller(createPublicContext());
    await expect(
      caller.demo.submit({
        firstName: "",
        lastName: "Smith",
        email: "jane@brand.com",
        company: "Acme",
        monthlyBudget: "$5,000–$15,000",
      })
    ).rejects.toThrow();
  });
});
