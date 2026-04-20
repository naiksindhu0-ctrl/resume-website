// ─────────────────────────────────────────────
//  App.jsx — root entry point
//
//  File structure:
//  src/
//  ├── design/
//  │   ├── tokens.js          ← colors, fonts, data, easing
//  │   └── GlobalStyles.jsx   ← injected CSS (animations, scrollbar)
//  ├── hooks/
//  │   ├── useScrollSpy.js    ← useScrollSpy, useInView, scrollTo
//  │   ├── useMagnet.js       ← useMagnet (spring), useTilt (3D card)
//  │   └── useParallax.js     ← useParallax, useMouseParallax
//  ├── components/
//  │   ├── Cursor.jsx         ← custom animated cursor
//  │   └── SectionReveal.jsx  ← SectionReveal, StaggerItem, AnimatedBar, Section
//  ├── sections/
//  │   ├── Hero.jsx           ← hero section
//  │   └── index.jsx          ← About, Experience, Education, Skills, Certs, Projects, Contact
//  └── App.jsx                ← YOU ARE HERE
// ─────────────────────────────────────────────

import { useState, useEffect } from "react";
import GlobalStyles           from "./design/GlobalStyles";
import { theme, data, fonts } from "./design/tokens";
import { useScrollSpy, scrollTo } from "./hooks/useScrollSpy";
import Cursor                 from "./components/Cursor";
import Hero                   from "./sections/Hero";
import {
  About,
  Experience,
  Education,
  Skills,
  Certifications,
  Projects,
  Contact,
} from "./sections/index";

// ── Nav ────────────────────────────────────────
const NAV_ITEMS = ["hero", "about", "experience", "education", "skills", "certifications", "projects", "contact"];

function Nav() {
  const active   = useScrollSpy(NAV_ITEMS);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);

  return (
    <nav style={{
      position:     "fixed",
      top: 0, left: 0, right: 0,
      zIndex:       300,
      display:      "flex",
      alignItems:   "center",
      justifyContent: "space-between",
      padding:      "1rem 2.5rem",
      background:   scrolled ? "rgba(2,2,7,0.94)" : "transparent",
      backdropFilter: scrolled ? "blur(28px)" : "none",
      borderBottom: scrolled ? `1px solid ${theme.border}` : "1px solid transparent",
      transition:   "all 0.5s cubic-bezier(0.16,1,0.3,1)",
    }}>
      {/* Logo */}
      <div style={{ fontFamily: fonts.display, fontSize: "1.45rem", fontWeight: 800, color: theme.accent, letterSpacing: "-0.05em" }}>
        AM<span style={{ color: "#3A3A55" }}>.</span>
      </div>

      {/* Links */}
      <ul style={{ display: "flex", gap: "2.2rem", listStyle: "none" }}>
        {NAV_ITEMS.slice(1).map((id) => (
          <li key={id}>
            <button
              onClick={() => scrollTo(id)}
              className={`nav-link ${active === id ? "active" : ""}`}
              style={{
                background: "none",
                border:     "none",
                color:      active === id ? theme.accent : theme.textMuted,
                fontWeight: active === id ? 600 : 400,
                fontSize:   "0.8rem",
                cursor:     "pointer",
                letterSpacing: "0.04em",
                textTransform: "capitalize",
                padding:    0,
                transition: "color 0.2s",
                fontFamily: fonts.body,
              }}
            >
              {id}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}

// ── Footer ─────────────────────────────────────
function Footer() {
  return (
    <footer style={{ borderTop: `1px solid ${theme.border}`, padding: "2.5rem", display: "flex", justifyContent: "space-between", alignItems: "center", maxWidth: "1200px", margin: "0 auto", flexWrap: "wrap", gap: "1rem" }}>
      <span style={{ fontFamily: fonts.display, fontWeight: 800, fontSize: "1.3rem", letterSpacing: "-0.045em", color: theme.accent }}>
        Aryan Mehta<span style={{ color: "#2A2A45" }}>.</span>
      </span>

      {/* Contact links — all open in new tab */}
      <div style={{ display: "flex", gap: "24px", flexWrap: "wrap" }}>
        <a href={`mailto:${data.email}`} style={{ fontFamily: fonts.mono, fontSize: "0.72rem", color: "#A1A1AA", textDecoration: "none" }}>
          ✉️ {data.email}
        </a>
        <a href={data.github} target="_blank" rel="noreferrer" style={{ fontFamily: fonts.mono, fontSize: "0.72rem", color: "#A1A1AA", textDecoration: "none" }}>
          🐙 github.com/aryangitmehta
        </a>
        <a href={data.linkedin} target="_blank" rel="noreferrer" style={{ fontFamily: fonts.mono, fontSize: "0.72rem", color: "#A1A1AA", textDecoration: "none" }}>
          💼 linkedin.com/in/aryanmehta
        </a>
      </div>

      <span style={{ fontFamily: fonts.display, fontSize: "0.75rem", color: theme.textMuted }}>
        © 2025 · Built with React · Bangalore, India
      </span>
    </footer>
  );
}

// ── App root ───────────────────────────────────
export default function App() {
  return (
    <div style={{ background: theme.bg, color: theme.text, minHeight: "100vh", overflowX: "hidden" }}>
      <GlobalStyles />
      <Cursor />
      <Nav />

      <Hero />

      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <About />
        <Experience />
        <Education />
        <Skills />
        <Certifications />
        <Projects />
        <Contact />
      </div>

      <Footer />
    </div>
  );
}