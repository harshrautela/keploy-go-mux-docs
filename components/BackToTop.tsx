"use client";

import { useEffect, useState } from "react";
import { ArrowUpIcon } from "./icons";

export default function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let frame = 0;

    function update() {
      frame = 0;
      setVisible(window.scrollY > 600);
    }

    function onScroll() {
      if (frame === 0) {
        frame = window.requestAnimationFrame(update);
      }
    }

    update();

    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      if (frame !== 0) {
        window.cancelAnimationFrame(frame);
      }

      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  function scrollToTop() {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)")
      .matches;

    window.scrollTo({ top: 0, behavior: reduced ? "auto" : "smooth" });
  }

  return (
    <button
      type="button"
      onClick={scrollToTop}
      aria-label="Back to top"
      title="Back to top"
      tabIndex={visible ? 0 : -1}
      aria-hidden={!visible}
      className={`fixed bottom-6 right-6 z-50 inline-flex h-11 w-11 items-center justify-center rounded-full border border-border bg-card text-muted-foreground shadow-lg transition-all duration-300 hover:border-accent hover:text-accent ${
        visible
          ? "translate-y-0 opacity-100"
          : "pointer-events-none translate-y-3 opacity-0"
      }`}
    >
      <ArrowUpIcon className="h-[18px] w-[18px]" aria-hidden="true" />
    </button>
  );
}
