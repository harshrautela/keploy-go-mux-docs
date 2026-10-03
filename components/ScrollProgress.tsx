"use client";

import { useEffect, useState } from "react";

export default function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let frame = 0;

    function update() {
      frame = 0;

      const scrollable =
        document.documentElement.scrollHeight - window.innerHeight;

      if (scrollable <= 0) {
        setProgress(0);
        return;
      }

      const ratio = window.scrollY / scrollable;

      setProgress(Math.min(1, Math.max(0, ratio)));
    }

    function onScroll() {
      if (frame === 0) {
        frame = window.requestAnimationFrame(update);
      }
    }

    update();

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      if (frame !== 0) {
        window.cancelAnimationFrame(frame);
      }

      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <div
      className="pointer-events-none absolute inset-x-0 bottom-0 h-px"
      aria-hidden="true"
    >
      <div
        className="h-full origin-left bg-accent transition-transform duration-150 ease-out"
        style={{ transform: `scaleX(${progress})` }}
      />
    </div>
  );
}
