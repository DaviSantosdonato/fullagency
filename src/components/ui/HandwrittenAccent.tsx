"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { cn } from "@/lib/cn";

interface HandwrittenAccentProps {
  readonly children: string;
  readonly className?: string;
  /** Seconds after the line enters before the ink is laid down. */
  readonly delay?: number;
  /** Draw a hand-drawn underline stroke beneath the word. */
  readonly underline?: boolean;
  /** Play immediately instead of waiting for the word to be scrolled into view. */
  readonly immediate?: boolean;
}

/**
 * A word written by hand, mid-sentence.
 *
 * The reveal is a horizontal `clip-path` wipe — ink arriving left to right —
 * rather than a width or opacity change on the text itself. Clipping never
 * participates in layout, so the sentence is laid out at its final width on the
 * very first frame and the surrounding copy cannot reflow. That is the whole
 * reason this is a clip and not a typewriter effect.
 *
 * The word is a single text node, so it is read normally by assistive tech and
 * is selectable and searchable like any other text.
 */
export const HandwrittenAccent = ({
  children,
  className,
  delay = 0.25,
  underline = false,
  immediate = false,
}: HandwrittenAccentProps) => {
  const scope = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      const root = scope.current;
      if (!root) return;

      const ink = root.querySelector<HTMLElement>("[data-ink]");
      const stroke = root.querySelector<SVGPathElement>("[data-stroke]");
      if (!ink) return;

      const timeline = gsap.timeline({
        delay,
        ...(immediate
          ? {}
          : { scrollTrigger: { trigger: root, start: "top 88%", once: true } }),
      });

      timeline.fromTo(
        ink,
        { clipPath: "inset(-20% 100% -20% 0)", opacity: 1 },
        {
          clipPath: "inset(-20% 0% -20% 0)",
          duration: 0.85,
          ease: "power2.inOut",
        },
      );

      // A breath of the brand violet trailing the nib, then gone.
      timeline.fromTo(
        ink,
        { textShadow: "0 0 22px rgba(164,0,255,0.55)" },
        { textShadow: "0 0 0px rgba(164,0,255,0)", duration: 0.9, ease: "power2.out" },
        "-=0.35",
      );

      if (stroke) {
        const length = stroke.getTotalLength();
        timeline.fromTo(
          stroke,
          { strokeDasharray: length, strokeDashoffset: length },
          { strokeDashoffset: 0, duration: 0.6, ease: "power2.out" },
          "-=0.5",
        );
      }
    },
    { scope, dependencies: [delay, immediate] },
  );

  return (
    <span ref={scope} className={cn("relative inline-block", className)}>
      <span data-ink className="script text-bolt-400">
        {children}
      </span>
      {underline ? (
        <svg
          className="pointer-events-none absolute -bottom-1 left-0 h-[0.35em] w-full overflow-visible"
          viewBox="0 0 200 12"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path
            data-stroke
            d="M2 8.5C38 3.2 82 2.1 122 4.4c24 1.4 52 4.1 76 1.2"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            className="text-bolt-500"
            vectorEffect="non-scaling-stroke"
          />
        </svg>
      ) : null}
    </span>
  );
};
