import { useState, useEffect } from "react";

// ─────────────────────────────────────────────
//  useScrollSpy — tracks which section is in view
//  Returns the id of the currently visible section
// ─────────────────────────────────────────────
export function useScrollSpy(ids, threshold = 0.3) {
  const [active, setActive] = useState(ids[0]);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { threshold }
    );

    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    });

    return () => obs.disconnect();
  }, []);

  return active;
}

// ─────────────────────────────────────────────
//  useInView — fires once when element enters viewport
// ─────────────────────────────────────────────
export function useInView(threshold = 0.12) {
  const { useRef, useState, useEffect } = require("react");
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setInView(true);
          obs.disconnect();
        }
      },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return [ref, inView];
}

// ─────────────────────────────────────────────
//  scrollTo — smooth scroll helper
// ─────────────────────────────────────────────
export function scrollTo(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}