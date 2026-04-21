import { useRef, useState, useEffect } from "react";
import { theme, data, fonts } from "../design/tokens";
import { useTilt, useMagnet } from "../hooks/useMagnet";
import { Section, StaggerItem, AnimatedBar } from "../components/SectionReveal";

// ─────────────────────────────────────────────
//  Skills
// ─────────────────────────────────────────────
export function Skills() {
  const cats = Object.keys(data.skills);
  const [active, setActive] = useState(cats[0]);
  return (
    <Section id="skills" label="// skills" heading="Technical Arsenal" accent={theme.gold}>
      <div style={{ display: "flex", gap: "0.55rem", flexWrap: "wrap", marginBottom: "3rem" }}>
        {cats.map((c) => (
          <button key={c} onClick={() => setActive(c)}
            style={{ background: active === c ? "linear-gradient(135deg,#A78BFA,#F9A8D4)" : theme.bgCard, color: active === c ? "#050508" : theme.textMuted, border: `1px solid ${active === c ? "transparent" : theme.border}`, borderRadius: "999px", padding: "0.55rem 1.4rem", fontWeight: active === c ? 700 : 400, fontSize: "0.8rem", cursor: "pointer", fontFamily: fonts.body, transition: "all 0.25s cubic-bezier(0.16,1,0.3,1)", boxShadow: active === c ? "0 0 28px rgba(167,139,250,0.3)" : "none", letterSpacing: "0.02em" }}>
            {c}
          </button>
        ))}
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "3.5rem", alignItems: "start" }}>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.65rem" }}>
          {data.skills[active].map((s, i) => (
            <StaggerItem key={`${active}-${s}`} index={i}>
              <span className="skill-pill"
                style={{ background: theme.bgCard2, border: `1px solid ${theme.borderHi}`, borderRadius: "10px", padding: "0.6rem 1.2rem", fontSize: "0.84rem", color: theme.text, fontWeight: 400, fontFamily: fonts.mono, display: "inline-block", letterSpacing: "0.02em" }}>
                {s}
              </span>
            </StaggerItem>
          ))}
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
          {data.skills[active].filter((s) => data.skillLevels[s]).map((s, i) => (
            <StaggerItem key={`bar-${active}-${s}`} index={i}>
              <div>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.78rem", marginBottom: "4px" }}>
                  <span style={{ fontWeight: 500, fontFamily: fonts.mono, color: theme.text, letterSpacing: "0.04em" }}>{s}</span>
                  <span style={{ color: theme.accent, fontWeight: 700, fontFamily: fonts.mono }}>{data.skillLevels[s]}%</span>
                </div>
                <AnimatedBar level={data.skillLevels[s]} color={theme.accent} />
              </div>
            </StaggerItem>
          ))}
        </div>
      </div>
    </Section>
  );
}

