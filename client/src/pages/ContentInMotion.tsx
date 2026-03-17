/* Content in Motion Page — Burnt Signal Design System */
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import DemoModal from "@/components/DemoModal";
import { Link } from "wouter";

const HOW_BG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663404297781/GnSMgavNwsRCby2LcZ4Cud/sn-how-it-works-fNeNDYYn2ce745e7PuUxVg.webp";

export default function ContentInMotion() {
  const [demoOpen, setDemoOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#0D0D0D]">
      <Navbar />
      <DemoModal isOpen={demoOpen} onClose={() => setDemoOpen(false)} />

      {/* Hero */}
      <section
        className="relative pt-32 pb-24 overflow-hidden"
        style={{ backgroundImage: `url(${HOW_BG})`, backgroundSize: "cover", backgroundPosition: "center" }}
      >
        <div className="absolute inset-0 bg-[#0D0D0D]/80" />
        <div className="container relative z-10">
          <div className="max-w-3xl">
            <div className="orange-pill mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-[#7c3aed] inline-block" />
              Content in Motion™
            </div>
            <h1 className="font-display font-extrabold text-white text-5xl md:text-7xl leading-tight mb-6">
              Your UGC library is a{" "}
              <span className="text-[#7c3aed]">video content engine.</span>{" "}
              You just don't know it yet.
            </h1>
            <p className="text-white/60 text-xl leading-relaxed mb-8">
              Content in Motion™ transforms your existing rights-cleared UGC photo library into shoppable short-form video — optimized for TikTok, Instagram Reels, and paid social — without additional creator shoots, budgets, or production timelines.
            </p>
            <div className="flex flex-wrap gap-4">
              <button
                onClick={() => setDemoOpen(true)}
                className="px-7 py-3.5 rounded-full bg-[#7c3aed] hover:bg-[#6d28d9] text-white font-semibold text-base transition-all duration-200"
              >
                Request a Demo
              </button>
              <Link
                href="/pricing"
                className="px-7 py-3.5 rounded-full border border-white/20 hover:border-white/50 text-white font-semibold text-base transition-all duration-200"
              >
                View Pricing →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Problem */}
      <section className="bg-[#1A1A1A] border-y border-white/10 py-16">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="section-label mb-4">The Problem</div>
              <h2 className="font-display font-bold text-white text-3xl mb-4">
                Short-form video is the #1 content format. But most brands can't produce it fast enough.
              </h2>
              <p className="text-white/60 text-base leading-relaxed mb-4">
                Short-form video drives more engagement, more conversions, and more ad performance than any other content format. But producing it at scale — with authentic creator talent — is expensive, slow, and operationally complex.
              </p>
              <p className="text-white/60 text-base leading-relaxed">
                Most brands already have thousands of rights-cleared UGC photos sitting in their content library. Content in Motion turns that existing asset base into a video content engine — without a single additional creator shoot.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { value: "3x", label: "Higher engagement for video vs. static images" },
                { value: "48hr", label: "Turnaround from photo library to video assets" },
                { value: "7", label: "Output formats per asset (9:16, 1:1, 16:9, and more)" },
                { value: "$0", label: "Additional creator shoots required" },
              ].map((s, i) => (
                <div key={i} className="bg-[#0D0D0D] border border-white/10 rounded-xl p-5 text-center">
                  <div className="stat-number text-3xl">{s.value}</div>
                  <div className="text-white/40 text-xs mt-1 leading-tight">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="bg-[#0D0D0D] py-20">
        <div className="container">
          <div className="text-center mb-14">
            <div className="section-label mb-4">The Process</div>
            <h2 className="font-display font-bold text-white text-4xl">
              From photo library to shoppable video in 4 steps
            </h2>
          </div>
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { step: "01", title: "Ingest", desc: "Your existing rights-cleared UGC photo library is ingested and catalogued by product, category, and creator.", icon: "📥" },
              { step: "02", title: "AI Select", desc: "Meta Andromeda and TikTok AI score each asset for performance potential — before any production begins.", icon: "🤖" },
              { step: "03", title: "Render", desc: "Motion effects, shoppable product tags, brand overlays, and captions are applied automatically to top-scoring assets.", icon: "🎬" },
              { step: "04", title: "Score & Deliver", desc: "Final assets are delivered in all required formats — 9:16, 1:1, 16:9, 4:5 — within 48 hours, ready for immediate activation.", icon: "🚀" },
            ].map((item, i) => (
              <div key={i} className="bg-[#1A1A1A] border border-white/10 rounded-2xl p-6 hover:border-[#7c3aed]/30 transition-all duration-300">
                <div className="text-3xl mb-4">{item.icon}</div>
                <div className="font-mono-data text-[#7c3aed] text-xl font-bold mb-2">{item.step}</div>
                <div className="font-display font-bold text-white text-lg mb-2">{item.title}</div>
                <div className="text-white/50 text-sm leading-relaxed">{item.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Use cases */}
      <section className="bg-[#F6F0E8] py-20">
        <div className="container">
          <div className="text-center mb-14">
            <div className="section-label mb-4" style={{ color: "#7c3aed" }}>Use Cases</div>
            <h2 className="font-display font-bold text-[#0D0D0D] text-4xl">
              One library. Every channel.
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: "🎵", title: "TikTok", formats: ["9:16 vertical", "One Day Max format", "TikTok-native sound"], desc: "Optimized for TikTok's algorithm using first-party AI signals." },
              { icon: "📱", title: "Instagram Reels & Stories", formats: ["9:16 vertical", "4:5 feed", "Story overlays"], desc: "Native Reels format with shoppable tags and branded overlays." },
              { icon: "💰", title: "Paid Social Ads", formats: ["Meta Ads all placements", "TikTok Ads", "YouTube Shorts"], desc: "Performance-scored before spend using Meta Andromeda signals." },
              { icon: "🛍️", title: "Shoppable E-commerce", formats: ["Product tag embedding", "Direct checkout links", "PDP video integration"], desc: "Turn creator content into direct revenue on your e-commerce site." },
              { icon: "📧", title: "Email & CRM", formats: ["GIF-optimized", "Thumbnail + play button", "Personalized by segment"], desc: "Authentic creator video in email drives higher click-through rates." },
              { icon: "▶️", title: "YouTube Shorts", formats: ["16:9 landscape", "9:16 Shorts", "Chapter markers"], desc: "Extend reach to YouTube's 2B+ monthly users with zero additional production." },
            ].map((uc, i) => (
              <div key={i} className="bg-[#F6F0E8] border border-[#EAE4DC] rounded-xl p-6 hover:border-[#7c3aed]/30 hover:shadow-md transition-all duration-300">
                <div className="text-2xl mb-3">{uc.icon}</div>
                <div className="font-display font-bold text-[#0D0D0D] text-lg mb-2">{uc.title}</div>
                <p className="text-[#0D0D0D]/50 text-sm mb-3">{uc.desc}</p>
                <div className="flex flex-wrap gap-1.5">
                  {uc.formats.map((f, j) => (
                    <span key={j} className="px-2 py-0.5 bg-[#F6F0E8] border border-[#EAE4DC] rounded text-xs text-[#0D0D0D]/50 font-mono-data">{f}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#7c3aed] py-16">
        <div className="container text-center">
          <h2 className="font-display font-extrabold text-white text-4xl mb-4">
            Ready to unlock your UGC library?
          </h2>
          <p className="text-white/80 text-lg mb-8 max-w-lg mx-auto">
            Content in Motion is included in Growth and Enterprise plans. Request a demo to see it in action.
          </p>
          <button
            onClick={() => setDemoOpen(true)}
            className="px-8 py-4 rounded-full bg-[#0D0D0D] text-white font-bold text-base hover:bg-[#1A1A1A] transition-all duration-200"
          >
            Request a Demo →
          </button>
        </div>
      </section>

      <Footer />
    </div>
  );
}
