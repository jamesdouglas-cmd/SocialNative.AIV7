/* vs. Competitors — socialnative.ai Design System
   White backgrounds, purple accent (#7c3aed), clean comparison table */
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import DemoModal from "@/components/DemoModal";

const competitors = ["GRIN", "CreatorIQ", "Aspire", "Upfluence", "Bazaarvoice"];

const comparisonData = [
  { capability: "Fully managed service (no in-house ops needed)", sn: true, grin: false, creatoriq: "partial", aspire: "partial", upfluence: false, bazaarvoice: "partial" },
  { capability: "Exclusive Meta Andromeda AI integration", sn: true, grin: false, creatoriq: false, aspire: false, upfluence: false, bazaarvoice: false },
  { capability: "Exclusive TikTok first-party AI integration", sn: true, grin: false, creatoriq: false, aspire: false, upfluence: false, bazaarvoice: false },
  { capability: "Content in Motion™ (UGC → short-form video)", sn: true, grin: false, creatoriq: false, aspire: false, upfluence: false, bazaarvoice: false },
  { capability: "Enterprise rights management (Olapic heritage)", sn: true, grin: "partial", creatoriq: "partial", aspire: "partial", upfluence: "partial", bazaarvoice: true },
  { capability: "Predictive content performance scoring", sn: true, grin: false, creatoriq: "partial", aspire: false, upfluence: false, bazaarvoice: false },
  { capability: "Creator payments managed by platform", sn: true, grin: true, creatoriq: true, aspire: true, upfluence: "partial", bazaarvoice: false },
  { capability: "Global creator network (millions of creators)", sn: true, grin: true, creatoriq: true, aspire: "partial", upfluence: true, bazaarvoice: false },
  { capability: "Shoppable UGC for e-commerce", sn: true, grin: "partial", creatoriq: "partial", aspire: "partial", upfluence: "partial", bazaarvoice: true },
  { capability: "No internal team required to operate", sn: true, grin: false, creatoriq: false, aspire: false, upfluence: false, bazaarvoice: "partial" },
];

const headToHead: Record<string, { choose_sn: string; choose_them: string; summary: string }> = {
  GRIN: {
    summary: "GRIN is a self-serve influencer marketing platform built for brands that want to manage creator relationships in-house. It offers a strong creator CRM, campaign management tools, and e-commerce integrations — but requires a dedicated internal team to operate effectively.",
    choose_sn: "You want to outsource your entire creator program and leverage exclusive Meta Andromeda & TikTok AI.",
    choose_them: "You have a dedicated in-house creator team and want full control over every relationship.",
  },
  CreatorIQ: {
    summary: "CreatorIQ is an enterprise creator intelligence platform with strong analytics and measurement capabilities. It's best suited for brands with sophisticated in-house teams who need data and workflow tools.",
    choose_sn: "You need a fully managed program with exclusive AI integrations, not just better analytics.",
    choose_them: "You have a large in-house creator team and need enterprise-grade measurement and reporting tools.",
  },
  Aspire: {
    summary: "Aspire (formerly AspireIQ) is a creator marketplace and management platform focused on e-commerce brands. It offers product seeding, gifting, and affiliate capabilities alongside campaign management.",
    choose_sn: "You need enterprise-scale managed services, exclusive AI integrations, and rights-cleared content for paid media.",
    choose_them: "You're a DTC e-commerce brand focused primarily on product gifting and affiliate creator programs.",
  },
  Upfluence: {
    summary: "Upfluence is a creator search and outreach platform with strong influencer discovery and e-commerce integrations. It's primarily a self-serve tool requiring significant in-house management.",
    choose_sn: "You want a fully managed program with exclusive Meta and TikTok AI, not just a better search tool.",
    choose_them: "You have an in-house team and primarily need creator discovery and outreach tooling.",
  },
  Bazaarvoice: {
    summary: "Bazaarvoice is a ratings, reviews, and UGC platform with strong e-commerce integrations. Its creator capabilities are focused on product reviews and sampling rather than full creator program management.",
    choose_sn: "You need a comprehensive creator program beyond reviews — including video content, paid media activation, and exclusive AI integrations.",
    choose_them: "Your primary need is product reviews, ratings, and sampling programs for e-commerce.",
  },
};

