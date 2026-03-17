/* Home Page — socialnative.ai Design System
   White/light-gray backgrounds, purple accent (#7c3aed), blue-to-purple gradient CTAs
   System font stack, emoji section labels, lavender-to-white hero gradient */
import { useState, useEffect, useRef } from "react";
import { Link } from "wouter";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import DemoModal from "@/components/DemoModal";
import DataFlywheel from "@/components/DataFlywheel";
import SchemaMarkup from "@/components/SchemaMarkup";
import { usePageMeta } from "@/hooks/usePageMeta";

const HOME_FAQS = [
  {
    q: "What is Social Native?",
    a: "Social Native is a fully managed creator marketing system — not a self-serve platform. We handle every aspect of an enterprise creator programme: discovery, outreach, contracting, content curation, rights clearance, payments, and performance optimisation. Built on exclusive first-party AI integrations with Meta and TikTok and 1.8 million real-world creator collaborations.",
  },
  {
    q: "How is Social Native different from other UGC or influencer marketing platforms?",
    a: "Most UGC platforms are self-serve marketplaces. Social Native is a fully managed system — your dedicated team handles everything end-to-end. We also hold exclusive first-party AI integrations with Meta Andromeda and TikTok that no self-serve tool can access, which means better creator matching and predictive content performance scoring before a single asset is shot.",
  },
  {
    q: "What brands does Social Native work with?",
    a: "Social Native works with enterprise and mid-market brands including IKEA, Adidas, Clinique, NYX Cosmetics, Crocs, H&M, Microsoft, Walgreens, Nestlé, and 1,500+ others. We specialise in brands running always-on creator programmes at scale across Meta, TikTok, and e-commerce channels.",
  },
  {
    q: "Does Social Native handle content rights and licensing?",
    a: "Yes — rights clearance is included in every Social Native programme, not an optional add-on. Every asset is legally licensed for paid media, e-commerce, email, and out-of-home use before it is delivered to your team. Perpetual licensing is available. This is built on Olapic's enterprise rights management heritage.",
  },
  {
    q: "How much does Social Native cost?",
    a: "Social Native programmes start at $50,000/year for the Starter plan (managed creator sourcing, contracting, rights clearance, and performance reporting). Growth plans start at $75,000/year and include Content in Motion™ video production. Enterprise plans start at $100,000/year and include a dedicated team, Meta Andromeda AI optimisation, and TikTok first-party data integration.",
  },
];

const homeFaqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "url": "https://socialnative.ai/",
  "name": "Social Native — Frequently Asked Questions",
  "mainEntity": HOME_FAQS.map(({ q, a }) => ({
    "@type": "Question",
    "name": q,
    "acceptedAnswer": { "@type": "Answer", "text": a },
  })),
};

function useScrollReveal() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("visible");
        });
      },
      { threshold: 0.08 }
    );
    document.querySelectorAll(".fade-up").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
}

function useCountUp(target: number, duration = 2000, start = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    let startTime: number | null = null;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setCount(Math.floor(progress * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [target, duration, start]);
  return count;
}

function StatCounter({ value, suffix, label }: { value: number; suffix: string; label: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [started, setStarted] = useState(false);
  const count = useCountUp(value, 1800, started);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setStarted(true); },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className="text-center px-4 min-w-0">
      <div className="font-extrabold text-[#222222] text-3xl md:text-4xl leading-none mb-2 tabular-nums">
        {count.toLocaleString()}{suffix}
      </div>
      <div className="text-[#717171] text-sm leading-tight">{label}</div>
    </div>
  );
}

