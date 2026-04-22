// ─────────────────────────────────────────────────────────────────
//  PortfolioPreview.jsx  —  Complete self-contained portfolio
//  Drop this single file into an artifact to preview everything
//  For production: use the separate modular files instead
// ─────────────────────────────────────────────────────────────────
import { useState, useEffect, useRef } from "react";

// ── TOKENS ────────────────────────────────────────────────────────
const T = {
  bg: "#020207", bgCard: "#0D0D18", bgCard2: "#131325",
  accent: "#C8FF00", accent2: "#7B5EA7", accent3: "#FF6B6B", accent4: "#00D4FF",
  text: "#F0EDE6", textMuted: "#6A6880", border: "#1E1E32",
};
const F = {
  display: "'Syne',sans-serif",
  body: "'DM Sans',sans-serif",
  mono: "'JetBrains Mono',monospace",
};

const DATA = {
  name: "Aryan Mehta",
  email: "aryan.mehta@email.com",
  github: "https://github.com/aryangitmehta",
  linkedin: "https://linkedin.com/in/aryanmehta",
  whatsapp: "https://wa.me/919876543210",
  location: "Bangalore, India",
  about: "I'm a full-stack engineer who obsesses over clean systems, beautiful interfaces, and scalable architecture. With 7+ years shipping products at startups and scale-ups, I've learned that the best code is the code users never notice — because everything just works.",
  strengths: ["System Design", "Developer Experience", "Fast Shipping", "Team Leadership", "Open Source"],
  experience: [
    { company: "Razorpay", role: "Senior Software Engineer", duration: "Jan 2022 – Present", location: "Bangalore, India", color: "#C8FF00",
      points: ["Architected a real-time payment reconciliation system handling 2M+ transactions/day with 99.99% accuracy.", "Led a team of 6 to migrate monolith to microservices, reducing deploy time from 45min → 8min.", "Built a fraud detection ML pipeline that reduced chargebacks by 34% in Q3 2023.", "Introduced feature flagging and A/B testing infrastructure used across 15 product teams."] },
    { company: "Postman", role: "Software Engineer", duration: "Jul 2020 – Dec 2021", location: "Bangalore, India", color: "#FF6B6B",
      points: ["Owned the API test runner core — improved execution speed by 3× via parallel scheduling.", "Shipped collaborative environments feature used by 800K+ teams in first 6 months.", "Rebuilt the request builder UI in React, cutting render cycles by 60%."] },
    { company: "Freshworks", role: "Junior Engineer", duration: "Jun 2018 – Jun 2020", location: "Chennai, India", color: "#7B5EA7",
      points: ["Developed customer-facing dashboard serving 50K+ SMB users.", "Integrated third-party CRM APIs (Salesforce, HubSpot) via GraphQL federation.", "Wrote automated test suites, achieving 85% code coverage on critical paths."] },
  ],
  education: [
    { institution: "IIT Roorkee", degree: "B.Tech, Computer Science", year: "2014 – 2018", gpa: "8.7 / 10", color: "#C8FF00" },
    { institution: "Coursera / Stanford Online", degree: "Machine Learning Specialization", year: "2021", gpa: null, color: "#7B5EA7" },
  ],
  skills: { Languages:["TypeScript","Python","Go","Rust","SQL"], Frontend:["React","Next.js","Tailwind CSS","Framer Motion","WebSockets"], Backend:["Node.js","FastAPI","gRPC","GraphQL","Redis"], Infrastructure:["AWS","Docker","Kubernetes","Terraform","GitHub Actions"], Data:["PostgreSQL","MongoDB","Kafka","Elasticsearch","dbt"] },
  skillLevels: { TypeScript:95, Python:88, Go:72, React:93, "Next.js":85, "Node.js":90, Docker:80, AWS:78, PostgreSQL:85, Kafka:70 },
  certifications: [
    { name:"AWS Solutions Architect", org:"Amazon Web Services", year:"2022", icon:"☁️", color:"#FF9900" },
    { name:"Certified Kubernetes Admin", org:"CNCF", year:"2023", icon:"⚙️", color:"#326CE5" },
    { name:"MongoDB Developer", org:"MongoDB University", year:"2021", icon:"🍃", color:"#00ED64" },
    { name:"Google Cloud Professional", org:"Google", year:"2022", icon:"🔵", color:"#4285F4" },
    { name:"GraphQL Associate", org:"Apollo", year:"2021", icon:"🔗", color:"#E535AB" },
    { name:"Terraform Associate", org:"HashiCorp", year:"2023", icon:"🟣", color:"#7B42BC" },
  ],
  projects: [
    { name:"OpenRoute", desc:"Open-source API gateway with built-in rate limiting, auth, and analytics. 2.4K GitHub stars.", tags:["Go","Redis","Docker"], link:"https://github.com/aryangitmehta", color:"#C8FF00" },
    { name:"FlowDB", desc:"Visual database schema designer with AI-assisted normalization and SQL export.", tags:["React","TypeScript","OpenAI"], link:"https://github.com/aryangitmehta", color:"#FF6B6B" },
    { name:"PricePulse", desc:"Real-time commodity price tracker with ML forecasts and mobile push alerts.", tags:["Python","FastAPI","Kafka"], link:"https://github.com/aryangitmehta", color:"#7B5EA7" },
    { name:"DevDeck", desc:"Customizable developer dashboard aggregating GitHub, Jira, Slack, and CI/CD stats.", tags:["Next.js","GraphQL","PostgreSQL"], link:"https://github.com/aryangitmehta", color:"#00D4FF" },
  ],
};

// ── HOOKS ─────────────────────────────────────────────────────────
function useInView(threshold = 0.08) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setInView(true); obs.disconnect(); } }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, inView];
}

function useStagger(index, delay = 110) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setTimeout(() => setVisible(true), index * delay); obs.disconnect(); } }, { threshold: 0.07 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [index]);
  return [ref, visible];
}

function scrollTo(id) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth" });
}

// ── SMALL COMPONENTS ──────────────────────────────────────────────
function Reveal({ children, delay = 0 }) {
  const [ref, inView] = useInView();
  return (
    <div ref={ref} style={{ opacity: inView ? 1 : 0, transform: inView ? "none" : "translateY(44px)", transition: `opacity 0.9s cubic-bezier(0.16,1,0.3,1) ${delay}s, transform 0.9s cubic-bezier(0.16,1,0.3,1) ${delay}s` }}>
      {children}
    </div>
  );
}