function Cell({ value }: { value: boolean | "partial" }) {
  if (value === true) return <span className="text-[#7c3aed] text-lg font-bold">✓</span>;
  if (value === "partial") return <span className="text-[#8b5cf6] text-base opacity-50">◑</span>;
  return <span className="text-gray-300 text-lg">✗</span>;
}

export default function VsCompetitors() {
  const [demoOpen, setDemoOpen] = useState(false);
  const [activeComp, setActiveComp] = useState("GRIN");

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <DemoModal isOpen={demoOpen} onClose={() => setDemoOpen(false)} />

      {/* Hero */}
      <section className="pt-32 pb-20 bg-gradient-to-br from-[#f5f3ff] via-white to-white">
        <div className="container text-center">
          <div className="inline-block text-[#7c3aed] text-xs font-semibold uppercase tracking-widest mb-4">Honest Comparison</div>
          <h1 className="font-display font-extrabold text-[#222222] text-5xl md:text-6xl leading-tight mb-6">
            Social Native vs.{" "}
            <span className="text-[#7c3aed]">the Alternatives</span>
          </h1>
          <p className="text-[#717171] text-xl max-w-2xl mx-auto leading-relaxed">
            A fair, factual comparison. Social Native is not the right fit for every brand — and we'll tell you that. But if you're running an enterprise creator program, here's how we compare.
          </p>
        </div>
      </section>

      {/* Feature comparison table */}
      <section className="bg-[#f5f3ff] border-y border-[#e9d5ff] py-16">
        <div className="container">
          <div className="inline-block text-[#7c3aed] text-xs font-semibold uppercase tracking-widest mb-3">Feature Comparison</div>
          <h2 className="font-display font-extrabold text-[#222222] text-3xl mb-3">How Social Native stacks up</h2>
          <p className="text-[#AAAAAA] text-xs mb-8">✓ = Full capability · ◑ = Partial / add-on · ✗ = Not available</p>

          <div className="bg-white rounded-3xl shadow-sm border border-[#e9d5ff] overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="text-left py-4 px-6 text-xs text-[#717171] uppercase tracking-wider min-w-[220px]">Capability</th>
                  <th className="text-center py-4 px-4 text-xs text-[#7c3aed] uppercase tracking-wider bg-[#7c3aed]/5 font-semibold">Social Native</th>
                  {competitors.map((c) => (
                    <th key={c} className="text-center py-4 px-4 text-xs text-[#717171] uppercase tracking-wider">{c}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {comparisonData.map((row, i) => (
                  <tr key={i} className="hover:bg-gray-50/50 transition-colors">
                    <td className="py-3.5 px-6 text-[#484848] text-sm">{row.capability}</td>
                    <td className="py-3.5 px-4 text-center bg-[#7c3aed]/5"><Cell value={row.sn} /></td>
                    <td className="py-3.5 px-4 text-center"><Cell value={row.grin as boolean | "partial"} /></td>
                    <td className="py-3.5 px-4 text-center"><Cell value={row.creatoriq as boolean | "partial"} /></td>
                    <td className="py-3.5 px-4 text-center"><Cell value={row.aspire as boolean | "partial"} /></td>
                    <td className="py-3.5 px-4 text-center"><Cell value={row.upfluence as boolean | "partial"} /></td>
                    <td className="py-3.5 px-4 text-center"><Cell value={row.bazaarvoice as boolean | "partial"} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Head to head */}
      <section className="bg-white py-16">
        <div className="container">
          <div className="inline-block text-[#7c3aed] text-xs font-semibold uppercase tracking-widest mb-3">Head-to-Head</div>
          <h2 className="font-display font-extrabold text-[#222222] text-3xl mb-8">Social Native vs. each alternative</h2>

          {/* Tab switcher */}
          <div className="flex flex-wrap gap-2 mb-8">
            {competitors.map((c) => (
              <button
                key={c}
                onClick={() => setActiveComp(c)}
                className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all ${
                  activeComp === c
                    ? "bg-[#7c3aed] text-white"
                    : "bg-gray-100 text-[#717171] hover:bg-purple-50 hover:text-[#7c3aed]"
                }`}
              >
                vs. {c}
              </button>
            ))}
          </div>

          {headToHead[activeComp] && (
            <div className="bg-white border border-gray-100 rounded-3xl p-8 shadow-sm">
              <h3 className="font-display font-extrabold text-[#222222] text-2xl mb-4">
                Social Native vs. {activeComp}
              </h3>
              <p className="text-[#717171] text-base leading-relaxed mb-8">{headToHead[activeComp].summary}</p>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-[#7c3aed]/5 border border-[#7c3aed]/15 rounded-2xl p-6">
                  <div className="font-display font-bold text-[#7c3aed] text-base mb-3">Choose Social Native if:</div>
                  <p className="text-[#484848] text-sm leading-relaxed">{headToHead[activeComp].choose_sn}</p>
                </div>
                <div className="bg-gray-50 border border-gray-100 rounded-2xl p-6">
                  <div className="font-display font-bold text-[#717171] text-base mb-3">Choose {activeComp} if:</div>
                  <p className="text-[#717171] text-sm leading-relaxed">{headToHead[activeComp].choose_them}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Real cost comparison */}
      <section className="bg-[#f5f3ff] py-16">
        <div className="container max-w-3xl">
          <div className="inline-block text-[#7c3aed] text-xs font-semibold uppercase tracking-widest mb-3">Total Cost of Ownership</div>
          <h2 className="font-display font-extrabold text-[#222222] text-3xl mb-2">The real cost comparison</h2>
          <p className="text-[#717171] text-base mb-8">Self-serve platform pricing looks lower — until you add the cost of the team required to operate it.</p>

          <div className="bg-white rounded-3xl p-6 shadow-sm border border-[#e9d5ff] overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="text-left py-3 text-xs text-[#717171] uppercase tracking-wider">Cost Component</th>
                  <th className="text-right py-3 text-xs text-[#717171] uppercase tracking-wider">Self-Serve Platform</th>
                  <th className="text-right py-3 text-xs text-[#7c3aed] uppercase tracking-wider">Social Native (Managed)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {[
                  ["Platform / software fee", "$10,000–$20,000/yr", "From $50,000/yr"],
                  ["Creator manager (headcount)", "$70,000–$100,000/yr", "$0 — Included"],
                  ["Rights management / legal", "$5,000–$15,000/yr", "$0 — Included"],
                  ["Creator payments processing", "$3,000–$8,000/yr", "$0 — Included"],
                  ["Short-form video production", "$20,000–$50,000/yr", "$0 — Content in Motion™"],
                ].map(([comp, self, sn], i) => (
                  <tr key={i}>
                    <td className="py-3 text-[#484848]">{comp}</td>
                    <td className="py-3 text-right text-[#717171]">{self}</td>
                    <td className="py-3 text-right text-[#7c3aed] font-semibold">{sn}</td>
                  </tr>
                ))}
                <tr className="bg-[#f5f3ff]">
                  <td className="py-3 font-display font-bold text-[#222222] rounded-l-xl pl-3">Estimated total annual cost</td>
                  <td className="py-3 text-right font-display font-bold text-[#222222]">$108,000–$193,000/yr</td>
                  <td className="py-3 text-right font-display font-bold text-[#7c3aed] rounded-r-xl pr-3">From $50,000/yr</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-[#AAAAAA] text-xs mt-4 text-center">Estimates based on typical mid-market brand program. Actual costs vary by program scope, team size, and content volume.</p>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-r from-[#3b82f6] to-[#7c3aed] py-20">
        <div className="container text-center">
          <h2 className="font-display font-extrabold text-white text-3xl md:text-4xl mb-4">Still deciding? Let's make it easy.</h2>
          <p className="text-white/80 text-base mb-8 max-w-lg mx-auto">
            Request a demo and we'll walk you through exactly how Social Native compares to your current platform — or help you figure out which solution is actually the best fit.
          </p>
          <button
            onClick={() => setDemoOpen(true)}
            className="px-8 py-4 rounded-full bg-white text-[#7c3aed] font-semibold text-base transition-all duration-200 shadow-lg hover:bg-gray-50 hover:shadow-xl inline-flex items-center gap-2"
          >
            Request a Demo →
          </button>
        </div>
      </section>

      <Footer />
    </div>
  );
}
