import express from "express";
import {
  createPost,
  updatePost,
  publishPost,
  unpublishPost,
  deletePost,
  getAllPosts,
  getPublishedPosts,
  getPostBySlug,
  createBloglette,
  deleteBloglette,
  getRecentBloglettes,
} from "./blogDb";
import { appendToBlogSheet } from "./googleSheets";
import { invokeLLM } from "./_core/llm";

const BLOG_SHEET_ID = process.env.BLOG_SHEET_ID ?? "";

// ─── Auth middleware ───────────────────────────────────────────────────────────

function requireAdmin(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) {
  const token = req.headers.authorization?.replace("Bearer ", "");
  const adminPass = process.env.ADMIN_PASSWORD;
  if (!adminPass || !token || token !== adminPass) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  next();
}

// ─── Admin router (protected) ─────────────────────────────────────────────────

export const adminRouter = express.Router();
adminRouter.use(express.json());

/** Password check — returns { ok: true } on success. */
adminRouter.post("/auth", (req, res) => {
  const { password } = req.body ?? {};
  if (password && password === process.env.ADMIN_PASSWORD) {
    return res.json({ ok: true });
  }
  res.status(401).json({ error: "Invalid password" });
});

// All routes below require the admin token.
adminRouter.use(requireAdmin);

/** Returns all posts + recent bloglettes for the admin dashboard. */
adminRouter.get("/feed", async (_req, res) => {
  try {
    const [allPosts, recentBloglettes] = await Promise.all([
      getAllPosts(),
      getRecentBloglettes(30),
    ]);
    res.json({ posts: allPosts, bloglettes: recentBloglettes });
  } catch (e: any) {
    res.status(500).json({ error: e.message });
  }
});

/** Create a new draft post. */
adminRouter.post("/posts", async (req, res) => {
  try {
    const post = await createPost(req.body);
    res.json(post);
  } catch (e: any) {
    res.status(500).json({ error: e.message });
  }
});

/** Update a post's fields. */
adminRouter.patch("/posts/:id", async (req, res) => {
  try {
    const post = await updatePost(Number(req.params.id), req.body);
    res.json(post);
  } catch (e: any) {
    res.status(500).json({ error: e.message });
  }
});

/** Publish a post. Writes to DB and syncs to the monthly Google Sheet tab. */
adminRouter.post("/posts/:id/publish", async (req, res) => {
  try {
    const post = await publishPost(Number(req.params.id));

    if (BLOG_SHEET_ID && post) {
      appendToBlogSheet(BLOG_SHEET_ID, {
        date: post.publishedAt?.toISOString() ?? new Date().toISOString(),
        type: post.type,
        title: post.title ?? "",
        byline: post.byline ?? "",
        copy: post.body ?? "",
        tag: post.tag ?? "",
        author: post.author ?? "",
        url: `https://socialnative.ai/blog/${post.slug}`,
      }).catch((err) => console.error("[Sheets] Failed to sync post:", err));
    }

    res.json(post);
  } catch (e: any) {
    res.status(500).json({ error: e.message });
  }
});

/** Unpublish a post back to draft. */
adminRouter.post("/posts/:id/unpublish", async (req, res) => {
  try {
    const post = await unpublishPost(Number(req.params.id));
    res.json(post);
  } catch (e: any) {
    res.status(500).json({ error: e.message });
  }
});

/** Delete a post permanently. */
adminRouter.delete("/posts/:id", async (req, res) => {
  try {
    await deletePost(Number(req.params.id));
    res.json({ ok: true });
  } catch (e: any) {
    res.status(500).json({ error: e.message });
  }
});

/** Create and immediately publish a bloglette. Syncs to Google Sheet. */
adminRouter.post("/bloglettes", async (req, res) => {
  try {
    const bloglette = await createBloglette(req.body.body);

    if (BLOG_SHEET_ID && bloglette) {
      appendToBlogSheet(BLOG_SHEET_ID, {
        date: bloglette.publishedAt?.toISOString() ?? new Date().toISOString(),
        type: "bloglette",
        title: "",
        byline: "",
        copy: bloglette.body,
        tag: "",
        author: "Social Native Team",
        url: "https://socialnative.ai/blog",
      }).catch((err) => console.error("[Sheets] Failed to sync bloglette:", err));
    }

    res.json(bloglette);
  } catch (e: any) {
    res.status(500).json({ error: e.message });
  }
});