const ANIM_VARIANTS = [
  (v, i) => ({ opacity: v ? 1 : 0, transform: v ? "translateY(0) scale(1)" : "translateY(38px) scale(0.95)", transition: `opacity 0.75s cubic-bezier(0.16,1,0.3,1) ${i * 0.04}s, transform 0.75s cubic-bezier(0.16,1,0.3,1) ${i * 0.04}s` }),
  (v, i) => ({ opacity: v ? 1 : 0, transform: v ? "translateX(0)" : "translateX(-38px)", transition: `opacity 0.7s cubic-bezier(0.16,1,0.3,1) ${i * 0.05}s, transform 0.7s cubic-bezier(0.16,1,0.3,1) ${i * 0.05}s` }),
  (v, i) => ({ opacity: v ? 1 : 0, transform: v ? "scale(1) rotate(0deg)" : "scale(0.75) rotate(-8deg)", transition: `opacity 0.8s cubic-bezier(0.34,1.56,0.64,1) ${i * 0.06}s, transform 0.8s cubic-bezier(0.34,1.56,0.64,1) ${i * 0.06}s` }),
  (v, i) => ({ opacity: v ? 1 : 0, transform: v ? "translateX(0)" : "translateX(38px)", transition: `opacity 0.7s cubic-bezier(0.16,1,0.3,1) ${i * 0.05}s, transform 0.7s cubic-bezier(0.16,1,0.3,1) ${i * 0.05}s` }),
];

function Stagger({ children, index = 0, variant = "auto", style = {} }) {
  const [ref, visible] = useStagger(index);
  const fn = variant === "auto" ? ANIM_VARIANTS[index % ANIM_VARIANTS.length] : ANIM_VARIANTS[Math.min(variant, 3)];
  return <div ref={ref} style={{ ...style, ...fn(visible, index) }}>{children}</div>;
}

function AnimBar({ level, color }) {
  const [w, setW] = useState(0);
  const ref = useRef();
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setTimeout(() => setW(level), 80); }, { threshold: 0.5 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [level]);
  return (
    <div ref={ref} style={{ background: "#1A1A2E", borderRadius: "999px", height: "5px", overflow: "hidden", marginTop: "7px" }}>
      <div style={{ width: `${w}%`, height: "100%", background: `linear-gradient(90deg,${color},${color}88)`, borderRadius: "999px", transition: "width 1.5s cubic-bezier(0.16,1,0.3,1)", boxShadow: `0 0 14px ${color}55` }} />
    </div>
  );
}

function SectionShell({ id, label, heading, children }) {
  return (
    <section id={id} style={{ padding: "7rem 2.5rem", maxWidth: "1200px", margin: "0 auto", borderTop: `1px solid ${T.border}` }}>
      <Reveal>
        <div style={{ fontFamily: F.mono, fontSize: "0.68rem", letterSpacing: "0.22em", color: T.accent, textTransform: "uppercase", fontWeight: 500, marginBottom: "0.8rem" }}>{label}</div>
        <h2 style={{ fontFamily: F.display, fontSize: "clamp(2rem,4.5vw,3.3rem)", fontWeight: 800, letterSpacing: "-0.045em", lineHeight: 1.04, marginBottom: "3.8rem", color: T.text }}>{heading}</h2>
        {children}
      </Reveal>
    </section>
  );
}

// Tilt card
function TiltCard({ children, style = {} }) {
  const ref = useRef(null);
  const glowRef = useRef(null);
  const onMove = (e) => {
    const r = ref.current.getBoundingClientRect();
    const x = e.clientX - r.left, y = e.clientY - r.top;
    const cx = r.width / 2, cy = r.height / 2;
    ref.current.style.transform = `perspective(600px) rotateX(${((y-cy)/cy)*-8}deg) rotateY(${((x-cx)/cx)*8}deg) scale(1.04)`;
    if (glowRef.current) { glowRef.current.style.left = `${x}px`; glowRef.current.style.top = `${y}px`; glowRef.current.style.opacity = "1"; }
  };
  const onLeave = () => {
    ref.current.style.transform = "perspective(600px) rotateX(0) rotateY(0) scale(1)";
    if (glowRef.current) glowRef.current.style.opacity = "0";
  };
  return (
    <div ref={ref} style={{ position: "relative", overflow: "hidden", transition: "transform 0.28s cubic-bezier(0.16,1,0.3,1)", transformStyle: "preserve-3d", willChange: "transform", ...style }} onMouseMove={onMove} onMouseLeave={onLeave}>
      <div ref={glowRef} style={{ position: "absolute", width: "200px", height: "200px", borderRadius: "50%", background: "radial-gradient(circle,rgba(200,255,0,0.15) 0%,transparent 70%)", transform: "translate(-50%,-50%)", pointerEvents: "none", opacity: 0, transition: "opacity 0.35s" }} />
      {children}
    </div>
  );
}

