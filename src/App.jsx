import { useState, useEffect, useRef, useCallback } from "react";
import { motion, useScroll, useTransform, useInView, AnimatePresence } from "framer-motion";

// ─── RELIABLE IMAGE HELPER ────────────────────────────────────────────────────
// Using Unsplash source for high-quality, relevant images
const IMG = {
  profile:    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
  working:    "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=600&h=450&fit=crop",
  oss:        "https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?w=400&h=240&fit=crop",
  speaker:    "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=400&h=240&fit=crop",
  tech:       "https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&h=240&fit=crop",
  edu1:       "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=700&h=320&fit=crop",
  edu2:       "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=700&h=320&fit=crop",
  proj1:      "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=700&h=400&fit=crop",
  proj2:      "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=700&h=400&fit=crop",
  proj3:      "https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=700&h=400&fit=crop",
  proj4:      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=700&h=400&fit=crop",
  proj5:      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=700&h=400&fit=crop",
  proj6:      "https://images.unsplash.com/photo-1507721999472-8ed4421c4af2?w=700&h=400&fit=crop",
  cert1:      "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=400&h=220&fit=crop",
  cert2:      "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=400&h=220&fit=crop",
  cert3:      "https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?w=400&h=220&fit=crop",
  cert4:      "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400&h=220&fit=crop",
  cert5:      "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=220&fit=crop",
  cert6:      "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=400&h=220&fit=crop",
};

// ─── PALETTE ──────────────────────────────────────────────────────────────────
const T = {
  bg:          "#05040f",
  surface:     "rgba(255,255,255,0.04)",
  glass:       "rgba(255,255,255,0.055)",
  border:      "rgba(255,255,255,0.09)",
  borderHover: "rgba(255,255,255,0.2)",
  text:        "#f0eeff",
  muted:       "#8b7faa",
  a1:          "#a78bfa",
  a2:          "#60a5fa",
  a3:          "#f472b6",
  a4:          "#34d399",
  g1:          "linear-gradient(135deg,#a78bfa,#60a5fa)",
  g2:          "linear-gradient(135deg,#f472b6,#a78bfa)",
  g3:          "linear-gradient(135deg,#34d399,#60a5fa)",
};

