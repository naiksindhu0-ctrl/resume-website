import { useRef } from "react";

// ─────────────────────────────────────────────
//  useMagnet — spring physics magnetic pull
//  Attach to any element for cursor-following magnet effect
// ─────────────────────────────────────────────
export function useMagnet({ strength = 12, rotate = 18, scale = 1.22 } = {}) {
  const ref = useRef(null);

  const onMouseMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = (e.clientX - cx) / (rect.width / 2);
    const dy = (e.clientY - cy) / (rect.height / 2);
    el.style.transform = `translate(${dx * strength}px, ${dy * strength}px) rotate(${dx * rotate}deg) scale(${scale})`;
  };

  const onMouseLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.transform = "translate(0,0) rotate(0) scale(1)";
    el.style.filter = "none";
  };

  return { ref, onMouseMove, onMouseLeave };
}

// ─────────────────────────────────────────────
//  useTilt — 3D perspective tilt for cards
//  Returns { ref, onMouseMove, onMouseLeave }
// ─────────────────────────────────────────────
export function useTilt(intensity = 12) {
  const ref = useRef(null);

  const onMouseMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    el.style.transform = `perspective(900px) rotateY(${x * intensity}deg) rotateX(${-y * intensity}deg) translateZ(10px)`;
    const glow = el.querySelector(".card-glow");
    if (glow) {
      glow.style.left = `${(x + 0.5) * 100}%`;
      glow.style.top = `${(y + 0.5) * 100}%`;
      glow.style.opacity = "1";
    }
  };

  const onMouseLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.transform = "perspective(900px) rotateY(0deg) rotateX(0deg) translateZ(0px)";
    const glow = el.querySelector(".card-glow");
    if (glow) glow.style.opacity = "0";
  };

  return { ref, onMouseMove, onMouseLeave };
}