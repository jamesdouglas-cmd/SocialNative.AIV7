/* Partnerships — socialnative.ai Design System
   White/light backgrounds, purple accent (#7c3aed), blue-to-purple gradient CTAs */
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import DemoModal from "@/components/DemoModal";

export default function Partnerships() {
  const [demoOpen, setDemoOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <DemoModal isOpen={demoOpen} onClose={() => setDemoOpen(false)} />

      {/* Hero */}
      <section className="relative pt-32 pb-24 overflow-hidden bg-gradient-to-br from-[#f5f3ff] via-white to-white">
        <div className="container relative z-10 text-center">
          <div className="inline-block text-[#7c3aed] text-xs font-semibold uppercase tracking-widest mb-4">Platform Partnerships</div>
          <h1 className="font-display font-extrabold text-[#222222] text-5xl md:text-6xl leading-tight mb-6">
            Exclusive AI access that{" "}
            <span className="text-[#7c3aed]">no other platform has</span>
          </h1>
          <p className="text-[#717171] text-xl max-w-2xl mx-auto">
            Social Native is the only creator marketing system with exclusive first-party AI integrations with both Meta and TikTok — giving your brand access to predictive performance data unavailable anywhere else.
          </p>
        </div>
      </section>

      {/* Meta Andromeda + TikTok deep dive */}
      <section className="bg-white py-20">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-10 items-start">
            {/* Meta */}
            <div className="bg-white border border-gray-100 rounded-3xl p-8 shadow-sm hover:shadow-md transition-all">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center text-2xl">📘</div>
                <div>
                  <div className="text-[#717171] text-xs font-semibold uppercase tracking-wider">Meta Certified Partner</div>
                  <div className="font-display font-bold text-[#222222] text-2xl">Meta Andromeda AI</div>
                </div>
              </div>
              <p className="text-[#484848] text-base leading-relaxed mb-4">
                <strong className="text-[#222222]">Meta Andromeda</strong> is Meta's proprietary AI-powered content recommendation and performance prediction system. It processes billions of signals across Facebook and Instagram to determine which content gets shown to which users — and how prominently.
              </p>
              <p className="text-[#717171] text-base leading-relaxed mb-6">
                Social Native is one of the only creator marketing platforms in the world with direct integration into Andromeda's signals. This means we can predict — before a campaign launches — which creator content will perform best in Meta's ecosystem.
              </p>
              <div className="space-y-3">
                {[
                  { title: "Predictive Performance Scoring", desc: "Before you spend a dollar on paid amplification, Andromeda scores each creator asset for predicted engagement, reach, and conversion performance." },
                  { title: "Audience-Creator Matching", desc: "Andromeda's first-party audience data helps Social Native match creators to your specific target audiences with precision that third-party data can't replicate." },
                  { title: "Creative Optimization Signals", desc: "Real-time feedback from Andromeda informs content briefs, helping creators produce content that's algorithmically optimized from the first frame." },
                  { title: "Paid Media Amplification", desc: "Creator content scored highly by Andromeda is seamlessly activated through Meta's branded content ad format for maximum paid performance." },
                ].map((item, i) => (
                  <div key={i} className="bg-[#f5f3ff] rounded-2xl p-4">
                    <div className="font-display font-semibold text-[#222222] text-sm mb-1">{item.title}</div>
                    <p className="text-[#717171] text-sm leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* TikTok */}
            <div className="bg-white border border-gray-100 rounded-3xl p-8 shadow-sm hover:shadow-md transition-all">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-2xl bg-pink-50 border border-pink-100 flex items-center justify-center text-2xl">🎵</div>
                <div>
                  <div className="text-[#717171] text-xs font-semibold uppercase tracking-wider">TikTok Marketing Partner</div>
                  <div className="font-display font-bold text-[#222222] text-2xl">TikTok First-Party AI</div>
                </div>
              </div>
              <p className="text-[#484848] text-base leading-relaxed mb-4">
                As an official TikTok Marketing Partner, Social Native has exclusive access to TikTok's first-party AI signals — enabling trend prediction, creator performance forecasting, and native content optimization that no self-serve platform can replicate.
              </p>
              <p className="text-[#717171] text-base leading-relaxed mb-6">
                TikTok's algorithm is notoriously opaque. Our partnership gives us direct access to the signals that drive content distribution — so your creators are making content that TikTok's AI wants to amplify.
              </p>
              <div className="space-y-3">
                {[
                  { title: "Trend Prediction", desc: "TikTok's first-party data lets Social Native identify emerging trends before they peak — so your creators are ahead of the curve, not chasing it." },
                  { title: "Creator Performance Forecasting", desc: "Predict which creators in our network will perform best for your specific campaign goals and target audience on TikTok, before activation." },
                  { title: "Native Content Optimization", desc: "Content briefs informed by TikTok AI signals ensure creator content is natively optimized for TikTok's distribution algorithm from day one." },
                  { title: "TikTok One Day Max", desc: "Social Native has access to TikTok's premium ad formats, enabling brands to maximize reach with creator content on launch day." },
                ].map((item, i) => (
                  <div key={i} className="bg-[#f5f3ff] rounded-2xl p-4">
                    <div className="font-display font-semibold text-[#222222] text-sm mb-1">{item.title}</div>
                    <p className="text-[#717171] text-sm leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why it matters */}
      <section className="bg-[#f5f3ff] border-y border-[#e9d5ff] py-20">
        <div className="container text-center">
          <div className="inline-block text-[#7c3aed] text-xs font-semibold uppercase tracking-widest mb-4">Why It Matters</div>
          <h2 className="font-display font-extrabold text-[#222222] text-4xl mb-4">
            First-party AI access is a{" "}
            <span className="text-[#7c3aed]">structural advantage</span>
          </h2>
          <p className="text-[#717171] text-lg max-w-2xl mx-auto mb-14">
            Every other creator marketing platform is working with third-party data and guesswork. Social Native has direct access to the AI systems that actually determine content performance on Meta and TikTok.
          </p>

          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {[
              { title: "Before You Spend", desc: "Andromeda and TikTok AI score your creator content before you activate paid amplification — so you only boost what's already proven to perform.", icon: "🎯" },
              { title: "Proprietary Data Foundation", desc: "1.8M+ creator collaborations combined with exclusive platform AI signals creates a performance prediction capability that no competitor can replicate.", icon: "📊" },
              { title: "Continuously Improving", desc: "Every campaign feeds back into our AI models, making Social Native's performance predictions more accurate over time — a compounding advantage.", icon: "🔄" },
            ].map((item, i) => (
              <div key={i} className="bg-white rounded-3xl p-8 text-left shadow-sm border border-[#e9d5ff] hover:shadow-md transition-all duration-300">
                <div className="text-3xl mb-4">{item.icon}</div>
                <div className="font-display font-bold text-[#222222] text-lg mb-3">{item.title}</div>
                <p className="text-[#717171] text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Olapic heritage */}
      <section className="bg-white py-16">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-block text-[#7c3aed] text-xs font-semibold uppercase tracking-widest mb-4">Technology Heritage</div>
              <h2 className="font-display font-extrabold text-[#222222] text-3xl mb-4">
                Built on Olapic's enterprise rights management legacy
              </h2>
              <p className="text-[#484848] text-base leading-relaxed mb-4">
                Social Native's rights management system is built on the foundation of Olapic — the enterprise UGC and rights management platform trusted by the world's largest brands. This heritage gives Social Native the most robust content licensing and rights clearance system in the creator marketing industry.
              </p>
              <p className="text-[#717171] text-base leading-relaxed">
                Every piece of creator content managed by Social Native is fully rights-cleared for paid media, e-commerce, email, and out-of-home use — with perpetual licensing available.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { value: "100%", label: "Rights-cleared content" },
                { value: "12M+", label: "Licensed content pieces" },
                { value: "100%", label: "Content cleared for paid media use" },
                { value: "∞", label: "Perpetual licensing available" },
              ].map((s, i) => (
                <div key={i} className="bg-[#f5f3ff] border border-[#e9d5ff] rounded-2xl p-5 text-center">
                  <div className="font-display font-extrabold text-[#7c3aed] text-3xl mb-1">{s.value}</div>
                  <div className="text-[#717171] text-xs">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-r from-[#3b82f6] to-[#7c3aed] py-20">
        <div className="container text-center">
          <h2 className="font-display font-extrabold text-white text-4xl mb-4">
            Access exclusive AI that your competitors can't get
          </h2>
          <p className="text-white/80 text-lg mb-8 max-w-lg mx-auto">
            Request a demo to see how Social Native's Meta Andromeda and TikTok AI integrations work for your brand.
          </p>
          <button
            onClick={() => setDemoOpen(true)}
            className="px-10 py-4 rounded-full bg-white text-[#7c3aed] font-bold text-base transition-all duration-200 shadow-lg hover:bg-gray-50 hover:shadow-xl inline-flex items-center gap-2"
          >
            Request a Demo →
          </button>
        </div>
      </section>

      <Footer />
    </div>
  );
}
