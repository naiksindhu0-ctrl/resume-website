import { useEffect, useRef } from "react";

// ─────────────────────────────────────────────
//  Cursor — custom animated cursor
//  Dot: snaps instantly to mouse
//  Ring: lags behind with lerp easing
//  Grows on hover over links/buttons
// ─────────────────────────────────────────────
export default function Cursor() {
  const dot  = useRef(null);
  const ring = useRef(null);

  // ── Position tracking ──────────────────────
  useEffect(() => {
    let mx = 0, my = 0;
    let rx = 0, ry = 0;
    let raf;

    const move = (e) => {
      mx = e.clientX;
      my = e.clientY;
      if (dot.current) {
        dot.current.style.left = mx + "px";
        dot.current.style.top  = my + "px";
      }
    };

    const animate = () => {
      rx += (mx - rx) * 0.15;
      ry += (my - ry) * 0.15;
      if (ring.current) {
        ring.current.style.left = rx + "px";
        ring.current.style.top  = ry + "px";
      }
      raf = requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", move);
    animate();
    return () => {
      window.removeEventListener("mousemove", move);
      cancelAnimationFrame(raf);
    };
  }, []);

  // ── Hover grow effect ──────────────────────
  useEffect(() => {
    const grow = () => {
      if (!ring.current) return;
      ring.current.style.width       = "50px";
      ring.current.style.height      = "50px";
      ring.current.style.borderColor = "#C8FF00";
      ring.current.style.mixBlendMode = "normal";
    };
    const shrink = () => {
      if (!ring.current) return;
      ring.current.style.width       = "32px";
      ring.current.style.height      = "32px";
      ring.current.style.borderColor = "#C8FF0060";
    };

    // Re-query on every render so newly added elements are caught
    const els = document.querySelectorAll("a, button");
    els.forEach((el) => {
      el.addEventListener("mouseenter", grow);
      el.addEventListener("mouseleave", shrink);
    });

    return () => {
      els.forEach((el) => {
        el.removeEventListener("mouseenter", grow);
        el.removeEventListener("mouseleave", shrink);
      });
    };
  });

  const base = {
    position:      "fixed",
    pointerEvents: "none",
    zIndex:        99999,
    transform:     "translate(-50%, -50%)",
    borderRadius:  "50%",
  };

  return (
    <>
      {/* Dot */}
      <div
        ref={dot}
        style={{
          ...base,
          width:        "6px",
          height:       "6px",
          background:   "#C8FF00",
          mixBlendMode: "difference",
        }}
      />

      {/* Ring */}
      <div
        ref={ring}
        style={{
          ...base,
          width:       "32px",
          height:      "32px",
          border:      "1px solid #C8FF0060",
          transition:  "width 0.3s, height 0.3s, border-color 0.3s",
        }}
      />
    </>
  );
}