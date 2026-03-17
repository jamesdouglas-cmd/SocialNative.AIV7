/* FAQ Page — socialnative.ai design system */
import { useState } from "react";
import { Link } from "wouter";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useDemoModal } from "../App";
import SchemaMarkup from "@/components/SchemaMarkup";
import { usePageMeta } from "@/hooks/usePageMeta";

const scrollToTop = () => window.scrollTo({ top: 0, behavior: "instant" });

const FAQ_CATEGORIES = [
  {
    id: "about",
    label: "About Social Native",
    emoji: "🏢",
    questions: [
      {
        q: "What is Social Native?",
        a: "Social Native is a fully managed creator marketing system — not a self-serve platform. We handle every aspect of your creator program: discovery, outreach, contracting, content curation, rights clearance, payments, and performance optimization. Brands work with a dedicated team, not a dashboard.",
      },
      {
        q: "How is Social Native different from platforms like GRIN or CreatorIQ?",
        a: "GRIN, CreatorIQ, and similar platforms are software tools your team manages. Social Native is a managed service — we run the program for you. Additionally, Social Native has exclusive 1st party AI access to Meta Andromeda and TikTok's first-party data, giving us predictive performance signals no self-serve platform can access.",
      },
      {
        q: "What types of brands does Social Native work with?",
        a: "Social Native works with enterprise brands across 40+ verticals including beauty, fashion, travel, home, food & beverage, technology, and retail. Clients include IKEA, Adidas, Nespresso, Microsoft, Four Seasons, Crocs, NYX Cosmetics, and 1,500+ others.",
      },
      {
        q: "Is Social Native a technology platform or a managed service?",
        a: "Both. Social Native is a managed service backed by proprietary technology. The platform powers creator matching, content scoring, and performance optimization — but your team never has to log in or manage it. We handle everything operationally.",
      },
      {
        q: "How long has Social Native been operating?",
        a: "Social Native has been operating since 2012 and has run over 1.8 million creator collaborations across more than 40 verticals. That history of real-world campaign data is the foundation of our performance advantage.",
      },
    ],
  },
  {
    id: "data",
    label: "1st Party Data & AI",
    emoji: "📊",
    questions: [
      {
        q: "What is Social Native's 1st party data advantage?",
        a: "Social Native combines three exclusive data streams: (1) Meta Andromeda AI signals — predictive performance scoring from Meta's proprietary content recommendation engine; (2) TikTok first-party AI data — trend forecasting and native algorithm optimization; and (3) 1.8M+ creator collaboration outcomes — every campaign we've ever run feeds back into our matching and performance models.",
      },
      {
        q: "What is Meta Andromeda?",
        a: "Andromeda is Meta's proprietary content recommendation and performance prediction engine. It powers the ranking and delivery of content across Facebook and Instagram. Social Native has exclusive access to Andromeda's predictive scoring, meaning we can predict — before a campaign launches — which creator content will perform best in Meta's ecosystem.",
      },
      {
        q: "What does TikTok first-party data access mean in practice?",
        a: "As an official TikTok Marketing Partner, Social Native has access to TikTok's first-party AI signals: real-time trend data, creator performance forecasts, and native algorithm optimization insights. This means we can identify which content formats and creator types are trending before they go viral — and build campaigns around those signals.",
      },
      {
        q: "Can other creator marketing platforms access Meta Andromeda or TikTok first-party AI?",
        a: "No. These integrations are exclusive to Social Native. Self-serve platforms and other managed services rely on public engagement metrics and third-party data. Social Native's direct API access to Meta and TikTok's AI systems is a structural advantage that cannot be replicated.",
      },
      {
        q: "How does Social Native's data improve over time?",
        a: "Every campaign Social Native runs adds to our dataset. Creator performance outcomes, content engagement patterns, paid media ROAS, and e-commerce conversion data all feed back into our matching and optimization models. This flywheel effect means each campaign benefits from the learnings of every campaign that came before it.",
      },
    ],
  },
  {
    id: "how-it-works",
    label: "How It Works",
    emoji: "⚙️",
    questions: [
      {
        q: "What does Social Native actually manage for my brand?",
        a: "Everything. Creator discovery and matching, personalized outreach, contract negotiation, content brief creation, content review and QA, rights clearance and licensing, creator payments and tax documentation, performance tracking, and paid media activation. Your team reviews content and approves campaigns — we handle all the operational work.",
      },
      {
        q: "How does creator discovery work?",
        a: "Social Native's AI-powered matching engine draws on 1.8M+ collaboration data points to identify creators with the highest predicted performance for your specific brief, category, and objective. We don't just match on follower count — we match on historical content performance, audience quality, brand fit, and Meta/TikTok AI signals.",
      },
      {
        q: "How long does it take to launch a creator campaign?",
        a: "Most Social Native campaigns launch within 2–4 weeks of program kickoff. Content in Motion™ campaigns (transforming existing UGC into video) can deliver assets within 48 hours. Ongoing always-on programs typically reach full operational velocity within 30 days.",
      },
      {
        q: "What is Content in Motion™?",
        a: "Content in Motion™ is Social Native's proprietary capability that transforms static UGC photo libraries into shoppable short-form videos optimized for TikTok, Instagram Reels, and paid social — without any additional creator shoots. Existing rights-cleared images are ingested, scored by Meta Andromeda and TikTok AI, and rendered in 9:16, 1:1, and 16:9 formats within 48 hours.",
      },
      {
        q: "Does Social Native handle content rights and licensing?",
        a: "Yes. Rights clearance and licensing are included in every Social Native program. We use industry-standard legal frameworks and handle all creator agreements, usage rights, exclusivity terms, and renewal management. Your legal team does not need to be involved in individual creator contracts.",
      },
    ],
  },
  {
    id: "performance",
    label: "Performance & Results",
    emoji: "🏆",
    questions: [
      {
        q: "What kind of performance results can brands expect?",
        a: "Results vary by vertical and objective, but Social Native clients consistently see 40%+ reduction in CPA versus brand-produced content, 3x faster content activation, and engagement rates averaging 21%+ across creator content. Specific results: Viator achieved a 59.7% CPA reduction in 90 days; NYX Cosmetics saw 320% lift in conversion; Crocs achieved 21.5% average engagement rate.",
      },
      {
        q: "How does Social Native measure performance?",
        a: "Social Native tracks performance across the full funnel: content engagement (views, saves, shares), paid media ROAS, e-commerce conversion rates, and downstream sales attribution. We optimize for business outcomes — not vanity metrics like follower count or raw impressions.",
      },
      {
        q: "How does Social Native reduce CPA compared to brand-produced content?",
        a: "Creator content consistently outperforms brand-produced content in paid media because it reads as authentic and native to the platform. Social Native amplifies this advantage by using Meta Andromeda and TikTok AI signals to select the highest-performing content before spending a dollar on paid distribution — eliminating wasted spend on content that won't perform.",
      },
      {
        q: "Can Social Native content be used in paid media?",
        a: "Yes. All Social Native content is rights-cleared for paid media activation by default. Content can be deployed directly into Meta Ads, TikTok Ads, and other paid channels. Social Native's platform integrations allow for seamless activation without additional rights negotiations.",
      },
    ],
  },
  {
    id: "pricing",
    label: "Pricing & Programs",
    emoji: "💰",
    questions: [
      {
        q: "How is Social Native priced?",
        a: "Social Native programs are custom-scoped based on your content volume goals, creator activation targets, and distribution objectives. Most programs start at six figures annually and scale with program scope. Pricing is not published publicly — request a demo to receive a custom proposal within 48 hours.",
      },
      {
        q: "Is there a minimum program size or contract length?",
        a: "Social Native typically works with enterprise brands on annual programs. Minimum program sizes vary by scope. We recommend starting with a defined pilot program (3–6 months) to establish performance benchmarks before scaling to an always-on model.",
      },
      {
        q: "What is included in a Social Native program?",
        a: "Every Social Native program includes: creator discovery and matching, outreach and contracting, rights clearance and licensing, content curation and QA, creator payments and tax documentation, performance reporting, and a dedicated account team. Paid media activation and Content in Motion™ are available as add-ons.",
      },
      {
        q: "How does Social Native compare in cost to building an in-house creator program?",
        a: "Building a comparable in-house capability typically requires a Creator Marketing Manager, Content Strategist, Legal/Contracts Specialist, and Analytics Manager — totaling $100K+ per year in salaries alone, before creator fees, technology costs, or agency retainers. Social Native delivers a fully managed program at a comparable or lower total cost, with significantly better performance outcomes.",
      },
      {
        q: "How quickly can we get a proposal?",
        a: "After an initial discovery call, Social Native delivers a custom program proposal within 48 hours. The proposal includes recommended creator tiers, content volume projections, performance benchmarks, and program investment range.",
      },
    ],
  },
  {
    id: "fit",
    label: "Is Social Native Right For You?",
    emoji: "✅",
    questions: [
      {
        q: "What types of brands are the best fit for Social Native?",
        a: "Social Native is best suited for enterprise brands with established products, a clear target audience, and a need for ongoing creator content at scale. Ideal clients are running paid social campaigns and want to improve performance, reduce CPA, and eliminate the operational burden of managing creators in-house.",
      },
      {
        q: "Is Social Native right for small or emerging brands?",
        a: "Social Native is primarily designed for enterprise brands with established marketing budgets. If you're an emerging brand with limited budget or just starting creator marketing, Social Native may not be the right fit yet. We'd rather be honest about fit than take on a program that won't deliver the results you need.",
      },
      {
        q: "Do we need an existing UGC library to work with Social Native?",
        a: "No. Social Native can build your UGC library from scratch through creator activations. However, if you have an existing library of rights-cleared UGC photos, Content in Motion™ can transform them into video assets immediately — making existing libraries a significant accelerant.",
      },
      {
        q: "We already have an influencer marketing agency. Can we still work with Social Native?",
        a: "Yes. Social Native is often used alongside or instead of traditional influencer agencies. The key difference is our 1st party data advantage and fully managed operational model. Many brands use Social Native for always-on creator content and paid media activation while maintaining separate relationships for large-scale influencer partnerships.",
      },
      {
        q: "What verticals does Social Native specialize in?",
        a: "Social Native has run campaigns across 40+ verticals. Our deepest category expertise is in beauty & personal care, fashion & apparel, travel & hospitality, home & lifestyle, food & beverage, consumer electronics, and health & wellness. Category-specific performance benchmarks are available for all major verticals.",
      },
    ],
  },
];