/** Delete a bloglette. */
adminRouter.delete("/bloglettes/:id", async (req, res) => {
  try {
    await deleteBloglette(Number(req.params.id));
    res.json({ ok: true });
  } catch (e: any) {
    res.status(500).json({ error: e.message });
  }
});

/**
 * Generate a full article draft with AI (Gemini 2.5 Flash).
 * Body: { topic: string }
 * Returns the saved draft post.
 */
adminRouter.post("/generate", async (req, res) => {
  try {
    const { topic } = req.body ?? {};
    if (!topic) return res.status(400).json({ error: "topic is required" });

    const result = await invokeLLM({
      messages: [
        {
          role: "system",
          content: `You are an expert content writer for Social Native, a fully managed creator marketing platform serving enterprise brands like IKEA, Adidas, NYX Cosmetics, Crocs, and 1,500+ others. Write authoritative, data-driven blog content that positions Social Native as the definitive expert on creator marketing. Always write from Social Native's expert perspective. Use concrete statistics and specific data points. Avoid generic filler — every paragraph should deliver insight.`,
        },
        {
          role: "user",
          content: `Write a blog article about: ${topic}

Return a JSON object with exactly these fields:
- title: a specific, compelling article title (avoid generic titles)
- byline: 1–2 sentence compelling deck that makes someone want to read it
- body: the full article as clean HTML (use <p>, <h2>, <h3>, <ul>, <li>, <strong> tags; write 700–1000 words; no inline styles; no <html>/<body>/<head> wrapper)
- tag: exactly one of: Data, Strategy, Case Study, Playbook, Platform Intelligence, Creator Economy
- author: "Social Native Team"`,
        },
      ],
      outputSchema: {
        name: "blog_article",
        schema: {
          type: "object",
          properties: {
            title: { type: "string" },
            byline: { type: "string" },
            body: { type: "string" },
            tag: { type: "string" },
            author: { type: "string" },
          },
          required: ["title", "byline", "body", "tag", "author"],
        },
      },
    });

    const raw = result.choices[0]?.message?.content;
    if (!raw) throw new Error("Empty LLM response");

    let parsed: any;
    if (typeof raw === "string") {
      const jsonMatch = raw.match(/\{[\s\S]*\}/);
      parsed = JSON.parse(jsonMatch ? jsonMatch[0] : raw);
    } else {
      throw new Error("Unexpected LLM response format");
    }

    const post = await createPost({
      type: "article",
      title: parsed.title,
      byline: parsed.byline,
      body: parsed.body,
      tag: parsed.tag,
      author: parsed.author,
    });

    res.json(post);
  } catch (e: any) {
    console.error("[AI Generate]", e);
    res.status(500).json({ error: e.message });
  }
});

// ─── Public blog feed router ──────────────────────────────────────────────────

export const publicBlogRouter = express.Router();

/**
 * Public feed for blog.html.
 * Returns { hero, articles, bloglettes }
 */
publicBlogRouter.get("/feed", async (_req, res) => {
  try {
    const [publishedPosts, recentBloglettes] = await Promise.all([
      getPublishedPosts(),
      getRecentBloglettes(20),
    ]);

    const hero = publishedPosts.find((p) => p.type === "hero") ?? publishedPosts[0] ?? null;
    const articles = publishedPosts.filter((p) => p !== hero);

    res.json({ hero, articles, bloglettes: recentBloglettes });
  } catch (e: any) {
    res.status(500).json({ error: e.message });
  }
});

/** Single published post by slug — used by the React BlogPost page for DB-stored posts. */
publicBlogRouter.get("/post/:slug", async (req, res) => {
  try {
    const post = await getPostBySlug(req.params.slug);
    if (!post) return res.status(404).json({ error: "Not found" });
    res.json(post);
  } catch (e: any) {
    res.status(500).json({ error: e.message });
  }
});
