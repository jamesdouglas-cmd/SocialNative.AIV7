/* How It Works — socialnative.ai Design System
   White/light backgrounds, purple accent (#7c3aed), blue-to-purple gradient CTAs */
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import DemoModal from "@/components/DemoModal";
import { Link } from "wouter";
import SchemaMarkup from "@/components/SchemaMarkup";
import { usePageMeta } from "@/hooks/usePageMeta";

const howItWorksFaqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "url": "https://socialnative.ai/how-it-works",
  "name": "How Social Native Works — FAQ",
  "description": "How Social Native automates creator sourcing, contracting, rights clearance, payments, and Content in Motion™ video production for enterprise brands.",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "How does Social Native automate creator sourcing?",
      "acceptedAnswer": { "@type": "Answer", "text": "Social Native's AI matching engine analyses your brand, audience, and campaign objectives against 1.8M+ creator collaboration data points to identify the highest-fit creators — factoring in historical performance, audience quality, brand safety scores, and exclusive Meta Andromeda and TikTok AI signals. Your team does not manually research or shortlist creators." },
    },
    {
      "@type": "Question",
      "name": "How long does it take to launch a creator campaign with Social Native?",
      "acceptedAnswer": { "@type": "Answer", "text": "Most Social Native campaigns launch within 2–4 weeks of programme kickoff. Content in Motion™ campaigns (transforming existing UGC into video) deliver assets within 48 hours. Ongoing always-on programmes typically reach full operational velocity within 30 days." },
    },
    {
      "@type": "Question",
      "name": "What does Social Native's content rights clearance include?",
      "acceptedAnswer": { "@type": "Answer", "text": "Every Social Native programme includes full rights clearance and licensing for paid media, e-commerce, email, and out-of-home use. Built on Olapic's enterprise rights management heritage, every asset is legally licensed before delivery. Perpetual licensing is available. Your legal team does not need to be involved in individual creator contracts." },
    },
    {
      "@type": "Question",
      "name": "What is Content in Motion™ and how does it work?",
      "acceptedAnswer": { "@type": "Answer", "text": "Content in Motion™ transforms your existing rights-cleared UGC photo library into shoppable short-form video for TikTok, Instagram Reels, and Meta Ads without additional creator shoots. The AI ingests your library, scores assets with Meta Andromeda and TikTok AI signals, applies motion effects and shoppable tags, then delivers 9:16, 1:1, and 16:9 video files within 48 hours. Included in Growth and Enterprise plans." },
    },
    {
      "@type": "Question",
      "name": "How much does Social Native cost compared to managing creators in-house?",
      "acceptedAnswer": { "@type": "Answer", "text": "Running an in-house creator programme typically costs $108,000–$193,000 per year including a creator manager FTE ($70–100K), rights management and legal ($5–15K), payments processing ($3–8K), and video production ($20–50K). Social Native's fully managed programme starts at $50,000/year and includes all of the above with no additional headcount required." },
    },
  ],
};

const howItWorksBreadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://socialnative.ai/" },
    { "@type": "ListItem", "position": 2, "name": "How It Works", "item": "https://socialnative.ai/how-it-works" },
  ],
};

