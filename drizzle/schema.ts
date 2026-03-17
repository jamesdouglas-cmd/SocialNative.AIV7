import { int, mysqlEnum, mysqlTable, text, timestamp, varchar } from "drizzle-orm/mysql-core";

/**
 * Core user table backing auth flow.
 * Extend this file with additional tables as your product grows.
 * Columns use camelCase to match both database fields and generated types.
 */
export const users = mysqlTable("users", {
  /**
   * Surrogate primary key. Auto-incremented numeric value managed by the database.
   * Use this for relations between tables.
   */
  id: int("id").autoincrement().primaryKey(),
  /** Manus OAuth identifier (openId) returned from the OAuth callback. Unique per user. */
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

// ─── Blog Content ─────────────────────────────────────────────────────────────

export const posts = mysqlTable("posts", {
  id: int("id").autoincrement().primaryKey(),
  /** "hero" displays as the featured post at the top of the blog. Only one hero is shown. */
  type: mysqlEnum("type", ["hero", "article"]).notNull().default("article"),
  status: mysqlEnum("status", ["draft", "published"]).notNull().default("draft"),
  /** URL-safe slug auto-generated from title. Used as the route: /blog/:slug */
  slug: varchar("slug", { length: 255 }),
  title: text("title").notNull(),
  /** Short deck / summary shown in article cards and meta description. */
  byline: text("byline"),
  /** Full article body stored as HTML. Rendered with dangerouslySetInnerHTML on the post page. */
  body: text("body"),
  tag: varchar("tag", { length: 100 }),
  author: varchar("author", { length: 255 }),
  publishedAt: timestamp("publishedAt"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Post = typeof posts.$inferSelect;
export type InsertPost = typeof posts.$inferInsert;

/** Bloglettes are short live-feed posts shown in the blog sidebar. Always published immediately. */
export const bloglettes = mysqlTable("bloglettes", {
  id: int("id").autoincrement().primaryKey(),
  body: text("body").notNull(),
  publishedAt: timestamp("publishedAt").defaultNow(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type Bloglette = typeof bloglettes.$inferSelect;
export type InsertBloglette = typeof bloglettes.$inferInsert;