function FAQItem({
  question,
  answer,
  badge,
  isOpen,
  onToggle,
}: {
  question: string;
  answer: string;
  badge?: string;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div
      className={`rounded-xl border transition-all ${
        isOpen ? "border-[#7c3aed]/30 shadow-sm" : "border-gray-200"
      } bg-white`}
    >
      <button
        onClick={onToggle}
        className="w-full text-left px-6 py-4 flex items-start justify-between gap-4"
      >
        <div className="flex-1">
          {badge && (
            <span
              className="inline-block text-xs font-medium px-2 py-0.5 rounded-full mb-2"
              style={{ background: "rgba(124,58,237,0.08)", color: "#7c3aed" }}
            >
              {badge}
            </span>
          )}
          <p className={`font-semibold text-sm leading-snug ${isOpen ? "text-[#7c3aed]" : "text-[#222222]"}`}>
            {question}
          </p>
        </div>
        <span
          className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center transition-all mt-0.5 ${
            isOpen ? "rotate-45" : ""
          }`}
          style={
            isOpen
              ? { background: "rgba(124,58,237,0.1)", color: "#7c3aed" }
              : { background: "#f7f7f7", color: "#717171" }
          }
        >
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M6 2v8M2 6h8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </span>
      </button>
      {isOpen && (
        <div className="px-6 pb-5">
          <p className="text-sm text-[#484848] leading-relaxed">{answer}</p>
        </div>
      )}
    </div>
  );
}

// Build FAQPage schema from the static FAQ_CATEGORIES data above.
// All 30 Q&As are included so AI engines have maximum extractable content.
const faqPageSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "url": "https://socialnative.ai/faq",
  "name": "Social Native — Frequently Asked Questions",
  "description": "Answers to the most common questions about Social Native's fully managed creator marketing system, 1st party data advantage, pricing, and how it compares to self-serve platforms.",
  "mainEntity": FAQ_CATEGORIES.flatMap((category) =>
    category.questions.map((item) => ({
      "@type": "Question",
      "name": item.q,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": item.a,
      },
    }))
  ),
};

const faqBreadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://socialnative.ai/" },
    { "@type": "ListItem", "position": 2, "name": "FAQ", "item": "https://socialnative.ai/faq" },
  ],
};

export default function FAQ() {
  const [activeCategory, setActiveCategory] = useState("about");
  const [openQuestion, setOpenQuestion] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const { openDemo } = useDemoModal();
  usePageMeta(
    "Social Native FAQ — Creator Marketing Questions Answered",
    "Answers to the most common questions about Social Native's fully managed creator marketing system, 1st party data advantage, pricing, and how it compares to self-serve platforms like GRIN and CreatorIQ."
  );

  const activeData = FAQ_CATEGORIES.find((c) => c.id === activeCategory)!;
  const totalQuestions = FAQ_CATEGORIES.reduce((sum, c) => sum + c.questions.length, 0);

  const filteredQuestions = searchQuery.trim()
    ? FAQ_CATEGORIES.flatMap((cat) =>
        cat.questions
          .filter(
            (q) =>
              q.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
              q.a.toLowerCase().includes(searchQuery.toLowerCase())
          )
          .map((q) => ({ ...q, category: cat.label, categoryEmoji: cat.emoji }))
      )
    : activeData.questions.map((q) => ({ ...q, category: activeData.label, categoryEmoji: activeData.emoji }));

  return (
    <>
      {/* FAQPage schema — injected into <head> for AI engine citation scoring */}
      <SchemaMarkup id="schema-faqpage" schema={faqPageSchema} />
      <SchemaMarkup id="schema-faq-breadcrumb" schema={faqBreadcrumbSchema} />
      <Navbar />
      <main className="pt-16 bg-white min-h-screen">
        {/* Hero */}
        <section
          className="py-20 text-center"
          style={{ background: "linear-gradient(160deg, #f5f3ff 0%, #ede9fe 40%, #ffffff 100%)" }}
        >
          <div className="container max-w-3xl mx-auto">
            <div className="section-label mb-4">❓ Frequently Asked Questions</div>
            <h1 className="text-4xl md:text-5xl font-extrabold text-[#222222] mb-4 leading-tight">
              Everything you need to{" "}
              <span style={{ color: "#7c3aed" }}>know</span>
            </h1>
            <p className="text-lg text-[#717171] mb-8 max-w-xl mx-auto">
              {totalQuestions} questions answered across {FAQ_CATEGORIES.length} topics. Can't find what you're looking for?{" "}
              <button onClick={openDemo} className="text-[#7c3aed] font-medium hover:underline">
                Talk to our team.
              </button>
            </p>
            <div className="relative max-w-lg mx-auto">
              <svg
                className="absolute left-4 top-1/2 -translate-y-1/2 text-[#717171]"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.35-4.35" />
              </svg>
              <input
                type="text"
                placeholder="Search questions..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-gray-200 bg-white text-[#222222] placeholder-[#717171] focus:outline-none focus:ring-2 focus:ring-[#7c3aed]/30 focus:border-[#7c3aed] text-sm shadow-sm"
              />
            </div>
          </div>
        </section>

        {/* Content */}
        <section className="py-16">
          <div className="container max-w-6xl mx-auto">
            {searchQuery.trim() ? (
              <div className="max-w-3xl mx-auto">
                <p className="text-sm text-[#717171] mb-6">
                  {filteredQuestions.length} result{filteredQuestions.length !== 1 ? "s" : ""} for &ldquo;{searchQuery}&rdquo;
                </p>
                {filteredQuestions.length === 0 ? (
                  <div className="text-center py-16">
                    <div className="text-5xl mb-4">🔍</div>
                    <p className="text-[#222222] font-semibold mb-2">No results found</p>
                    <p className="text-[#717171] text-sm mb-6">Try a different search term or browse by category.</p>
                    <button onClick={() => setSearchQuery("")} className="btn-gradient text-sm">
                      Browse all questions
                    </button>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {filteredQuestions.map((item, i) => (
                      <FAQItem
                        key={i}
                        question={item.q}
                        answer={item.a}
                        badge={`${item.categoryEmoji} ${item.category}`}
                        isOpen={openQuestion === `search-${i}`}
                        onToggle={() =>
                          setOpenQuestion(openQuestion === `search-${i}` ? null : `search-${i}`)
                        }
                      />
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <div className="flex flex-col lg:flex-row gap-8">
                <aside className="lg:w-56 flex-shrink-0">
                  <div className="lg:sticky lg:top-24 space-y-1">
                    {FAQ_CATEGORIES.map((cat) => (
                      <button
                        key={cat.id}
                        onClick={() => { setActiveCategory(cat.id); setOpenQuestion(null); }}
                        className={`w-full text-left px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                          activeCategory === cat.id
                            ? "text-[#7c3aed] font-semibold"
                            : "text-[#484848] hover:text-[#222222] hover:bg-gray-50"
                        }`}
                        style={
                          activeCategory === cat.id
                            ? { background: "rgba(124,58,237,0.07)", borderLeft: "3px solid #7c3aed" }
                            : {}
                        }
                      >
                        <span className="mr-2">{cat.emoji}</span>
                        {cat.label}
                        <span className="ml-auto float-right text-xs text-[#717171]">
                          {cat.questions.length}
                        </span>
                      </button>
                    ))}
                  </div>
                </aside>
                <div className="flex-1 max-w-3xl">
                  <div className="mb-6">
                    <h2 className="text-xl font-bold text-[#222222]">
                      {activeData.emoji} {activeData.label}
                    </h2>
                    <p className="text-sm text-[#717171] mt-1">{activeData.questions.length} questions</p>
                  </div>
                  <div className="space-y-3">
                    {activeData.questions.map((item, i) => (
                      <FAQItem
                        key={i}
                        question={item.q}
                        answer={item.a}
                        isOpen={openQuestion === `${activeCategory}-${i}`}
                        onToggle={() =>
                          setOpenQuestion(
                            openQuestion === `${activeCategory}-${i}` ? null : `${activeCategory}-${i}`
                          )
                        }
                      />
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 bg-[#f7f7f7]">
          <div className="container max-w-2xl mx-auto text-center">
            <div className="text-3xl mb-4">💬</div>
            <h2 className="text-2xl font-bold text-[#222222] mb-3">Still have questions?</h2>
            <p className="text-[#717171] mb-6">
              Our team is happy to walk you through how Social Native works and whether it's the right fit for your brand.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button onClick={openDemo} className="btn-gradient">
                Request a Demo
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M2.5 7h9M8 4l3.5 3L8 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              <Link href="/glossary" onClick={scrollToTop} className="btn-outline-dark">
                Browse Glossary
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