// ─────────────────────────────────────────────
//  Certifications — cinematic flip + stagger
// ─────────────────────────────────────────────
function CertCard({ cert, index }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  const [flipped, setFlipped] = useState(false);
  const { ref: magRef, onMouseMove, onMouseLeave } = useMagnet({ strength: 10, rotate: 14, scale: 1.18 });

  useEffect(() => {
  const node = ref.current;
  if (!node) return;

  const obs = new IntersectionObserver(
    ([e]) => {
      if (e.isIntersecting) {
        setTimeout(() => setVisible(true), index * 130);
        obs.unobserve(node);
      }
    },
    { threshold: 0.1 }
  );

  obs.observe(node);

  return () => obs.unobserve(node);
}, [index]);

  return (
    <div ref={ref} className={`cert-card${visible ? " show" : ""}`}
      style={{ animationDelay: `${index * 0.13}s`, perspective: "1000px", cursor: "pointer" }}
      onClick={() => setFlipped(!flipped)}>
    <div
  style={{
    width: "100%",
    height: "200px",
    position: "relative",
    transformStyle: "preserve-3d",
    transition: "transform 0.7s cubic-bezier(0.16,1,0.3,1)",
    transform: flipped ? "rotateY(180deg)" : "rotateY(0)",
    willChange: "transform"
  }}
>

        {/* Front */}
        <div style={{ position: "absolute", inset: 0, backfaceVisibility: "hidden", background: `linear-gradient(135deg, ${theme.bgCard}, ${theme.bgCard2})`, border: `1px solid ${theme.border}`, borderRadius: "20px", padding: "1.8rem", display: "flex", flexDirection: "column", gap: "0.8rem", overflow: "hidden" }}>
          <div style={{ position: "absolute", inset: 0, background: `linear-gradient(135deg, ${cert.color}08 0%, transparent 60%)`, borderRadius: "inherit" }} />
          <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "2px", background: `linear-gradient(90deg, ${cert.color}, transparent)` }} />
          <div ref={magRef} onMouseMove={onMouseMove} onMouseLeave={onMouseLeave}
            style={{ fontSize: "2.4rem", display: "inline-block", transition: "transform 0.35s cubic-bezier(0.34,1.56,0.64,1), filter 0.3s", filter: `drop-shadow(0 0 14px ${cert.color}80)` }}>
            {cert.icon}
          </div>
          <div style={{ fontFamily: fonts.display, fontWeight: 700, fontSize: "0.95rem", color: theme.text, lineHeight: 1.3, fontStyle: "italic", position: "relative" }}>{cert.name}</div>
          <div style={{ fontSize: "0.72rem", color: theme.textMuted, fontFamily: fonts.body, position: "relative" }}>{cert.org}</div>
          <div style={{ position: "absolute", bottom: "1.2rem", right: "1.2rem", fontFamily: fonts.mono, fontSize: "0.62rem", color: cert.color, background: `${cert.color}14`, border: `1px solid ${cert.color}28`, borderRadius: "999px", padding: "0.22rem 0.75rem" }}>{cert.year}</div>
          <div style={{ position: "absolute", bottom: "1rem", left: "50%", transform: "translateX(-50%)", fontFamily: fonts.mono, fontSize: "0.55rem", color: theme.textDim, letterSpacing: "0.1em" }}>TAP TO FLIP</div>
        </div>

        {/* Back */}
        <div style={{ position: "absolute", inset: 0, backfaceVisibility: "hidden", transform: "rotateY(180deg)", background: `linear-gradient(135deg, ${cert.color}15, ${theme.bgCard})`, border: `1px solid ${cert.color}44`, borderRadius: "20px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "0.8rem", padding: "1.8rem" }}>
          <div style={{ fontSize: "3rem", filter: `drop-shadow(0 0 20px ${cert.color})` }}>{cert.icon}</div>
          <div style={{ fontFamily: fonts.display, fontWeight: 700, fontSize: "1.1rem", color: cert.color, textAlign: "center", fontStyle: "italic" }}>{cert.name}</div>
          <div style={{ fontFamily: fonts.mono, fontSize: "0.7rem", color: theme.textMuted, textAlign: "center" }}>Issued by {cert.org}</div>
          <div style={{ fontFamily: fonts.mono, fontSize: "0.75rem", color: cert.color, background: `${cert.color}18`, borderRadius: "999px", padding: "0.3rem 1rem" }}>✓ Verified {cert.year}</div>
        </div>
      </div>
    </div>
  );
}

export function Certifications() {
  return (
    <Section id="certifications" label="// certifications" heading="Credentials" accent={theme.rose}>
      <div style={{ marginBottom: "1.2rem", fontFamily: fonts.mono, fontSize: "0.64rem", color: theme.textMuted, letterSpacing: "0.1em" }}>TAP CARDS TO FLIP ↓</div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "1.2rem" }}>
        {data.certifications.map((c, i) => <CertCard key={i} cert={c} index={i} />)}
      </div>
    </Section>
  );
}

