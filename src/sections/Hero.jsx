import { useState, useEffect } from "react";
import { theme, data, fonts } from "../design/tokens";
import { scrollTo } from "../hooks/useScrollSpy";

// ─────────────────────────────────────────────
//  Hero — cinematic landing section
//  scroll-parallax · CountUp · scan line · orbs
// ─────────────────────────────────────────────
export default function Hero() {
  const [ready, setReady] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setReady(true), 120);
    return () => clearTimeout(t);
  }, []);

  const titleWords = ["Full-Stack", "Engineer", "&", "Product", "Builder"];

  return (
    <section
      id="hero"
      style={{ minHeight: "100vh", display: "flex", alignItems: "center", padding: "0 2.5rem", position: "relative", overflow: "hidden" }}
    >
      {/* ── Grid background ──────────────────── */}
      <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(200,255,0,0.018) 1px, transparent 1px), linear-gradient(90deg, rgba(200,255,0,0.018) 1px, transparent 1px)", backgroundSize: "72px 72px" }} />

      {/* ── Noise overlay ───────────────────── */}
      <div style={{ position: "absolute", inset: 0, backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E\")", opacity: 0.028, mixBlendMode: "overlay", pointerEvents: "none" }} />

      {/* ── Scan line ───────────────────────── */}
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "1px", background: `linear-gradient(90deg, transparent, ${theme.accent}44, transparent)`, animation: "scanGlow 3s ease-in-out infinite" }} />

      {/* ── Gradient orbs ───────────────────── */}
      <div style={{ position: "absolute", top: "5%", right: "3%", width: "640px", height: "640px", borderRadius: "50%", background: "radial-gradient(circle, rgba(200,255,0,0.055) 0%, transparent 62%)", animation: "float 9s ease-in-out infinite" }} />
      <div style={{ position: "absolute", bottom: "10%", left: "8%", width: "440px", height: "440px", borderRadius: "50%", background: "radial-gradient(circle, rgba(123,94,167,0.065) 0%, transparent 62%)", animation: "float 11s ease-in-out infinite 2s" }} />
      <div style={{ position: "absolute", top: "55%", left: "45%", width: "280px", height: "280px", borderRadius: "50%", background: "radial-gradient(circle, rgba(0,212,255,0.04) 0%, transparent 65%)" }} />

      <div style={{ maxWidth: "1200px", margin: "0 auto", width: "100%", paddingTop: "7rem", position: "relative", zIndex: 10 }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr auto", gap: "5rem", alignItems: "center" }}>

          {/* ── Left: Text ─────────────────── */}
          <div>
            {/* Status badge */}
            <div style={{ display: "flex", alignItems: "center", gap: "0.8rem", marginBottom: "2.8rem", opacity: ready ? 1 : 0, transform: ready ? "none" : "translateY(18px)", transition: "all 0.8s 0.05s cubic-bezier(0.16,1,0.3,1)" }}>
              <div style={{ width: "9px", height: "9px", borderRadius: "50%", background: theme.accent, animation: "pulse-ring 3s ease-in-out infinite" }} />
              <span style={{ fontFamily: fonts.mono, fontSize: "0.72rem", color: theme.textMuted, letterSpacing: "0.14em" }}>// available_for_opportunities</span>
            </div>

            {/* Name */}
            <div style={{ marginBottom: "0.4rem" }}>
              <h1 style={{ fontFamily: fonts.display, fontSize: "clamp(3.8rem, 8.5vw, 7.5rem)", fontWeight: 800, letterSpacing: "-0.055em", lineHeight: 0.9, opacity: ready ? 1 : 0, transform: ready ? "none" : "translateY(80px)", transition: "all 1s 0.18s cubic-bezier(0.16,1,0.3,1)" }}>
                <span style={{ display: "block", color: theme.text }}>Aryan</span>
                <span className="gradient-text" style={{ display: "block" }}>Mehta</span>
              </h1>
            </div>

            {/* Title words */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.45rem", marginTop: "1.8rem", marginBottom: "2.8rem" }}>
              {titleWords.map((word, i) => (
                <span
                  key={i}
                  className={`hero-word ${ready ? "animate" : ""}`}
                  style={{ fontFamily: fonts.body, fontSize: "clamp(1rem, 2.2vw, 1.35rem)", color: i === 2 ? theme.accent : theme.textMuted, fontWeight: i === 2 ? 700 : 400, animationDelay: `${0.55 + i * 0.1}s` }}
                >
                  {word}
                </span>
              ))}
            </div>

            {/* CTAs */}
            <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", opacity: ready ? 1 : 0, transform: ready ? "none" : "translateY(20px)", transition: "all 0.8s 1.05s cubic-bezier(0.16,1,0.3,1)" }}>
              <a
                href="/cv.pdf"
                download
                target="_blank"
                rel="noreferrer"
                className="glow-btn"
                style={{ background: theme.accent, color: "#020207", borderRadius: "999px", padding: "0.88rem 2.2rem", fontWeight: 700, fontSize: "0.93rem", textDecoration: "none", fontFamily: fonts.body, display: "inline-block" }}
              >
                Download CV ↓
              </a>
              <button
                onClick={() => scrollTo("contact")}
                className="ghost-btn"
                style={{ background: "transparent", color: theme.text, border: `1px solid ${theme.border}`, borderRadius: "999px", padding: "0.88rem 2.1rem", fontWeight: 500, fontSize: "0.93rem", cursor: "pointer", fontFamily: fonts.body }}
              >
                Contact Me →
              </button>
            </div>

            {/* Meta links */}
            <div style={{ marginTop: "3rem", display: "flex", gap: "2.2rem", flexWrap: "wrap", opacity: ready ? 1 : 0, transition: "all 0.8s 1.25s cubic-bezier(0.16,1,0.3,1)" }}>
              {[
                ["📍", data.location, "location", null],
                ["✉️", data.email,    "email",    `mailto:${data.email}`],
                ["🐙", data.github,   "github",   data.github],
              ].map(([icon, val, type, href]) => (
                <a
                  key={val}
                  href={href || "#"}
                  target={type === "github" ? "_blank" : "_self"}
                  rel="noreferrer"
                  style={{ display: "flex", alignItems: "center", gap: "0.42rem", fontFamily: fonts.mono, fontSize: "0.7rem", color: theme.textMuted, textDecoration: "none", pointerEvents: type === "location" ? "none" : "auto" }}
                >
                  {icon} {val}
                </a>
              ))}
            </div>
          </div>

          {/* ── Right: Avatar + Stats ──────── */}
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "1.4rem", opacity: ready ? 1 : 0, transform: ready ? "none" : "scale(0.82) translateY(30px)", transition: "all 1s 0.38s cubic-bezier(0.16,1,0.3,1)" }}>

            {/* Avatar with spinning ring + orbiting dots */}
            <div style={{ position: "relative", marginBottom: "0.5rem" }}>
              {/* Spinning conic ring */}
              <div style={{ position: "absolute", inset: "-14px", borderRadius: "50%", background: `conic-gradient(${theme.accent} 0deg, transparent 70deg, transparent 110deg, ${theme.accent4} 180deg, transparent 250deg, transparent 290deg, ${theme.accent2} 360deg)`, animation: "spin-slow 10s linear infinite", opacity: 0.55 }} />
              {/* Photo */}
              <div style={{ width: "210px", height: "210px", borderRadius: "50%", overflow: "hidden", border: `3px solid ${theme.border}`, position: "relative", background: "#0D0D18", zIndex: 1 }}>
                <img
                  src="https://i.pravatar.cc/210?img=11"
                  alt={data.name}
                  style={{ width: "100%", height: "100%", objectFit: "cover", filter: "saturate(1.15) contrast(1.08)" }}
                  onError={(e) => { e.currentTarget.style.display = "none"; }}
                />
              </div>
              {/* Orbit 1 */}
              <div style={{ position: "absolute", inset: 0, zIndex: 2, animation: "orbit 6.5s linear infinite" }}>
                <div style={{ width: "11px", height: "11px", borderRadius: "50%", background: theme.accent, boxShadow: `0 0 14px ${theme.accent}` }} />
              </div>
              {/* Orbit 2 */}
              <div style={{ position: "absolute", inset: 0, zIndex: 2, animation: "orbit2 9.5s linear infinite" }}>
                <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: theme.accent4, boxShadow: `0 0 12px ${theme.accent4}` }} />
              </div>
            </div>

            {/* Stats */}
            {[
              { val: "7+",  label: "Years Exp." },
              { val: "40+", label: "Products Built" },
              { val: "5K+", label: "GitHub Stars" },
            ].map((s) => (
              <div key={s.label} style={{ background: theme.bgCard, border: `1px solid ${theme.border}`, borderRadius: "14px", padding: "0.85rem 1.6rem", textAlign: "center", width: "100%", position: "relative", overflow: "hidden" }}>
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, rgba(200,255,0,0.025) 0%, transparent 60%)" }} />
                <div style={{ fontFamily: fonts.display, fontSize: "1.85rem", fontWeight: 800, color: theme.accent, letterSpacing: "-0.04em", position: "relative" }}>{s.val}</div>
                <div style={{ fontFamily: fonts.mono, fontSize: "0.62rem", color: theme.textMuted, letterSpacing: "0.1em", textTransform: "uppercase", position: "relative" }}>{s.label}</div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}