// ── GLOBAL CSS ────────────────────────────────────────────────────
function Styles() {
  return (
    <style>{`
      @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=DM+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400&family=JetBrains+Mono:wght@400;500;700&display=swap');
      *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
      html{scroll-behavior:smooth}
      body{background:${T.bg};color:${T.text};font-family:'DM Sans',sans-serif;overflow-x:hidden;cursor:auto}
      ::-webkit-scrollbar{width:3px}::-webkit-scrollbar-track{background:${T.bg}}::-webkit-scrollbar-thumb{background:#2A2A45;border-radius:2px}
      ::selection{background:rgba(200,255,0,0.22);color:#fff}
      @keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-20px)}}
      @keyframes pulse-ring{0%,100%{box-shadow:0 0 0 0 rgba(200,255,0,0.5)}50%{box-shadow:0 0 0 16px rgba(200,255,0,0)}}
      @keyframes gradientShift{0%{background-position:0% 50%}50%{background-position:100% 50%}100%{background-position:0% 50%}}
      @keyframes orbit{from{transform:rotate(0deg) translateX(108px) rotate(0deg)}to{transform:rotate(360deg) translateX(108px) rotate(-360deg)}}
      @keyframes orbit2{from{transform:rotate(120deg) translateX(78px) rotate(-120deg)}to{transform:rotate(480deg) translateX(78px) rotate(-480deg)}}
      @keyframes spin-slow{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}
      @keyframes wordReveal{from{opacity:0;transform:translateY(60px) skewY(4deg)}to{opacity:1;transform:translateY(0) skewY(0)}}
      @keyframes fadeSlideUp{from{opacity:0;transform:translateY(28px)}to{opacity:1;transform:translateY(0)}}
      @keyframes scanGlow{0%,100%{opacity:0.3}50%{opacity:0.7}}
      @keyframes flipIn{from{opacity:0;transform:rotateY(-90deg) scale(0.85)}to{opacity:1;transform:rotateY(0deg) scale(1)}}
      @keyframes scaleIn{from{opacity:0;transform:scale(0.7) rotate(-6deg)}to{opacity:1;transform:scale(1) rotate(0deg)}}
      @keyframes rotateIn{from{opacity:0;transform:rotate(-12deg) scale(0.85)}to{opacity:1;transform:rotate(0deg) scale(1)}}
      @keyframes bounceIn{0%{opacity:0;transform:scale(0.3)}60%{opacity:1;transform:scale(1.08)}100%{transform:scale(1)}}
      @keyframes borderPulse{0%,100%{border-color:rgba(200,255,0,0.1)}50%{border-color:rgba(200,255,0,0.4)}}
      .gradient-text{background:linear-gradient(135deg,#C8FF00 0%,#00D4FF 50%,#7B5EA7 100%);background-size:200% 200%;-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;animation:gradientShift 5s ease infinite}
      .hero-word{display:inline-block;opacity:0;transform:translateY(60px) skewY(4deg)}
      .hero-word.animate{animation:wordReveal 0.9s cubic-bezier(0.16,1,0.3,1) forwards}
      .flip-card{perspective:1000px}
      .flip-inner{position:relative;width:100%;height:100%;transition:transform 0.6s cubic-bezier(0.16,1,0.3,1);transform-style:preserve-3d}
      .flip-card:hover .flip-inner{transform:rotateY(180deg)}
      .flip-front,.flip-back{position:absolute;width:100%;height:100%;backface-visibility:hidden;-webkit-backface-visibility:hidden;border-radius:16px}
      .flip-back{transform:rotateY(180deg)}
      .glow-btn{position:relative;overflow:hidden;box-shadow:0 0 32px rgba(200,255,0,0.22);transition:all 0.25s cubic-bezier(0.16,1,0.3,1)}
      .glow-btn:hover{box-shadow:0 0 48px rgba(200,255,0,0.38);transform:translateY(-2px)}
      .ghost-btn{transition:all 0.25s cubic-bezier(0.16,1,0.3,1)}
      .ghost-btn:hover{border-color:rgba(200,255,0,0.5)!important;color:${T.accent}!important;transform:translateY(-2px)}
      .strength-item{transition:all 0.3s cubic-bezier(0.16,1,0.3,1);display:inline-block}
      .strength-item:hover{transform:translateY(-4px) scale(1.03);border-color:rgba(200,255,0,0.4)!important;box-shadow:0 0 24px rgba(200,255,0,0.12)}
      .contact-row{transition:all 0.25s cubic-bezier(0.16,1,0.3,1)}
      .skill-pill{transition:all 0.2s cubic-bezier(0.16,1,0.3,1);cursor:default}
      .skill-pill:hover{border-color:rgba(200,255,0,0.5)!important;color:${T.accent}!important;background:rgba(200,255,0,0.06)!important;transform:translateY(-2px)}
      .proj-card{transition:all 0.3s cubic-bezier(0.16,1,0.3,1);position:relative;overflow:hidden}
      .proj-card:hover{transform:translateY(-6px) scale(1.01);box-shadow:0 24px 60px rgba(0,0,0,0.4)}
      input:focus,textarea:focus{border-color:rgba(200,255,0,0.5)!important;box-shadow:0 0 0 3px rgba(200,255,0,0.07);outline:none}
      input,textarea{transition:border-color 0.2s,box-shadow 0.2s}
      a,button{cursor:pointer}
    `}</style>
  );
}