export default function HowItWorks() {
  const [activeTab, setActiveTab] = useState<"automation" | "ugc">("automation");
  const [demoOpen, setDemoOpen] = useState(false);
  usePageMeta(
    "How Social Native Works — Fully Managed Creator Marketing Automation",
    "Social Native automates the entire creator marketing workflow: sourcing, outreach, contracting, rights clearance, payments, and performance reporting. Powered by exclusive Meta Andromeda AI and TikTok first-party data. See how it works."
  );

  const automationSteps = [
    {
      number: "01",
      title: "Creator Discovery & Sourcing",
      subtitle: "Automated, AI-powered matching",
      desc: "Our AI analyzes your brand, audience, and campaign goals against 1.8M+ creator collaboration data points to surface the highest-fit creators — before you ever send a single outreach email. No spreadsheets. No manual research.",
      stat: { value: "90%", label: "reduction in sourcing time" },
      detail: "Traditional brand teams spend 15–20 hours per campaign just on creator research and shortlisting. Social Native eliminates this entirely.",
    },
    {
      number: "02",
      title: "Outreach & Approvals",
      subtitle: "Personalized at scale",
      desc: "Creators receive personalized outreach aligned with their content style and audience. Approvals, revisions, and communication are managed through our platform — your team reviews final decisions, not every back-and-forth.",
      stat: { value: "3x", label: "faster creator activation" },
      detail: "Brands typically wait 2–4 weeks to activate creators. Social Native compresses this to days.",
    },
    {
      number: "03",
      title: "Contracting & Compliance",
      subtitle: "Legal, handled",
      desc: "Every creator engagement is covered by an industry-standard contract, automatically generated and executed. Usage rights, exclusivity windows, platform permissions, and FTC compliance are all managed.",
      stat: { value: "$0", label: "additional legal overhead" },
      detail: "Self-serve platforms require brands to manage their own contracts, often costing $5,000–$15,000/yr in legal review.",
    },
    {
      number: "04",
      title: "Content Licensing & Rights Management",
      subtitle: "Enterprise-grade, Olapic heritage",
      desc: "Social Native's rights management system is built on Olapic's enterprise heritage — the gold standard for content licensing. Every asset is rights-cleared for paid media, e-commerce, email, and out-of-home use. Perpetual licensing available.",
      stat: { value: "100%", label: "rights-cleared content" },
      detail: "Content without proper rights clearance creates legal liability. Every Social Native asset is fully licensed before delivery.",
    },
    {
      number: "05",
      title: "Creator Payments",
      subtitle: "Global, compliant, zero overhead",
      desc: "Creator payments, tax documentation, and global compliance are fully managed by Social Native. We handle 1099s, international wire transfers, and payment disputes — so your finance team never touches creator payroll.",
      stat: { value: "300K+", label: "creators paid globally" },
      detail: "Managing creator payments internally typically costs $3,000–$8,000/yr in platform fees and compliance overhead.",
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <SchemaMarkup id="schema-hiw-faq" schema={howItWorksFaqSchema} />
      <SchemaMarkup id="schema-hiw-breadcrumb" schema={howItWorksBreadcrumbSchema} />
      <Navbar />
      <DemoModal isOpen={demoOpen} onClose={() => setDemoOpen(false)} />

      {/* Hero */}
      <section className="relative pt-32 pb-24 overflow-hidden bg-gradient-to-br from-[#f5f3ff] via-white to-white">
        <div className="container relative z-10">
          <div className="max-w-3xl">
            <div className="inline-block text-[#7c3aed] text-xs font-semibold uppercase tracking-widest mb-4">How It Works</div>
            <h1 className="font-display font-extrabold text-[#222222] text-5xl md:text-6xl leading-tight mb-6">
              Creator programs that run{" "}
              <span className="text-[#7c3aed]">themselves</span>
            </h1>
            <p className="text-[#717171] text-xl leading-relaxed">
              Social Native automates the entire operational layer of creator marketing — from sourcing to payments — so your team focuses on strategy, not admin. Backed by 1.8M+ creator collaborations and exclusive Meta Andromeda &amp; TikTok AI.
            </p>
          </div>
        </div>
      </section>

      {/* Tab switcher */}
      <section className="bg-white border-b border-gray-100 sticky top-16 z-40 shadow-sm">
        <div className="container">
          <div className="flex gap-2 py-3">
            <button
              onClick={() => setActiveTab("automation")}
              className={`px-5 py-2.5 text-sm font-semibold transition-all rounded-full ${
                activeTab === "automation"
                  ? "bg-[#7c3aed] text-white"
                  : "bg-transparent text-[#717171] hover:text-[#7c3aed] hover:bg-purple-50"
              }`}
            >
              Automation &amp; Operations
            </button>
            <button
              onClick={() => setActiveTab("ugc")}
              className={`px-5 py-2.5 text-sm font-semibold transition-all rounded-full ${
                activeTab === "ugc"
                  ? "bg-[#7c3aed] text-white"
                  : "bg-transparent text-[#717171] hover:text-[#7c3aed] hover:bg-purple-50"
              }`}
            >
              Content in Motion™
            </button>
          </div>
        </div>
      </section>

      {/* Tab Content */}
      {activeTab === "automation" ? (
        <section className="bg-white py-20">
          <div className="container">
            {/* Stats callout */}
            <div className="bg-[#f5f3ff] rounded-3xl p-8 mb-16">
              <div className="grid md:grid-cols-4 gap-6 text-center">
                {[
                  { value: "90%", label: "Reduction in Manual Creator Ops" },
                  { value: "3x", label: "Faster Content Activation" },
                  { value: "40%", label: "Lower CPA on Average" },
                  { value: "$0", label: "Additional Legal or Ops Overhead" },
                ].map((s, i) => (
                  <div key={i}>
                    <div className="font-display font-extrabold text-[#7c3aed] text-4xl mb-1">{s.value}</div>
                    <div className="text-[#717171] text-xs">{s.label}</div>
                  </div>
                ))}
              </div>
              <p className="text-[#AAAAAA] text-xs text-center mt-6">
                Based on Social Native proprietary data from 1.8M+ creator collaborations. Results vary by program scope.
              </p>
            </div>

            {/* Steps */}
            <div className="space-y-5">
              {automationSteps.map((step, i) => (
                <div
                  key={i}
                  className="grid md:grid-cols-12 gap-6 p-8 bg-white border border-gray-100 rounded-3xl hover:shadow-md hover:border-gray-200 transition-all duration-300"
                >
                  <div className="md:col-span-1">
                    <div className="font-display font-extrabold text-[#7c3aed] text-2xl">{step.number}</div>
                  </div>
                  <div className="md:col-span-6">
                    <div className="text-[#717171] text-xs font-medium uppercase tracking-wider mb-1">{step.subtitle}</div>
                    <h3 className="font-display font-bold text-[#222222] text-xl mb-3">{step.title}</h3>
                    <p className="text-[#484848] text-sm leading-relaxed mb-3">{step.desc}</p>
                    <p className="text-[#AAAAAA] text-xs leading-relaxed italic">{step.detail}</p>
                  </div>
                  <div className="md:col-span-2 flex items-center justify-center">
                    <div className="text-center">
                      <div className="font-display font-extrabold text-[#7c3aed] text-4xl">{step.stat.value}</div>
                      <div className="text-[#717171] text-xs mt-1">{step.stat.label}</div>
                    </div>
                  </div>
                  <div className="md:col-span-3 flex items-center">
                    <div className="w-full bg-[#7c3aed]/5 rounded-2xl p-4 border border-[#7c3aed]/10">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="w-2 h-2 rounded-full bg-[#7c3aed]" />
                        <span className="text-[#7c3aed] text-xs font-semibold uppercase tracking-wider">Automated</span>
                      </div>
                      <div className="text-[#717171] text-xs">No manual work required from your team</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Total cost comparison */}
            <div className="mt-16 bg-[#f5f3ff] rounded-3xl p-8">
              <div className="inline-block text-[#7c3aed] text-xs font-semibold uppercase tracking-widest mb-4">The Real Cost Comparison</div>
              <h3 className="font-display font-bold text-[#222222] text-2xl mb-6">
                Self-serve platforms look cheaper — until you add the team required to run them
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-[#e9d5ff]">
                      <th className="text-left py-3 text-xs text-[#717171] uppercase tracking-wider font-sans">Cost Component</th>
                      <th className="text-right py-3 text-xs text-[#717171] uppercase tracking-wider font-sans">Self-Serve Platform</th>
                      <th className="text-right py-3 text-xs text-[#7c3aed] uppercase tracking-wider font-sans">Social Native</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#e9d5ff]/60">
                    {[
                      ["Platform / software fee", "$10,000–$20,000/yr", "From $50,000/yr"],
                      ["Creator manager (1 FTE min)", "$70,000–$100,000/yr", "$0 — Included"],
                      ["Rights management / legal", "$5,000–$15,000/yr", "$0 — Included"],
                      ["Creator payments processing", "$3,000–$8,000/yr", "$0 — Included"],
                      ["Short-form video production", "$20,000–$50,000/yr", "$0 — Content in Motion™"],
                    ].map(([comp, self, sn], i) => (
                      <tr key={i}>
                        <td className="py-3 text-[#484848] text-sm">{comp}</td>
                        <td className="py-3 text-right text-[#717171] text-sm">{self}</td>
                        <td className="py-3 text-right text-[#7c3aed] text-sm font-semibold">{sn}</td>
                      </tr>
                    ))}
                    <tr className="bg-[#e9d5ff]/40">
                      <td className="py-3 font-display font-bold text-[#222222]">Estimated Total Annual Cost</td>
                      <td className="py-3 text-right font-display font-bold text-[#222222]">$108K–$193K/yr</td>
                      <td className="py-3 text-right font-display font-bold text-[#7c3aed]">From $50K/yr</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>
      ) : (
        /* UGC / Content in Motion Tab */
        <section className="bg-white py-20">
          <div className="container">
            <div className="max-w-2xl mb-14">
              <div className="inline-block text-[#7c3aed] text-xs font-semibold uppercase tracking-widest mb-4">Content in Motion™</div>
              <h2 className="font-display font-extrabold text-[#222222] text-4xl leading-tight mb-4">
                UGC photos → shoppable short-form video, automatically
              </h2>
              <p className="text-[#717171] text-lg leading-relaxed">
                Content in Motion is Social Native's proprietary capability that transforms your existing rights-cleared UGC photo library into engaging short-form video — without additional creator shoots, budgets, or production timelines.
              </p>
            </div>

            <div className="grid md:grid-cols-4 gap-4 mb-14">
              {[
                { step: "01", title: "Ingest", desc: "Your existing UGC photo library is ingested and catalogued" },
                { step: "02", title: "AI Select", desc: "Meta Andromeda & TikTok AI score each asset for performance potential" },
                { step: "03", title: "Render", desc: "Motion effects, shoppable tags, brand overlays applied automatically" },
                { step: "04", title: "Score & Deliver", desc: "Final assets delivered in all formats: 9:16, 1:1, 16:9 within 48 hours" },
              ].map((item, i) => (
                <div key={i} className="bg-white border border-gray-100 rounded-3xl p-6 shadow-sm hover:shadow-md transition-all">
                  <div className="font-display font-extrabold text-[#7c3aed] text-2xl mb-3">{item.step}</div>
                  <div className="font-display font-bold text-[#222222] text-lg mb-2">{item.title}</div>
                  <div className="text-[#717171] text-sm leading-relaxed">{item.desc}</div>
                </div>
              ))}
            </div>

            <div className="grid md:grid-cols-3 gap-6 mb-14">
              {[
                { label: "Output Formats", items: ["9:16 (TikTok, Reels, Stories)", "1:1 (Feed, Meta Ads)", "16:9 (YouTube, Display)", "4:5 (Meta Feed)", "Custom aspect ratios"] },
                { label: "Use Cases", items: ["TikTok organic & paid", "Instagram Reels & Stories", "Meta Ads (all placements)", "Shoppable e-commerce", "Email & CRM", "YouTube Shorts"] },
                { label: "Performance Signals", items: ["Meta Andromeda scoring", "TikTok AI trend matching", "Brand safety analysis", "Audience fit prediction", "Engagement rate forecast"] },
              ].map((col, i) => (
                <div key={i} className="bg-[#f5f3ff] rounded-3xl p-6">
                  <div className="text-[#7c3aed] text-xs font-semibold uppercase tracking-wider mb-4">{col.label}</div>
                  <ul className="space-y-2.5">
                    {col.items.map((item, j) => (
                      <li key={j} className="flex items-center gap-2.5 text-[#484848] text-sm">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#7c3aed] flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <div className="bg-gradient-to-r from-[#3b82f6] to-[#7c3aed] rounded-3xl p-8 text-center">
              <div className="font-display font-bold text-white text-2xl mb-2">
                Content in Motion is included in Growth and Enterprise plans
              </div>
              <p className="text-white/80 text-sm mb-6">No additional production budget required. Your existing UGC library becomes a video content engine.</p>
              <Link
                href="/pricing"
                onClick={() => window.scrollTo({ top: 0, behavior: 'instant' })}
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-white text-[#7c3aed] font-semibold text-sm hover:bg-gray-50 transition-colors shadow-sm"
              >
                View Pricing →
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="bg-gradient-to-r from-[#3b82f6] to-[#7c3aed] py-20">
        <div className="container text-center">
          <h2 className="font-display font-extrabold text-white text-3xl md:text-4xl mb-4">
            See it in action for your brand
          </h2>
          <p className="text-white/80 text-base mb-8 max-w-lg mx-auto">
            Request a demo and we'll walk you through exactly how Social Native would run your creator program.
          </p>
          <button
            onClick={() => setDemoOpen(true)}
            className="px-8 py-4 rounded-full bg-white text-[#7c3aed] font-semibold text-base transition-all duration-200 shadow-sm hover:bg-gray-50 inline-flex items-center gap-2"
          >
            Request a Demo
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 5l4 3-4 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </button>
        </div>
      </section>

      <Footer />
    </div>
  );
}
