import { useRef, useState, useEffect } from "react";
import { theme } from "../design/tokens";

// ─────────────────────────────────────────────
//  useInView — fires once when element enters viewport
// ─────────────────────────────────────────────
function useInView(threshold = 0.08) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setInView(true); obs.disconnect(); } },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, inView];
}

// ─────────────────────────────────────────────
//  SectionReveal — fade + slide up on scroll
// ─────────────────────────────────────────────
export function SectionReveal({ children }) {
  const [ref, inView] = useInView(0.08);
  return (
    <div
      ref={ref}
      style={{
        opacity:    inView ? 1 : 0,
        transform:  inView ? "none" : "translateY(44px)",
        transition: "opacity 0.9s cubic-bezier(0.16,1,0.3,1), transform 0.9s cubic-bezier(0.16,1,0.3,1)",
      }}
    >
      {children}
    </div>
  );
}

// ─────────────────────────────────────────────
//  StaggerItem — staggers children into view
// ─────────────────────────────────────────────
export function StaggerItem({ children, index = 0, style = {}, className = "" }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setTimeout(() => setVisible(true), index * 110);
          obs.disconnect();
        }
      },
      { threshold: 0.07 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [index]);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        ...style,
        opacity:    visible ? 1 : 0,
        transform:  visible ? "translateY(0) scale(1)" : "translateY(38px) scale(0.95)",
        transition: `opacity 0.75s cubic-bezier(0.16,1,0.3,1) ${index * 0.04}s, transform 0.75s cubic-bezier(0.16,1,0.3,1) ${index * 0.04}s`,
      }}
    >
      {children}
    </div>
  );
}

// ─────────────────────────────────────────────
//  AnimatedBar — skill level progress bar
// ─────────────────────────────────────────────
export function AnimatedBar({ level, color }) {
  const [w, setW] = useState(0);
  const ref = useRef();

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setTimeout(() => setW(level), 80); },
      { threshold: 0.5 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [level]);

  return (
    <div
      ref={ref}
      style={{ background: "#1A1A2E", borderRadius: "999px", height: "5px", overflow: "hidden", marginTop: "7px" }}
    >
      <div
        style={{
          width:      `${w}%`,
          height:     "100%",
          background: `linear-gradient(90deg, ${color}, ${color}88)`,
          borderRadius: "999px",
          transition: "width 1.5s cubic-bezier(0.16,1,0.3,1)",
          boxShadow:  `0 0 14px ${color}55`,
        }}
      />
    </div>
  );
}

// ─────────────────────────────────────────────
//  Section — shared section shell
//  id · label (mono) · heading · children
// ─────────────────────────────────────────────
export function Section({ id, label, heading, children }) {
  return (
    <section
      id={id}
      style={{
        padding:   "7rem 2.5rem",
        maxWidth:  "1200px",
        margin:    "0 auto",
        borderTop: `1px solid ${theme.border}`,
      }}
    >
      <SectionReveal>
        <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: "0.68rem", letterSpacing: "0.22em", color: theme.accent, textTransform: "uppercase", fontWeight: 500, marginBottom: "0.8rem" }}>
          {label}
        </div>
        <h2 style={{ fontFamily: "'Syne',sans-serif", fontSize: "clamp(2rem,4.5vw,3.3rem)", fontWeight: 800, letterSpacing: "-0.045em", lineHeight: 1.04, marginBottom: "3.8rem", color: theme.text }}>
          {heading}
        </h2>
        {children}
      </SectionReveal>
    </section>
  );
}