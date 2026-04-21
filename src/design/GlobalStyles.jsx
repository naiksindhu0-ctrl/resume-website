import { theme } from "./tokens";

// ─────────────────────────────────────────────
//  GlobalStyles — injected CSS
//  Typography · Animations · Scrollbar · Utils
// ─────────────────────────────────────────────
export default function GlobalStyles() {
  return (
    <style>{`
      @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=DM+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400&family=JetBrains+Mono:wght@400;500;700&display=swap');

      *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
      html { scroll-behavior: smooth; }
      body {
        background: ${theme.bg};
        color: ${theme.text};
        font-family: 'DM Sans', sans-serif;
        overflow-x: hidden;
        cursor: none;
      }

      /* Scrollbar */
      ::-webkit-scrollbar { width: 3px; }
      ::-webkit-scrollbar-track { background: ${theme.bg}; }
      ::-webkit-scrollbar-thumb { background: #2A2A45; border-radius: 2px; }
      ::selection { background: rgba(200,255,0,0.22); color: #fff; }

      /* ── Keyframes ─────────────────────────────── */
      @keyframes float {
        0%,100% { transform: translateY(0px); }
        50%      { transform: translateY(-20px); }
      }
      @keyframes float2 {
        0%,100% { transform: translateY(0px); }
        50%      { transform: translateY(-12px); }
      }
      @keyframes pulse-ring {
        0%,100% { box-shadow: 0 0 0 0 rgba(200,255,0,0.5); }
        50%      { box-shadow: 0 0 0 16px rgba(200,255,0,0); }
      }
      @keyframes gradientShift {
        0%   { background-position: 0% 50%; }
        50%  { background-position: 100% 50%; }
        100% { background-position: 0% 50%; }
      }
      @keyframes orbit {
        from { transform: rotate(0deg)   translateX(108px) rotate(0deg); }
        to   { transform: rotate(360deg) translateX(108px) rotate(-360deg); }
      }
      @keyframes orbit2 {
        from { transform: rotate(120deg)  translateX(78px) rotate(-120deg); }
        to   { transform: rotate(480deg)  translateX(78px) rotate(-480deg); }
      }
      @keyframes spin-slow {
        from { transform: rotate(0deg); }
        to   { transform: rotate(360deg); }
      }
      @keyframes wordReveal {
        from { opacity: 0; transform: translateY(60px) skewY(4deg); }
        to   { opacity: 1; transform: translateY(0)    skewY(0); }
      }
      @keyframes fadeSlideUp {
        from { opacity: 0; transform: translateY(28px); }
        to   { opacity: 1; transform: translateY(0); }
      }
        @keyframes cardReveal {
  from {
    opacity: 0;
    transform: translateY(40px) scale(0.95) rotateX(15deg);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1) rotateX(0deg);
  }
}
      @keyframes scanGlow {
        0%,100% { opacity: 0.3; }
        50%     { opacity: 0.7; }
      }
      @keyframes borderPulse {
        0%,100% { border-color: rgba(200,255,0,0.1); }
        50%     { border-color: rgba(200,255,0,0.4); }
      }
      @keyframes shimmer {
        0%   { transform: translateX(-100%); }
        100% { transform: translateX(100%); }
      }

      h1, h2, h3, h4, h5 {
  background: linear-gradient(135deg, #C8FF00 0%, #00D4FF 50%, #7B5EA7 100%);
  background-size: 200% 200%;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  animation: gradientShift 6s ease infinite;
}

      /* ── Utility classes ───────────────────────── */
      .gradient-text {
        background: linear-gradient(135deg, #C8FF00 0%, #00D4FF 50%, #7B5EA7 100%);
        background-size: 200% 200%;
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
        animation: gradientShift 5s ease infinite;
      }

      .hero-word {
        display: inline-block;
        opacity: 0;
        transform: translateY(60px) skewY(4deg);
      }
      .hero-word.animate {
        animation: wordReveal 0.9s cubic-bezier(0.16,1,0.3,1) forwards;
      }

      /* ── Tilt card ─────────────────────────────── */
      .tilt-card {
        transition: transform 0.28s cubic-bezier(0.16,1,0.3,1);
        transform-style: preserve-3d;
        will-change: transform;
        position: relative;
        overflow: hidden;
      }
      .card-glow {
        position: absolute;
        width: 200px;
        height: 200px;
        border-radius: 50%;
        background: radial-gradient(circle, rgba(200,255,0,0.15) 0%, transparent 70%);
        transform: translate(-50%, -50%);
        pointer-events: none;
        opacity: 0;
        transition: opacity 0.35s;
      }

      /* ── Nav links ─────────────────────────────── */
      .nav-link { position: relative; }
      .nav-link::after {
        content: '';
        position: absolute;
        bottom: -3px; left: 0;
        width: 0; height: 1.5px;
        background: ${theme.accent};
        transition: width 0.3s cubic-bezier(0.16,1,0.3,1);
      }
      .nav-link.active::after,
      .nav-link:hover::after { width: 100%; }

      /* ── Skill pills ───────────────────────────── */
      .skill-pill { transition: all 0.2s cubic-bezier(0.16,1,0.3,1); cursor: default; }
      .skill-pill:hover {
        border-color: rgba(200,255,0,0.5) !important;
        color: ${theme.accent} !important;
        background: rgba(200,255,0,0.06) !important;
      }

      /* ── Cert icon ─────────────────────────────── */
      .cert-icon-wrap {
        font-size: 2.2rem;
        cursor: pointer;
        display: inline-block;
        transition: transform 0.35s cubic-bezier(0.34,1.56,0.64,1), filter 0.3s;
        user-select: none;
      }

      /* ── Buttons ───────────────────────────────── */
      .glow-btn {
        position: relative;
        overflow: hidden;
        box-shadow: 0 0 32px rgba(200,255,0,0.22);
        transition: all 0.25s cubic-bezier(0.16,1,0.3,1);
      }
      .glow-btn:hover {
        box-shadow: 0 0 48px rgba(200,255,0,0.38);
        transform: translateY(-2px);
      }
      .ghost-btn { transition: all 0.25s cubic-bezier(0.16,1,0.3,1); }
      .ghost-btn:hover {
        border-color: rgba(200,255,0,0.5) !important;
        color: ${theme.accent} !important;
        transform: translateY(-2px);
      }

      .proj-link-btn { transition: all 0.2s; }
      .proj-link-btn:hover {
        border-color: var(--proj-color) !important;
        color: var(--proj-color) !important;
      }

      /* ── Contact rows ──────────────────────────── */
      .contact-row { transition: all 0.2s; }
      .contact-row:hover {
        border-color: rgba(200,255,0,0.35) !important;
        background: rgba(200,255,0,0.025) !important;
      }

      /* ── Form inputs ───────────────────────────── */
      input:focus, textarea:focus {
        border-color: rgba(200,255,0,0.5) !important;
        box-shadow: 0 0 0 3px rgba(200,255,0,0.07);
        outline: none;
      }
      input, textarea { transition: border-color 0.2s, box-shadow 0.2s; }

      /* ── Page load shimmer ─────────────────────── */
      .shimmer::after {
        content: '';
        position: absolute;
        inset: 0;
        background: linear-gradient(90deg, transparent, rgba(255,255,255,0.03), transparent);
        animation: shimmer 2.2s infinite;
      }

      a { cursor: none; }
      button { cursor: none; }
    `}</style>
  );
}