// ─── GLOBAL CSS ───────────────────────────────────────────────────────────────
const GS = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&family=Playfair+Display:wght@700;900&display=swap');
    *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
    html{scroll-behavior:smooth;overflow-x:hidden}
    body{background:${T.bg};color:${T.text};font-family:'Outfit',sans-serif;-webkit-font-smoothing:antialiased;overflow-x:hidden}
    ::-webkit-scrollbar{width:4px}
    ::-webkit-scrollbar-track{background:transparent}
    ::-webkit-scrollbar-thumb{background:${T.a1};border-radius:2px}
    ::selection{background:${T.a1}44;color:#fff}
    a{color:inherit;text-decoration:none}
    input,textarea{font-family:'Outfit',sans-serif;color:${T.text}}
    img{display:block}

    @keyframes blob1{0%,100%{transform:translate(0,0)scale(1)}40%{transform:translate(40px,-30px)scale(1.07)}70%{transform:translate(-25px,35px)scale(.95)}}
    @keyframes blob2{0%,100%{transform:translate(0,0)scale(1)}35%{transform:translate(-50px,25px)scale(1.04)}65%{transform:translate(30px,-40px)scale(.97)}}
    @keyframes floatY{0%,100%{transform:translateY(0)}50%{transform:translateY(-16px)}}
    @keyframes pulse{0%,100%{opacity:.55}50%{opacity:1}}
    @keyframes drift{0%{transform:translateY(0)translateX(0)scale(1);opacity:0}8%{opacity:.9}88%{opacity:.9}100%{transform:translateY(-115vh)translateX(50px)scale(.35);opacity:0}}
    @keyframes ringGlow{0%,100%{box-shadow:0 0 14px #a78bfa55,0 0 28px #60a5fa33}50%{box-shadow:0 0 28px #a78bfa99,0 0 55px #60a5fa55}}

    .tilt{transform-style:preserve-3d;will-change:transform}
    .imgZoom img{transition:transform .55s cubic-bezier(.25,.46,.45,.94)}
    .imgZoom:hover img{transform:scale(1.09)}
  `}</style>
);

// ─── 3-D TILT ─────────────────────────────────────────────────────────────────
function Tilt({ children, s = 14, style }) {
  const r = useRef(null);
  const [rot, setRot] = useState({ x: 0, y: 0 });
  const [hov, setHov] = useState(false);
  const move = useCallback((e) => {
    const b = r.current?.getBoundingClientRect();
    if (!b) return;
    const dx = (e.clientX - b.left - b.width / 2) / (b.width / 2);
    const dy = (e.clientY - b.top - b.height / 2) / (b.height / 2);
    setRot({ x: -dy * s, y: dx * s });
  }, [s]);
  return (
    <motion.div ref={r} className="tilt"
      onMouseMove={move} onMouseEnter={() => setHov(true)}
      onMouseLeave={() => { setRot({ x: 0, y: 0 }); setHov(false); }}
      animate={{ rotateX: rot.x, rotateY: rot.y, scale: hov ? 1.03 : 1 }}
      transition={{ type: "spring", stiffness: 280, damping: 22 }}
      style={{ perspective: 1000, ...style }}
    >{children}</motion.div>
  );
}

// ─── SCROLL REVEAL ────────────────────────────────────────────────────────────
function Fade({ children, d = 0, dir = "up", style }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-55px" });
  const vx = {
    hidden: { opacity: 0, y: dir === "up" ? 48 : dir === "down" ? -48 : 0, x: dir === "left" ? 55 : dir === "right" ? -55 : 0, scale: .96 },
    show:   { opacity: 1, y: 0, x: 0, scale: 1 }
  };
  return (
    <motion.div ref={ref} variants={vx} initial="hidden" animate={inView ? "show" : "hidden"}
      transition={{ duration: .72, delay: d, ease: [.22, 1, .36, 1] }} style={style}>
      {children}
    </motion.div>
  );
}

// ─── ANIMATED BLOBS ───────────────────────────────────────────────────────────
function Blobs({ colors }) {
  const pos = [[12, 8], [68, 55], [42, 78]];
  return (
    <div style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none", zIndex: 0 }}>
      {colors.map((c, i) => (
        <div key={i} style={{
          position: "absolute", width: 420 + i * 90, height: 420 + i * 90,
          borderRadius: "50%", left: `${pos[i][0]}%`, top: `${pos[i][1]}%`,
          transform: "translate(-50%,-50%)",
          background: `radial-gradient(circle,${c}1e 0%,transparent 68%)`,
          filter: "blur(50px)",
          animation: `${i % 2 ? "blob2" : "blob1"} ${13 + i * 5}s ease-in-out infinite`,
        }} />
      ))}
    </div>
  );
}

// ─── PARTICLES ────────────────────────────────────────────────────────────────
function Particles() {
  const pts = useRef(Array.from({ length: 24 }, (_, i) => ({
    id: i, x: Math.random() * 100,
    delay: Math.random() * 14, dur: 11 + Math.random() * 15,
    sz: 1.4 + Math.random() * 2.8,
    color: [T.a1, T.a2, T.a3][i % 3],
  }))).current;
  return (
    <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 1, overflow: "hidden" }}>
      {pts.map(p => (
        <div key={p.id} style={{
          position: "absolute", bottom: -8, left: `${p.x}%`,
          width: p.sz, height: p.sz, borderRadius: "50%",
          background: p.color, boxShadow: `0 0 ${p.sz * 5}px ${p.color}`,
          animation: `drift ${p.dur}s ${p.delay}s linear infinite`,
        }} />
      ))}
    </div>
  );
}

// ─── SECTION ──────────────────────────────────────────────────────────────────
function Sec({ id, children, blobs, style }) {
  const ref = useRef(null);
  const inView = useInView(ref, { margin: "-180px" });
  return (
    <section id={id} ref={ref} style={{ position: "relative", overflow: "hidden", padding: "120px 2rem", ...style }}>
      {blobs && <Blobs colors={blobs} />}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: inView ? 1 : 0 }}
        transition={{ duration: .85 }} style={{ position: "relative", zIndex: 2 }}>
        {children}
      </motion.div>
    </section>
  );
}

// ─── SECTION HEADING ──────────────────────────────────────────────────────────
function Head({ tag, title, accent = T.a1 }) {
  return (
    <Fade style={{ textAlign: "center", marginBottom: "4rem" }}>
      <span style={{
        display: "inline-block", background: `${accent}18`, border: `1px solid ${accent}44`,
        color: accent, borderRadius: 20, padding: "4px 16px",
        fontSize: ".74rem", letterSpacing: 3, textTransform: "uppercase", fontWeight: 600, marginBottom: 14,
      }}>{tag}</span>
      <h2 style={{
        fontFamily: "'Playfair Display',serif", fontSize: "clamp(2rem,4.2vw,3.4rem)",
        fontWeight: 900, background: `linear-gradient(135deg,${T.text} 35%,${accent})`,
        WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", lineHeight: 1.12,
      }}>{title}</h2>
    </Fade>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// NAV
// ═══════════════════════════════════════════════════════════════════════════════
const LINKS = ["Hero","About","Experience","Skills","Projects","Certifications","Contact"];

function Nav() {
  const [active, setActive] = useState("Hero");
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);
  const go = (id) => { document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }); setActive(id); };
  return (
    <motion.nav initial={{ y: -80, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
      transition={{ duration: .9, ease: [.22, 1, .36, 1] }}
      style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000,
        height: 66, display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "0 2.5rem",
        background: scrolled ? "rgba(5,4,15,.88)" : "transparent",
        backdropFilter: scrolled ? "blur(22px)" : "none",
        borderBottom: scrolled ? `1px solid ${T.border}` : "none",
        transition: "background .4s,backdrop-filter .4s,border .4s",
      }}>
        <motion.div whileHover={{ scale: 1.06 }} onClick={() => go("Hero")} style={{ cursor: "pointer", display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ fontFamily: "'Playfair Display',serif", fontSize: "1.5rem", fontWeight: 900, background: T.g1, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Arjun Kumara</span>
          <span style={{ color: T.muted, fontSize: ".78rem", fontWeight: 300, letterSpacing: 1 }}>Portfolio</span>
        </motion.div>
      <div style={{ display: "flex", gap: 2 }}>
        {LINKS.map((l, i) => (
          <motion.button key={l} onClick={() => go(l)}
            initial={{ opacity: 0, y: -18 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: .06 * i + .3 }} whileHover={{ scale: 1.07 }} whileTap={{ scale: .95 }}
            style={{
              background: active === l ? `${T.a1}20` : "transparent",
              border: `1px solid ${active === l ? T.a1 + "55" : "transparent"}`,
              color: active === l ? T.a1 : T.muted,
              borderRadius: 8, padding: "5px 13px", cursor: "pointer",
              fontSize: ".8rem", fontWeight: 500, letterSpacing: .4,
              transition: "all .3s",
            }}>{l}</motion.button>
        ))}
      </div>
    </motion.nav>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// HERO
// ═══════════════════════════════════════════════════════════════════════════════
function Hero() {
  const { scrollY } = useScroll();
  const yOff = useTransform(scrollY, [0, 400], [0, 55]);
  const fade = useTransform(scrollY, [0, 380], [1, 0]);
  return (
    <Sec id="Hero" blobs={[T.a1, T.a2, T.a3]} style={{ minHeight: "100vh", display: "flex", alignItems: "center", paddingTop: 100 }}>
      {/* grid lines */}
      <div style={{ position: "absolute", inset: 0, opacity: .035, zIndex: 1 }}>
        <svg width="100%" height="100%">
          <defs><pattern id="g" width="60" height="60" patternUnits="userSpaceOnUse"><path d="M60 0L0 0 0 60" fill="none" stroke="white" strokeWidth=".5"/></pattern></defs>
          <rect width="100%" height="100%" fill="url(#g)"/>
        </svg>
      </div>
      <motion.div style={{ opacity: fade, zIndex: 3, position: "relative", maxWidth: 1200, margin: "0 auto", width: "100%", display: "flex", alignItems: "center", gap: "5rem", flexWrap: "wrap" }}>
        {/* TEXT */}
        <div style={{ flex: "1 1 340px" }}>
          <motion.div initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: .9, delay: .2 }}>
            <span style={{ display: "inline-flex", alignItems: "center", gap: 8, background: `${T.a3}14`, border: `1px solid ${T.a3}44`, color: T.a3, borderRadius: 20, padding: "4px 14px", fontSize: ".77rem", letterSpacing: 2, textTransform: "uppercase", fontWeight: 600, marginBottom: 22 }}>
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: T.a3, animation: "pulse 2s infinite" }} />
              Available for Work
            </span>
          </motion.div>

           <motion.h1 initial={{ opacity: 0, y: 55 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: .35 }}
             style={{ fontFamily: "'Playfair Display',serif", fontSize: "clamp(3.2rem,7.5vw,5.8rem)", fontWeight: 900, lineHeight: 1.04, marginBottom: ".4rem" }}>
             <span style={{ display: "block", color: T.text }}>Arjun</span>
             <span style={{ display: "block", background: T.g1, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Kumara</span>
           </motion.h1>

          <motion.div initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .5 }}
            style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: "1.1rem" }}>
            <div style={{ height: 2, width: 36, background: T.g1, borderRadius: 1 }} />
            <span style={{ color: T.muted, fontSize: "1.05rem" }}>Full-Stack Engineer & Creative Technologist</span>
          </motion.div>

          <motion.p initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .62 }}
            style={{ color: T.muted, fontSize: ".98rem", lineHeight: 1.88, maxWidth: 490, marginBottom: "2.4rem" }}>
            I craft immersive digital experiences that blend elegant engineering with bold design thinking. Passionate about open source, performance, and building things that matter.
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .78 }}
            style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
            <motion.a href="/resume.pdf" download whileHover={{ scale: 1.06, boxShadow: `0 0 32px ${T.a1}55` }} whileTap={{ scale: .97 }}
              style={{ background: T.g1, color: "#fff", borderRadius: 12, padding: "12px 28px", fontWeight: 700, fontSize: ".9rem", letterSpacing: .5, boxShadow: `0 4px 24px ${T.a1}44`, cursor: "pointer" }}>
              ↓ Download CV
            </motion.a>
            <motion.button onClick={() => document.getElementById("Contact")?.scrollIntoView({ behavior: "smooth" })}
              whileHover={{ scale: 1.06 }} whileTap={{ scale: .97 }}
              style={{ background: "transparent", border: `1px solid ${T.border}`, color: T.text, borderRadius: 12, padding: "12px 28px", fontWeight: 500, fontSize: ".9rem", cursor: "pointer", transition: "all .3s" }}>
              Contact Me →
            </motion.button>
          </motion.div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.1 }}
            style={{ display: "flex", gap: "2.5rem", marginTop: "3rem" }}>
            {[["6+","Years Exp."],["40+","Projects"],["12k+","GitHub Stars"]].map(([n, l]) => (
              <div key={l}>
                <div style={{ fontFamily: "'Playfair Display',serif", fontSize: "1.9rem", fontWeight: 900, background: T.g1, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>{n}</div>
                <div style={{ color: T.muted, fontSize: ".77rem", letterSpacing: 1 }}>{l}</div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* PROFILE IMAGE */}
        <motion.div style={{ flex: "0 0 auto", y: yOff }} initial={{ opacity: 0, scale: .85, x: 55 }} animate={{ opacity: 1, scale: 1, x: 0 }} transition={{ duration: 1.1, delay: .4 }}>
          <div style={{ position: "relative", display: "inline-block" }}>
            <div style={{ position: "absolute", inset: -4, borderRadius: "50%", background: T.g1, animation: "ringGlow 3s ease-in-out infinite", zIndex: 0, filter: "blur(1px)" }} />
            <div style={{ position: "absolute", inset: -16, borderRadius: "50%", background: `${T.a1}1a`, filter: "blur(24px)", animation: "pulse 3s ease-in-out infinite" }} />
             <img src={IMG.profile} alt="Arjun Kumara"
               style={{ width: 300, height: 300, borderRadius: "50%", objectFit: "cover", position: "relative", zIndex: 1, border: `3px solid ${T.bg}`, animation: "floatY 5.5s ease-in-out infinite" }}
               onError={e => { e.target.onerror = null; e.target.src = "https://ui-avatars.com/api/?name=Arjun+Kumara&size=300&background=a78bfa&color=fff&bold=true&font-size=0.35"; }}
             />
            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 1.2, type: "spring", stiffness: 260, damping: 20 }}
              style={{ position: "absolute", bottom: 22, right: -24, background: T.glass, backdropFilter: "blur(18px)", border: `1px solid ${T.border}`, borderRadius: 14, padding: "9px 14px", zIndex: 2 }}>
              <div style={{ fontSize: ".74rem", color: T.a4, fontWeight: 600 }}>🟢 Open to Roles</div>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>

      {/* scroll hint */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.7 }}
        onClick={() => document.getElementById("About")?.scrollIntoView({ behavior: "smooth" })}
        style={{ position: "absolute", bottom: 38, left: "50%", transform: "translateX(-50%)", zIndex: 3, display: "flex", flexDirection: "column", alignItems: "center", gap: 7, cursor: "pointer" }}>
        <span style={{ color: T.muted, fontSize: ".68rem", letterSpacing: 3, textTransform: "uppercase" }}>Scroll</span>
        <motion.div animate={{ y: [0, 9, 0] }} transition={{ repeat: Infinity, duration: 1.7, ease: "easeInOut" }}
          style={{ width: 24, height: 38, border: `1.5px solid ${T.muted}44`, borderRadius: 12, display: "flex", justifyContent: "center", paddingTop: 6 }}>
          <div style={{ width: 3, height: 8, background: T.a1, borderRadius: 2 }} />
        </motion.div>
      </motion.div>
    </Sec>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// ABOUT
// ═══════════════════════════════════════════════════════════════════════════════
const HIGHLIGHTS = [
  { icon: "🌟", title: "Open Source Contributor", desc: "Active contributor to React & Next.js ecosystem with 12k+ GitHub stars across 15+ OSS projects.", img: IMG.oss },
  { icon: "🎤", title: "Speaker & Mentor",         desc: "Delivered talks at JSConf, ReactSummit and mentored 200+ developers worldwide.",                img: IMG.speaker },
  { icon: "⚡", title: "Tech Enthusiast",           desc: "Obsessed with performance, DX, and pushing the boundaries of what the web can do.",             img: IMG.tech },
];

function About() {
  return (
    <Sec id="About" blobs={[T.a2, T.a1, "#7c3aed"]}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <Head tag="Who I Am" title="The Story Behind the Code" accent={T.a2} />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(320px,1fr))", gap: "4rem", alignItems: "center", marginBottom: "4rem" }}>
          <Fade dir="right">
            <div style={{ position: "relative", borderRadius: 24, overflow: "hidden" }}>
              <img src={IMG.working} alt="Working"
                style={{ width: "100%", height: 340, objectFit: "cover", display: "block", borderRadius: 24 }}
                onError={e => { e.target.onerror = null; e.target.src = "https://picsum.photos/seed/workalt/600/450"; }}
              />
              <div style={{ position: "absolute", inset: 0, borderRadius: 24, background: `linear-gradient(to top,${T.bg}cc,transparent)` }} />
              <div style={{ position: "absolute", bottom: 22, left: 22, background: T.glass, backdropFilter: "blur(18px)", border: `1px solid ${T.border}`, borderRadius: 14, padding: "11px 16px" }}>
                <div style={{ fontSize: ".78rem", color: T.muted }}>Currently building at</div>
                <div style={{ fontWeight: 700, fontSize: ".98rem", color: T.text }}>TechNova Inc.</div>
              </div>
            </div>
          </Fade>
          <Fade dir="left">
            <div>
              <p style={{ color: T.muted, fontSize: "1.03rem", lineHeight: 1.92, marginBottom: "1.4rem" }}>
                I'm a full-stack engineer with 6+ years of experience crafting high-performance web applications. My passion sits at the intersection of clean code, beautiful design, and meaningful user experiences.
              </p>
              <p style={{ color: T.muted, fontSize: "1.03rem", lineHeight: 1.92 }}>
                When I'm not shipping features, I'm contributing to open source, writing technical articles, or mentoring the next generation of developers. I believe great software is built with empathy, precision, and a touch of boldness.
              </p>
            </div>
          </Fade>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", gap: "1.4rem" }}>
          {HIGHLIGHTS.map((h, i) => (
            <Fade key={h.title} d={i * .12}>
              <Tilt style={{ height: "100%" }}>
                <div className="imgZoom" style={{ background: T.glass, border: `1px solid ${T.border}`, borderRadius: 20, overflow: "hidden", height: "100%", transition: "border-color .3s,box-shadow .3s" }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = T.a1 + "55"; e.currentTarget.style.boxShadow = `0 8px 36px ${T.a1}1a`; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = T.border; e.currentTarget.style.boxShadow = "none"; }}>
                  <div style={{ position: "relative", height: 148, overflow: "hidden" }}>
                    <img src={h.img} alt={h.title} style={{ width: "100%", height: "100%", objectFit: "cover" }}
                      onError={e => { e.target.onerror = null; e.target.src = `https://picsum.photos/seed/hl${i}/400/240`; }} />
                    <div style={{ position: "absolute", inset: 0, background: `linear-gradient(to bottom,transparent 35%,${T.bg}dd)` }} />
                    <div style={{ position: "absolute", top: 12, left: 12, fontSize: "1.7rem" }}>{h.icon}</div>
                  </div>
                  <div style={{ padding: "1.2rem 1.5rem 1.6rem" }}>
                    <h3 style={{ fontSize: ".98rem", fontWeight: 700, color: T.text, marginBottom: 7 }}>{h.title}</h3>
                    <p style={{ color: T.muted, fontSize: ".87rem", lineHeight: 1.72 }}>{h.desc}</p>
                  </div>
                </div>
              </Tilt>
            </Fade>
          ))}
        </div>
      </div>
    </Sec>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// EXPERIENCE
