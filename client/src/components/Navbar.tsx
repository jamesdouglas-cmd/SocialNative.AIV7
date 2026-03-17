/* Navbar — socialnative.ai design
   Always white background (rgba(255,255,255,0.96)), dark text nav links
   Blue-to-purple gradient CTA button, purple active state
   Request a Demo opens global DemoModal via context */
import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { useDemoModal } from "../App";

const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'instant' });

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [location] = useLocation();
  const { openDemo } = useDemoModal();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { href: "/how-it-works", label: "How It Works" },
    { href: "/partnerships", label: "Partnerships" },
    { href: "/case-studies", label: "Case Studies" },
    { href: "/vs-competitors", label: "vs. Competitors" },
    { href: "/pricing", label: "Pricing" },
    { href: "/creator", label: "For Creators" },
  ];

  const isActive = (href: string) => location === href;

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 ${
        scrolled
          ? "bg-white/96 backdrop-blur-sm shadow-sm border-b border-gray-100"
          : "bg-white/96"
      }`}
      style={{ backgroundColor: "rgba(255,255,255,0.96)" }}
    >
      <div className="container">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group" onClick={scrollToTop}>
            <div
              className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0"
              style={{ background: "linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)" }}
            >
              <span className="font-bold text-white text-xs">SN</span>
            </div>
            <span className="font-bold text-base tracking-tight text-[#222222]">
              Social Native
            </span>
          </Link>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-0.5">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={scrollToTop}
                className={`px-3 py-2 text-sm font-medium transition-colors rounded-lg ${
                  isActive(link.href)
                    ? "text-[#7c3aed]"
                    : "text-[#484848] hover:text-[#222222]"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* CTA — opens DemoModal directly */}
          <div className="hidden md:flex items-center">
            <button
              onClick={openDemo}
              className="btn-gradient text-sm"
            >
              Request a Demo
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M2.5 7h9M8 4l3.5 3L8 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 text-[#222222]"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <div className="w-5 h-4 flex flex-col justify-between">
              <span className={`block h-0.5 bg-[#222222] transition-all ${menuOpen ? "rotate-45 translate-y-1.5" : ""}`} />
              <span className={`block h-0.5 bg-[#222222] transition-all ${menuOpen ? "opacity-0" : ""}`} />
              <span className={`block h-0.5 bg-[#222222] transition-all ${menuOpen ? "-rotate-45 -translate-y-1.5" : ""}`} />
            </div>
          </button>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="md:hidden bg-white border-t border-gray-100 pb-4">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`block px-4 py-3 text-sm font-medium transition-colors ${
                  isActive(link.href) ? "text-[#7c3aed]" : "text-[#484848] hover:text-[#222222]"
                }`}
                onClick={() => { setMenuOpen(false); scrollToTop(); }}
              >
                {link.label}
              </Link>
            ))}
            <div className="px-4 pt-3">
              <button
                onClick={() => { setMenuOpen(false); openDemo(); }}
                className="btn-gradient w-full justify-center text-sm"
              >
                Request a Demo
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M2.5 7h9M8 4l3.5 3L8 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