export default function Home() {
  const [demoOpen, setDemoOpen] = useState(false);
  useScrollReveal();
  usePageMeta(
    "Social Native — Creator Marketing System",
    "Social Native is the only creator marketing system built on exclusive first-party AI integrations with Meta and TikTok. Fully managed creator sourcing, contracting, rights clearance, and performance optimisation. Powered by 1.8M+ creator collaborations."
  );

  const brandLogos = [
    "IKEA", "Dr. Martens", "H&M", "Adidas", "Four Seasons",
    "Clinique", "Microsoft", "Walgreens", "Carhartt", "Nestlé",
    "LEGO", "Crocs", "Revlon", "NYX", "Cetaphil", "Unilever",
  ];

  return (
    <div className="min-h-screen bg-white">
      <SchemaMarkup id="schema-home-faq" schema={homeFaqSchema} />
      <Navbar />
      <DemoModal isOpen={demoOpen} onClose={() => setDemoOpen(false)} />

      {/* ── HERO ── */}
      <section
        className="relative pt-16 overflow-hidden"
        style={{
          background: "linear-gradient(160deg, rgb(248, 246, 255) 0%, rgb(240, 247, 255) 40%, rgb(255, 255, 255) 80%)"
        }}
      >
        <div className="container py-24 md:py-32">
          <div className="max-w-4xl mx-auto text-center">
            {/* Announcement pill */}
            <div className="announce-pill mb-8 mx-auto w-fit">
              <span className="text-base">⚡</span>
              Exclusive 1st Party Data — Meta, TikTok &amp; 1.8M+ Creator Collaborations
            </div>

            <h1
              className="font-extrabold text-[#222222] leading-[1.08] mb-6 tracking-tight"
              style={{ fontSize: "clamp(2.5rem, 6vw, 4.75rem)" }}
            >
              The Only Creator Marketing System Built on{" "}
              <span style={{ color: "#7c3aed" }}>Exclusive 1st Party Data</span>
            </h1>

            <p className="text-[#717171] text-lg md:text-xl max-w-2xl mx-auto leading-relaxed mb-3">
              Not a platform your team manages. A creator program we run for you — powered by a data advantage no competitor can replicate.
            </p>
            <p className="text-[#aaaaaa] text-sm max-w-xl mx-auto leading-relaxed mb-10">
              Social Native combines exclusive Meta &amp; TikTok AI signals with 1.8M+ creator collaboration outcomes, paid media performance data, and e-commerce sales data — so every creative decision is backed by the most comprehensive first-party dataset in creator marketing.
            </p>

            <div className="flex flex-wrap gap-4 justify-center mb-8">
              <button
                onClick={() => setDemoOpen(true)}
                className="btn-gradient text-base px-8 py-4"
              >
                Request a Demo
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 5l4 3-4 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </button>
              <Link
                href="/how-it-works"
                onClick={() => window.scrollTo({ top: 0, behavior: 'instant' })}
                className="btn-outline-dark text-base px-8 py-4"
              >
                See How It Works
              </Link>
            </div>

            <div className="flex flex-wrap gap-3 justify-center">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-[#e8e8e8] text-[#717171] text-xs font-medium bg-white">
                📘 Meta Certified Partner
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-[#e8e8e8] text-[#717171] text-xs font-medium bg-white">
                🎵 TikTok Marketing Partner
              </span>
            </div>
          </div>
        </div>

        {/* Bottom fade to white */}
        <div className="h-16 bg-gradient-to-b from-transparent to-white" />
      </section>

      {/* ── STATS BAR ── */}
      <section className="bg-white border-b border-[#e8e8e8] py-16">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-14">
            {[
              { value: 1800000, suffix: "+", label: "Unique Creator Collaborations" },
              { value: 1500, suffix: "+", label: "Enterprise Brands" },
              { value: 2300000, suffix: "+", label: "Creators in Global Network" },
              { value: 12000000, suffix: "+", label: "Branded Content Pieces" },
            ].map((s, i) => (
              <StatCounter key={i} value={s.value} suffix={s.suffix} label={s.label} />
            ))}
          </div>

          {/* Animated logo marquee */}
          <div className="border-t border-[#e8e8e8] pt-10">
            <p className="text-[#aaaaaa] text-xs text-center mb-6 uppercase tracking-widest">
              Trusted by 1,500+ enterprise brands including
            </p>
            <div className="relative overflow-hidden">
              <div className="flex gap-12 animate-marquee whitespace-nowrap">
                {[...brandLogos, ...brandLogos].map((name, i) => (
                  <span
                    key={i}
                    className="font-bold text-[#cccccc] text-sm tracking-wide hover:text-[#7c3aed] transition-colors cursor-default flex-shrink-0"
                  >
                    {name}
                  </span>
                ))}
              </div>
              <div className="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-white to-transparent pointer-events-none" />
              <div className="absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-white to-transparent pointer-events-none" />
            </div>
          </div>
        </div>
      </section>

      {/* ── WHAT MAKES US DIFFERENT ── */}
      <section className="bg-white py-28">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center mb-16 fade-up">
            <div className="section-label mb-4">⚡ What Makes Us Different</div>
            <h2 className="font-extrabold text-[#222222] text-4xl md:text-5xl leading-tight mb-5">
              Not a tool your team manages.{" "}
              <span style={{ color: "#7c3aed" }}>A creator program we run for you.</span>
            </h2>
            <p className="text-[#717171] text-lg leading-relaxed">
              Most platforms give you software and leave you to figure out the rest. Social Native is a fully managed creator partner — we handle discovery, outreach, rights clearance, content curation, payments, and performance optimization.
            </p>
          </div>

          <div className="grid md:grid-cols-5 gap-4 mb-12">
            {[
              { icon: "🔍", label: "Creator Discovery & Matching", desc: "AI-powered matching from 1.8M+ collaboration data points" },
              { icon: "📋", label: "Outreach & Contracting", desc: "Personalized creator communication and contract management at scale" },
              { icon: "⚖️", label: "Rights Clearance & Licensing", desc: "Industry-standard legal compliance, always included" },
              { icon: "✂️", label: "Content Curation & QA", desc: "AI-scored for brand fit and performance potential" },
              { icon: "💳", label: "Creator Payments", desc: "Global payments, tax docs, and compliance — fully handled" },
            ].map((item, i) => (
              <div
                key={i}
                className="fade-up bg-white border border-[#e8e8e8] rounded-2xl p-6 hover:shadow-md transition-all duration-300"
                style={{ transitionDelay: `${i * 60}ms` }}
              >
                <div className="text-2xl mb-4">{item.icon}</div>
                <div className="font-semibold text-[#222222] text-sm mb-2 leading-snug">{item.label}</div>
                <div className="text-[#717171] text-xs leading-relaxed mb-4">{item.desc}</div>
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-semibold">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block" />
                  Automated
                </div>
              </div>
            ))}
          </div>

          {/* Impact callout */}
          <div className="fade-up bg-[#f7f7f7] rounded-3xl p-8 md:p-10 border border-[#e8e8e8]">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="flex-1">
                <div className="section-label mb-3">📊 The Result</div>
                <h3 className="font-bold text-[#222222] text-2xl md:text-3xl mb-3">
                  Brands using Social Native eliminate{" "}
                  <span style={{ color: "#7c3aed" }}>90%</span> of manual creator ops — freeing teams to focus on strategy, not logistics.
                </h3>
                <p className="text-[#717171] text-base leading-relaxed">
                  Every hour spent on creator admin is an hour not spent on growth. Social Native automates the entire operational layer — from first outreach to final payment — so your team ships more campaigns, faster.
                </p>
              </div>
              <div className="flex-shrink-0 grid grid-cols-2 gap-4">
                <div className="bg-white rounded-2xl p-5 text-center border border-[#e8e8e8]">
                  <div className="font-extrabold text-[#222222] text-3xl mb-1" style={{ color: "#7c3aed" }}>3x</div>
                  <div className="text-[#717171] text-xs">Faster Content Activation</div>
                </div>
                <div className="bg-white rounded-2xl p-5 text-center border border-[#e8e8e8]">
                  <div className="font-extrabold text-3xl mb-1" style={{ color: "#7c3aed" }}>40%</div>
                  <div className="text-[#717171] text-xs">Lower CPA</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── META ANDROMEDA + TIKTOK AI ── */}
      <section className="bg-[#f7f7f7] py-28">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center mb-16 fade-up">
            <div className="section-label mb-4">🔗 Exclusive Platform Integrations</div>
            <h2 className="font-extrabold text-[#222222] text-4xl md:text-5xl leading-tight mb-5">
              The only creator marketing partner that{" "}
              <span style={{ color: "#7c3aed" }}>Meta and TikTok trust</span>{" "}
              with exclusive 1st party AI access
            </h2>
            <p className="text-[#717171] text-lg leading-relaxed mb-4">
              No other platform in the market has this. Our exclusive integrations give your brand access to predictive performance data and creative optimization signals that are simply unavailable elsewhere.
            </p>
            <div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-white text-xs font-semibold"
              style={{ background: "linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)" }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-white/60 inline-block" />
              No other creator marketing platform has these integrations
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Meta Andromeda */}
            <div className="fade-up bg-white rounded-3xl p-8 shadow-sm hover:shadow-md transition-all duration-300 border border-[#e8e8e8]">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center text-2xl">📘</div>
                <div>
                  <div className="text-[#717171] text-xs uppercase tracking-wider font-medium">Meta Certified Partner</div>
                  <div className="font-bold text-[#222222] text-lg">Meta Andromeda AI</div>
                </div>
              </div>
              <p className="text-[#717171] text-sm leading-relaxed mb-6">
                Social Native has exclusive access to <strong className="text-[#222222]">Meta's Andromeda AI system</strong> — Meta's proprietary content recommendation and performance prediction engine. Andromeda powers the ranking and delivery of content across Facebook and Instagram.
              </p>
              <div className="space-y-3 mb-6">
                {[
                  "Predictive content performance scoring before you spend a dollar",
                  "Direct integration with Meta Ads for seamless activation",
                  "First-party audience data for precision creator matching",
                  "Andromeda-informed creative optimization signals",
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-2.5">
                    <span
                      className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                      style={{ background: "rgba(124,58,237,0.1)" }}
                    >
                      <span className="text-xs font-bold" style={{ color: "#7c3aed" }}>✓</span>
                    </span>
                    <span className="text-[#484848] text-sm">{item}</span>
                  </div>
                ))}
              </div>
              <div className="p-4 bg-blue-50 rounded-2xl border border-blue-100">
                <div className="text-blue-600 text-xs font-semibold uppercase tracking-wider mb-1">Why Andromeda Matters</div>
                <p className="text-[#717171] text-xs leading-relaxed">
                  Andromeda processes billions of signals to determine which content gets shown to which users. By integrating directly with Andromeda, Social Native can predict — before a campaign launches — which creator content will perform best in Meta's ecosystem.
                </p>
              </div>
            </div>

            {/* TikTok */}
            <div className="fade-up bg-white rounded-3xl p-8 shadow-sm hover:shadow-md transition-all duration-300 border border-[#e8e8e8]" style={{ transitionDelay: "100ms" }}>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-2xl bg-pink-50 border border-pink-100 flex items-center justify-center text-2xl">🎵</div>
                <div>
                  <div className="text-[#717171] text-xs uppercase tracking-wider font-medium">TikTok Marketing Partner</div>
                  <div className="font-bold text-[#222222] text-lg">TikTok First-Party AI</div>
                </div>
              </div>
              <p className="text-[#717171] text-sm leading-relaxed mb-6">
                As an official TikTok Marketing Partner, Social Native has exclusive access to TikTok's first-party AI signals — enabling trend prediction, creator performance forecasting, and native content optimization that no self-serve platform can replicate.
              </p>
              <div className="space-y-3 mb-6">
                {[
                  "Trend prediction before content goes viral",
                  "Native TikTok creator network access",
                  "TikTok One Day Max format optimization",
                  "First-party performance data unavailable to self-serve platforms",
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-2.5">
                    <span
                      className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                      style={{ background: "rgba(124,58,237,0.1)" }}
                    >
                      <span className="text-xs font-bold" style={{ color: "#7c3aed" }}>✓</span>
                    </span>
                    <span className="text-[#484848] text-sm">{item}</span>
                  </div>
                ))}
              </div>
              <div className="p-4 bg-pink-50 rounded-2xl border border-pink-100">
                <div className="text-pink-600 text-xs font-semibold uppercase tracking-wider mb-1">Why First-Party TikTok Data Matters</div>
                <p className="text-[#717171] text-xs leading-relaxed">
                  TikTok's first-party AI signals give Social Native access to real-time trend data, creator performance forecasts, and native algorithm optimization — insights that no self-serve platform can replicate.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 1ST PARTY DATA ADVANTAGE ── */}
      <section className="bg-[#111111] py-28">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center mb-16 fade-up">
            <div className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: "#8b5cf6" }}>📊 The Data Advantage</div>
            <h2 className="font-extrabold text-white text-4xl md:text-5xl leading-tight mb-5">
              Three data streams no competitor{" "}
              <span className="text-gradient">can replicate</span>
            </h2>
            <p className="text-white/60 text-lg leading-relaxed">
              Most creator platforms have creator data. Social Native has creator data <em>plus</em> the platform-level AI signals from Meta and TikTok <em>plus</em> 1.8M+ real-world collaboration outcomes. That combination is what makes every decision smarter.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {/* Card 01 */}
            <div className="fade-up rounded-3xl p-8 border border-blue-500/20 bg-blue-500/5 hover:border-blue-500/40 transition-all duration-300 flex flex-col">
              <div className="flex items-center gap-3 mb-5">
                <span className="text-xs font-bold text-blue-400 opacity-50 tabular-nums">01</span>
                <span className="text-2xl">📘</span>
              </div>
              <h3 className="font-bold text-white text-lg mb-3 leading-snug">Meta & TikTok 1st Party AI</h3>
              <p className="text-white/50 text-sm leading-relaxed mb-6">
                Exclusive access to Meta Andromeda's predictive scoring and TikTok's trend forecasting — real-time signals from the two largest social platforms on earth. No other creator marketing platform has this.
              </p>
              <div className="mt-auto grid grid-cols-2 gap-3">
                <div className="bg-white/5 border border-blue-500/15 rounded-2xl p-3 text-center">
                  <div className="font-extrabold text-blue-400 text-xl mb-0.5">2B+</div>
                  <div className="text-white/40 text-xs leading-tight">Signals processed by Andromeda daily</div>
                </div>
                <div className="bg-white/5 border border-blue-500/15 rounded-2xl p-3 text-center">
                  <div className="font-extrabold text-blue-400 text-xl mb-0.5">3.4B+</div>
                  <div className="text-white/40 text-xs leading-tight">Monthly active users reached via TikTok AI</div>
                </div>
                <div className="col-span-2 bg-white/5 border border-blue-500/15 rounded-2xl p-3 text-center">
                  <div className="font-extrabold text-blue-400 text-xl mb-0.5">Pre-launch</div>
                  <div className="text-white/40 text-xs leading-tight">Content performance predicted before a dollar is spent</div>
                </div>
              </div>
            </div>

            {/* Card 02 */}
            <div className="fade-up rounded-3xl p-8 border border-purple-500/20 bg-purple-500/5 hover:border-purple-500/40 transition-all duration-300 flex flex-col" style={{ transitionDelay: "80ms" }}>
              <div className="flex items-center gap-3 mb-5">
                <span className="text-xs font-bold text-purple-400 opacity-50 tabular-nums">02</span>
                <span className="text-2xl">🤝</span>
              </div>
              <h3 className="font-bold text-white text-lg mb-3 leading-snug">1.8M+ Creator Collaboration Outcomes</h3>
              <p className="text-white/50 text-sm leading-relaxed mb-6">
                Every campaign Social Native has ever run feeds back into our matching and performance models. We know which creator types, content formats, and brief structures drive results — by category, platform, and objective.
              </p>
              <div className="mt-auto grid grid-cols-2 gap-3">
                <div className="bg-white/5 border border-purple-500/15 rounded-2xl p-3 text-center">
                  <div className="font-extrabold text-purple-400 text-xl mb-0.5">1.8M+</div>
                  <div className="text-white/40 text-xs leading-tight">Unique creator collaborations logged</div>
                </div>
                <div className="bg-white/5 border border-purple-500/15 rounded-2xl p-3 text-center">
                  <div className="font-extrabold text-purple-400 text-xl mb-0.5">40+</div>
                  <div className="text-white/40 text-xs leading-tight">Verticals with category-specific benchmarks</div>
                </div>
                <div className="col-span-2 bg-white/5 border border-purple-500/15 rounded-2xl p-3 text-center">
                  <div className="font-extrabold text-purple-400 text-xl mb-0.5">12M+</div>
                  <div className="text-white/40 text-xs leading-tight">Branded content pieces analyzed for performance patterns</div>
                </div>
              </div>
            </div>

            {/* Card 03 */}
            <div className="fade-up rounded-3xl p-8 border border-violet-500/20 bg-violet-500/5 hover:border-violet-500/40 transition-all duration-300 flex flex-col" style={{ transitionDelay: "160ms" }}>
              <div className="flex items-center gap-3 mb-5">
                <span className="text-xs font-bold text-violet-400 opacity-50 tabular-nums">03</span>
                <span className="text-2xl">📊</span>
              </div>
              <h3 className="font-bold text-white text-lg mb-3 leading-snug">Paid Media & E-Commerce Sales Data</h3>
              <p className="text-white/50 text-sm leading-relaxed mb-6">
                Social Native tracks content performance beyond engagement — into paid media ROAS, e-commerce conversion rates, and downstream sales. We optimize for business outcomes, not vanity metrics.
              </p>
              <div className="mt-auto grid grid-cols-2 gap-3">
                <div className="bg-white/5 border border-violet-500/15 rounded-2xl p-3 text-center">
                  <div className="font-extrabold text-violet-400 text-xl mb-0.5">$500M+</div>
                  <div className="text-white/40 text-xs leading-tight">In e-commerce sales tracked and attributed</div>
                </div>
                <div className="bg-white/5 border border-violet-500/15 rounded-2xl p-3 text-center">
                  <div className="font-extrabold text-violet-400 text-xl mb-0.5">40%</div>
                  <div className="text-white/40 text-xs leading-tight">Average CPA reduction vs. brand-produced content</div>
                </div>
                <div className="col-span-2 bg-white/5 border border-violet-500/15 rounded-2xl p-3 text-center">
                  <div className="font-extrabold text-violet-400 text-xl mb-0.5">ROAS-first</div>
                  <div className="text-white/40 text-xs leading-tight">Every content decision tied to paid media return on ad spend</div>
                </div>
              </div>
            </div>
          </div>

          {/* Data flywheel */}
          <div className="fade-up bg-white/5 border border-white/10 rounded-3xl overflow-hidden">
            <div className="grid md:grid-cols-2 gap-0">
              <div className="p-8 md:p-12 flex flex-col justify-center">
                <div className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: "#8b5cf6" }}>🔄 The Flywheel Effect</div>
                <h3 className="font-bold text-white text-2xl md:text-3xl leading-snug mb-4">
                  Every campaign makes the next one smarter.
                </h3>
                <p className="text-white/50 text-sm leading-relaxed mb-8">
                  As Social Native runs more campaigns, our 1st party dataset grows — improving creator matching accuracy, content performance predictions, and paid media optimization for every brand on the platform.
                </p>
                <div className="grid grid-cols-1 gap-3">
                  {[
                    { value: "23%", label: "Avg. improvement in creator match quality year-over-year", color: "#8b5cf6" },
                    { value: "2x",  label: "Faster campaign setup time vs. 3 years ago", color: "#3b82f6" },
                    { value: "1,500+", label: "Brands contributing to the shared performance dataset", color: "#a78bfa" },
                  ].map((s, i) => (
                    <div key={i} className="flex items-center gap-4 bg-white/5 border border-white/10 rounded-2xl px-5 py-3">
                      <div className="font-extrabold text-2xl min-w-[60px]" style={{ color: s.color }}>{s.value}</div>
                      <div className="text-white/40 text-xs leading-tight">{s.label}</div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex items-center justify-center p-8 md:p-12 border-t md:border-t-0 md:border-l border-white/10">
                <DataFlywheel />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CONTENT IN MOTION ── */}
      <section className="bg-white py-28">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="fade-up">
              <div className="section-label mb-4">🎬 Content in Motion™</div>
              <h2 className="font-extrabold text-[#222222] text-4xl md:text-5xl leading-tight mb-5">
                Turn your UGC photo library into shoppable video{" "}
                <span style={{ color: "#7c3aed" }}>automatically</span>
              </h2>
              <p className="text-[#717171] text-lg leading-relaxed mb-8">
                Content in Motion is Social Native's proprietary capability that transforms static UGC images into engaging, shoppable short-form videos optimized for TikTok, Instagram Reels, and paid social — without any additional creator shoots.
              </p>
              <div className="space-y-4 mb-10">
                {[
                  "Existing UGC photos transformed into video assets in 48 hours",
                  "Shoppable product tags embedded automatically",
                  "Performance-scored before distribution using Meta Andromeda & TikTok AI",
                  "Every format rendered: 9:16, 1:1, 16:9 simultaneously",
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <span
                      className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                      style={{ background: "linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)" }}
                    >
                      <span className="text-white text-xs font-bold">✓</span>
                    </span>
                    <span className="text-[#484848] text-base">{item}</span>
                  </div>
                ))}
              </div>
              <Link
                href="/how-it-works"
                onClick={() => window.scrollTo({ top: 0, behavior: 'instant' })}
                className="btn-gradient text-sm"
              >
                Explore Content in Motion™
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M2.5 7h9M8 4l3.5 3L8 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </Link>
            </div>

            <div className="fade-up" style={{ transitionDelay: "100ms" }}>
              <div className="bg-[#111111] rounded-3xl p-8 shadow-xl">
                <div className="text-white/40 text-xs font-medium uppercase tracking-widest mb-6">The Transformation Pipeline</div>
                <div className="space-y-3">
                  {[
                    { step: "01", label: "Input", desc: "Rights-cleared UGC photo library ingested", color: "#8b5cf6" },
                    { step: "02", label: "AI Analysis", desc: "Meta Andromeda + TikTok AI score each asset for performance potential", color: "#3b82f6" },
                    { step: "03", label: "Rendering", desc: "Motion effects, shoppable tags, brand overlays applied", color: "#8b5cf6" },
                    { step: "04", label: "Output", desc: "Shoppable video in 9:16, 1:1, 16:9 — ready in 48 hours", color: "#a78bfa" },
                  ].map((item, i) => (
                    <div key={i} className="flex gap-4 p-4 bg-white/5 rounded-2xl hover:bg-white/8 transition-colors">
                      <div className="step-badge flex-shrink-0">{item.step}</div>
                      <div>
                        <div className="font-semibold text-sm mb-1" style={{ color: item.color }}>{item.label}</div>
                        <div className="text-white/40 text-xs leading-relaxed">{item.desc}</div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-5 p-4 rounded-2xl border" style={{ background: "rgba(139,92,246,0.1)", borderColor: "rgba(139,92,246,0.2)" }}>
                  <div className="text-xs font-semibold" style={{ color: "#a78bfa" }}>✦ No additional creator shoots required.</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIAL / SOCIAL PROOF ── */}
      <section className="bg-[#f7f7f7] py-28">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center fade-up">
            <div className="text-4xl mb-6" style={{ color: "#7c3aed" }}>"</div>
            <blockquote className="font-bold text-[#222222] text-2xl md:text-3xl leading-snug mb-8">
              We were struggling to reach truly net-new, high-intent audiences. Social Native's creator program delivered a{" "}
              <span style={{ color: "#7c3aed" }}>59.7% reduction in CPA</span> in the first 90 days.
            </blockquote>
            <div className="flex items-center justify-center gap-3 mb-12">
              <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: "rgba(124,58,237,0.1)" }}>
                <span className="font-bold text-sm" style={{ color: "#7c3aed" }}>V</span>
              </div>
              <div className="text-left">
                <div className="font-semibold text-[#222222] text-sm">Performance Marketing Team</div>
                <div className="text-[#717171] text-xs">Viator — Travel & Hospitality</div>
              </div>
            </div>
            {/* Stats row */}
            <div className="grid grid-cols-3 gap-6 border-t border-[#e8e8e8] pt-10">
              {[
                { value: "59.7%", label: "Reduction in CPA", brand: "Viator" },
                { value: "320%", label: "Lift in Conversion", brand: "NYX Cosmetics" },
                { value: "21.5%", label: "Avg. Engagement Rate", brand: "Crocs" },
              ].map((s, i) => (
                <div key={i} className="text-center">
                  <div className="font-extrabold text-3xl mb-1" style={{ color: "#7c3aed" }}>{s.value}</div>
                  <div className="text-[#717171] text-xs mb-1">{s.label}</div>
                  <div className="text-[#aaaaaa] text-xs font-medium">{s.brand}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── PROVEN RESULTS ── */}
      <section className="bg-white py-28">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center mb-16 fade-up">
            <div className="section-label mb-4">🏆 Proven Results</div>
            <h2 className="font-extrabold text-[#222222] text-4xl md:text-5xl leading-tight mb-4">
              Real outcomes from real brands
            </h2>
            <p className="text-[#717171] text-lg">Not just brand names — specific results, specific timeframes.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                brand: "Viator",
                category: "Travel & Hospitality",
                headline: "Viator Cuts CPA by Nearly 60% Using Creator Content in Instagram Branded Content Ads",
                stats: [{ value: "59.7%", label: "Reduction in CPA" }, { value: "36.9%", label: "Lower CPM" }],
                desc: "Viator partnered with Social Native to activate a branded content test using real creator experiences on Instagram. The most engaging assets were amplified through branded content ads to maximize impact.",
                badgeBg: "bg-blue-50 border-blue-100",
                badgeText: "text-blue-600",
                statColor: "#3b82f6",
              },
              {
                brand: "NYX Cosmetics",
                category: "Beauty",
                headline: "NYX Reels It In: Driving Engagement with Quick-Hit Beauty Tutorials",
                stats: [{ value: "320%", label: "Lift in Conversion" }, { value: "4x", label: "Engagement Rate vs. Benchmark" }],
                desc: "NYX activated a diverse lineup of creators to produce authentic IG Reels tutorials for the Born To Glow Concealer, driving direct conversions via Instagram storefront.",
                badgeBg: "bg-pink-50 border-pink-100",
                badgeText: "text-pink-600",
                statColor: "#ec4899",
              },
              {
                brand: "Crocs",
                category: "Fashion",
                headline: "Crocs Captivates Gen Z Through Bold Social Media Engagement",
                stats: [{ value: "21.5%", label: "Avg. Engagement Rate" }, { value: "3.7M", label: "Audience Reach" }],
                desc: "By empowering real Crocs fans to create branded content, they appealed to digitally native consumers through authentic storytelling — activating 600+ creators across 50+ campaigns.",
                badgeBg: "bg-violet-50 border-violet-100",
                badgeText: "text-violet-600",
                statColor: "#7c3aed",
              },
            ].map((cs, i) => (
              <div
                key={i}
                className="fade-up bg-white border border-[#e8e8e8] rounded-3xl overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                <div className={`px-6 py-4 border-b ${cs.badgeBg}`}>
                  <div className="font-bold text-[#222222] text-base">{cs.brand}</div>
                  <div className={`text-xs font-semibold uppercase tracking-wider ${cs.badgeText}`}>{cs.category}</div>
                </div>
                <div className="p-6">
                  <h3 className="font-semibold text-[#222222] text-sm leading-snug mb-3">{cs.headline}</h3>
                  <p className="text-[#717171] text-sm leading-relaxed mb-5">{cs.desc}</p>
                  <div className="grid grid-cols-2 gap-3">
                    {cs.stats.map((s, j) => (
                      <div key={j} className="bg-[#f7f7f7] rounded-2xl p-3 text-center border border-[#e8e8e8]">
                        <div className="font-extrabold text-xl mb-0.5" style={{ color: cs.statColor }}>{s.value}</div>
                        <div className="text-[#717171] text-xs leading-tight">{s.label}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-10 fade-up">
            <Link
              href="/case-studies"
              onClick={() => window.scrollTo({ top: 0, behavior: 'instant' })}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full border font-semibold text-sm transition-all duration-200"
              style={{ borderColor: "#7c3aed", color: "#7c3aed" }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.background = "#7c3aed";
                (e.currentTarget as HTMLElement).style.color = "#ffffff";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.background = "transparent";
                (e.currentTarget as HTMLElement).style.color = "#7c3aed";
              }}
            >
              View All Case Studies →
            </Link>
          </div>
        </div>
      </section>

      {/* ── IS SOCIAL NATIVE RIGHT FOR YOU ── */}
      <section className="bg-[#f7f7f7] py-28">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center mb-16 fade-up">
            <div className="section-label mb-4">🎯 Is Social Native Right For You?</div>
            <h2 className="font-extrabold text-[#222222] text-4xl md:text-5xl leading-tight mb-4">
              Built for always-on enterprise creator programs
            </h2>
            <p className="text-[#717171] text-lg">
              Social Native is not a self-serve tool. We'd rather you find the right fit than the wrong one.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <div className="fade-up bg-white rounded-3xl p-8 border border-[#e8e8e8]">
              <div className="flex items-center gap-2 mb-6">
                <span
                  className="w-6 h-6 rounded-full flex items-center justify-center text-white text-xs font-bold"
                  style={{ background: "linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)" }}
                >✓</span>
                <span className="font-bold text-[#222222] text-lg">You're a great fit if you…</span>
              </div>
              <div className="space-y-3">
                {[
                  "Run creator programs continuously, not just for one-off campaigns",
                  "Need rights-cleared content for paid media and e-commerce",
                  "Want a fully managed partner, not another tool to manage",
                  "Operate at enterprise scale (mid-market to Fortune 500)",
                  "Need to activate creators across multiple channels simultaneously",
                  "Want to leverage exclusive Meta Andromeda & TikTok AI for content performance",
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-2.5">
                    <span className="text-sm flex-shrink-0 mt-0.5 font-bold" style={{ color: "#7c3aed" }}>✓</span>
                    <span className="text-[#484848] text-sm">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="fade-up bg-white rounded-3xl p-8 border border-[#e8e8e8]" style={{ transitionDelay: "100ms" }}>
              <div className="flex items-center gap-2 mb-6">
                <span className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 text-xs font-bold">→</span>
                <span className="font-bold text-[#717171] text-lg">We may not be the right fit if you…</span>
              </div>
              <div className="space-y-3">
                {[
                  "Are running a single, one-off influencer campaign",
                  "Prefer to manage creator relationships directly in-house",
                  "Have a small budget and need a self-serve SaaS tool",
                  "Are a startup or early-stage brand without a dedicated marketing team",
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-2.5">
                    <span className="text-[#aaaaaa] text-sm flex-shrink-0 mt-0.5">→</span>
                    <span className="text-[#aaaaaa] text-sm">{item}</span>
                  </div>
                ))}
              </div>
              <p className="text-[#aaaaaa] text-xs mt-6 leading-relaxed">
                If that's you, we're happy to recommend alternatives like GRIN, Aspire, or Upfluence.
              </p>
            </div>
          </div>

          <div className="text-center mt-10 fade-up">
            <Link
              href="/pricing"
              onClick={() => window.scrollTo({ top: 0, behavior: 'instant' })}
              className="inline-flex items-center gap-1.5 font-semibold text-sm transition-colors"
              style={{ color: "#7c3aed" }}
            >
              See if you qualify → View Pricing
            </Link>
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section className="py-24" style={{ background: "linear-gradient(135deg, #3b82f6 0%, #7c3aed 50%, #8b5cf6 100%)" }}>
        <div className="container text-center fade-up">
          <h2 className="font-extrabold text-white text-4xl md:text-5xl mb-5 leading-tight">
            Ready to scale your creator program?
          </h2>
          <p className="text-white/80 text-lg mb-10 max-w-xl mx-auto leading-relaxed">
            Join 1,500+ enterprise brands running always-on creator programs with Social Native. Request a demo and we'll build a custom proposal within 2 business days.
          </p>
          <button
            onClick={() => setDemoOpen(true)}
            className="px-10 py-4 rounded-xl bg-white font-bold text-base transition-all duration-200 shadow-lg hover:shadow-xl hover:-translate-y-0.5 inline-flex items-center gap-2"
            style={{ color: "#7c3aed" }}
          >
            Request a Demo →
          </button>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="py-20 bg-[#fafafa]">
        <div className="container max-w-3xl">
          <div className="text-center mb-12">
            <div className="inline-block text-[#7c3aed] text-xs font-semibold uppercase tracking-widest mb-3">FAQ</div>
            <h2 className="text-3xl font-bold text-[#111827]">Common questions about Social Native</h2>
          </div>
          <div className="space-y-4">
            {HOME_FAQS.map(({ q, a }, i) => (
              <details key={i} className="group rounded-2xl border border-[#e5e7eb] bg-white overflow-hidden">
                <summary className="flex items-center justify-between gap-4 px-6 py-5 cursor-pointer font-semibold text-[#111827] list-none select-none">
                  {q}
                  <span className="text-[#7c3aed] text-lg font-bold flex-shrink-0 group-open:rotate-45 transition-transform duration-200">+</span>
                </summary>
                <p className="px-6 pb-5 text-[#374151] text-sm leading-relaxed">{a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