// ═══════════════════════════════════════════════════════════════════════════════
const EXP = [
  { co: "TechNova Inc.", role: "Senior Software Engineer", dur: "2022 – Present", color: T.a1,
    pts: ["Led migration to microservices, cutting latency by 60%","Architected design system used by 12 product teams","Mentored 5 junior engineers to mid-level promotions","Built real-time collaboration features for 500k+ users"] },
  { co: "Pixel Labs", role: "Frontend Engineer", dur: "2020 – 2022", color: T.a2,
    pts: ["Rebuilt dashboard reducing bundle size by 45%","Implemented CI/CD pipeline saving 8 hrs/week","Introduced Storybook-driven development workflow","Shipped 30+ A/B experiments improving conversions 22%"] },
  { co: "Freelance & OSS", role: "Full-Stack Developer", dur: "2018 – 2020", color: T.a3,
    pts: ["Delivered 15+ client projects across fintech & e-commerce","Authored 3 npm packages with 50k+ weekly downloads","Spoke at 4 regional developer conferences","Built and sold a SaaS analytics tool"] },
];

function Experience() {
  return (
    <Sec id="Experience" blobs={[T.a3, "#7c3aed", T.a1]}>
      <div style={{ maxWidth: 900, margin: "0 auto" }}>
        <Head tag="My Journey" title="Professional Experience" accent={T.a3} />
        <div style={{ position: "relative" }}>
          <motion.div initial={{ scaleY: 0 }} whileInView={{ scaleY: 1 }} viewport={{ once: true }}
            transition={{ duration: 2, ease: "easeInOut" }}
            style={{ position: "absolute", left: 19, top: 0, bottom: 0, width: 2, background: `linear-gradient(to bottom,${T.a1},${T.a2},${T.a3})`, borderRadius: 1, transformOrigin: "top" }} />
          {EXP.map((ex, i) => (
            <Fade key={ex.co} d={i * .14} dir="left">
              <div style={{ display: "flex", gap: "2rem", marginBottom: "2.4rem" }}>
                <div style={{ flexShrink: 0, marginTop: 6 }}>
                  <div style={{ width: 40, height: 40, borderRadius: "50%", background: `${ex.color}1e`, border: `2px solid ${ex.color}`, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: `0 0 16px ${ex.color}55` }}>
                    <div style={{ width: 10, height: 10, borderRadius: "50%", background: ex.color }} />
                  </div>
                </div>
                <Tilt intensity={6} style={{ flex: 1 }}>
                  <div style={{ background: T.glass, border: `1px solid ${T.border}`, borderRadius: 20, padding: "1.7rem 2rem", transition: "border-color .3s" }}
                    onMouseEnter={e => e.currentTarget.style.borderColor = ex.color + "55"}
                    onMouseLeave={e => e.currentTarget.style.borderColor = T.border}>
                    <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 8, marginBottom: ".7rem" }}>
                      <div>
                        <h3 style={{ fontSize: "1.08rem", fontWeight: 700, color: T.text }}>{ex.role}</h3>
                        <span style={{ background: `${ex.color}18`, color: ex.color, borderRadius: 8, padding: "3px 10px", fontSize: ".78rem", fontWeight: 600 }}>{ex.co}</span>
                      </div>
                      <span style={{ color: T.muted, fontSize: ".8rem", background: T.surface, borderRadius: 8, padding: "4px 10px", border: `1px solid ${T.border}`, alignSelf: "flex-start" }}>{ex.dur}</span>
                    </div>
                    <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 8 }}>
                      {ex.pts.map(b => (
                        <li key={b} style={{ color: T.muted, fontSize: ".88rem", lineHeight: 1.62, display: "flex", gap: 10, alignItems: "flex-start" }}>
                          <span style={{ color: ex.color, marginTop: 2, flexShrink: 0 }}>▸</span>{b}
                        </li>
                      ))}
                    </ul>
                  </div>
                </Tilt>
              </div>
            </Fade>
          ))}
        </div>
      </div>
    </Sec>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// EDUCATION
