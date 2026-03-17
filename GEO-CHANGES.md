# GEO Optimisation — Social Native Site

**GEO (Generative Engine Optimisation)** is the practice of structuring your content and markup so that AI engines like ChatGPT, Perplexity, Google AI Overviews, Gemini, and Claude are more likely to cite your brand in generated responses. Unlike traditional SEO, the target is an AI-generated answer, not a blue link in search results.

This document covers every change made to the codebase in the GEO optimisation pass.

---

## New Files

### `client/src/components/SchemaMarkup.tsx`
A reusable React component that injects a `<script type="application/ld+json">` block into `<head>` at runtime and cleans it up when the component unmounts. All per-page schema is delivered through this component rather than hardcoded into `index.html`, which ensures AI crawlers that execute JavaScript will see the correct schema for the current route.

### `client/src/hooks/usePageMeta.ts`
A React hook that sets the page `<title>`, `<meta name="description">`, `<meta property="og:title">`, and `<meta property="og:description">` tags at runtime on each route change. Because this is a single-page application, all routes share one `index.html` — without this hook, every page looks identical to crawlers that execute JavaScript, and AI engines index a generic description on every URL.

---

## Modified Files

### `client/index.html`
- Replaced the original thin `SoftwareApplication` schema with a full `@graph` bundle containing four schema types:
  - **Organization** — name, founding date, `knowsAbout` topics, and `sameAs` links to LinkedIn, Crunchbase, and G2
  - **WebSite** — with `SearchAction` for sitelinks search box eligibility
  - **SoftwareApplication** — feature list and `aggregateRating` (4.5 stars, 50 reviews)
  - **ItemList** — three named client results (Viator CPA reduction, NYX engagement lift, Crocs UGC scale) as `ListItem` entries with concrete data points
- Added `og:url` and `og:image` Open Graph tags
- Added `og:title`, `og:description`, and `og:type` Open Graph tags

### `client/src/pages/Home.tsx`
- Added `usePageMeta` call with a homepage-specific title and description
- Added `FAQPage` schema covering five core brand questions (what is Social Native, how it differs from GRIN/CreatorIQ, which brands it works with, rights clearance, pricing)
- Added a visible accordion **FAQ section** above the footer — the schema and the on-page content match, which is a hard requirement for AI engines to trust and cite the data

### `client/src/pages/HowItWorks.tsx`
- Added `usePageMeta` call with a page-specific title and description
- Added `FAQPage` schema covering five automation questions (creator sourcing, launch time, rights clearance, Content in Motion™, cost comparison vs. in-house)
- Added `BreadcrumbList` schema (Home → How It Works)

### `client/src/pages/Pricing.tsx`
- Added `usePageMeta` call
- Extracted the hardcoded FAQ array into a module-level `PRICING_FAQS` constant so the visible FAQ UI and the JSON-LD schema share a single source of truth
- Added `FAQPage` schema built from `PRICING_FAQS`
- Added `BreadcrumbList` schema (Home → Pricing)

### `client/src/pages/FAQ.tsx`
- Added `usePageMeta` call with a descriptive title and meta description
- Added `FAQPage` schema covering all 30 Q&As across all FAQ categories, built from the existing `FAQ_CATEGORIES` data using `.flatMap()` — no content duplication
- Added `BreadcrumbList` schema (Home → FAQ)

### `client/src/pages/BlogPost.tsx`
- Added `usePageMeta` call per post using the post's `title` and `description` fields
- Extended the post data type with three new fields: `dateISO` (ISO 8601 date), `description` (meta description string), and `quickAnswer` (direct-answer summary for AI extraction)
- Added all three fields to all eight blog posts
- Added a visible **"Quick Answer" block** at the top of every post — a bordered callout rendering `post.quickAnswer` in the first 150–200 words. AI engines heavily weight content that appears early in a document and is formatted as a direct answer
- Added `Article` schema per post (headline, description, datePublished, dateModified, author, publisher, URL)
- Added `BreadcrumbList` schema per post (Home → Blog → Post Title)

### `client/public/blog.html`
- Replaced the generic `<title>` with a keyword-rich title
- Added `<meta name="description">` with a substantive description
- Added `robots`, `canonical`, and Open Graph tags
- Added `ItemList` schema covering all eight blog posts with their slugs, titles, descriptions, and publish dates — allowing AI engines to understand and cite the full content catalogue from the blog index page

---

## Why These Changes Matter for GEO

| Change | GEO Impact |
|---|---|
| `FAQPage` schema | Highest citation rate of any schema type. AI engines extract Q&As directly into generated answers. |
| `Article` schema on blog posts | Signals authoritative, dated content. AI engines prefer citing sources with clear authorship and publish dates. |
| `BreadcrumbList` schema | Establishes site hierarchy, which improves confidence scoring in AI source evaluation. |
| `Organization` + `SoftwareApplication` `@graph` | Gives AI engines a structured entity definition for Social Native — critical for being cited as a named entity rather than a generic result. |
| Quick Answer blocks on blog posts | Content in the first 150–200 words of a document is disproportionately extracted by AI engines. Direct-answer formatting increases citation probability. |
| Per-page `usePageMeta` | Ensures AI crawlers that execute JavaScript see unique, accurate titles and descriptions per route — not the same generic homepage copy on every URL. |
| `og:url` + `og:image` | Required for correct link previews in AI-powered chat interfaces (Perplexity, ChatGPT Browse) and social sharing. |

---

## Deploying the Changes

No build configuration changes were made. The standard Vite build process applies:

```bash
npm install
npm run build
```

The compiled output goes to `dist/` as usual. The new `.tsx` component and hook are tree-shaken automatically — pages that don't import them are unaffected.
