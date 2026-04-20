import { useState, useEffect, useRef } from "react";

// ─────────────────────────────────────────────
//  useParallax — scroll-linked parallax
//  Returns a ref and the current offset value
//
//  Usage:
//    const { ref, offset } = useParallax(0.3);
//    <div ref={ref} style={{ transform: `translateY(${offset}px)` }} />
// ─────────────────────────────────────────────
export function useParallax(speed = 0.2) {
  const ref = useRef(null);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const relY = window.scrollY + rect.top;
      const progress = window.scrollY - relY + window.innerHeight;
      setOffset(progress * speed);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [speed]);

  return { ref, offset };
}

// ─────────────────────────────────────────────
//  useMouseParallax — cursor-linked parallax layers
//  Returns { x, y } for use in transform styles
// ─────────────────────────────────────────────
export function useMouseParallax(strength = 20) {
  const [pos, setPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMove = (e) => {
      const cx = window.innerWidth / 2;
      const cy = window.innerHeight / 2;
      setPos({
        x: ((e.clientX - cx) / cx) * strength,
        y: ((e.clientY - cy) / cy) * strength,
      });
    };

    window.addEventListener("mousemove", handleMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMove);
  }, [strength]);

  return pos;
}