// ─────────────────────────────────────────────
//  Projects — bento-style cinematic spread
// ─────────────────────────────────────────────
const bentoSizes = [
  { gridColumn: "span 2", gridRow: "span 1" },
  { gridColumn: "span 1", gridRow: "span 1" },
  { gridColumn: "span 1", gridRow: "span 1" },
  { gridColumn: "span 2", gridRow: "span 1" },
];

function ProjectCard({ project, index, bentSize }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  const tilt = useTilt(8);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setTimeout(() => setVisible(true), index * 140); obs.disconnect(); } },
      { threshold: 0.08 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [index]);

  return (
    <div ref={ref} className={`proj-card${visible ? " show" : ""}`}
      style={{ animationDelay: `${index * 0.14}s`, ...bentSize }}>
      <div className="tilt-card holo-card"
        style={{ background: theme.bgCard, border: `1px solid ${theme.border}`, borderRadius: "24px", padding: "2rem", display: "flex", flexDirection: "column", gap: "1rem", position: "relative", overflow: "hidden", height: "100%", minHeight: "180px" }}
        {...tilt}>
        <div className="card-glow" />

        {/* Top accent line */}
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "2px", background: `linear-gradient(90deg, ${project.color}, ${project.color}00)` }} />
        {/* Glow corner */}
        <div style={{ position: "absolute", top: 0, right: 0, width: "120px", height: "120px", background: `radial-gradient(circle at 80% 20%, ${project.color}12 0%, transparent 70%)` }} />

        {/* Year badge */}
        <div style={{ position: "absolute", top: "1.4rem", right: "1.4rem", fontFamily: fonts.mono, fontSize: "0.6rem", color: theme.textDim, letterSpacing: "0.1em" }}>{project.year}</div>

        {/* Header */}
        <div style={{ display: "flex", alignItems: "center", gap: "0.9rem" }}>
          <div style={{ width: "10px", height: "10px", borderRadius: "50%", background: project.color, boxShadow: `0 0 12px ${project.color}, 0 0 24px ${project.color}60`, flexShrink: 0, animation: "pulseGlow 3s ease-in-out infinite" }} />
          <div style={{ fontFamily: fonts.display, fontWeight: 800, fontSize: index === 0 || index === 3 ? "1.3rem" : "1.1rem", letterSpacing: "-0.025em", color: theme.text, fontStyle: "italic" }}>{project.name}</div>
        </div>

        <p style={{ fontSize: "0.85rem", color: theme.textMuted, lineHeight: 1.72, flex: 1, fontWeight: 300 }}>{project.desc}</p>

        {/* Tags + link */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "0.6rem" }}>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
            {project.tags.map((t) => (
              <span key={t} style={{ background: `${project.color}0E`, color: project.color, border: `1px solid ${project.color}22`, borderRadius: "6px", padding: "0.2rem 0.65rem", fontSize: "0.68rem", fontFamily: fonts.mono, fontWeight: 600 }}>{t}</span>
            ))}
          </div>
          <a href={project.link} target="_blank" rel="noreferrer"
            style={{ color: theme.textMuted, textDecoration: "none", background: theme.bgCard2, border: `1px solid ${theme.borderHi}`, borderRadius: "10px", width: "34px", height: "34px", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, fontSize: "0.9rem", transition: "all 0.2s", '--c': project.color }}
            onMouseEnter={(e) => { e.currentTarget.style.borderColor = project.color; e.currentTarget.style.color = project.color; e.currentTarget.style.boxShadow = `0 0 16px ${project.color}44`; }}
            onMouseLeave={(e) => { e.currentTarget.style.borderColor = theme.borderHi; e.currentTarget.style.color = theme.textMuted; e.currentTarget.style.boxShadow = "none"; }}>
            ↗
          </a>
        </div>
      </div>
    </div>
  );
}

export function Projects() {
  return (
    <Section id="projects" label="// projects" heading="Things I've Built" accent={theme.cyan}>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1.2rem", gridAutoRows: "auto" }}>
        {data.projects.map((p, i) => (
          <ProjectCard key={i} project={p} index={i} bentSize={bentoSizes[i]} />
        ))}
      </div>
    </Section>
  );
}

