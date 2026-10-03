"use client";

import { useEffect } from "react";

/**
 * Fades the article's top-level blocks in as they scroll into view.
 *
 * It attaches itself to whatever <main> renders, so the MDX content
 * needs no extra wrappers. Blocks already on screen at mount are shown
 * immediately, and everything is skipped when the visitor prefers
 * reduced motion.
 */
export default function ScrollReveal() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    if (!("IntersectionObserver" in window)) {
      return;
    }

    const main = document.querySelector("main");

    if (!main) {
      return;
    }

    const blocks = Array.from(main.children).filter(
      (node): node is HTMLElement => node instanceof HTMLElement
    );

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) {
            continue;
          }

          (entry.target as HTMLElement).dataset.reveal = "shown";
          observer.unobserve(entry.target);
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.04 }
    );

    for (const block of blocks) {
      if (block.getBoundingClientRect().top < window.innerHeight) {
        block.dataset.reveal = "shown";
        continue;
      }

      block.dataset.reveal = "pending";
      observer.observe(block);
    }

    return () => observer.disconnect();
  }, []);

  return null;
}
