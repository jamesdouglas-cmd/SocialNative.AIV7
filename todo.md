# Social Native V2 — Project TODO

## Core Pages
- [x] Home page (hero, stats bar, Meta/TikTok sections, case study previews, CTA)
- [x] How It Works page (tabbed: Automation & Operations + Content in Motion™)
- [x] Partnerships page (Meta Andromeda AI + TikTok first-party data deep-dive)
- [x] Case Studies page (20 brands across 5 categories)
- [x] Pricing page (Essentials $50K, Growth $100K, Enterprise custom)
- [x] vs. Competitors page (feature comparison vs GRIN, CreatorIQ, Aspire, Upfluence, Bazaarvoice)
- [x] Blog index page (8 articles, 5 category filters, newsletter signup)
- [x] Blog post detail pages (full content for all 8 articles)

## Design System
- [x] Transformative Teal (#009B8D) for links/anchors
- [x] Cloud Dancer (#F6F0E8) for base backgrounds
- [x] Persimmon Orange (#E8572A) for CTAs
- [x] Bricolage Grotesque for display/titles
- [x] DM Sans for body text
- [x] All nav links scroll to top of destination pages
- [x] How It Works tabs styled (active filled, inactive outlined)
- [x] Cost comparison tables use DM Sans body font (not monospace)

## Forms & Backend
- [x] Demo request modal with monthly budget dropdown (6 ranges)
- [x] Newsletter opt-in checkbox in demo form
- [x] Footer newsletter signup form
- [x] tRPC backend routes for Google Sheets integration
- [x] Google Sheets API client (server/googleSheets.ts)
- [x] Newsletter signups write to Google Sheet (NEWSLETTER_SHEET_ID)
- [x] Demo requests write to Google Sheet (DEMO_SHEET_ID)
- [x] Vitest tests for newsletter.subscribe and demo.submit procedures (7 tests pass)

## Content
- [x] GEO-optimized throughout for AI citation potential
- [x] 1.8M+ creator collaborations referenced
- [x] Meta Andromeda AI integration content
- [x] TikTok first-party data content
- [x] Content in Motion™ tab under How It Works
- [x] 20 case studies from Google Slides deck
- [x] Removed "only" from hero copy
- [x] Removed "No legal team required" and "0 legal incidents" copy

## Planned / Future
- [ ] Robust FAQ section
- [ ] Stats Update section with unique Social Native statistics
- [ ] Expand blog with additional articles
- [ ] Real brand logos in stats bar (replace text names)

## Agentio + Airbnb Redesign
- [x] Global CSS: light backgrounds, generous spacing, pill buttons, shadow cards
- [x] Navbar: transparent-to-white scroll, pill CTA, cleaner layout
- [x] Homepage: light hero, two-color headline, animated logo marquee, alternating feature sections, centered testimonial
- [x] How It Works: light background, cleaner tabs, alternating feature blocks
- [x] Partnerships: light sections, feature cards with icons
- [x] Case Studies: card grid with white cards and shadows
- [x] Pricing: clean white cards, clear tier differentiation
- [x] vs. Competitors: cleaner comparison table
- [x] Blog: card grid with image-first design
- [x] Footer: cleaner 4-column layout

## Reference Site Copy & Design Improvements
- [x] Rewrite hero headline: "The Only Creator Marketing System Built on Exclusive 1st Party Data"
- [x] Rewrite hero subhead using "Not X. Y." pattern
- [x] Add "No other platform has this" claim near Meta/TikTok section
- [x] Add "Automated" green badge pills to feature checklist
- [x] Replace "Millions of creators" with specific number (2.3M+)
- [x] Add blockquote "The result:" callout with 90% stat
- [x] Add "specific results, specific timeframes" meta-copy above case studies
- [x] Add 1st Party Data section: Meta + TikTok + Social Native 1.8M collaboration data + paid media + ecommerce
- [x] Update Partnerships page with 1st Party Data angle

## 1st Party Data Section Expansion
- [x] Add specific data point stat chips to Card 01: Meta & TikTok 1st Party AI
- [x] Add specific data point stat chips to Card 02: 1.8M+ Creator Collaboration Outcomes
- [x] Add specific data point stat chips to Card 03: Paid Media & E-Commerce Sales Data
- [x] Expand flywheel callout with a concrete improvement stat

## Flywheel Diagram
- [x] Build animated DataFlywheel component with three orbiting data stream nodes
- [x] Integrate DataFlywheel into the 1st Party Data section on the homepage

## socialnative.ai Design System Adoption
- [x] Update global CSS: purple accent (#7c3aed), blue-to-purple gradient CTA, system font stack, white/light-gray sections
- [x] Update Navbar: white bg, gradient CTA button, purple logo accent
- [x] Update Footer: Resources column, purple accents, white bg
- [x] Rebuild Homepage hero: subtle lavender gradient bg, centered layout, gradient CTA
- [x] Update section labels: emoji prefix + uppercase purple tracking-widest
- [x] Update How It Works: numbered step cards + platform screenshot mockup
- [x] Update all pages: apply purple accent, gradient buttons, white/gray section backgrounds

## Purple Design Rollout + Demo Modal + Content Fixes
- [x] Wire Navbar "Request a Demo" button to open DemoModal globally (via App-level state)
- [x] Update How It Works page: replace orange/persimmon with purple accent + gradient CTAs
- [x] Update Partnerships page: replace orange/persimmon with purple accent + gradient CTAs
- [x] Update Case Studies page: replace orange/persimmon with purple accent + gradient CTAs
- [x] Update vs. Competitors page: replace orange/persimmon with purple accent + gradient CTAs
- [x] Update Blog page: replace orange/persimmon with purple accent
- [x] Update BlogPost page: replace orange/persimmon with purple accent
- [x] Populate FAQ page with 30 questions across 6 categories
- [x] Populate Glossary page with all required terms + additional relevant terms
- [x] Remove three pricing tiers from Pricing page
- [x] Apply purple design to Pricing page
