import { useState, useRef } from "react";
import { theme, data, fonts } from "../design/tokens";
import { useTilt } from "../hooks/useMagnet";
import { useMagnet } from "../hooks/useMagnet";
import { Section, StaggerItem, AnimatedBar } from "../components/SectionReveal";

// ─────────────────────────────────────────────
//  About
// ─────────────────────────────────────────────
export function About() {
  const aboutCards = [
    { line1: "Open Source", line2: "Contributor", sub: "Since 2019" },
    { line1: "Technical",   line2: "Writer",       sub: "100K+ reads" },
    { line1: "Conference",  line2: "Speaker",      sub: "8 talks" },
    { line1: "Mentor",      line2: "& Coach",      sub: "25+ mentees" },
  ];

  return (
    <Section id="about" label="// about" heading="Who I Am">
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4.5rem", alignItems: "start" }}>

        {/* Left: Bio */}
        <div>
          <p style={{ fontSize: "1.08rem", lineHeight: 1.92, color: theme.textMuted, marginBottom: "1.8rem" }}>{data.about}</p>
          <p style={{ fontSize: "0.97rem", lineHeight: 1.88, color: theme.textMuted, marginBottom: "2.2rem" }}>
            I specialize in building systems that scale gracefully — from 0 to millions — while keeping codebases maintainable and teams happy. When not coding, I contribute to open source, write technical articles, or mentor junior devs.
          </p>
          <div>
            <div style={{ fontFamily: fonts.mono, fontSize: "0.67rem", color: theme.accent, letterSpacing: "0.18em", textTransform: "uppercase", fontWeight: 600, marginBottom: "1rem" }}>Key Strengths</div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.55rem" }}>
              {data.strengths.map((s) => (
                <span key={s} style={{ background: "rgba(200,255,0,0.055)", border: "1px solid rgba(200,255,0,0.22)", borderRadius: "999px", padding: "0.48rem 1.1rem", fontSize: "0.83rem", color: theme.accent, fontWeight: 500 }}>{s}</span>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Cards */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
          {aboutCards.map((card, i) => {
            const tilt = useTilt(9);
            return (
              <StaggerItem key={card.line1} index={i}>
                <div className="tilt-card" style={{ background: theme.bgCard, border: `1px solid ${theme.border}`, borderRadius: "18px", padding: "1.6rem", cursor: "default" }} {...tilt}>
                  <div className="card-glow" />
                  <div style={{ fontFamily: fonts.display, fontWeight: 700, fontSize: "1.02rem", color: theme.text, lineHeight: 1.2 }}>{card.line1}</div>
                  <div style={{ fontFamily: fonts.display, fontWeight: 700, fontSize: "1.02rem", color: theme.accent, marginBottom: "0.6rem" }}>{card.line2}</div>
                  <div style={{ fontFamily: fonts.mono, fontSize: "0.7rem", color: theme.textMuted }}>{card.sub}</div>
                </div>
              </StaggerItem>
            );
          })}
        </div>
      </div>
    </Section>
  );
}

// ─────────────────────────────────────────────
//  Experience
// ─────────────────────────────────────────────
export function Experience() {
  const [openIdx, setOpenIdx] = useState(0);

  return (
    <Section id="experience" label="// experience" heading="Where I've Worked">
      <div style={{ position: "relative" }}>
        {/* Timeline line */}
        <div style={{ position: "absolute", left: "17px", top: 0, bottom: 0, width: "1px", background: `linear-gradient(to bottom, transparent, ${theme.border} 8%, ${theme.border} 92%, transparent)` }} />

        <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
          {data.experience.map((exp, i) => {
            const tilt = useTilt(7);
            return (
              <StaggerItem key={i} index={i} style={{ paddingLeft: "3.5rem", position: "relative" }}>
                {/* Timeline dot */}
                <div
                  onClick={() => setOpenIdx(openIdx === i ? -1 : i)}
                  style={{ position: "absolute", left: "9px", top: "1.5rem", width: "18px", height: "18px", borderRadius: "50%", background: openIdx === i ? exp.color : theme.bg, border: `2px solid ${exp.color}`, cursor: "pointer", transition: "all 0.28s cubic-bezier(0.16,1,0.3,1)", zIndex: 2, boxShadow: openIdx === i ? `0 0 20px ${exp.color}60` : "none" }}
                />

                <div
                  onClick={() => setOpenIdx(openIdx === i ? -1 : i)}
                  className="tilt-card"
                  style={{ background: openIdx === i ? `linear-gradient(135deg, ${exp.color}05, transparent)` : theme.bgCard, border: `1px solid ${openIdx === i ? exp.color + "40" : theme.border}`, borderRadius: "18px", padding: "1.8rem 2rem", cursor: "pointer", transition: "all 0.32s cubic-bezier(0.16,1,0.3,1)" }}
                  {...tilt}
                >
                  <div className="card-glow" />
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "0.5rem" }}>
                    <div>
                      <div style={{ fontFamily: fonts.mono, fontSize: "0.68rem", color: exp.color, fontWeight: 600, letterSpacing: "0.12em", marginBottom: "0.45rem", textTransform: "uppercase" }}>{exp.company}</div>
                      <div style={{ fontFamily: fonts.display, fontSize: "1.22rem", fontWeight: 700, letterSpacing: "-0.025em" }}>{exp.role}</div>
                    </div>
                    <div style={{ textAlign: "right" }}>
                      <div style={{ fontFamily: fonts.mono, fontSize: "0.7rem", color: theme.textMuted, background: theme.bgCard2, border: `1px solid ${theme.border}`, borderRadius: "999px", padding: "0.32rem 0.9rem" }}>{exp.duration}</div>
                      <div style={{ fontFamily: fonts.mono, fontSize: "0.68rem", color: theme.textMuted, marginTop: "0.38rem" }}>{exp.location}</div>
                    </div>
                  </div>

                  {openIdx === i && (
                    <div style={{ marginTop: "1.5rem", paddingTop: "1.3rem", borderTop: `1px solid ${theme.border}` }}>
                      {exp.points.map((p, j) => (
                        <div key={j} style={{ display: "flex", gap: "0.8rem", marginBottom: "0.8rem", opacity: 0, transform: "translateX(-18px)", animation: `fadeSlideUp 0.5s cubic-bezier(0.16,1,0.3,1) ${j * 0.1}s forwards` }}>
                          <span style={{ color: exp.color, flexShrink: 0, fontWeight: 700, fontSize: "1rem", marginTop: "1px" }}>→</span>
                          <span style={{ fontSize: "0.9rem", color: theme.textMuted, lineHeight: 1.72 }}>{p}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </StaggerItem>
            );
          })}
        </div>
      </div>
    </Section>
  );
}

// ─────────────────────────────────────────────
//  Education
// ─────────────────────────────────────────────
export function Education() {
  return (
    <Section id="education" label="// education" heading="Academic Background">
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1.5rem" }}>
        {data.education.map((ed, i) => {
          const tilt = useTilt(11);
          return (
            <StaggerItem key={i} index={i}>
              <div className="tilt-card" style={{ background: theme.bgCard, border: `1px solid ${theme.border}`, borderTop: `3px solid ${ed.color}`, borderRadius: "18px", padding: "2rem", position: "relative", overflow: "hidden", cursor: "default" }} {...tilt}>
                <div className="card-glow" />
                <div style={{ position: "absolute", top: 0, right: 0, width: "110px", height: "110px", background: `radial-gradient(circle at 80% 20%, ${ed.color}12 0%, transparent 70%)` }} />
                <div style={{ fontFamily: fonts.mono, fontSize: "0.68rem", color: ed.color, fontWeight: 600, letterSpacing: "0.14em", marginBottom: "1.1rem", textTransform: "uppercase" }}>{ed.year}</div>
                <div style={{ fontFamily: fonts.display, fontSize: "1.2rem", fontWeight: 700, marginBottom: "0.5rem", letterSpacing: "-0.025em" }}>{ed.institution}</div>
                <div style={{ fontSize: "0.9rem", color: theme.textMuted, marginBottom: ed.gpa ? "1.3rem" : 0 }}>{ed.degree}</div>
                {ed.gpa && (
                  <div style={{ display: "inline-flex", alignItems: "center", background: `${ed.color}12`, border: `1px solid ${ed.color}28`, borderRadius: "999px", padding: "0.33rem 1rem" }}>
                    <span style={{ fontFamily: fonts.mono, fontSize: "0.7rem", color: ed.color, fontWeight: 700 }}>GPA {ed.gpa}</span>
                  </div>
                )}
              </div>
            </StaggerItem>
          );
        })}
      </div>
    </Section>
  );
}

// ─────────────────────────────────────────────
//  Skills
// ─────────────────────────────────────────────
export function Skills() {
  const cats = Object.keys(data.skills);
  const [active, setActive] = useState(cats[0]);

  return (
    <Section id="skills" label="// skills" heading="Technical Arsenal">
      {/* Tab bar */}
      <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", marginBottom: "2.8rem" }}>
        {cats.map((c) => (
          <button
            key={c}
            onClick={() => setActive(c)}
            style={{ background: active === c ? theme.accent : theme.bgCard, color: active === c ? "#020207" : theme.textMuted, border: `1px solid ${active === c ? theme.accent : theme.border}`, borderRadius: "999px", padding: "0.52rem 1.25rem", fontWeight: active === c ? 700 : 500, fontSize: "0.8rem", cursor: "pointer", fontFamily: fonts.body, transition: "all 0.22s cubic-bezier(0.16,1,0.3,1)", boxShadow: active === c ? "0 0 22px rgba(200,255,0,0.22)" : "none" }}
          >
            {c}
          </button>
        ))}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "3rem", alignItems: "start" }}>
        {/* Pills */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.6rem" }}>
          {data.skills[active].map((s, i) => (
            <StaggerItem key={`${active}-${s}`} index={i}>
              <span className="skill-pill" style={{ background: theme.bgCard2, border: `1px solid ${theme.border}`, borderRadius: "8px", padding: "0.58rem 1.12rem", fontSize: "0.86rem", color: theme.text, fontWeight: 500, fontFamily: fonts.mono, display: "inline-block" }}>
                {s}
              </span>
            </StaggerItem>
          ))}
        </div>

        {/* Bars */}
        <div style={{ display: "flex", flexDirection: "column", gap: "1.3rem" }}>
          {data.skills[active].filter((s) => data.skillLevels[s]).map((s, i) => (
            <StaggerItem key={`bar-${active}-${s}`} index={i}>
              <div>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.8rem", marginBottom: "5px" }}>
                  <span style={{ fontWeight: 600, fontFamily: fonts.mono, color: theme.text }}>{s}</span>
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
//  Certifications
// ─────────────────────────────────────────────
function CertIconMagnet({ icon, color }) {
  const { ref, onMouseMove, onMouseLeave } = useMagnet({ strength: 12, rotate: 18, scale: 1.22 });
  return (
    <div ref={ref} className="cert-icon-wrap" onMouseMove={onMouseMove} onMouseLeave={onMouseLeave}
      style={{ transition: "transform 0.35s cubic-bezier(0.34,1.56,0.64,1), filter 0.3s" }}>
      {icon}
    </div>
  );
}

export function Certifications() {
  return (
    <Section id="certifications" label="// certifications" heading="Credentials">
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(210px, 1fr))", gap: "1.2rem" }}>
        {data.certifications.map((c, i) => {
          const tilt = useTilt(13);
          return (
            <StaggerItem key={i} index={i}>
              <div className="tilt-card" style={{ background: theme.bgCard, border: `1px solid ${theme.border}`, borderRadius: "18px", padding: "1.8rem", display: "flex", flexDirection: "column", gap: "0.9rem", cursor: "default", position: "relative", overflow: "hidden" }} {...tilt}>
                <div className="card-glow" />
                <div style={{ position: "absolute", top: 0, right: 0, width: "70px", height: "70px", background: `radial-gradient(circle at 80% 20%, ${c.color}18 0%, transparent 70%)` }} />
                <CertIconMagnet icon={c.icon} color={c.color} />
                <div style={{ fontFamily: fonts.display, fontWeight: 700, fontSize: "0.93rem", lineHeight: 1.35, color: theme.text }}>{c.name}</div>
                <div style={{ fontSize: "0.74rem", color: theme.textMuted }}>{c.org}</div>
                <div style={{ display: "inline-flex", alignSelf: "flex-start", background: `${c.color}14`, border: `1px solid ${c.color}28`, borderRadius: "999px", padding: "0.28rem 0.82rem" }}>
                  <span style={{ fontFamily: fonts.mono, fontSize: "0.67rem", color: c.color, fontWeight: 700 }}>{c.year}</span>
                </div>
              </div>
            </StaggerItem>
          );
        })}
      </div>
    </Section>
  );
}

// ─────────────────────────────────────────────
//  Projects — all links open in new tab
// ─────────────────────────────────────────────
export function Projects() {
  return (
    <Section id="projects" label="// projects" heading="Things I've Built">
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(255px, 1fr))", gap: "1.25rem" }}>
        {data.projects.map((p, i) => {
          const tilt = useTilt(11);
          return (
            <StaggerItem key={i} index={i}>
              <div className="tilt-card" style={{ background: theme.bgCard, border: `1px solid ${theme.border}`, borderRadius: "18px", padding: "1.8rem", display: "flex", flexDirection: "column", gap: "0.88rem", position: "relative", overflow: "hidden", cursor: "default" }} {...tilt}>
                <div className="card-glow" />
                {/* Color top bar */}
                <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "2.5px", background: `linear-gradient(90deg, ${p.color}, ${p.color}00)` }} />
                <div style={{ position: "absolute", top: 0, right: 0, width: "90px", height: "90px", background: `radial-gradient(circle at 80% 20%, ${p.color}10 0%, transparent 70%)` }} />

                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                  <div style={{ fontFamily: fonts.display, fontWeight: 800, fontSize: "1.08rem", letterSpacing: "-0.025em", color: theme.text }}>{p.name}</div>
                  {/* NEW TAB link */}
                  <a
                    href={p.link}
                    target="_blank"
                    rel="noreferrer"
                    className="proj-link-btn"
                    style={{ color: theme.textMuted, fontSize: "0.9rem", textDecoration: "none", background: theme.bgCard2, border: `1px solid ${theme.border}`, borderRadius: "8px", width: "32px", height: "32px", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, "--proj-color": p.color }}
                  >
                    ↗
                  </a>
                </div>

                <p style={{ fontSize: "0.86rem", color: theme.textMuted, lineHeight: 1.68, flex: 1 }}>{p.desc}</p>

                <div style={{ display: "flex", flexWrap: "wrap", gap: "0.42rem" }}>
                  {p.tags.map((t) => (
                    <span key={t} style={{ background: `${p.color}0E`, color: p.color, border: `1px solid ${p.color}22`, borderRadius: "5px", padding: "0.22rem 0.65rem", fontSize: "0.7rem", fontFamily: fonts.mono, fontWeight: 600 }}>{t}</span>
                  ))}
                </div>
              </div>
            </StaggerItem>
          );
        })}
      </div>
    </Section>
  );
}

// ─────────────────────────────────────────────
//  Contact
// ─────────────────────────────────────────────
export function Contact() {
  const [form,    setForm]    = useState({ name: "", email: "", message: "" });
  const [sent,    setSent]    = useState(false);
  const [loading, setLoading] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSent(true);
      setTimeout(() => setSent(false), 3200);
      setForm({ name: "", email: "", message: "" });
    }, 1400);
  }

  const inputStyle = {
    background:  theme.bgCard2,
    border:      `1px solid ${theme.border}`,
    borderRadius:"12px",
    padding:     "0.92rem 1.2rem",
    color:       theme.text,
    fontSize:    "0.92rem",
    width:       "100%",
    boxSizing:   "border-box",
    fontFamily:  fonts.body,
    caretColor:  theme.accent,
  };

  const contactLinks = [
    { icon: "✉️", label: "Email",    val: data.email,    href: `mailto:${data.email}`,  newTab: false },
    { icon: "🔗", label: "LinkedIn", val: data.linkedin, href: data.linkedin,            newTab: true  },
    { icon: "🐙", label: "GitHub",   val: data.github,   href: data.github,              newTab: true  },
  ];

  return (
    <Section id="contact" label="// contact" heading="Let's Talk">
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1.45fr", gap: "5rem", alignItems: "start" }}>

        {/* Left */}
        <div>
          <p style={{ fontSize: "1.04rem", color: theme.textMuted, lineHeight: 1.88, marginBottom: "2.5rem" }}>
            Open to senior/staff engineering roles, technical advisory, and interesting open source collaborations. Let's build something remarkable.
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.85rem" }}>
            {contactLinks.map((l, i) => (
              <StaggerItem key={l.label} index={i}>
                <div className="contact-row" style={{ display: "flex", gap: "1rem", alignItems: "center", padding: "1rem 1.25rem", background: theme.bgCard, borderRadius: "12px", border: `1px solid ${theme.border}` }}>
                  <span style={{ fontSize: "1.2rem" }}>{l.icon}</span>
                  <div>
                    <div style={{ fontFamily: fonts.mono, fontSize: "0.64rem", color: theme.textMuted }}>{l.label}</div>
                    <a
                      href={l.href}
                      target={l.newTab ? "_blank" : "_self"}
                      rel="noreferrer"
                      style={{ fontSize: "0.86rem", color: theme.accent, fontWeight: 500, textDecoration: "none" }}
                    >
                      {l.val}
                    </a>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </div>
        </div>

        {/* Right: Form */}
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
            <input style={inputStyle} placeholder="Your Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
            <input style={inputStyle} placeholder="Email Address" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />
          </div>
          <textarea style={{ ...inputStyle, minHeight: "165px", resize: "vertical" }} placeholder="Your message..." value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} required />
          <button
            type="submit"
            disabled={loading}
            style={{ background: sent ? "rgba(200,255,0,0.08)" : loading ? "#131325" : theme.accent, color: sent ? theme.accent : loading ? theme.textMuted : "#020207", border: sent ? "1px solid rgba(200,255,0,0.35)" : "none", borderRadius: "12px", padding: "1rem", fontWeight: 700, fontSize: "0.95rem", cursor: loading ? "wait" : "pointer", transition: "all 0.35s cubic-bezier(0.16,1,0.3,1)", fontFamily: fonts.body, boxShadow: !sent && !loading ? "0 0 32px rgba(200,255,0,0.2)" : "none" }}
          >
            {sent ? "✓ Message Sent!" : loading ? "Sending…" : "Send Message →"}
          </button>
        </form>

      </div>
    </Section>
  );
}