// ── NAVBAR ────────────────────────────────────────────────────────
const NAV = ["hero","about","experience","projects","contact"];
function Navbar() {
  const [active, setActive] = useState("hero");
  const [scrolled, setScrolled] = useState(false);
  const [visible, setVisible] = useState(false);
  useEffect(() => { setTimeout(() => setVisible(true), 200); }, []);
  useEffect(() => {
    const fn = () => {
      setScrolled(window.scrollY > 40);
      const sections = NAV.map(id => document.getElementById(id)).filter(Boolean);
      const sy = window.scrollY + 120;
      for (let i = sections.length - 1; i >= 0; i--) { if (sy >= sections[i].offsetTop) { setActive(sections[i].id); break; } }
    };
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);
  return (
    <div style={{ position:"fixed", top:"20px", left:"50%", transform:`translateX(-50%) translateY(${visible?"0":"-30px"})`, zIndex:1000, backdropFilter:"blur(18px)", WebkitBackdropFilter:"blur(18px)", background:scrolled?"rgba(10,10,20,0.72)":"rgba(10,10,20,0.35)", border:`1px solid ${scrolled?"rgba(255,255,255,0.1)":"rgba(255,255,255,0.06)"}`, borderRadius:"999px", padding:"0.45rem 0.8rem", transition:"all 0.4s cubic-bezier(0.16,1,0.3,1)", opacity:visible?1:0, boxShadow:scrolled?"0 8px 40px rgba(0,0,0,0.5)":"none" }}>
      <div style={{ display:"flex", gap:"0.3rem", alignItems:"center" }}>
        {NAV.map(item => (
          <div key={item} onClick={() => { setActive(item); scrollTo(item); }} style={{ position:"relative", padding:"0.45rem 1rem", cursor:"pointer", color:active===item?"#fff":T.textMuted, fontSize:"0.72rem", letterSpacing:"0.1em", textTransform:"uppercase", fontFamily:F.mono, fontWeight:active===item?600:400, transition:"all 0.25s", borderRadius:"999px", background:active===item?"rgba(200,255,0,0.1)":"transparent" }}>
            {active===item && <span style={{ position:"absolute", inset:0, borderRadius:"999px", background:"linear-gradient(135deg,rgba(200,255,0,0.18),rgba(0,212,255,0.08))", border:"1px solid rgba(200,255,0,0.2)" }} />}
            <span style={{ position:"relative" }}>{item}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── HERO ──────────────────────────────────────────────────────────
function Hero() {
  const [ready, setReady] = useState(false);
  useEffect(() => { const t = setTimeout(() => setReady(true), 120); return () => clearTimeout(t); }, []);
  const words = ["Full-Stack","Engineer","&","Product","Builder"];
  return (
    <section id="hero" style={{ minHeight:"100vh", display:"flex", alignItems:"center", padding:"0 2.5rem", position:"relative", overflow:"hidden" }}>
      <div style={{ position:"absolute", inset:0, backgroundImage:"linear-gradient(rgba(200,255,0,0.018) 1px,transparent 1px),linear-gradient(90deg,rgba(200,255,0,0.018) 1px,transparent 1px)", backgroundSize:"72px 72px" }} />
      <div style={{ position:"absolute", top:0, left:0, right:0, height:"1px", background:`linear-gradient(90deg,transparent,${T.accent}44,transparent)`, animation:"scanGlow 3s ease-in-out infinite" }} />
      <div style={{ position:"absolute", top:"5%", right:"3%", width:"640px", height:"640px", borderRadius:"50%", background:"radial-gradient(circle,rgba(200,255,0,0.055) 0%,transparent 62%)", animation:"float 9s ease-in-out infinite" }} />
      <div style={{ position:"absolute", bottom:"10%", left:"8%", width:"440px", height:"440px", borderRadius:"50%", background:"radial-gradient(circle,rgba(123,94,167,0.065) 0%,transparent 62%)", animation:"float 11s ease-in-out infinite 2s" }} />
      <div style={{ maxWidth:"1200px", margin:"0 auto", width:"100%", paddingTop:"7rem", position:"relative", zIndex:10 }}>
        <div style={{ display:"grid", gridTemplateColumns:"1fr auto", gap:"5rem", alignItems:"center" }}>
          <div>
            <div style={{ display:"flex", alignItems:"center", gap:"0.8rem", marginBottom:"2.8rem", opacity:ready?1:0, transform:ready?"none":"translateY(18px)", transition:"all 0.8s 0.05s cubic-bezier(0.16,1,0.3,1)" }}>
              <div style={{ width:"9px", height:"9px", borderRadius:"50%", background:T.accent, animation:"pulse-ring 3s ease-in-out infinite" }} />
              <span style={{ fontFamily:F.mono, fontSize:"0.72rem", color:T.textMuted, letterSpacing:"0.14em" }}>// available_for_opportunities</span>
            </div>
            <h1 style={{ fontFamily:F.display, fontSize:"clamp(3.8rem,8.5vw,7.5rem)", fontWeight:800, letterSpacing:"-0.055em", lineHeight:0.9, opacity:ready?1:0, transform:ready?"none":"translateY(80px)", transition:"all 1s 0.18s cubic-bezier(0.16,1,0.3,1)" }}>
              <span style={{ display:"block", color:T.text }}>Aryan</span>
              <span className="gradient-text" style={{ display:"block" }}>Mehta</span>
            </h1>
            <div style={{ display:"flex", flexWrap:"wrap", gap:"0.45rem", marginTop:"1.8rem", marginBottom:"2.8rem" }}>
              {words.map((w,i) => (
                <span key={i} className={`hero-word ${ready?"animate":""}`} style={{ fontFamily:F.body, fontSize:"clamp(1rem,2.2vw,1.35rem)", color:i===2?T.accent:T.textMuted, fontWeight:i===2?700:400, animationDelay:`${0.55+i*0.1}s` }}>{w}</span>
              ))}
            </div>
            <div style={{ display:"flex", gap:"1rem", flexWrap:"wrap", opacity:ready?1:0, transform:ready?"none":"translateY(20px)", transition:"all 0.8s 1.05s cubic-bezier(0.16,1,0.3,1)" }}>
              <a href="/cv.pdf" download className="glow-btn" style={{ background:T.accent, color:"#020207", borderRadius:"999px", padding:"0.88rem 2.2rem", fontWeight:700, fontSize:"0.93rem", textDecoration:"none", fontFamily:F.body }}>Download CV ↓</a>
              <button onClick={() => scrollTo("contact")} className="ghost-btn" style={{ background:"transparent", color:T.text, border:`1px solid ${T.border}`, borderRadius:"999px", padding:"0.88rem 2.1rem", fontWeight:500, fontSize:"0.93rem", fontFamily:F.body }}>Contact Me →</button>
            </div>
            <div style={{ marginTop:"3rem", display:"flex", gap:"2.2rem", flexWrap:"wrap", opacity:ready?1:0, transition:"all 0.8s 1.25s cubic-bezier(0.16,1,0.3,1)" }}>
              {[["📍",DATA.location,"location",null],["✉️",DATA.email,"email",`mailto:${DATA.email}`],["🐙","GitHub","github",DATA.github]].map(([icon,val,type,href]) => (
                <a key={val} href={href||"#"} target={type==="github"?"_blank":"_self"} rel="noreferrer" style={{ display:"flex", alignItems:"center", gap:"0.42rem", fontFamily:F.mono, fontSize:"0.7rem", color:T.textMuted, textDecoration:"none", pointerEvents:type==="location"?"none":"auto", transition:"color 0.2s" }} onMouseEnter={e=>{if(type!=="location")e.currentTarget.style.color=T.accent}} onMouseLeave={e=>{e.currentTarget.style.color=T.textMuted}}>
                  {icon} {val}
                </a>
              ))}
            </div>
          </div>
          <div style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:"1.4rem", opacity:ready?1:0, transform:ready?"none":"scale(0.82) translateY(30px)", transition:"all 1s 0.38s cubic-bezier(0.16,1,0.3,1)" }}>
            <div style={{ position:"relative", marginBottom:"0.5rem" }}>
              <div style={{ position:"absolute", inset:"-14px", borderRadius:"50%", background:`conic-gradient(${T.accent} 0deg,transparent 70deg,transparent 110deg,${T.accent4} 180deg,transparent 250deg,transparent 290deg,${T.accent2} 360deg)`, animation:"spin-slow 10s linear infinite", opacity:0.55 }} />
              <div style={{ width:"210px", height:"210px", borderRadius:"50%", overflow:"hidden", border:`3px solid ${T.border}`, position:"relative", background:"#0D0D18", zIndex:1 }}>
                <img src="https://i.pravatar.cc/210?img=11" alt="Aryan Mehta" style={{ width:"100%", height:"100%", objectFit:"cover", filter:"saturate(1.15) contrast(1.08)" }} onError={e=>{e.currentTarget.style.display="none"}} />
              </div>
              <div style={{ position:"absolute", inset:0, zIndex:2, animation:"orbit 6.5s linear infinite" }}><div style={{ width:"11px", height:"11px", borderRadius:"50%", background:T.accent, boxShadow:`0 0 14px ${T.accent}` }} /></div>
              <div style={{ position:"absolute", inset:0, zIndex:2, animation:"orbit2 9.5s linear infinite" }}><div style={{ width:"8px", height:"8px", borderRadius:"50%", background:T.accent4, boxShadow:`0 0 12px ${T.accent4}` }} /></div>
            </div>
            {[{val:"7+",label:"Years Exp."},{val:"40+",label:"Products Built"},{val:"5K+",label:"GitHub Stars"}].map(s => (
              <div key={s.label} style={{ background:T.bgCard, border:`1px solid ${T.border}`, borderRadius:"14px", padding:"0.85rem 1.6rem", textAlign:"center", width:"100%", position:"relative", overflow:"hidden", transition:"all 0.3s" }} onMouseEnter={e=>{e.currentTarget.style.borderColor="rgba(200,255,0,0.25)";e.currentTarget.style.transform="scale(1.03)"}} onMouseLeave={e=>{e.currentTarget.style.borderColor=T.border;e.currentTarget.style.transform="scale(1)"}}>
                <div style={{ position:"absolute", inset:0, background:"linear-gradient(135deg,rgba(200,255,0,0.025) 0%,transparent 60%)" }} />
                <div style={{ fontFamily:F.display, fontSize:"1.85rem", fontWeight:800, color:T.accent, letterSpacing:"-0.04em", position:"relative" }}>{s.val}</div>
                <div style={{ fontFamily:F.mono, fontSize:"0.62rem", color:T.textMuted, letterSpacing:"0.1em", textTransform:"uppercase", position:"relative" }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ── ABOUT ─────────────────────────────────────────────────────────
const ABOUT_CARDS = [
  { icon:"💻", label:"Open Source", desc:"Active contributor to OSS projects with 5K+ stars across repos." },
  { icon:"🎤", label:"Tech Speaker", desc:"Spoken at JSConf, ReactConf, and multiple local meetups." },
  { icon:"🧑‍🏫", label:"Mentor", desc:"Mentored 30+ junior devs through structured 1:1 programs." },
];
function About() {
  const [activeCard, setActiveCard] = useState(null);
  const SKILL_COLORS = { TypeScript:T.accent, Python:T.accent4, Go:"#00ADD8", React:"#61DAFB", "Next.js":"#fff", "Node.js":"#68A063", Docker:"#2496ED", AWS:"#FF9900", PostgreSQL:"#336791", Kafka:"#B0B0B0" };
  return (
    <SectionShell id="about" label="// 01 · about" heading="Who I Am">
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"4rem", alignItems:"start" }}>
        <div>
          <p style={{ fontFamily:F.body, fontSize:"1.08rem", color:T.textMuted, lineHeight:1.78, marginBottom:"2.5rem" }}>{DATA.about}</p>
          <div style={{ marginBottom:"2.5rem" }}>
            <div style={{ fontFamily:F.mono, fontSize:"0.65rem", color:T.accent, letterSpacing:"0.2em", textTransform:"uppercase", marginBottom:"1rem" }}>Core Strengths</div>
            <div style={{ display:"flex", flexWrap:"wrap", gap:"0.6rem" }}>
              {DATA.strengths.map((s,i) => (
                <Stagger key={s} index={i} variant={i%4}>
                  <span className="strength-item" style={{ padding:"0.38rem 1rem", borderRadius:"999px", border:`1px solid ${T.border}`, fontFamily:F.mono, fontSize:"0.72rem", color:T.textMuted, background:T.bgCard }}>{s}</span>
                </Stagger>
              ))}
            </div>
          </div>
          <div style={{ display:"flex", flexDirection:"column", gap:"1rem" }}>
            {ABOUT_CARDS.map((card,i) => (
              <Stagger key={card.label} index={i} variant={i}>
                <TiltCard style={{ background:activeCard===i?"rgba(200,255,0,0.04)":T.bgCard, border:`1px solid ${activeCard===i?"rgba(200,255,0,0.3)":T.border}`, borderRadius:"16px", padding:"1.2rem 1.5rem", display:"flex", alignItems:"center", gap:"1.1rem", cursor:"pointer", transition:"border-color 0.3s, background 0.3s" }} onClick={() => setActiveCard(activeCard===i?null:i)}>
                  <span style={{ fontSize:"2rem", flexShrink:0, transition:"transform 0.3s cubic-bezier(0.34,1.56,0.64,1)" }} onMouseEnter={e=>{e.currentTarget.style.transform="scale(1.3) rotate(8deg)"}} onMouseLeave={e=>{e.currentTarget.style.transform="scale(1) rotate(0deg)"}}>{card.icon}</span>
                  <div>
                    <div style={{ fontFamily:F.display, fontSize:"0.95rem", fontWeight:700, color:T.text, marginBottom:"0.25rem" }}>{card.label}</div>
                    <div style={{ fontFamily:F.body, fontSize:"0.82rem", color:T.textMuted, lineHeight:1.5 }}>{card.desc}</div>
                  </div>
                </TiltCard>
              </Stagger>
            ))}
          </div>
        </div>
        <div>
          <div style={{ fontFamily:F.mono, fontSize:"0.65rem", color:T.accent, letterSpacing:"0.2em", textTransform:"uppercase", marginBottom:"1.6rem" }}>Skill Proficiency</div>
          <div style={{ display:"flex", flexDirection:"column", gap:"1.4rem" }}>
            {Object.entries(DATA.skillLevels).map(([skill,level],i) => (
              <Stagger key={skill} index={i} variant={0}>
                <div>
                  <div style={{ display:"flex", justifyContent:"space-between" }}>
                    <span style={{ fontFamily:F.mono, fontSize:"0.75rem", color:T.text }}>{skill}</span>
                    <span style={{ fontFamily:F.mono, fontSize:"0.68rem", color:SKILL_COLORS[skill]||T.accent2 }}>{level}%</span>
                  </div>
                  <AnimBar level={level} color={SKILL_COLORS[skill]||T.accent2} />
                </div>
              </Stagger>
            ))}
          </div>
          <div style={{ marginTop:"2.5rem" }}>
            {Object.entries(DATA.skills).map(([cat,skills]) => (
              <div key={cat} style={{ marginBottom:"1.2rem" }}>
                <div style={{ fontFamily:F.mono, fontSize:"0.62rem", color:T.textMuted, letterSpacing:"0.14em", textTransform:"uppercase", marginBottom:"0.6rem" }}>{cat}</div>
                <div style={{ display:"flex", flexWrap:"wrap", gap:"0.4rem" }}>
                  {skills.map(s => <span key={s} className="skill-pill" style={{ padding:"0.28rem 0.75rem", borderRadius:"6px", border:`1px solid ${T.border}`, fontFamily:F.mono, fontSize:"0.68rem", color:T.textMuted, background:T.bgCard2 }}>{s}</span>)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </SectionShell>
  );
}

// ── EXPERIENCE ────────────────────────────────────────────────────
function Experience() {
  const [activeIdx, setActiveIdx] = useState(0);
  const active = DATA.experience[activeIdx];
  return (
    <SectionShell id="experience" label="// 02 · experience" heading="Where I Worked">
      <div style={{ display:"grid", gridTemplateColumns:"280px 1fr", gap:"2.5rem" }}>
        <div style={{ display:"flex", flexDirection:"column", gap:"0.6rem" }}>
          {DATA.experience.map((exp,i) => (
            <Stagger key={exp.company} index={i} variant={1}>
              <button onClick={() => setActiveIdx(i)} style={{ width:"100%", padding:"1.1rem 1.4rem", borderRadius:"14px", border:`1px solid ${activeIdx===i?exp.color+"55":T.border}`, background:activeIdx===i?`${exp.color}08`:T.bgCard, textAlign:"left", cursor:"pointer", position:"relative", overflow:"hidden", transition:"all 0.3s cubic-bezier(0.16,1,0.3,1)", transform:activeIdx===i?"translateX(6px)":"translateX(0)" }}>
                {activeIdx===i && <div style={{ position:"absolute", left:0, top:0, bottom:0, width:"3px", background:exp.color, boxShadow:`0 0 12px ${exp.color}`, borderRadius:"0 2px 2px 0" }} />}
                {activeIdx===i && <div style={{ position:"absolute", inset:0, background:`linear-gradient(135deg,${exp.color}06 0%,transparent 70%)`, pointerEvents:"none" }} />}
                <div style={{ fontFamily:F.display, fontSize:"0.92rem", fontWeight:700, color:activeIdx===i?exp.color:T.text, marginBottom:"0.22rem", position:"relative" }}>{exp.company}</div>
                <div style={{ fontFamily:F.mono, fontSize:"0.62rem", color:T.textMuted, position:"relative" }}>{exp.duration}</div>
              </button>
            </Stagger>
          ))}
          <div style={{ marginTop:"1.5rem" }}>
            <div style={{ fontFamily:F.mono, fontSize:"0.6rem", color:T.textMuted, letterSpacing:"0.15em", textTransform:"uppercase", marginBottom:"0.8rem" }}>Education</div>
            {DATA.education.map((edu,i) => (
              <Stagger key={edu.institution} index={i+3} variant={2}>
                <div style={{ padding:"1rem 1.2rem", borderRadius:"12px", border:`1px solid ${T.border}`, background:T.bgCard, marginBottom:"0.6rem", transition:"all 0.3s cubic-bezier(0.16,1,0.3,1)", cursor:"pointer", position:"relative", overflow:"hidden" }}
                  onMouseEnter={e=>{e.currentTarget.style.borderColor=`${edu.color}44`;e.currentTarget.style.transform="scale(1.02)";e.currentTarget.style.boxShadow=`0 0 24px ${edu.color}15`}}
                  onMouseLeave={e=>{e.currentTarget.style.borderColor=T.border;e.currentTarget.style.transform="scale(1)";e.currentTarget.style.boxShadow="none"}}>
                  <div style={{ fontFamily:F.display, fontSize:"0.82rem", fontWeight:700, color:edu.color, marginBottom:"0.2rem" }}>{edu.institution}</div>
                  <div style={{ fontFamily:F.body, fontSize:"0.72rem", color:T.textMuted, marginBottom:"0.2rem" }}>{edu.degree}</div>
                  <div style={{ fontFamily:F.mono, fontSize:"0.6rem", color:T.textMuted }}>{edu.year}{edu.gpa?` · GPA: ${edu.gpa}`:""}</div>
                </div>
              </Stagger>
            ))}
          </div>
        </div>
        <Reveal key={activeIdx}>
          <div style={{ background:T.bgCard, border:`1px solid ${active.color}33`, borderRadius:"20px", padding:"2.5rem", position:"relative", overflow:"hidden", boxShadow:`0 0 60px ${active.color}08` }}>
            <div style={{ position:"absolute", top:0, right:0, width:"320px", height:"320px", borderRadius:"50%", background:`radial-gradient(circle,${active.color}08 0%,transparent 65%)`, pointerEvents:"none" }} />
            <div style={{ marginBottom:"2rem", position:"relative" }}>
              <div style={{ display:"flex", alignItems:"flex-start", justifyContent:"space-between", flexWrap:"wrap", gap:"1rem" }}>
                <div>
                  <h3 style={{ fontFamily:F.display, fontSize:"1.6rem", fontWeight:800, color:active.color, marginBottom:"0.3rem", letterSpacing:"-0.03em" }}>{active.role}</h3>
                  <div style={{ fontFamily:F.display, fontSize:"1rem", fontWeight:600, color:T.text, marginBottom:"0.4rem" }}>{active.company}</div>
                  <div style={{ display:"flex", gap:"1.2rem", flexWrap:"wrap" }}>
                    <span style={{ fontFamily:F.mono, fontSize:"0.68rem", color:T.textMuted }}>📅 {active.duration}</span>
                    <span style={{ fontFamily:F.mono, fontSize:"0.68rem", color:T.textMuted }}>📍 {active.location}</span>
                  </div>
                </div>
                <div style={{ padding:"0.5rem 1.1rem", borderRadius:"999px", border:`1px solid ${active.color}44`, background:`${active.color}0D`, fontFamily:F.mono, fontSize:"0.68rem", color:active.color }}>
                  {activeIdx === 0 ? "● Current" : "✓ Past"}
                </div>
              </div>
            </div>
            <div style={{ height:"1px", background:`linear-gradient(90deg,${active.color}33,transparent)`, marginBottom:"2rem" }} />
            <div style={{ display:"flex", flexDirection:"column", gap:"1.1rem", position:"relative" }}>
              {active.points.map((pt,i) => (
                <div key={i} style={{ display:"flex", gap:"1rem", alignItems:"flex-start", opacity:0, animation:`fadeSlideUp 0.6s cubic-bezier(0.16,1,0.3,1) ${i*0.1+0.1}s forwards` }}>
                  <div style={{ width:"6px", height:"6px", borderRadius:"50%", background:active.color, flexShrink:0, marginTop:"0.55rem", boxShadow:`0 0 8px ${active.color}` }} />
                  <p style={{ fontFamily:F.body, fontSize:"0.92rem", color:T.textMuted, lineHeight:1.72 }}>{pt}</p>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </SectionShell>
  );
}

// ── CERTIFICATIONS ────────────────────────────────────────────────
const CERT_ANIMS = ["flipIn","fadeSlideUp","scaleIn","fadeSlideUp","rotateIn","bounceIn"];
function CertCard({ cert, index }) {
  return (
    <div className="flip-card" style={{ height:"180px", opacity:0, animation:`${CERT_ANIMS[index%CERT_ANIMS.length]} 0.7s cubic-bezier(0.16,1,0.3,1) ${index*0.12}s forwards` }}>
      <div className="flip-inner">
        <div className="flip-front" style={{ background:T.bgCard, border:`1px solid ${T.border}`, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", gap:"0.7rem", padding:"1.5rem" }}>
          <span style={{ fontSize:"2.5rem" }}>{cert.icon}</span>
          <div style={{ fontFamily:F.display, fontSize:"0.88rem", fontWeight:700, color:T.text, textAlign:"center" }}>{cert.name}</div>
          <div style={{ fontFamily:F.mono, fontSize:"0.62rem", color:T.textMuted }}>{cert.year}</div>
        </div>
        <div className="flip-back" style={{ background:`linear-gradient(135deg,${cert.color}18 0%,${T.bgCard} 100%)`, border:`1px solid ${cert.color}55`, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", gap:"0.6rem", padding:"1.5rem" }}>
          <span style={{ fontSize:"1.8rem" }}>{cert.icon}</span>
          <div style={{ fontFamily:F.display, fontSize:"0.82rem", fontWeight:700, color:cert.color, textAlign:"center" }}>{cert.name}</div>
          <div style={{ fontFamily:F.body, fontSize:"0.75rem", color:T.textMuted, textAlign:"center" }}>{cert.org}</div>
          <div style={{ fontFamily:F.mono, fontSize:"0.62rem", color:cert.color, padding:"0.3rem 0.8rem", borderRadius:"999px", border:`1px solid ${cert.color}44` }}>{cert.year}</div>
        </div>
      </div>
    </div>
  );
}

// ── PROJECTS ──────────────────────────────────────────────────────
function ProjCard({ proj, index }) {
  const [active, setActive] = useState(false);
  const ref = useRef(null);
  const onMove = (e) => {
    const r = ref.current.getBoundingClientRect();
    const x = e.clientX-r.left, y = e.clientY-r.top;
    const cx = r.width/2, cy = r.height/2;
    ref.current.style.transform = `perspective(600px) rotateX(${((y-cy)/cy)*-6}deg) rotateY(${((x-cx)/cx)*6}deg) translateY(-6px) scale(1.02)`;
  };
  const onLeave = () => { ref.current.style.transform = "perspective(600px) rotateX(0) rotateY(0) translateY(0) scale(1)"; setActive(false); };
  return (
    <Stagger index={index} variant={index%4}>
      <div ref={ref} className="proj-card" onClick={() => setActive(!active)} onMouseMove={onMove} onMouseLeave={onLeave}
        style={{ background:active?`${proj.color}08`:T.bgCard, border:`1px solid ${active?proj.color+"44":T.border}`, borderRadius:"20px", padding:"2rem", cursor:"pointer", transition:"border-color 0.3s,background 0.3s,box-shadow 0.3s", boxShadow:active?`0 0 40px ${proj.color}18,0 24px 60px rgba(0,0,0,0.3)`:"0 4px 24px rgba(0,0,0,0.2)" }}>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:"1rem" }}>
          <div style={{ width:"42px", height:"42px", borderRadius:"12px", background:`${proj.color}18`, border:`1px solid ${proj.color}33`, display:"flex", alignItems:"center", justifyContent:"center" }}>
            <div style={{ width:"16px", height:"16px", borderRadius:"50%", background:proj.color, boxShadow:`0 0 12px ${proj.color}` }} />
          </div>
          <a href={proj.link} target="_blank" rel="noreferrer" onClick={e=>e.stopPropagation()}
            style={{ padding:"0.35rem 0.9rem", borderRadius:"8px", border:`1px solid ${T.border}`, fontFamily:F.mono, fontSize:"0.62rem", color:T.textMuted, textDecoration:"none", transition:"all 0.2s" }}
            onMouseEnter={e=>{e.currentTarget.style.borderColor=proj.color;e.currentTarget.style.color=proj.color}}
            onMouseLeave={e=>{e.currentTarget.style.borderColor=T.border;e.currentTarget.style.color=T.textMuted}}>↗ View</a>
        </div>
        <h3 style={{ fontFamily:F.display, fontSize:"1.15rem", fontWeight:800, color:active?proj.color:T.text, marginBottom:"0.6rem", letterSpacing:"-0.02em", transition:"color 0.3s" }}>{proj.name}</h3>
        <p style={{ fontFamily:F.body, fontSize:"0.85rem", color:T.textMuted, lineHeight:1.65, marginBottom:"1.3rem" }}>{proj.desc}</p>
        <div style={{ display:"flex", gap:"0.45rem", flexWrap:"wrap" }}>
          {proj.tags.map(tag => <span key={tag} style={{ padding:"0.25rem 0.65rem", borderRadius:"6px", border:`1px solid ${proj.color}33`, background:`${proj.color}0A`, fontFamily:F.mono, fontSize:"0.62rem", color:proj.color }}>{tag}</span>)}
        </div>
      </div>
    </Stagger>
  );
}

// ── CONTACT ───────────────────────────────────────────────────────
const CONTACT_LINKS = [
  { icon:"🐙", label:"GitHub", value:"@aryangitmehta", href:DATA.github, color:"#fff", desc:"See my open source work" },
  { icon:"✉️", label:"Email", value:DATA.email, href:`mailto:${DATA.email}`, color:T.accent, desc:"Reach me directly" },
  { icon:"💬", label:"WhatsApp", value:"+91 98765 43210", href:DATA.whatsapp, color:"#25D366", desc:"Quick chat welcome" },
  { icon:"🔗", label:"LinkedIn", value:"in/aryanmehta", href:DATA.linkedin, color:"#0077B5", desc:"Connect professionally" },
];
function Contact() {
  const [form, setForm] = useState({ name:"", email:"", message:"" });
  const [sent, setSent] = useState(false);
  const submit = () => { setSent(true); setTimeout(() => setSent(false), 3000); };
  return (
    <SectionShell id="contact" label="// 05 · contact" heading="Let's Work Together">
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"4rem", alignItems:"start" }}>
        <div>
          <p style={{ fontFamily:F.body, fontSize:"1.05rem", color:T.textMuted, lineHeight:1.78, marginBottom:"2.5rem" }}>Whether you have a project in mind, want to collaborate, or just want to say hello — my inbox is always open.</p>
          <div style={{ display:"flex", flexDirection:"column", gap:"0.9rem" }}>
            {CONTACT_LINKS.map((link,i) => (
              <Stagger key={link.label} index={i} variant={i%4}>
                <a href={link.href} target="_blank" rel="noreferrer" className="contact-row"
                  style={{ display:"flex", alignItems:"center", gap:"1.2rem", padding:"1.1rem 1.4rem", borderRadius:"16px", border:`1px solid ${T.border}`, background:T.bgCard, textDecoration:"none", transition:"all 0.25s cubic-bezier(0.16,1,0.3,1)" }}
                  onMouseEnter={e=>{e.currentTarget.style.borderColor=`${link.color}44`;e.currentTarget.style.background=`${link.color}06`;e.currentTarget.style.transform="translateX(6px)"}}
                  onMouseLeave={e=>{e.currentTarget.style.borderColor=T.border;e.currentTarget.style.background=T.bgCard;e.currentTarget.style.transform="translateX(0)"}}>
                  <div style={{ width:"46px", height:"46px", borderRadius:"12px", background:`${link.color}14`, border:`1px solid ${link.color}33`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:"1.4rem", flexShrink:0, transition:"transform 0.3s cubic-bezier(0.34,1.56,0.64,1)" }}
                    onMouseEnter={e=>{e.currentTarget.style.transform="scale(1.25)"}}
                    onMouseLeave={e=>{e.currentTarget.style.transform="scale(1)"}}>
                    {link.icon}
                  </div>
                  <div style={{ flex:1 }}>
                    <div style={{ fontFamily:F.display, fontSize:"0.9rem", fontWeight:700, color:T.text, marginBottom:"0.15rem" }}>{link.label}</div>
                    <div style={{ fontFamily:F.mono, fontSize:"0.68rem", color:link.color, marginBottom:"0.15rem" }}>{link.value}</div>
                    <div style={{ fontFamily:F.body, fontSize:"0.72rem", color:T.textMuted }}>{link.desc}</div>
                  </div>
                  <div style={{ fontFamily:F.mono, fontSize:"0.9rem", color:T.textMuted }}>↗</div>
                </a>
              </Stagger>
            ))}
          </div>
        </div>
        <Stagger index={0} variant={3}>
          <div style={{ background:T.bgCard, border:`1px solid ${T.border}`, borderRadius:"20px", padding:"2.2rem", position:"relative", overflow:"hidden" }}>
            <div style={{ position:"absolute", top:0, right:0, width:"200px", height:"200px", background:"radial-gradient(circle,rgba(200,255,0,0.04) 0%,transparent 65%)", pointerEvents:"none" }} />
            <h3 style={{ fontFamily:F.display, fontSize:"1.15rem", fontWeight:700, color:T.text, marginBottom:"0.4rem" }}>Send a Message</h3>
            <p style={{ fontFamily:F.body, fontSize:"0.8rem", color:T.textMuted, marginBottom:"1.8rem" }}>I'll get back to you within 24 hours.</p>
            <div style={{ display:"flex", flexDirection:"column", gap:"1rem" }}>
              {[["Name","text","Your name","name"],["Email","email","your@email.com","email"]].map(([lbl,type,ph,key]) => (
                <div key={key}>
                  <label style={{ fontFamily:F.mono, fontSize:"0.62rem", color:T.textMuted, letterSpacing:"0.12em", textTransform:"uppercase", display:"block", marginBottom:"0.45rem" }}>{lbl}</label>
                  <input type={type} placeholder={ph} value={form[key]} onChange={e=>setForm(s=>({...s,[key]:e.target.value}))}
                    style={{ width:"100%", padding:"0.75rem 1rem", borderRadius:"10px", border:`1px solid ${T.border}`, background:T.bgCard2, color:T.text, fontFamily:F.body, fontSize:"0.88rem" }} />
                </div>
              ))}
              <div>
                <label style={{ fontFamily:F.mono, fontSize:"0.62rem", color:T.textMuted, letterSpacing:"0.12em", textTransform:"uppercase", display:"block", marginBottom:"0.45rem" }}>Message</label>
                <textarea placeholder="What would you like to discuss?" rows={4} value={form.message} onChange={e=>setForm(s=>({...s,message:e.target.value}))}
                  style={{ width:"100%", padding:"0.75rem 1rem", borderRadius:"10px", border:`1px solid ${T.border}`, background:T.bgCard2, color:T.text, fontFamily:F.body, fontSize:"0.88rem", resize:"vertical" }} />
              </div>
              <button onClick={submit} className="glow-btn"
                style={{ background:sent?"#22c55e":T.accent, color:"#020207", border:"none", borderRadius:"999px", padding:"0.88rem 2rem", fontFamily:F.body, fontWeight:700, fontSize:"0.93rem", width:"100%", transition:"background 0.3s" }}>
                {sent?"✓ Message Sent!":"Send Message →"}
              </button>
            </div>
          </div>
        </Stagger>
      </div>
      <div style={{ marginTop:"5rem", paddingTop:"2rem", borderTop:`1px solid ${T.border}`, display:"flex", justifyContent:"space-between", alignItems:"center", flexWrap:"wrap", gap:"1rem" }}>
        <div style={{ fontFamily:F.mono, fontSize:"0.68rem", color:T.textMuted }}>© 2024 {DATA.name} · Built with ❤️ & React</div>
        <div style={{ fontFamily:F.mono, fontSize:"0.68rem", color:T.textMuted }}>{DATA.location}</div>
      </div>
    </SectionShell>
  );
}

// ── APP ROOT ──────────────────────────────────────────────────────
export default function App() {
  return (
    <>
      <Styles />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Experience />
        {/* Certifications */}
        <SectionShell id="certifications" label="// 03 · credentials" heading="Certifications">
          <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:"1.2rem" }}>
            {DATA.certifications.map((cert,i) => <CertCard key={cert.name} cert={cert} index={i} />)}
          </div>
        </SectionShell>
        {/* Projects */}
        <section id="projects" style={{ padding:"7rem 2.5rem", maxWidth:"1200px", margin:"0 auto", borderTop:`1px solid ${T.border}` }}>
          <Reveal>
            <div style={{ fontFamily:F.mono, fontSize:"0.68rem", letterSpacing:"0.22em", color:T.accent, textTransform:"uppercase", fontWeight:500, marginBottom:"0.8rem" }}>// 04 · projects</div>
            <h2 style={{ fontFamily:F.display, fontSize:"clamp(2rem,4.5vw,3.3rem)", fontWeight:800, letterSpacing:"-0.045em", lineHeight:1.04, marginBottom:"3.8rem", color:T.text }}>Things I've Built</h2>
          </Reveal>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(2,1fr)", gap:"1.5rem" }}>
            {DATA.projects.map((proj,i) => <ProjCard key={proj.name} proj={proj} index={i} />)}
          </div>
        </section>
        <Contact />
      </main>
    </>
  );
}