// ─────────────────────────────────────────────
//  Contact
// ─────────────────────────────────────────────
export function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false); setSent(true);
      setTimeout(() => setSent(false), 3500);
      setForm({ name: "", email: "", message: "" });
    }, 1500);
  }

  const inputStyle = {
    background: theme.bgCard2, border: `1px solid ${theme.borderHi}`, borderRadius: "14px",
    padding: "0.95rem 1.3rem", color: theme.text, fontSize: "0.92rem", width: "100%",
    boxSizing: "border-box", fontFamily: fonts.body, caretColor: theme.accent, fontWeight: 300,
  };

  const contactLinks = [
    { icon: "✉️", label: "Email",     val: data.email,    href: `mailto:${data.email}`, newTab: false },
    { icon: "🔗", label: "LinkedIn",  val: data.linkedin, href: data.linkedin,           newTab: true  },
    { icon: "🐙", label: "GitHub",    val: data.github,   href: data.github,             newTab: true  },
    { icon: "💬", label: "WhatsApp",  val: "Chat on WhatsApp", href: data.whatsapp,      newTab: true  },
  ];

  return (
    <Section id="contact" label="// contact" heading="Let's Talk" accent={theme.accent}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1.5fr", gap: "5rem", alignItems: "start" }}>
        <div>
          <p style={{ fontSize: "1.04rem", color: theme.textMuted, lineHeight: 1.95, marginBottom: "2.8rem", fontWeight: 300 }}>
            Open to senior/staff engineering roles, technical advisory, and interesting open source collaborations. Let's build something remarkable.
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.9rem" }}>
            {contactLinks.map((l, i) => (
              <StaggerItem key={l.label} index={i}>
                <div className="contact-row" style={{ display: "flex", gap: "1rem", alignItems: "center", padding: "1.1rem 1.4rem", background: theme.bgCard, borderRadius: "14px", border: `1px solid ${theme.border}`, cursor: "default" }}>
                  <span style={{ fontSize: "1.3rem" }}>{l.icon}</span>
                  <div>
                    <div style={{ fontFamily: fonts.mono, fontSize: "0.62rem", color: theme.textMuted, letterSpacing: "0.1em", marginBottom: "0.18rem" }}>{l.label}</div>
                    <a href={l.href} target={l.newTab ? "_blank" : "_self"} rel="noreferrer"
                      style={{ fontSize: "0.86rem", color: theme.accent, fontWeight: 500, textDecoration: "none", fontFamily: fonts.body }}>
                      {l.val}
                    </a>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </div>
        </div>

        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.1rem" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.1rem" }}>
            <input style={inputStyle} placeholder="Your Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
            <input style={inputStyle} placeholder="Email Address" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />
          </div>
          <textarea style={{ ...inputStyle, minHeight: "175px", resize: "vertical" }} placeholder="Your message…" value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} required />
          <button type="submit" disabled={loading}
            style={{ background: sent ? "rgba(167,139,250,0.08)" : loading ? theme.bgCard2 : "linear-gradient(135deg, #A78BFA, #F9A8D4)", color: sent ? theme.accent : loading ? theme.textMuted : "#050508", border: sent ? `1px solid ${theme.accent}44` : "none", borderRadius: "14px", padding: "1.05rem", fontWeight: 700, fontSize: "0.95rem", cursor: loading ? "wait" : "pointer", transition: "all 0.35s cubic-bezier(0.16,1,0.3,1)", fontFamily: fonts.body, boxShadow: !sent && !loading ? "0 12px 40px rgba(167,139,250,0.3)" : "none", letterSpacing: "0.03em" }}>
            {sent ? "✓ Message Sent — Thank you!" : loading ? "Sending…" : "Send Message →"}
          </button>
        </form>
      </div>
    </Section>
  );
}