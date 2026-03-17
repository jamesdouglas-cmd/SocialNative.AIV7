/**
 * DataFlywheel — Animated flywheel diagram
 *
 * Three data stream nodes orbit a central "Social Native Engine" hub.
 * Pulsing rings and animated connector lines illustrate the compounding
 * feedback loop between Meta/TikTok AI, Creator Outcomes, and Paid Media data.
 *
 * Pure CSS animations — no external dependencies.
 */

export default function DataFlywheel() {
  return (
    <div className="relative w-full flex flex-col items-center select-none">
      {/* ── Diagram ── */}
      <div className="relative w-[340px] h-[340px] md:w-[480px] md:h-[480px]">
        {/* Outer orbit ring */}
        <div
          className="absolute inset-0 rounded-full border border-white/10"
          style={{ animation: "spin-slow 30s linear infinite" }}
        />
        {/* Mid orbit ring */}
        <div
          className="absolute rounded-full border border-white/[0.07]"
          style={{
            inset: "14%",
            animation: "spin-slow 20s linear infinite reverse",
          }}
        />

        {/* Rotating arm that carries the three nodes */}
        <div
          className="absolute inset-0"
          style={{ animation: "spin-slow 18s linear infinite" }}
        >
          {/* Node 01 — Meta & TikTok AI (top) */}
          <div
            className="absolute"
            style={{ top: "-4%", left: "50%", transform: "translateX(-50%)" }}
          >
            <div
              className="relative flex flex-col items-center"
              style={{ animation: "spin-slow 18s linear infinite reverse" }}
            >
              <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-blue-500/15 border border-blue-500/40 flex items-center justify-center shadow-lg shadow-blue-500/10 backdrop-blur-sm">
                <span className="text-2xl md:text-3xl">📘</span>
              </div>
              <div className="mt-2 text-center">
                <div className="text-blue-400 text-[10px] md:text-xs font-bold uppercase tracking-wider whitespace-nowrap">
                  Meta & TikTok AI
                </div>
                <div className="text-white/40 text-[9px] md:text-[10px] whitespace-nowrap">2B+ daily signals</div>
              </div>
            </div>
          </div>

          {/* Node 02 — Creator Outcomes (bottom-right) */}
          <div
            className="absolute"
            style={{ bottom: "3%", right: "-2%", transform: "translateX(0)" }}
          >
            <div
              className="relative flex flex-col items-center"
              style={{ animation: "spin-slow 18s linear infinite reverse" }}
            >
              <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-[#7c3aed]/15 border border-[#7c3aed]/40 flex items-center justify-center shadow-lg shadow-[#7c3aed]/10 backdrop-blur-sm">
                <span className="text-2xl md:text-3xl">🤝</span>
              </div>
              <div className="mt-2 text-center">
                <div className="text-[#7c3aed] text-[10px] md:text-xs font-bold uppercase tracking-wider whitespace-nowrap">
                  Creator Outcomes
                </div>
                <div className="text-white/40 text-[9px] md:text-[10px] whitespace-nowrap">1.8M+ collaborations</div>
              </div>
            </div>
          </div>

          {/* Node 03 — Paid Media & Sales (bottom-left) */}
          <div
            className="absolute"
            style={{ bottom: "3%", left: "-2%", transform: "translateX(0)" }}
          >
            <div
              className="relative flex flex-col items-center"
              style={{ animation: "spin-slow 18s linear infinite reverse" }}
            >
              <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-[#3b82f6]/15 border border-[#3b82f6]/40 flex items-center justify-center shadow-lg shadow-[#3b82f6]/10 backdrop-blur-sm">
                <span className="text-2xl md:text-3xl">📊</span>
              </div>
              <div className="mt-2 text-center">
                <div className="text-[#3b82f6] text-[10px] md:text-xs font-bold uppercase tracking-wider whitespace-nowrap">
                  Paid Media & Sales
                </div>
                <div className="text-white/40 text-[9px] md:text-[10px] whitespace-nowrap">$500M+ tracked</div>
              </div>
            </div>
          </div>
        </div>

        {/* Central hub */}
        <div className="absolute inset-0 flex items-center justify-center">
          {/* Pulse rings */}
          <div
            className="absolute w-24 h-24 md:w-32 md:h-32 rounded-full border border-white/10"
            style={{ animation: "pulse-ring 3s ease-out infinite" }}
          />
          <div
            className="absolute w-24 h-24 md:w-32 md:h-32 rounded-full border border-white/10"
            style={{ animation: "pulse-ring 3s ease-out infinite 1s" }}
          />
          {/* Hub circle */}
          <div className="relative w-20 h-20 md:w-28 md:h-28 rounded-full bg-gradient-to-br from-[#3b82f6]/30 to-[#7c3aed]/20 border border-white/20 flex flex-col items-center justify-center shadow-2xl backdrop-blur-sm">
            <div className="text-white font-bold text-[10px] md:text-xs uppercase tracking-widest text-center leading-tight px-2">
              Social Native<br />Engine
            </div>
            <div className="mt-1 text-white/50 text-[8px] md:text-[9px] text-center">AI · Data · Results</div>
          </div>
        </div>

        {/* Connector lines (SVG, static) */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none"
          viewBox="0 0 480 480"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Top node → center */}
          <line x1="240" y1="50" x2="240" y2="190" stroke="rgba(96,165,250,0.25)" strokeWidth="1.5" strokeDasharray="4 4">
            <animate attributeName="stroke-dashoffset" from="0" to="-16" dur="1.2s" repeatCount="indefinite" />
          </line>
          {/* Bottom-right node → center */}
          <line x1="390" y1="390" x2="290" y2="290" stroke="rgba(232,87,42,0.25)" strokeWidth="1.5" strokeDasharray="4 4">
            <animate attributeName="stroke-dashoffset" from="0" to="-16" dur="1.4s" repeatCount="indefinite" />
          </line>
          {/* Bottom-left node → center */}
          <line x1="90" y1="390" x2="190" y2="290" stroke="rgba(0,155,141,0.25)" strokeWidth="1.5" strokeDasharray="4 4">
            <animate attributeName="stroke-dashoffset" from="0" to="-16" dur="1.6s" repeatCount="indefinite" />
          </line>
        </svg>
      </div>

      {/* ── Caption ── */}
      <p className="mt-6 text-white/40 text-xs md:text-sm text-center max-w-xs leading-relaxed">
        Three data streams feed the engine continuously — each campaign improves the next.
      </p>

      {/* ── CSS keyframes injected inline ── */}
      <style>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        @keyframes pulse-ring {
          0%   { transform: scale(1);   opacity: 0.6; }
          100% { transform: scale(2.2); opacity: 0; }
        }
      `}</style>
    </div>
  );
}
