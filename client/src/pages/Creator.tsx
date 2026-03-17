/* Creator Page — socialnative.ai
   GEO-optimized for: UGC creator, influencer marketing, creator economy, brand deals,
   content creator platform, creator monetization, micro-influencer network
   Audience: Creators & influencers considering joining Social Native
   Tone: Confident, creator-first, money + trust + community */
import { useEffect, useRef, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

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

export default function Creator() {
  useScrollReveal();

  const brandLogos = [
    "IKEA", "Dr. Martens", "H&M", "Adidas", "Four Seasons",
    "Clinique", "Microsoft", "Walgreens", "Carhartt", "Nestlé",
    "LEGO", "Crocs", "Revlon", "NYX", "Cetaphil", "Unilever",
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* ── HERO ── */}
      <section
        className="relative pt-16 overflow-hidden"
        style={{
          background: "linear-gradient(160deg, rgb(248, 246, 255) 0%, rgb(240, 247, 255) 40%, rgb(255, 255, 255) 80%)"
        }}
      >
        <div className="container py-24 md:py-32">
          <div className="max-w-4xl mx-auto text-center">
            <div className="announce-pill mb-8 mx-auto w-fit">
              <span className="text-base">✨</span>
              300K+ Creators. 1,500+ Top Brands. Real Deals, Real Payments.
            </div>

            <h1
              className="font-extrabold text-[#222222] leading-[1.08] mb-6 tracking-tight"
              style={{ fontSize: "clamp(2.5rem, 6vw, 4.75rem)" }}
            >
              Get Paid to Create Content{" "}
              <span style={{ color: "#7c3aed" }}>for the World's Top Brands</span>
            </h1>

            <p className="text-[#717171] text-lg md:text-xl max-w-2xl mx-auto leading-relaxed mb-3">
              Social Native is the creator marketing platform that connects UGC creators, nano-influencers, micro-influencers, and mid-tier creators with enterprise brands running always-on content programs — so you earn consistently, not just occasionally.
            </p>
            <p className="text-[#aaaaaa] text-sm max-w-xl mx-auto leading-relaxed mb-10">
              No chasing DMs. No lowball rates. No unclear briefs. Just streamlined brand collaborations, transparent payments, and the creative freedom to make content that actually performs — backed by Social Native's exclusive first-party data from Meta and TikTok.
            </p>

            <div className="flex flex-wrap gap-4 justify-center mb-8">
              <a
                href="https://my.socialnative.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-gradient text-base px-8 py-4"
              >
                Apply to Join the Network
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 5l4 3-4 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </a>
              <a
                href="#how-it-works"
                className="btn-outline-dark text-base px-8 py-4"
              >
                See How It Works
              </a>
            </div>

            <div className="flex flex-wrap gap-3 justify-center">
              {[
                "📸 UGC Creators Welcome",
                "🎥 Nano & Micro-Influencers",
                "💸 Fast, Reliable Payments",
                "🌍 Global Creator Network",
              ].map((badge, i) => (
                <span key={i} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-[#e8e8e8] text-[#717171] text-xs font-medium bg-white">
                  {badge}
                </span>
              ))}
            </div>
          </div>
        </div>
        <div className="h-16 bg-gradient-to-b from-transparent to-white" />
      </section>

      {/* ── STATS BAR ── */}
      <section className="bg-white border-b border-[#e8e8e8] py-16">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-14">
            {[
              { value: 300000, suffix: "+", label: "Creators in Our Global Network" },
              { value: 1500, suffix: "+", label: "Enterprise Brands Hiring Creators" },
              { value: 12000000, suffix: "+", label: "Branded Content Pieces Produced" },
              { value: 1800000, suffix: "+", label: "Creator Collaborations Completed" },
            ].map((s, i) => (
              <StatCounter key={i} value={s.value} suffix={s.suffix} label={s.label} />
            ))}
          </div>

          <div className="border-t border-[#e8e8e8] pt-10">
            <p className="text-[#aaaaaa] text-xs text-center mb-6 uppercase tracking-widest">
              Brands you could be creating for
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

      {/* ── WHY SOCIAL NATIVE ── */}
      <section className="bg-white py-28">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center mb-16 fade-up">
            <div className="section-label mb-4">⚡ Why Creators Choose Social Native</div>
            <h2 className="font-extrabold text-[#222222] text-4xl md:text-5xl leading-tight mb-5">
              More than a gig.{" "}
              <span style={{ color: "#7c3aed" }}>A real creator business.</span>
            </h2>
            <p className="text-[#717171] text-lg leading-relaxed">
              Most creator marketplaces treat you like a commodity. Social Native treats you like a partner — with transparent briefs, fair compensation, fast payments, and brand collaborations that are matched to your actual audience and content style.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {[
              {
                icon: "💸",
                title: "Get Paid — Fast and Fairly",
                desc: "Social Native handles all creator payments globally. No chasing invoices, no awkward money conversations. Compensation is clearly outlined upfront for every brand deal, and payments are processed automatically once content is approved.",
                badge: "Fast Payments",
                badgeColor: "bg-emerald-50 border-emerald-200 text-emerald-700",
                dot: "bg-emerald-500",
              },
              {
                icon: "🎯",
                title: "Matched to Brands That Actually Fit You",
                desc: "Social Native's AI-powered creator matching uses 1.8M+ collaboration data points to connect you with brands whose audience, aesthetic, and campaign objectives align with your content — not just your follower count.",
                badge: "Smart Matching",
                badgeColor: "bg-blue-50 border-blue-200 text-blue-700",
                dot: "bg-blue-500",
              },
              {
                icon: "🤝",
                title: "A Team That Has Your Back",
                desc: "We manage the whole process — brand outreach, briefs, contracts, rights clearance, and feedback. You focus on creating. Our creator success team is here when you need support, not a chatbot that takes three days to respond.",
                badge: "Fully Supported",
                badgeColor: "bg-purple-50 border-purple-200 text-purple-700",
                dot: "bg-purple-500",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="fade-up bg-white border border-[#e8e8e8] rounded-2xl p-6 hover:shadow-md transition-all duration-300"
                style={{ transitionDelay: `${i * 60}ms` }}
              >
                <div className="text-2xl mb-4">{item.icon}</div>
                <div className="font-semibold text-[#222222] text-base mb-2 leading-snug">{item.title}</div>
                <div className="text-[#717171] text-sm leading-relaxed mb-4">{item.desc}</div>
                <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-xs font-semibold ${item.badgeColor}`}>
                  <span className={`w-1.5 h-1.5 rounded-full inline-block ${item.dot}`} />
                  {item.badge}
                </div>
              </div>
            ))}
          </div>

          {/* Creator value callout */}
          <div className="fade-up bg-[#f7f7f7] rounded-3xl p-8 md:p-10 border border-[#e8e8e8]">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="flex-1">
                <div className="section-label mb-3">📊 The Creator Advantage</div>
                <h3 className="font-bold text-[#222222] text-2xl md:text-3xl mb-3">
                  Creators in our network earn{" "}
                  <span style={{ color: "#7c3aed" }}>more per collaboration</span>{" "}
                  because brands pay for performance, not just posts.
                </h3>
                <p className="text-[#717171] text-base leading-relaxed">
                  Because Social Native's data proves which creator content drives real business outcomes — lower CPA, higher ROAS, more e-commerce conversions — brands in our network are willing to pay a premium for creators whose style and audience match their objectives. Your content is backed by science, not guesswork.
                </p>
              </div>
              <div className="flex-shrink-0 grid grid-cols-2 gap-4">
                <div className="bg-white rounded-2xl p-5 text-center border border-[#e8e8e8]">
                  <div className="font-extrabold text-[#222222] text-3xl mb-1" style={{ color: "#7c3aed" }}>40+</div>
                  <div className="text-[#717171] text-xs">Brand verticals actively sourcing creators</div>
                </div>
                <div className="bg-white rounded-2xl p-5 text-center border border-[#e8e8e8]">
                  <div className="font-extrabold text-3xl mb-1" style={{ color: "#7c3aed" }}>1,500+</div>
                  <div className="text-[#717171] text-xs">Enterprise brands hiring right now</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section id="how-it-works" className="bg-[#f7f7f7] py-28">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center mb-16 fade-up">
            <div className="section-label mb-4">🚀 How It Works for Creators</div>
            <h2 className="font-extrabold text-[#222222] text-4xl md:text-5xl leading-tight mb-5">
              Four steps from application{" "}
              <span style={{ color: "#7c3aed" }}>to getting paid</span>
            </h2>
            <p className="text-[#717171] text-lg leading-relaxed">
              No complicated onboarding. No mystery process. Here's exactly how creator collaborations work on Social Native — from your first application to your first paycheck.
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            {[
              {
                step: "01",
                icon: "📝",
                title: "Apply to the Network",
                desc: "Submit your creator profile — your handle, content niche, platforms, and audience demographics. Our team reviews applications on a rolling basis. No follower minimums.",
              },
              {
                step: "02",
                icon: "🤖",
                title: "Get Matched to Brands",
                desc: "Our AI matching engine — trained on 1.8M+ creator collaborations — identifies brands whose campaign objectives align with your content style and audience. You receive opportunities that actually make sense for you.",
              },
              {
                step: "03",
                icon: "🎬",
                title: "Create the Content",
                desc: "Receive a clear, detailed creative brief with all the brand's guidelines, examples, and deliverables. You create content on your own timeline — authentically, the way you know best.",
              },
              {
                step: "04",
                icon: "💰",
                title: "Get Paid Automatically",
                desc: "Once your content is approved, payment is processed automatically. Global payment support, proper tax documentation, and zero awkward conversations about money. Just a notification that your payment is on the way.",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="fade-up bg-white rounded-2xl p-6 border border-[#e8e8e8] hover:shadow-md transition-all duration-300 flex flex-col"
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                <div className="flex items-center gap-3 mb-5">
                  <div className="step-badge flex-shrink-0">{item.step}</div>
                  <span className="text-2xl">{item.icon}</span>
                </div>
                <div className="font-semibold text-[#222222] text-base mb-2 leading-snug">{item.title}</div>
                <div className="text-[#717171] text-sm leading-relaxed flex-1">{item.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CREATOR TYPES ── */}
      <section className="bg-white py-28">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center mb-16 fade-up">
            <div className="section-label mb-4">🎨 Who We Work With</div>
            <h2 className="font-extrabold text-[#222222] text-4xl md:text-5xl leading-tight mb-5">
              Every tier of creator.{" "}
              <span style={{ color: "#7c3aed" }}>Every type of content.</span>
            </h2>
            <p className="text-[#717171] text-lg leading-relaxed">
              Social Native works with the full spectrum of the creator economy — from UGC creators with no public following to mid-tier influencers with millions of engaged fans. What matters is the quality and authenticity of your content, not just your follower count.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                tier: "UGC Creators",
                emoji: "📸",
                range: "No minimum followers required",
                desc: "User-generated content creators are the backbone of modern creator marketing. Brands need authentic, high-quality photo and video content for their paid media, e-commerce pages, and organic social — and they're willing to pay well for it, regardless of your follower count.",
                perks: [
                  "No public following required",
                  "Ideal for photographers, videographers, and lifestyle creators",
                  "Content used in paid ads, product pages, and brand channels",
                  "Recurring opportunities with brands you love",
                ],
                accentColor: "#3b82f6",
                bgColor: "bg-blue-50 border-blue-100",
                textColor: "text-blue-600",
              },
              {
                tier: "Nano & Micro-Influencers",
                emoji: "🌟",
                range: "1K – 100K followers",
                desc: "Nano and micro-influencers consistently outperform mega-influencers on engagement rate, trust, and conversion. Brands in Social Native's network specifically seek out smaller creators with highly engaged, niche audiences — because authenticity converts.",
                perks: [
                  "Higher engagement rates valued over raw reach",
                  "Niche communities (fitness, beauty, travel, food, parenting) in high demand",
                  "Long-term brand ambassador relationships available",
                  "Sponsored content + UGC hybrid opportunities",
                ],
                accentColor: "#7c3aed",
                bgColor: "bg-purple-50 border-purple-100",
                textColor: "text-purple-600",
              },
              {
                tier: "Mid-Tier Influencers",
                emoji: "🚀",
                range: "100K – 1M followers",
                desc: "Mid-tier influencers bring the sweet spot of reach and authenticity. Social Native's enterprise brand partners run always-on creator programs that require consistent content at scale — making mid-tier creators some of the most in-demand collaborators on the platform.",
                perks: [
                  "Higher-value brand partnerships and campaign budgets",
                  "Multi-platform activation (Instagram, TikTok, YouTube Shorts)",
                  "Content licensed for paid media amplification — more earning potential",
                  "Priority matching to top-tier enterprise brands",
                ],
                accentColor: "#8b5cf6",
                bgColor: "bg-violet-50 border-violet-100",
                textColor: "text-violet-600",
              },
            ].map((tier, i) => (
              <div
                key={i}
                className="fade-up bg-white border border-[#e8e8e8] rounded-3xl overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                <div className={`px-6 py-4 border-b ${tier.bgColor}`}>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xl">{tier.emoji}</span>
                    <div className="font-bold text-[#222222] text-base">{tier.tier}</div>
                  </div>
                  <div className={`text-xs font-semibold uppercase tracking-wider ${tier.textColor}`}>{tier.range}</div>
                </div>
                <div className="p-6">
                  <p className="text-[#717171] text-sm leading-relaxed mb-5">{tier.desc}</p>
                  <div className="space-y-2">
                    {tier.perks.map((perk, j) => (
                      <div key={j} className="flex items-start gap-2.5">
                        <span
                          className="w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                          style={{ background: `${tier.accentColor}18` }}
                        >
                          <span className="text-xs font-bold" style={{ color: tier.accentColor }}>✓</span>
                        </span>
                        <span className="text-[#484848] text-sm">{perk}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHAT CREATORS GET ── */}
      <section className="bg-[#111111] py-28">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center mb-16 fade-up">
            <div className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: "#8b5cf6" }}>🎁 Creator Benefits</div>
            <h2 className="font-extrabold text-white text-4xl md:text-5xl leading-tight mb-5">
              Everything a creator needs to{" "}
              <span className="text-gradient">build a real business</span>
            </h2>
            <p className="text-white/60 text-lg leading-relaxed">
              Social Native isn't just a job board for brand deals. It's an end-to-end creator partnership — with the infrastructure, support, and brand relationships to make content creation a sustainable career.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: "💳",
                title: "Global Payments & Tax Docs",
                desc: "Get paid wherever you are in the world. Social Native handles all payment processing, international transfers, and provides the necessary tax documentation — so you spend time creating, not doing accounting.",
                color: "#3b82f6",
                borderColor: "border-blue-500/20",
                bgColor: "bg-blue-500/5",
              },
              {
                icon: "⚖️",
                title: "Rights Clearance & Licensing",
                desc: "Every collaboration includes a clearly defined content licensing agreement. You always know exactly how your content will be used — whether for organic posts, paid ads, e-commerce pages, or multi-channel brand campaigns.",
                color: "#7c3aed",
                borderColor: "border-purple-500/20",
                bgColor: "bg-purple-500/5",
              },
              {
                icon: "📋",
                title: "Clear, Detailed Creative Briefs",
                desc: "No vague requests. No 'just be authentic' non-briefs. Social Native provides detailed creative briefs with examples, do's and don'ts, campaign context, and measurable deliverables — so you can produce great work without endless back-and-forth.",
                color: "#8b5cf6",
                borderColor: "border-violet-500/20",
                bgColor: "bg-violet-500/5",
              },
              {
                icon: "🤖",
                title: "AI-Powered Brand Matching",
                desc: "Forget spray-and-pray outreach to brands who don't know you exist. Our matching engine — trained on 1.8M+ real collaboration outcomes — connects you with brands whose audience demographics, content aesthetic, and campaign goals align with yours.",
                color: "#3b82f6",
                borderColor: "border-blue-500/20",
                bgColor: "bg-blue-500/5",
              },
              {
                icon: "📈",
                title: "Performance-Backed Credibility",
                desc: "Every piece of content you produce through Social Native is scored against real performance data from Meta Andromeda and TikTok AI. Over time, your creator profile builds a verified track record of high-performing content — making you more valuable to brands.",
                color: "#7c3aed",
                borderColor: "border-purple-500/20",
                bgColor: "bg-purple-500/5",
              },
              {
                icon: "🌍",
                title: "Access to a Global Creator Community",
                desc: "Join 300K+ creators from around the world who are part of Social Native's network. Share insights, learn from top performers, and stay ahead of trends across Instagram, TikTok, YouTube Shorts, Facebook, and Pinterest.",
                color: "#8b5cf6",
                borderColor: "border-violet-500/20",
                bgColor: "bg-violet-500/5",
              },
            ].map((item, i) => (
              <div
                key={i}
                className={`fade-up rounded-3xl p-7 border ${item.borderColor} ${item.bgColor} hover:border-opacity-60 transition-all duration-300`}
                style={{ transitionDelay: `${i * 60}ms` }}
              >
                <div className="text-3xl mb-4">{item.icon}</div>
                <h3 className="font-bold text-white text-base mb-3 leading-snug">{item.title}</h3>
                <p className="text-white/50 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* ── FAQ ── */}
      <section className="bg-[#f7f7f7] py-28">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-16 fade-up">
              <div className="section-label mb-4">❓ Creator FAQ</div>
              <h2 className="font-extrabold text-[#222222] text-4xl md:text-5xl leading-tight mb-5">
                Questions creators actually ask
              </h2>
              <p className="text-[#717171] text-lg">No fluff. Just straight answers.</p>
            </div>

            <div className="space-y-4">
              {[
                {
                  q: "How much will I get paid per collaboration?",
                  a: "Compensation varies by brand, campaign scope, content format, and your audience size or content quality. Every collaboration includes clearly defined compensation before you accept — no surprises, no negotiating after the fact. UGC creators typically earn per content piece, while influencers earn a combination of flat fees and usage licensing bonuses.",
                },
                {
                  q: "How and when do I get paid?",
                  a: "Social Native handles all payments automatically once your content is approved by the brand. We support global payment methods and provide the necessary tax documentation. Most creators receive payment within 7–14 business days of content approval. No invoicing, no chasing, no awkward conversations.",
                },
                {
                  q: "What kinds of brands does Social Native work with?",
                  a: "Social Native works with 1,500+ enterprise brands across 40+ verticals — including beauty, fashion, travel, food & beverage, CPG, tech, home, fitness, and more. Our brand partners include global names like IKEA, H&M, Adidas, Clinique, Nestlé, Crocs, NYX, and many others.",
                },
                {
                  q: "How is Social Native different from other influencer marketing platforms?",
                  a: "Most creator platforms are glorified databases. Social Native is a fully managed creator marketing system — we handle outreach, contracts, rights clearance, payments, and optimization on behalf of brands. For creators, this means less friction, clearer briefs, faster payments, and smarter matching than any self-serve platform. Plus, we're the only platform with exclusive first-party AI integrations with Meta and TikTok — which means the brands you work with get better results, which means more budget flowing to creators like you.",
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className="fade-up bg-white rounded-2xl border border-[#e8e8e8] overflow-hidden"
                  style={{ transitionDelay: `${i * 40}ms` }}
                >
                  <div className="p-6">
                    <div className="font-semibold text-[#222222] text-base mb-3 leading-snug">{item.q}</div>
                    <p className="text-[#717171] text-sm leading-relaxed">{item.a}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── VS DIRECT OUTREACH ── */}
      <section className="bg-white py-28">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center mb-16 fade-up">
            <div className="section-label mb-4">⚖️ Social Native vs. Going It Alone</div>
            <h2 className="font-extrabold text-[#222222] text-4xl md:text-5xl leading-tight mb-5">
              Why creators choose a platform{" "}
              <span style={{ color: "#7c3aed" }}>over cold outreach</span>
            </h2>
            <p className="text-[#717171] text-lg">
              Cold-DMing brands works occasionally. Social Native works reliably.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <div className="fade-up bg-white rounded-3xl p-8 border border-[#e8e8e8]">
              <div className="flex items-center gap-2 mb-6">
                <span className="w-6 h-6 rounded-full flex items-center justify-center text-white text-xs font-bold" style={{ background: "linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)" }}>✓</span>
                <span className="font-bold text-[#222222] text-lg">Social Native</span>
              </div>
              <div className="space-y-3">
                {[
                  "Brands come to you — no cold outreach required",
                  "AI matching ensures brand-creator fit before any contact",
                  "Compensation defined upfront, no negotiation games",
                  "Contracts and rights clearance handled automatically",
                  "Global payments processed on a defined timeline",
                  "Clear creative briefs with examples and context",
                  "Track record built through verified performance data",
                  "Access to 1,500+ enterprise brands in one place",
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
                <span className="font-bold text-[#717171] text-lg">DIY Brand Outreach</span>
              </div>
              <div className="space-y-3">
                {[
                  "Sending hundreds of cold DMs with low response rates",
                  "Chasing up-and-down negotiations over rates",
                  "Ambiguous briefs that result in rejected content",
                  "Figuring out licensing and contracts on your own",
                  "Waiting 60–90 days for payment (or never getting paid)",
                  "No performance data to validate your content quality",
                  "Constant hustle with no guarantee of consistent income",
                  "Starting from scratch with every new brand",
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-2.5">
                    <span className="text-[#aaaaaa] text-sm flex-shrink-0 mt-0.5">→</span>
                    <span className="text-[#aaaaaa] text-sm">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section className="py-24" style={{ background: "linear-gradient(135deg, #3b82f6 0%, #7c3aed 50%, #8b5cf6 100%)" }}>
        <div className="container text-center fade-up">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/15 border border-white/30 text-white text-xs font-semibold mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-white/60 inline-block" />
            300K+ creators and growing
          </div>
          <h2 className="font-extrabold text-white text-4xl md:text-5xl mb-5 leading-tight">
            Ready to turn your content<br />into a real income stream?
          </h2>
          <p className="text-white/80 text-lg mb-10 max-w-xl mx-auto leading-relaxed">
            Join the creator marketing platform trusted by the world's top brands. Apply to the Social Native creator network today — and start getting matched with brand collaborations built around your content style, audience, and goals.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a
              href="https://my.socialnative.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="px-10 py-4 rounded-xl bg-white font-bold text-base transition-all duration-200 shadow-lg hover:shadow-xl hover:-translate-y-0.5 inline-flex items-center gap-2"
              style={{ color: "#7c3aed" }}
            >
              Apply to Join the Network →
            </a>
            <a
              href="#how-it-works"
              className="px-10 py-4 rounded-xl bg-white/10 border border-white/30 font-bold text-base text-white transition-all duration-200 hover:bg-white/20 inline-flex items-center gap-2"
            >
              See How It Works
            </a>
          </div>
          <p className="text-white/50 text-xs mt-6">
            UGC creators, nano-influencers, micro-influencers, and mid-tier influencers welcome. Creator applications reviewed on a rolling basis.
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
}
