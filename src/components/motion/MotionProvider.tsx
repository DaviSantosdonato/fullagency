"use client";

import { useEffect } from "react";
import { ScrollTrigger } from "@/lib/gsap";

/**
 * Flips the document into its animated state and keeps ScrollTrigger honest.
 *
 * The `js-ready` class is what arms the `[data-reveal]` start states in CSS.
 * Until it lands, every revealed element renders in its *finished* position —
 * so a failed hydration or a blocked bundle leaves a readable page rather than
 * a blank one.
 */
export const MotionProvider = ({ children }: { children: React.ReactNode }) => {
  useEffect(() => {
    const root = document.documentElement;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (!reduced) root.classList.add("js-ready");

    // Fonts change text metrics, which changes every trigger's start/end.
    const refresh = (): void => ScrollTrigger.refresh();
    void document.fonts?.ready.then(refresh);

    // Mobile browsers resize the viewport as the URL bar hides; recompute once
    // it settles rather than on every intermediate frame.
    window.addEventListener("orientationchange", refresh);

    return () => {
      window.removeEventListener("orientationchange", refresh);
      root.classList.remove("js-ready");
    };
  }, []);

  return <>{children}</>;
};
