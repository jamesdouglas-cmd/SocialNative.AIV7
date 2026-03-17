import { and, desc, eq } from "drizzle-orm";
import { getDb } from "./db";
import { bloglettes, posts } from "../drizzle/schema";
import type { Post, Bloglette } from "../drizzle/schema";

// ─── Helpers ──────────────────────────────────────────────────────────────────

function slugify(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim()
    .slice(0, 100);
}

async function uniqueSlug(base: string): Promise<string> {
  const db = await getDb();
  if (!db) return `${base}-${Date.now().toString(36)}`;
  const existing = await db
    .select({ slug: posts.slug })
    .from(posts)
    .where(eq(posts.slug, base));
  if (existing.length === 0) return base;
  return `${base}-${Date.now().toString(36)}`;
}

// ─── Posts ────────────────────────────────────────────────────────────────────

export async function createPost(data: {
  type?: "hero" | "article";
  title: string;
  byline?: string;
  body?: string;
  tag?: string;
  author?: string;
}): Promise<Post> {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  const slug = await uniqueSlug(slugify(data.title));

  await db.insert(posts).values({
    type: data.type ?? "article",
    status: "draft",
    slug,
    title: data.title,
    byline: data.byline ?? null,
    body: data.body ?? null,
    tag: data.tag ?? null,
    author: data.author ?? null,
  });

  const result = await db.select().from(posts).where(eq(posts.slug, slug)).limit(1);
  return result[0];
}

export async function updatePost(
  id: number,
  data: Partial<{
    title: string;
    byline: string;
    body: string;
    tag: string;
    author: string;
    type: "hero" | "article";
  }>
): Promise<Post> {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.update(posts).set(data).where(eq(posts.id, id));
  const result = await db.select().from(posts).where(eq(posts.id, id)).limit(1);
  return result[0];
}

export async function publishPost(id: number): Promise<Post> {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db
    .update(posts)
    .set({ status: "published", publishedAt: new Date() })
    .where(eq(posts.id, id));
  const result = await db.select().from(posts).where(eq(posts.id, id)).limit(1);
  return result[0];
}

export async function unpublishPost(id: number): Promise<Post> {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db
    .update(posts)
    .set({ status: "draft", publishedAt: null })
    .where(eq(posts.id, id));
  const result = await db.select().from(posts).where(eq(posts.id, id)).limit(1);
  return result[0];
}

export async function deletePost(id: number): Promise<void> {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.delete(posts).where(eq(posts.id, id));
}

export async function getAllPosts(): Promise<Post[]> {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(posts).orderBy(desc(posts.createdAt));
}

export async function getPublishedPosts(): Promise<Post[]> {
  const db = await getDb();
  if (!db) return [];
  return db
    .select()
    .from(posts)
    .where(eq(posts.status, "published"))
    .orderBy(desc(posts.publishedAt));
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  const db = await getDb();
  if (!db) return null;
  const result = await db
    .select()
    .from(posts)
    .where(and(eq(posts.slug, slug), eq(posts.status, "published")))
    .limit(1);
  return result[0] ?? null;
}

// ─── Bloglettes ───────────────────────────────────────────────────────────────

export async function createBloglette(body: string): Promise<Bloglette> {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.insert(bloglettes).values({ body, publishedAt: new Date() });
  const result = await db
    .select()
    .from(bloglettes)
    .orderBy(desc(bloglettes.id))
    .limit(1);
  return result[0];
}

export async function deleteBloglette(id: number): Promise<void> {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.delete(bloglettes).where(eq(bloglettes.id, id));
}

export async function getRecentBloglettes(limit = 20): Promise<Bloglette[]> {
  const db = await getDb();
  if (!db) return [];
  return db
    .select()
    .from(bloglettes)
    .orderBy(desc(bloglettes.publishedAt))
    .limit(limit);
}
