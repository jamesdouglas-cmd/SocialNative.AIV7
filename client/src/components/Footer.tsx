/* Footer — socialnative.ai design
   White background, purple accents, gradient logo badge, Resources column */
import { useState } from "react";
import { Link } from "wouter";
import { trpc } from "@/lib/trpc";

function NewsletterSignup() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const subscribeMutation = trpc.newsletter.subscribe.useMutation({
    onSuccess: () => {
      setSubmitted(true);
      setError(null);
    },
    onError: () => {
      setError("Something went wrong. Please try again.");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setError(null);
    subscribeMutation.mutate({ email, name: name || undefined });
  };

  if (submitted) {
    return (
      <div className="flex items-center gap-3 py-2">
        <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: "rgba(124,58,237,0.1)", border: "1px solid rgba(124,58,237,0.3)" }}>
          <svg className="w-4 h-4" style={{ color: "#7c3aed" }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <p className="text-[#717171] text-sm">
          You're subscribed! We'll send creator marketing insights to your inbox.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-2.5">
      <input
        type="text"
        placeholder="Your name (optional)"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="w-full bg-white border border-[#e8e8e8] rounded-xl px-3 py-2.5 text-[#222222] text-sm placeholder-gray-400 focus:outline-none transition-all"
        style={{ outline: "none" }}
        onFocus={(e) => e.target.style.borderColor = "#7c3aed"}
        onBlur={(e) => e.target.style.borderColor = "#e8e8e8"}
      />
      <div className="flex gap-2">
        <input
          type="email"
          required
          placeholder="your@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="flex-1 bg-white border border-[#e8e8e8] rounded-xl px-3 py-2.5 text-[#222222] text-sm placeholder-gray-400 focus:outline-none transition-all"
          style={{ outline: "none" }}
          onFocus={(e) => e.target.style.borderColor = "#7c3aed"}
          onBlur={(e) => e.target.style.borderColor = "#e8e8e8"}
        />
        <button
          type="submit"
          disabled={subscribeMutation.isPending}
          className="px-4 py-2.5 rounded-xl text-white text-sm font-semibold transition-all disabled:opacity-60 disabled:cursor-not-allowed whitespace-nowrap flex-shrink-0"
          style={{ background: "linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)" }}
        >
          {subscribeMutation.isPending ? (
            <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
          ) : (
            "Subscribe"
          )}
        </button>
      </div>
      {error && (
        <p className="text-red-500 text-xs">{error}</p>
      )}
    </form>
  );
}

export default function Footer() {
  return (
    <footer className="bg-white border-t border-[#e8e8e8] pt-16 pb-8">
      <div className="container">
        {/* Newsletter Banner */}
        <div className="bg-[#f7f7f7] rounded-2xl p-6 md:p-8 mb-14 border border-[#e8e8e8] flex flex-col md:flex-row gap-6 md:items-center">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-2 h-2 rounded-full" style={{ background: "#7c3aed" }} />
              <span className="text-xs font-semibold uppercase tracking-widest" style={{ color: "#7c3aed" }}>Creator Marketing Insights</span>
            </div>
            <h3 className="font-bold text-[#222222] text-xl mb-1">
              Stay ahead of the creator economy
            </h3>
            <p className="text-[#717171] text-sm">
              Platform updates, benchmark data, and strategies from 1.8M+ creator collaborations — delivered to your inbox.
            </p>
          </div>
          <div className="md:w-80 flex-shrink-0">
            <NewsletterSignup />
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-6 gap-10 mb-14">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2.5 mb-4">
              <div
                className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0"
                style={{ background: "linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)" }}
              >
                <span className="font-bold text-white text-xs">SN</span>
              </div>
              <span className="font-bold text-[#222222] text-base tracking-tight">Social Native</span>
            </div>
            <p className="text-[#717171] text-sm leading-relaxed max-w-xs mb-4">
              The creator marketing system built on exclusive first-party AI integrations with Meta Andromeda and TikTok.
            </p>
            <div className="flex flex-col gap-2">
              <span className="inline-flex items-center gap-1.5 text-[#717171] text-xs">
                <span>📘</span> Meta Certified Partner
              </span>
              <span className="inline-flex items-center gap-1.5 text-[#717171] text-xs">
                <span>🎵</span> TikTok Marketing Partner
              </span>
            </div>
          </div>

          {/* Product */}
          <div>
            <h4 className="font-semibold text-[#222222] text-sm mb-4">Product</h4>
            <ul className="space-y-2.5">
              {[
                { href: "/how-it-works", label: "How It Works" },
                { href: "/how-it-works", label: "Content in Motion™" },
                { href: "/partnerships", label: "Partnerships" },
                { href: "/pricing", label: "Pricing" },
              ].map((l) => (
                <li key={l.label}>
                  <Link
                    href={l.href}
                    onClick={() => window.scrollTo(0, 0)}
                    className="text-[#717171] text-sm transition-colors hover:text-[#7c3aed]"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Compare */}
          <div>
            <h4 className="font-semibold text-[#222222] text-sm mb-4">Compare</h4>
            <ul className="space-y-2.5">
              {[
                { href: "/vs-competitors", label: "vs. GRIN" },
                { href: "/vs-competitors", label: "vs. CreatorIQ" },
                { href: "/vs-competitors", label: "vs. Aspire" },
                { href: "/vs-competitors", label: "vs. Upfluence" },
                { href: "/vs-competitors", label: "vs. Bazaarvoice" },
              ].map((l, i) => (
                <li key={i}>
                  <Link
                    href={l.href}
                    onClick={() => window.scrollTo(0, 0)}
                    className="text-[#717171] text-sm transition-colors hover:text-[#7c3aed]"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Results */}
          <div>
            <h4 className="font-semibold text-[#222222] text-sm mb-4">Results</h4>
            <ul className="space-y-2.5">
              {[
                { href: "/case-studies", label: "Case Studies" },
                { href: "/case-studies", label: "Travel & Hospitality" },
                { href: "/case-studies", label: "Beauty & CPG" },
                { href: "/case-studies", label: "Fashion & Retail" },
              ].map((l, i) => (
                <li key={i}>
                  <Link
                    href={l.href}
                    onClick={() => window.scrollTo(0, 0)}
                    className="text-[#717171] text-sm transition-colors hover:text-[#7c3aed]"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Creators */}
          <div>
            <h4 className="font-semibold text-[#222222] text-sm mb-4">For Creators</h4>
            <ul className="space-y-2.5">
              {[
                { href: "/creator", label: "Creator Overview" },
                { href: "/creator#how-it-works", label: "How It Works" },
                { href: "/creator", label: "UGC Creators" },
                { href: "/creator", label: "Influencer Program" },
                { href: "/creator", label: "Creator FAQ" },
              ].map((l, i) => (
                <li key={i}>
                  <Link
                    href={l.href}
                    onClick={() => window.scrollTo(0, 0)}
                    className="text-[#717171] text-sm transition-colors hover:text-[#7c3aed]"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-semibold text-[#222222] text-sm mb-4">Resources</h4>
            <ul className="space-y-2.5">
              {[
                { href: "/blog", label: "Blog" },
                { href: "/faq", label: "FAQ" },
                { href: "/glossary", label: "Glossary" },
              ].map((l, i) => (
                <li key={i}>
                  <Link
                    href={l.href}
                    onClick={() => window.scrollTo(0, 0)}
                    className="text-[#717171] text-sm transition-colors hover:text-[#7c3aed]"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-[#e8e8e8] pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-[#aaaaaa] text-xs">
            © 2026 Social Native. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <a href="#" className="text-[#aaaaaa] hover:text-[#717171] text-xs transition-colors">Privacy Policy</a>
            <a href="#" className="text-[#aaaaaa] hover:text-[#717171] text-xs transition-colors">Terms of Service</a>
            <a href="#" className="text-[#aaaaaa] hover:text-[#717171] text-xs transition-colors">Contact</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
