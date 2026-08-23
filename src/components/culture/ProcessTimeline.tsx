"use client";

import { useRef } from "react";
import { HandwrittenAccent } from "@/components/ui/HandwrittenAccent";
import { Reveal } from "@/components/motion/Reveal";
import { gsap, useGSAP } from "@/lib/gsap";
import { processSteps } from "@/content/team";

/**
 * Pensar. Focar. Produzir. Colocar no mundo.
 *
 * A vertical rail whose fill tracks reading position, so the visitor can see how
 * far through the process they are without a progress widget. The steps
 * themselves are an ordered list - the sequence is in the markup, not only in
 * the animation.
 */
export const ProcessTimeline = () => {
  const scope = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const root = scope.current;
      if (!root) return;

      const fill = root.querySelector("[data-rail-fill]");
      const list = root.querySelector("[data-steps]");
      if (!fill || !list) return;

      gsap.fromTo(
        fill,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: {
            trigger: list,
            start: "top 70%",
            end: "bottom 75%",
            scrub: 0.4,
          },
        },
      );

      gsap.fromTo(
        list.querySelectorAll("li"),
        { opacity: 0.25, x: -14 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          ease: "expo.out",
          stagger: 0.15,
          scrollTrigger: { trigger: list, start: "top 72%", once: true },
        },
      );
    },
    { scope },
  );

  return (
    <section
      ref={scope}
      aria-labelledby="processo-titulo"
      className="bg-ink-900 py-(--spacing-section)"
    >
      <div className="shell">
        <Reveal>
          <p className="mb-5 text-micro uppercase tracking-[0.22em] text-bolt-400">
            Como funciona
          </p>
        </Reveal>

        <Reveal kind="mask">
          <h2
            id="processo-titulo"
            className="max-w-[16ch] text-h1 font-light leading-[0.95] tracking-[-0.04em] text-paper-50"
          >
            Pensar. Focar. Produzir.{" "}
            <HandwrittenAccent>colocar no mundo</HandwrittenAccent>.
          </h2>
        </Reveal>

        <div className="relative mt-16 lg:mt-24">
          {/* The rail. Decorative: the same order is in the list semantics. */}
          <div
            aria-hidden="true"
            className="absolute left-0 top-2 hidden h-[calc(100%-1rem)] w-px bg-white/12 md:block"
          >
            <span
              data-rail-fill
              className="absolute inset-0 origin-top bg-bolt-500"
              style={{ transform: "scaleY(0)" }}
            />
          </div>

          <ol data-steps className="flex flex-col md:pl-12 lg:pl-16">
            {processSteps.map((step) => (
              <li
                key={step.index}
                className="grid gap-4 border-b border-white/10 py-9 last:border-b-0 md:grid-cols-[auto_14rem_1fr] md:items-baseline md:gap-10"
              >
                <span className="text-micro tabular-nums text-metal-500">
                  {step.index}
                </span>
                <h3 className="text-h3 font-light tracking-[-0.02em] text-paper-50">
                  {step.verb}
                  <span className="mt-1 block text-caption uppercase tracking-[0.14em] text-bolt-400">
                    {step.title}
                  </span>
                </h3>
                <p className="max-w-(--width-measure) text-body text-paper-100/65">
                  {step.body}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
};
