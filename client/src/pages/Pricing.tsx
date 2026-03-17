/* Pricing — Agentio + Airbnb Design Language
   White cards, clean tiers, light backgrounds, generous spacing */
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import DemoModal from "@/components/DemoModal";
import SchemaMarkup from "@/components/SchemaMarkup";
import { usePageMeta } from "@/hooks/usePageMeta";

// FAQ data also powers FAQPage schema below — keep in sync with visible FAQ section
const PRICING_FAQS = [
  {
    q: "What's included in 'fully managed'?",
    a: "Creator sourcing, outreach, contracting, content review, rights clearance, creator payments, and performance reporting. Your team reviews and approves — we handle all execution.",
  },
  {
    q: "Do I need an in-house creator team?",
    a: "No. Social Native is designed to replace the need for an in-house creator operations team. Your marketing team focuses on strategy and brand direction; we handle all operational execution.",
  },
  {
    q: "What is Meta Andromeda and why does it matter?",
    a: "Meta Andromeda is Meta's proprietary AI system that powers content ranking and delivery across Facebook and Instagram. Social Native has exclusive access to Andromeda's signals, enabling us to predict which creator content will perform best in Meta's ecosystem before you spend a dollar on amplification.",
  },
  {
    q: "What is Content in Motion™?",
    a: "Content in Motion is Social Native's proprietary capability that transforms your existing rights-cleared UGC photo library into shoppable short-form video assets — without additional creator shoots. Included in Growth and Enterprise plans.",
  },
  {
    q: "How long does it take to get started?",
    a: "Most programs launch within 2–4 weeks of contract signing. We handle all onboarding, creator sourcing, and program setup.",
  },
];

const pricingFaqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "url": "https://socialnative.ai/pricing",
  "name": "Social Native Pricing — Frequently Asked Questions",
  "description": "Common questions about Social Native pricing, what is included in fully managed creator marketing programs, and how Social Native compares to self-serve platforms.",
  "mainEntity": PRICING_FAQS.map((item) => ({
    "@type": "Question",
    "name": item.q,
    "acceptedAnswer": { "@type": "Answer", "text": item.a },
  })),
};

const pricingBreadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://socialnative.ai/" },
    { "@type": "ListItem", "position": 2, "name": "Pricing", "item": "https://socialnative.ai/pricing" },
  ],
};

