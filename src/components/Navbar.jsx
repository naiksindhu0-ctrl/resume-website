import { useState, useEffect } from "react";
import { scrollTo } from "../hooks/useScrollSpy";

const navItems = ["hero", "about", "experience", "projects", "contact"];

export default function Navbar() {
  const [active, setActive] = useState("hero");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      style={{
        position: "fixed",
        top: "20px",
        left: "50%",
        transform: "translateX(-50%)",
        zIndex: 1000,
      }}
    >
      {/* 🌈 OUTER GLOW FRAME */}
      <div
        style={{
          padding: "2px",
          borderRadius: "999px",
          background:
            "linear-gradient(90deg, #A78BFA, #67E8F9, #A78BFA)",
          boxShadow: "0 0 25px rgba(167,139,250,0.25)",
        }}
      >
        {/* 🪟 GLASS NAVBAR */}
        <div
          style={{
            display: "flex",
            gap: "0.4rem",
            padding: "0.6rem 1rem",
            borderRadius: "999px",
            background: scrolled
              ? "rgba(10,10,20,0.75)"
              : "rgba(10,10,20,0.45)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            border: "1px solid rgba(255,255,255,0.08)",
            position: "relative",
          }}
        >
          {navItems.map((item) => {
            const isActive = active === item;

            return (
              <div
                key={item}
                onClick={() => {
                  setActive(item);
                  scrollTo(item);
                }}
                style={{
                  position: "relative",
                  padding: "0.55rem 1rem",
                  cursor: "pointer",
                  fontSize: "0.75rem",
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  fontWeight: 600,
                  transition: "all 0.3s ease",
                  transform: "translateY(0)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-2px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0px)";
                }}
              >
                {/* 🌈 DOUBLE COLOR TEXT */}
                <span
                  style={{
                    background: isActive
                      ? "linear-gradient(90deg,#A78BFA,#67E8F9)"
                      : "linear-gradient(90deg,#9CA3AF,#6B7280)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    transition: "all 0.3s ease",
                  }}
                >
                  {item}
                </span>

                {/* 🔥 ACTIVE PILL */}
                {isActive && (
                  <div
                    style={{
                      position: "absolute",
                      inset: "0px",
                      borderRadius: "999px",
                      background:
                        "linear-gradient(90deg, rgba(167,139,250,0.18), rgba(103,232,249,0.18))",
                      filter: "blur(10px)",
                      zIndex: -1,
                    }}
                  />
                )}

                {/* ✨ ACTIVE DOT */}
                {isActive && (
                  <div
                    style={{
                      position: "absolute",
                      bottom: 3,
                      left: "50%",
                      transform: "translateX(-50%)",
                      width: 5,
                      height: 5,
                      borderRadius: "50%",
                      background: "#A78BFA",
                      boxShadow: "0 0 10px #A78BFA",
                    }}
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}