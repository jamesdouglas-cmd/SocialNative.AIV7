# Social Native V2 — Design Brainstorm

## Selected Design Philosophy: "Burnt Signal"

**Design Movement:** Post-industrial editorial meets performance data dashboard — think Bloomberg Terminal meets a high-end creative agency portfolio.

**Inspiration:** Agentio's bold two-tone typography and data-forward confidence, reinterpreted through a warm, tactile palette. Where Agentio uses navy + coral red, Social Native V2 uses charcoal black + faded burnt orange + white, with Waymo green (#00D26A) as a precision accent for data points and positive metrics.

**Core Principles:**
1. Typography does the heavy lifting — oversized, mixed-weight headlines carry the brand voice
2. Data is design — statistics and metrics are treated as visual elements, not footnotes
3. Warmth through restraint — the orange is always muted/faded (never neon), creating warmth without aggression
4. Asymmetric tension — sections alternate between left-heavy and right-heavy layouts to create visual momentum

**Color Philosophy:**
- `#0D0D0D` (near-black) — primary background for hero and dark sections; signals authority
- `#FFFFFF` (white) — clean content sections; breathing room
- `#C4622D` (faded burnt orange) — primary accent; warmth, energy, creator culture
- `#E8956B` (light peach-orange) — secondary accent; softer highlights
- `#00D26A` (Waymo green) — precision accent for positive metrics, checkmarks, and data wins
- `#F5F0EB` (warm off-white) — section backgrounds; avoids cold sterility

**Layout Paradigm:** Agentio-inspired but asymmetric — hero text is left-aligned and massive, with a floating data card or visual element on the right. Sections alternate between dark (charcoal) and light (warm white) backgrounds. Stats are displayed as large typographic elements, not cards.

**Signature Elements:**
1. Mixed-weight headline treatment: "Creator programs that **scale.**" — regular weight + bold, with the accent word in burnt orange
2. Floating metric badges: semi-transparent dark cards with green metric values, overlaid on section backgrounds
3. Horizontal rule dividers with small orange diamond markers

**Interaction Philosophy:** Subtle entrance animations (fade + slide up) on scroll. Hover states on CTAs use orange glow. Stats counter-animate on scroll entry.

**Animation:** Framer Motion fade-up on section entry (0.4s, ease-out). Number counters animate from 0 on first viewport entry. Nav has a subtle blur backdrop on scroll.

**Typography System:**
- Display: `Syne` (bold, geometric, editorial — similar to Agentio's confidence)
- Body: `DM Sans` (clean, modern, highly readable)
- Mono accent: `DM Mono` for data labels and technical callouts
- Hierarchy: 72px hero → 48px section heads → 32px sub-heads → 18px body → 13px labels

---

<response>
<text>Approach A: "Burnt Signal" — described above. Probability: 0.08</text>
<probability>0.08</probability>
</response>

<response>
<text>Approach B: "Cream & Carbon" — Warm cream (#FAF7F2) backgrounds with carbon black typography, thin gold rules, and a single electric teal accent. Inspired by luxury editorial magazines. Probability: 0.07</text>
<probability>0.07</probability>
</response>

<response>
<text>Approach C: "Neon Ledger" — Pure black backgrounds with neon orange and green data overlays, inspired by trading terminals and Bloomberg. More aggressive and techy. Probability: 0.06</text>
<probability>0.06</probability>
</response>