// ═══════════════════════════════════════════════════════════════════════════════
const EDU = [
  { school: "IIT Bangalore", deg: "B.Tech in Computer Science", dur: "2014 – 2018", gpa: "9.2 / 10", color: T.a1, img: IMG.edu1,
    pts: ["Best Final Year Project Award","ACM Chapter President","Teaching Assistant – Data Structures"] },
  { school: "Coursera / edX", deg: "Professional Specializations", dur: "2019 – 2024", gpa: "12 Courses", color: T.a3, img: IMG.edu2,
    pts: ["Deep Learning Specialization (Stanford / deeplearning.ai)","Full-Stack Web Development (Johns Hopkins)","System Design for Interviews (Google)"] },
];

function Education() {
  return (
    <Sec id="Education" blobs={["#7c3aed", T.a1, T.a2]}>
      <div style={{ maxWidth: 1000, margin: "0 auto" }}>
        <Head tag="Academia" title="Education" accent={T.a1} />
        <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
          {EDU.map((e, i) => (
            <Fade key={e.school} dir={i % 2 ? "left" : "right"} d={i * .15}>
              <Tilt intensity={5}>
                <div style={{ background: T.glass, border: `1px solid ${T.border}`, borderRadius: 24, overflow: "hidden", display: "grid", gridTemplateColumns: "minmax(0,260px) 1fr", transition: "border-color .3s" }}
                  onMouseEnter={el => el.currentTarget.style.borderColor = e.color + "55"}
                  onMouseLeave={el => el.currentTarget.style.borderColor = T.border}>
                  <div style={{ position: "relative", overflow: "hidden", minHeight: 180 }}>
                    <img src={e.img} alt={e.school} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                      onError={ev => { ev.target.onerror = null; ev.target.src = `https://picsum.photos/seed/edu${i}/700/320`; }} />
                    <div style={{ position: "absolute", inset: 0, background: `linear-gradient(to right,transparent,${T.bg}bb)` }} />
                  </div>
                  <div style={{ padding: "2rem" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 8, marginBottom: 14 }}>
                      <div>
                        <h3 style={{ fontFamily: "'Playfair Display',serif", fontSize: "1.25rem", fontWeight: 900, color: T.text, marginBottom: 4 }}>{e.school}</h3>
                        <p style={{ color: e.color, fontWeight: 600, fontSize: ".88rem" }}>{e.deg}</p>
                      </div>
                      <div style={{ textAlign: "right" }}>
                        <div style={{ color: T.muted, fontSize: ".78rem" }}>{e.dur}</div>
                        <div style={{ color: e.color, fontWeight: 700, fontSize: ".86rem", marginTop: 2 }}>{e.gpa}</div>
                      </div>
                    </div>
                    <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 8 }}>
                      {e.pts.map(h => (
                        <li key={h} style={{ color: T.muted, fontSize: ".86rem", display: "flex", gap: 10, alignItems: "flex-start" }}>
                          <span style={{ color: e.color, flexShrink: 0, marginTop: 2 }}>✦</span>{h}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </Tilt>
            </Fade>
          ))}
        </div>
      </div>
    </Sec>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// SKILLS
// ═══════════════════════════════════════════════════════════════════════════════
const SKILLS = {
  Frontend: [
    { n: "React / Next.js", v: 95, c: T.a1 },
    { n: "TypeScript",      v: 90, c: T.a2 },
    { n: "CSS / Tailwind",  v: 92, c: T.a3 },
    { n: "Framer Motion",   v: 86, c: "#f59e0b" },
  ],
  Backend: [
    { n: "Node.js / Express", v: 88, c: T.a4 },
    { n: "PostgreSQL",         v: 82, c: T.a2 },
    { n: "GraphQL",            v: 78, c: "#f472b6" },
    { n: "Redis",              v: 73, c: "#ef4444" },
  ],
  Tools: [
    { n: "Docker / K8s",       v: 80, c: T.a1 },
    { n: "AWS / Vercel",        v: 84, c: "#f59e0b" },
    { n: "CI/CD / GH Actions", v: 87, c: T.a4 },
    { n: "Figma",              v: 75, c: "#f472b6" },
  ],
};

function Bar({ n, v, c, i }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  return (
    <div ref={ref} style={{ marginBottom: "1.1rem" }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 7 }}>
        <span style={{ color: T.text, fontSize: ".87rem", fontWeight: 500 }}>{n}</span>
        <span style={{ color: c, fontSize: ".8rem", fontWeight: 700 }}>{v}%</span>
      </div>
      <div style={{ background: T.surface, borderRadius: 4, height: 6, overflow: "hidden" }}>
        <motion.div initial={{ width: 0 }} animate={{ width: inView ? `${v}%` : 0 }}
          transition={{ duration: 1.35, delay: i * .09 + .25, ease: [.25,.46,.45,.94] }}
          style={{ height: "100%", borderRadius: 4, background: `linear-gradient(90deg,${c}88,${c})`, boxShadow: `0 0 10px ${c}66` }} />
      </div>
    </div>
  );
}

function Skills() {
  const TAGS = ["Python","Rust","Go","WebAssembly","Three.js","D3.js","Prisma","tRPC","Turborepo","Storybook","Playwright","Vitest","Prometheus","OpenAI API"];
  return (
    <Sec id="Skills" blobs={[T.a4, T.a2, T.a1]}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <Head tag="Arsenal" title="Skills & Expertise" accent={T.a4} />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))", gap: "1.4rem" }}>
          {Object.entries(SKILLS).map(([cat, arr], ci) => (
            <Fade key={cat} d={ci * .1}>
              <div style={{ background: T.glass, border: `1px solid ${T.border}`, borderRadius: 20, padding: "2rem" }}>
                <h3 style={{ fontFamily: "'Playfair Display',serif", fontSize: "1.1rem", fontWeight: 700, marginBottom: "1.5rem", background: T.g1, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>{cat}</h3>
                {arr.map((s, i) => <Bar key={s.n} n={s.n} v={s.v} c={s.c} i={i} />)}
              </div>
            </Fade>
          ))}
        </div>
        <Fade d={.3}>
          <div style={{ marginTop: "3rem", textAlign: "center" }}>
            <h4 style={{ color: T.muted, fontSize: ".78rem", letterSpacing: 2.5, textTransform: "uppercase", marginBottom: "1.2rem" }}>Also Familiar With</h4>
            <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: ".6rem" }}>
              {TAGS.map((t, i) => (
                <motion.span key={t} initial={{ opacity: 0, scale: .8 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: i * .04 }}
                  whileHover={{ scale: 1.1, background: `${T.a1}22`, borderColor: T.a1, color: T.a1 }}
                  style={{ background: T.surface, border: `1px solid ${T.border}`, borderRadius: 20, padding: "5px 14px", fontSize: ".79rem", color: T.muted, cursor: "default", transition: "all .25s" }}>
                  {t}
                </motion.span>
              ))}
            </div>
          </div>
        </Fade>
      </div>
    </Sec>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// PROJECTS
// ═══════════════════════════════════════════════════════════════════════════════
const PROJS = [
  { t: "Lumina UI",         d: "Open-source React component library with 80+ animated components, TypeScript support, and Tailwind integration.", tags: ["React","TypeScript","Framer Motion"], img: IMG.proj1, stars: "4.2k", c: T.a1, live: "https://lumina-ui.vercel.app", gh: "https://github.com/arjun/lumina-ui" },
  { t: "VaultDB",           d: "Distributed key-value store in Rust with RAFT consensus, serving 10M+ ops/second in production.",                 tags: ["Rust","Distributed","RAFT"],          img: IMG.proj2, stars: "2.8k", c: T.a2, live: "https://vaultdb.dev", gh: "https://github.com/arjun/vaultdb" },
  { t: "FlowCanvas",        d: "Real-time collaborative whiteboard with Y.js sync, WebRTC video, and AI-powered diagram suggestions.",            tags: ["Next.js","Y.js","WebRTC","AI"],      img: IMG.proj3, stars: "1.9k", c: T.a3, live: "https://flowcanvas.app", gh: "https://github.com/arjun/flowcanvas" },
  { t: "Horizon Analytics", d: "Event analytics platform with sub-second query latency on 100B+ rows using ClickHouse and React.",               tags: ["React","ClickHouse","Node.js"],      img: IMG.proj4, stars: "890",  c: T.a4, live: "https://horizon.analytics", gh: "https://github.com/arjun/horizon" },
  { t: "CodePilot CLI",     d: "AI-powered terminal assistant that understands your codebase context and generates precise shell commands.",      tags: ["Python","OpenAI","LangChain"],       img: IMG.proj5, stars: "3.1k", c: "#f59e0b", live: "https://codepilot.dev", gh: "https://github.com/arjun/codepilot" },
  { t: "Prismatic",         d: "Next-gen CSS-in-JS library with zero runtime overhead, static extraction, and DX-first API.",                    tags: ["TypeScript","PostCSS","AST"],        img: IMG.proj6, stars: "1.2k", c: "#f472b6", live: "https://prismatic.dev", gh: "https://github.com/arjun/prismatic" },
];

function PCard({ p, i }) {
  const [hov, setHov] = useState(false);
  return (
    <Fade d={i * .08}>
      <Tilt intensity={10} style={{ height: "100%" }}>
        <div onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
          style={{ background: T.glass, border: `1px solid ${hov ? p.c + "44" : T.border}`, borderRadius: 20, overflow: "hidden", height: "100%", display: "flex", flexDirection: "column", transition: "border-color .3s,box-shadow .3s", boxShadow: hov ? `0 8px 44px ${p.c}1e` : "none" }}>
          <div className="imgZoom" style={{ position: "relative", overflow: "hidden", height: 200 }}>
            <img src={p.img} alt={p.t} style={{ width: "100%", height: "100%", objectFit: "cover" }}
              onError={e => { e.target.onerror = null; e.target.src = `https://picsum.photos/seed/p${i * 19}/700/400`; }} />
            <motion.div animate={{ opacity: hov ? 1 : 0 }} transition={{ duration: .3 }}
              style={{ position: "absolute", inset: 0, background: `linear-gradient(to bottom,${p.c}22,${T.bg}cc)` }} />
            <div style={{ position: "absolute", top: 12, right: 12, background: `${T.bg}cc`, backdropFilter: "blur(12px)", borderRadius: 10, padding: "4px 10px", fontSize: ".77rem", color: p.c, fontWeight: 700, border: `1px solid ${p.c}44` }}>⭐ {p.stars}</div>
          </div>
          <div style={{ padding: "1.5rem", flex: 1, display: "flex", flexDirection: "column", gap: 10 }}>
            <h3 style={{ fontSize: "1.08rem", fontWeight: 700, color: T.text }}>{p.t}</h3>
            <p style={{ color: T.muted, fontSize: ".87rem", lineHeight: 1.72, flex: 1 }}>{p.d}</p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
              {p.tags.map(g => <span key={g} style={{ background: `${p.c}14`, color: p.c, borderRadius: 8, padding: "3px 10px", fontSize: ".74rem", fontWeight: 600, border: `1px solid ${p.c}33` }}>{g}</span>)}
            </div>
            <div style={{ display: "flex", gap: 10, marginTop: 4 }}>
              <motion.a href={p.live} target="_blank" rel="noopener noreferrer" whileHover={{ scale: 1.05 }} style={{ flex: 1, textAlign: "center", background: `${p.c}1e`, border: `1px solid ${p.c}55`, color: p.c, borderRadius: 10, padding: "8px", fontSize: ".81rem", fontWeight: 600 }}>↗ Live</motion.a>
              <motion.a href={p.gh} target="_blank" rel="noopener noreferrer" whileHover={{ scale: 1.05 }} style={{ flex: 1, textAlign: "center", background: T.surface, border: `1px solid ${T.border}`, color: T.muted, borderRadius: 10, padding: "8px", fontSize: ".81rem", fontWeight: 600 }}>⌥ GitHub</motion.a>
            </div>
          </div>
        </div>
      </Tilt>
    </Fade>
  );
}

function Projects() {
  return (
    <Sec id="Projects" blobs={[T.a1, T.a3, T.a2]}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <Head tag="Featured Work" title="Selected Projects" accent={T.a1} />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(320px,1fr))", gap: "1.4rem" }}>
          {PROJS.map((p, i) => <PCard key={p.t} p={p} i={i} />)}
        </div>
      </div>
    </Sec>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// CERTIFICATIONS
// ═══════════════════════════════════════════════════════════════════════════════
const CERTS = [
  { t: "AWS Solutions Architect",  org: "Amazon Web Services",    yr: 2024, ico: "☁️",  c: T.a2,      img: IMG.cert1 },
  { t: "CKA: Kubernetes Admin",    org: "Cloud Native Foundation", yr: 2023, ico: "⚙️",  c: T.a4,      img: IMG.cert2 },
  { t: "MongoDB Professional",     org: "MongoDB University",      yr: 2023, ico: "🗄️",  c: T.a3,      img: IMG.cert3 },
  { t: "Google Cloud Engineer",    org: "Google Cloud",            yr: 2022, ico: "🌐",  c: T.a1,      img: IMG.cert4 },
  { t: "Meta React Developer",     org: "Coursera × Meta",         yr: 2022, ico: "⚛️",  c: "#61dafb",  img: IMG.cert5 },
  { t: "GraphQL Professional",     org: "Apollo GraphQL",          yr: 2021, ico: "🔗",  c: "#e535ab",  img: IMG.cert6 },
];

function Certifications() {
  return (
    <Sec id="Certifications" blobs={[T.a2, T.a4, T.a3]}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <Head tag="Credentials" title="Certifications & Awards" accent={T.a2} />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(270px,1fr))", gap: "1.3rem" }}>
          {CERTS.map((ct, i) => (
            <Fade key={ct.t} d={i * .07}>
              <Tilt intensity={12} style={{ height: "100%" }}>
                <div className="imgZoom" style={{ background: T.glass, border: `1px solid ${T.border}`, borderRadius: 20, overflow: "hidden", height: "100%", transition: "border-color .3s,box-shadow .3s" }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = ct.c + "66"; e.currentTarget.style.boxShadow = `0 8px 34px ${ct.c}22`; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = T.border; e.currentTarget.style.boxShadow = "none"; }}>
                  <div style={{ position: "relative", height: 120, overflow: "hidden" }}>
                    <img src={ct.img} alt={ct.t} style={{ width: "100%", height: "100%", objectFit: "cover" }}
                      onError={e => { e.target.onerror = null; e.target.src = `https://picsum.photos/seed/c${i * 11}/400/220`; }} />
                    <div style={{ position: "absolute", inset: 0, background: `linear-gradient(to bottom,${ct.c}22,${T.bg}ee)` }} />
                    <div style={{ position: "absolute", top: 12, left: 12, fontSize: "2rem" }}>{ct.ico}</div>
                    <div style={{ position: "absolute", top: 12, right: 12, background: `${ct.c}22`, border: `1px solid ${ct.c}55`, color: ct.c, borderRadius: 8, padding: "2px 8px", fontSize: ".74rem", fontWeight: 700 }}>{ct.yr}</div>
                  </div>
                  <div style={{ padding: "1.2rem 1.5rem 1.5rem" }}>
                    <h3 style={{ fontSize: ".94rem", fontWeight: 700, color: T.text, marginBottom: 5 }}>{ct.t}</h3>
                    <p style={{ color: T.muted, fontSize: ".79rem" }}>{ct.org}</p>
                    <div style={{ marginTop: 12, height: 2, borderRadius: 1, background: `linear-gradient(90deg,${ct.c},transparent)` }} />
                  </div>
                </div>
              </Tilt>
            </Fade>
          ))}
        </div>
      </div>
    </Sec>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// CONTACT
// ═══════════════════════════════════════════════════════════════════════════════
const SOCIALS = [
  { l: "GitHub",   icon: "GH", href: "https://github.com/arjunkumar", c: T.text },
  { l: "LinkedIn", icon: "in", href: "https://linkedin.com/in/arjunkumar", c: "#38bdf8" },
  { l: "Email",    icon: "✉",  href: "mailto:arjun@example.com", c: T.a3 },
  { l: "WhatsApp", icon: "✆",  href: "https://wa.me/919876543210", c: T.a4 },
];

function Contact() {
  const [form, setForm] = useState({ name: "", email: "", msg: "" });
  const [sent, setSent] = useState(false);
  const inp = {
    background: T.glass, border: `1px solid ${T.border}`, borderRadius: 12,
    padding: "12px 16px", color: T.text, fontSize: ".9rem", width: "100%", outline: "none", transition: "border-color .3s",
  };
  const sub = () => {
    if (form.name && form.email && form.msg) {
      setSent(true); setTimeout(() => setSent(false), 4000);
      setForm({ name: "", email: "", msg: "" });
    }
  };
  return (
    <Sec id="Contact" blobs={[T.a3, T.a1, T.a2]}>
      <div style={{ maxWidth: 1000, margin: "0 auto" }}>
        <Head tag="Get In Touch" title="Let's Build Something" accent={T.a3} />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(320px,1fr))", gap: "3rem", alignItems: "start" }}>
          <Fade dir="right">
            <div>
              <p style={{ color: T.muted, fontSize: "1.03rem", lineHeight: 1.88, marginBottom: "2.4rem" }}>
                I'm open to senior engineering roles, fractional CTO engagements, and ambitious OSS collaborations. If you have a bold idea, let's talk.
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: "1rem", marginBottom: "2.4rem" }}>
                {[["📍","Bangalore, India"],["📅","Available from Feb 2025"],["🌏","Remote / Hybrid OK"]].map(([ic, tx]) => (
                  <div key={tx} style={{ display: "flex", alignItems: "center", gap: 14, color: T.muted, fontSize: ".9rem" }}>
                    <span style={{ fontSize: "1.2rem" }}>{ic}</span>{tx}
                  </div>
                ))}
              </div>
              <div style={{ display: "flex", gap: ".9rem", flexWrap: "wrap" }}>
                {SOCIALS.map(s => (
                  <motion.a key={s.l} href={s.href} whileHover={{ scale: 1.1, y: -3 }} whileTap={{ scale: .95 }}
                    style={{ background: T.glass, border: `1px solid ${T.border}`, borderRadius: 14, padding: "11px 18px", display: "flex", alignItems: "center", gap: 9, color: s.c, fontWeight: 600, fontSize: ".87rem", transition: "border-color .3s" }}
                    onMouseEnter={e => e.currentTarget.style.borderColor = s.c + "55"}
                    onMouseLeave={e => e.currentTarget.style.borderColor = T.border}>
                    <span style={{ fontSize: "1rem", fontWeight: 800 }}>{s.icon}</span>{s.l}
                  </motion.a>
                ))}
              </div>
            </div>
          </Fade>
          <Fade dir="left">
            <Tilt intensity={5}>
              <div style={{ background: T.glass, border: `1px solid ${T.border}`, borderRadius: 24, padding: "2.5rem", backdropFilter: "blur(20px)" }}>
                <AnimatePresence>
                  {sent && (
                    <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                      style={{ background: `${T.a4}18`, border: `1px solid ${T.a4}44`, borderRadius: 12, padding: "12px 16px", marginBottom: "1.4rem", color: T.a4, fontSize: ".87rem", textAlign: "center" }}>
                      ✅ Message sent! I'll get back to you soon.
                    </motion.div>
                  )}
                </AnimatePresence>
                <div style={{ display: "flex", flexDirection: "column", gap: "1.2rem" }}>
                  {[{ k: "name", label: "Your Name", type: "text", ph: "Rahul Sharma" },
                    { k: "email", label: "Email", type: "email", ph: "rahul@example.com" }].map(f => (
                    <div key={f.k}>
                      <label style={{ display: "block", color: T.muted, fontSize: ".78rem", marginBottom: 6, letterSpacing: .5 }}>{f.label}</label>
                      <input type={f.type} value={form[f.k]} placeholder={f.ph}
                        onChange={e => setForm(p => ({ ...p, [f.k]: e.target.value }))}
                        style={inp}
                        onFocus={e => e.target.style.borderColor = T.a1}
                        onBlur={e => e.target.style.borderColor = T.border} />
                    </div>
                  ))}
                  <div>
                    <label style={{ display: "block", color: T.muted, fontSize: ".78rem", marginBottom: 6, letterSpacing: .5 }}>Message</label>
                    <textarea value={form.msg} placeholder="Tell me about your project..." rows={5}
                      onChange={e => setForm(p => ({ ...p, msg: e.target.value }))}
                      style={{ ...inp, resize: "vertical", minHeight: 120 }}
                      onFocus={e => e.target.style.borderColor = T.a1}
                      onBlur={e => e.target.style.borderColor = T.border} />
                  </div>
                  <motion.button onClick={sub} whileHover={{ scale: 1.03, boxShadow: `0 8px 34px ${T.a1}55` }} whileTap={{ scale: .97 }}
                    style={{ background: T.g1, color: "#fff", border: "none", borderRadius: 12, padding: "14px", fontWeight: 700, fontSize: ".94rem", cursor: "pointer", letterSpacing: .4 }}>
                    Send Message →
                  </motion.button>
                </div>
              </div>
            </Tilt>
          </Fade>
        </div>
      </div>
    </Sec>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// FOOTER
// ═══════════════════════════════════════════════════════════════════════════════
function Footer() {
  return (
    <footer style={{ borderTop: `1px solid ${T.border}`, padding: "2rem", textAlign: "center", position: "relative", zIndex: 2 }}>
      <p style={{ color: T.muted, fontSize: ".81rem" }}>
        Crafted with ❤️ by{" "}
         <span style={{ background: T.g1, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", fontWeight: 700 }}>Arjun Kumara</span>
        {" · "}React + Framer Motion · {new Date().getFullYear()}
      </p>
    </footer>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// APP ROOT
// ═══════════════════════════════════════════════════════════════════════════════
export default function App() {
  return (
    <>
      <GS />
      <div style={{ position: "relative", minHeight: "100vh" }}>
        <Particles />
        <Nav />
        <Hero />
        <About />
        <Experience />
        <Education />
        <Skills />
        <Projects />
        <Certifications />
        <Contact />
        <Footer />
      </div>
    </>
  );
}