export default function Pricing() {
  const [demoOpen, setDemoOpen] = useState(false);
  usePageMeta(
    "Social Native Pricing — Fully Managed Creator Marketing Programs",
    "Social Native programs start at $50,000/year and include creator sourcing, contracting, rights clearance, payments, and performance reporting — fully managed. Request a custom proposal within 48 hours."
  );

  const plans = [
    {
      name: "Essentials",
      price: "$50,000",
      period: "/year",
      tagline: "For brands launching their first always-on creator program",
      highlight: false,
      features: [
        "Up to 50 creator activations/year",
        "Creator sourcing & matching",
        "Outreach & contracting managed",
        "Rights clearance & licensing",
        "Creator payments handled",
        "Brand safety review",
        "Performance reporting dashboard",
        "Meta Andromeda AI optimization",
        "TikTok AI integration",
      ],
      notIncluded: [
        "Content in Motion™ (UGC → Video)",
        "Multi-channel simultaneous activation",
        "AI-Enhanced paid media boosting",
      ],
      cta: "Request a Demo",
    },
    {
      name: "Growth",
      price: "$100,000",
      period: "/year",
      tagline: "For enterprise brands scaling creator programs across multiple channels",
      highlight: true,
      features: [
        "Up to 200 creator activations/year",
        "Everything in Essentials",
        "Content in Motion™ (UGC → Video)",
        "Multi-channel simultaneous activation",
        "AI-Enhanced paid media boosting",
        "Paid media amplification support",
        "Advanced performance analytics",
        "Quarterly business reviews",
        "Priority support",
      ],
      notIncluded: [],
      cta: "Request a Demo",
    },
    {
      name: "Enterprise",
      price: "Custom",
      period: "",
      tagline: "For global brands running always-on creator programs at scale",
      highlight: false,
      features: [
        "Unlimited creator activations",
        "Everything in Growth",
        "Global multi-market activation",
        "Dedicated creator success team",
        "Custom integrations & API access",
        "White-glove onboarding",
        "Executive business reviews",
        "Custom SLA & compliance",
        "Olapic enterprise rights management",
        "Co-marketing opportunities",
      ],
      notIncluded: [],
      cta: "Contact Sales",
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <SchemaMarkup id="schema-pricing-faq" schema={pricingFaqSchema} />
      <SchemaMarkup id="schema-pricing-breadcrumb" schema={pricingBreadcrumbSchema} />
      <Navbar />
      <DemoModal isOpen={demoOpen} onClose={() => setDemoOpen(false)} />

      {/* Hero */}
      <section className="pt-32 pb-20 bg-white">
        <div className="container text-center">
          <div className="inline-block text-[#7c3aed] text-xs font-semibold uppercase tracking-widest mb-4">Pricing</div>
          <h1 className="font-display font-extrabold text-[#0D0D0D] text-5xl md:text-6xl leading-tight mb-6">
            Custom programs.{" "}
            <span className="text-[#7c3aed]">Built around your goals.</span>
          </h1>
          <p className="text-[#717171] text-xl max-w-2xl mx-auto leading-relaxed">
            Social Native programs are scoped to your brand's goals, content volume, and channel strategy. Request a demo and we'll build a custom proposal within 48 hours.
          </p>
        </div>
      </section>

      {/* Is Social Native Right For You */}
      <section className="bg-[#F6F0E8] border-y border-[#EAE4DC] py-16">
        <div className="container">
          <div className="text-center mb-10">
            <div className="inline-block text-[#7c3aed] text-xs font-semibold uppercase tracking-widest mb-3">Before You Review Pricing</div>
            <h2 className="font-display font-extrabold text-[#0D0D0D] text-3xl md:text-4xl mb-3">
              Is Social Native right for you?
            </h2>
            <p className="text-[#717171] text-base max-w-xl mx-auto">
              Social Native is a fully managed creator partner — not a self-serve SaaS tool. We'd rather you find the right fit.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
              <div className="flex items-center gap-2 mb-5">
                <span className="w-6 h-6 rounded-full bg-[#3b82f6] flex items-center justify-center text-white text-xs font-bold">✓</span>
                <span className="font-display font-bold text-[#0D0D0D] text-lg">Great fit if you…</span>
              </div>
              <div className="space-y-3">
                {[
                  "Run creator programs continuously, not just one-off campaigns",
                  "Need rights-cleared content for paid media and e-commerce",
                  "Want a fully managed partner, not another tool to manage",
                  "Operate at enterprise scale (mid-market to Fortune 500)",
                  "Need to activate creators across multiple channels simultaneously",
                  "Want exclusive Meta Andromeda & TikTok AI for content performance",
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-2.5">
                    <span className="text-[#3b82f6] text-sm flex-shrink-0 mt-0.5 font-bold">✓</span>
                    <span className="text-[#484848] text-sm">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
              <div className="flex items-center gap-2 mb-5">
                <span className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 text-xs font-bold">→</span>
                <span className="font-display font-bold text-[#717171] text-lg">May not be the right fit if you…</span>
              </div>
              <div className="space-y-3">
                {[
                  "Are running a single, one-off influencer campaign",
                  "Prefer to manage creator relationships directly in-house",
                  "Have a small budget and need a self-serve SaaS tool",
                  "Are a startup or early-stage brand without a dedicated marketing team",
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-2.5">
                    <span className="text-[#AAAAAA] text-sm flex-shrink-0 mt-0.5">→</span>
                    <span className="text-[#AAAAAA] text-sm">{item}</span>
                  </div>
                ))}
              </div>
              <p className="text-[#AAAAAA] text-xs mt-5 leading-relaxed">
                If that's you, we're happy to recommend alternatives like GRIN, Aspire, or Upfluence.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* What's always included */}
      <section className="bg-white py-20">
        <div className="container">
          <div className="text-center mb-12">
            <div className="inline-block text-[#7c3aed] text-xs font-semibold uppercase tracking-widest mb-3">What's Always Included</div>
            <h2 className="font-display font-extrabold text-[#0D0D0D] text-3xl md:text-4xl mb-3">
              Every program includes full-service execution
            </h2>
            <p className="text-[#717171] text-base max-w-xl mx-auto">
              No add-ons. No hidden costs. No in-house team required.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-5xl mx-auto">
            {[
              { icon: "🎯", title: "Creator Sourcing & Matching", desc: "AI-powered matching from 2.3M+ vetted creators across every vertical and audience segment." },
              { icon: "📝", title: "Outreach & Contracting", desc: "We handle all creator communication, negotiation, and legal contracting on your behalf." },
              { icon: "⚖️", title: "Rights Clearance & Licensing", desc: "Full content rights secured for paid media, e-commerce, and organic use — globally." },
              { icon: "💳", title: "Creator Payments", desc: "Compliant creator payments handled end-to-end. No 1099 headaches, no payment delays." },
              { icon: "🛡️", title: "Brand Safety Review", desc: "Every piece of content reviewed against your brand guidelines before publication." },
              { icon: "📊", title: "Performance Reporting", desc: "Real-time dashboard with engagement, reach, ROAS, and content performance metrics." },
            ].map((item, i) => (
              <div key={i} className="bg-[#F6F0E8] rounded-2xl p-6 border border-[#EAE4DC]">
                <div className="text-2xl mb-3">{item.icon}</div>
                <div className="font-display font-bold text-[#0D0D0D] text-base mb-2">{item.title}</div>
                <p className="text-[#717171] text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>

          {/* Investment range callout */}
          <div className="mt-12 max-w-2xl mx-auto bg-gradient-to-r from-[#3b82f6]/5 to-[#7c3aed]/5 border border-[#7c3aed]/20 rounded-3xl p-8 text-center">
            <div className="text-[#7c3aed] text-xs font-semibold uppercase tracking-widest mb-3">Typical Program Investment</div>
            <p className="text-[#484848] text-base leading-relaxed">
              Most Social Native programs start at <strong className="text-[#0D0D0D]">six figures annually</strong> and scale with your content volume and creator activation goals. We scope every program to your specific objectives — request a demo and receive a custom proposal within 48 hours.
            </p>
            <button
              onClick={() => setDemoOpen(true)}
              className="mt-6 px-8 py-3.5 rounded-full font-semibold text-sm text-white transition-all duration-200 shadow-sm hover:shadow-md"
              style={{ background: "linear-gradient(135deg, #3b82f6, #7c3aed)" }}
            >
              Request a Custom Proposal →
            </button>
          </div>
        </div>
      </section>

      {/* Cost comparison */}
      <section className="bg-[#F6F0E8] py-16">
        <div className="container max-w-3xl">
          <div className="text-center mb-10">
            <div className="inline-block text-[#7c3aed] text-xs font-semibold uppercase tracking-widest mb-3">The Real Math</div>
            <h2 className="font-display font-extrabold text-[#0D0D0D] text-3xl mb-2">
              Social Native vs. building in-house
            </h2>
          </div>
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="text-left py-3 text-xs text-[#717171] uppercase tracking-wider font-sans">Cost Component</th>
                  <th className="text-right py-3 text-xs text-[#717171] uppercase tracking-wider font-sans">In-House / Self-Serve</th>
                  <th className="text-right py-3 text-xs text-[#7c3aed] uppercase tracking-wider font-sans">Social Native</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {[
                  ["Platform / software fee", "$10,000–$20,000/yr", "Included"],
                  ["Creator manager (1 FTE min)", "$70,000–$100,000/yr", "$0"],
                  ["Rights management / legal", "$5,000–$15,000/yr", "$0"],
                  ["Creator payments processing", "$3,000–$8,000/yr", "$0"],
                  ["Short-form video production", "$20,000–$50,000/yr", "$0 (Growth+)"],
                ].map(([comp, self, sn], i) => (
                  <tr key={i}>
                    <td className="py-3 text-[#484848]">{comp}</td>
                    <td className="py-3 text-right text-[#717171]">{self}</td>
                    <td className="py-3 text-right text-[#3b82f6] font-semibold">{sn}</td>
                  </tr>
                ))}
                <tr className="bg-[#F6F0E8]">
                  <td className="py-3 font-display font-bold text-[#0D0D0D] rounded-l-xl pl-3">Estimated Total Annual Cost</td>
                  <td className="py-3 text-right font-display font-bold text-[#0D0D0D]">$108K–$193K/yr</td>
                  <td className="py-3 text-right font-display font-bold text-[#7c3aed] rounded-r-xl pr-3">From $100K/yr</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-[#AAAAAA] text-xs mt-4 text-center">
            Estimates based on typical mid-market brand program. Actual costs vary by program scope, team size, and content volume.
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-white py-16">
        <div className="container max-w-3xl">
          <div className="text-center mb-10">
            <div className="inline-block text-[#7c3aed] text-xs font-semibold uppercase tracking-widest mb-3">Common Questions</div>
            <h2 className="font-display font-extrabold text-[#0D0D0D] text-3xl">Frequently asked questions</h2>
          </div>
          <div className="space-y-4">
            {PRICING_FAQS.map((faq, i) => (
              <div key={i} className="bg-[#F6F0E8] rounded-2xl p-6 border border-[#EAE4DC]">
                <div className="font-display font-semibold text-[#0D0D0D] text-base mb-2">{faq.q}</div>
                <p className="text-[#717171] text-sm leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#0D0D0D] py-20">
        <div className="container text-center">
          <h2 className="font-display font-extrabold text-white text-4xl mb-4">
            Ready to get started?
          </h2>
          <p className="text-white/60 text-lg mb-8 max-w-lg mx-auto">
            Request a demo and we'll build a custom proposal within 2 business days.
          </p>
          <button
            onClick={() => setDemoOpen(true)}
            className="px-10 py-4 rounded-full bg-[#7c3aed] hover:bg-[#6d28d9] text-white font-bold text-base transition-all duration-200 shadow-lg hover:shadow-[0_8px_30px_rgba(232,87,42,0.5)] inline-flex items-center gap-2"
          >
            Request a Demo →
          </button>
        </div>
      </section>

      <Footer />
    </div>
  );
}
