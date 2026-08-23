"use client";

import Link from "next/link";
import { useRef } from "react";
import { CaseMedia } from "./CaseMedia";
import { HandwrittenAccent } from "@/components/ui/HandwrittenAccent";
import { Reveal } from "@/components/motion/Reveal";
import { BoltMark } from "@/components/ui/BoltMark";
import { PendingValue } from "@/components/ui/PendingValue";
import { gsap, useGSAP } from "@/lib/gsap";
import { useDeviceProfile } from "@/lib/useDeviceProfile";
import { splitScriptWord } from "@/lib/splitScriptWord";
import type { CaseStudy } from "@/content/types";

/**
 * The case wall: a horizontal run of covers driven by vertical scroll.
 *
 * Accessibility is the reason this is a real overflow container and not a
 * transform on a fixed row. The track scrolls natively, so it is reachable with
 * the keyboard, with a trackpad swipe, and by a screen reader's own scrolling -
 * GSAP only *adds* the vertical-to-horizontal mapping on top, and only where a
 * fine pointer and full motion are available. Everywhere else this is an
 * ordinary, swipeable, snapping row.
 */
export const CaseShowcase = ({
  cases,
  heading = "Trabalho que já está no mundo",
  scriptWord = "no mundo",
}: {
  readonly cases: readonly CaseStudy[];
  readonly heading?: string;
  readonly scriptWord?: string;
}) => {
  const scope = useRef<HTMLElement>(null);
  const track = useRef<HTMLUListElement>(null);
  const { reducedMotion, coarsePointer, lowPower, resolved } = useDeviceProfile();

  const canDrive = resolved && !reducedMotion && !coarsePointer && !lowPower;
  const { head, script } = splitScriptWord(heading, scriptWord);

  useGSAP(
    () => {
      const section = scope.current;
      const rail = track.current;
      if (!section || !rail || !canDrive) return;

      const distance = (): number => rail.scrollWidth - rail.clientWidth;
      if (distance() <= 0) return;

      const trigger = gsap.to(rail, {
        scrollLeft: distance,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top 20%",
          // The section is exactly as tall as the horizontal distance it has to
          // cover, so the mapping is 1:1 and never feels like a hijack.
          end: () => `+=${distance()}`,
          scrub: 0.6,
          pin: false,
          invalidateOnRefresh: true,
        },
      });

      return () => {
        trigger.scrollTrigger?.kill();
        trigger.kill();
      };
    },
    { scope, dependencies: [canDrive, cases.length] },
  );

  return (
    <section
      ref={scope}
      aria-labelledby="cases-titulo"
      className="relative overflow-hidden bg-ink-900 py-(--spacing-section)"
    >
      <div className="shell">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <Reveal kind="mask">
            <h2
              id="cases-titulo"
              className="max-w-[14ch] text-h1 font-light leading-[0.95] tracking-[-0.04em] text-paper-50"
            >
              {head}{" "}
              {script ? <HandwrittenAccent>{script}</HandwrittenAccent> : null}
            </h2>
          </Reveal>

          <Reveal delay={0.15}>
            <Link
              href="/cases"
              className="group inline-flex items-center gap-3 border-b border-white/25 pb-2 text-caption uppercase tracking-[0.14em] text-paper-100/80 transition-colors hover:border-bolt-500 hover:text-paper-50"
            >
              Ver todos os cases
              <BoltMark className="h-3 w-2 text-bolt-500 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </Reveal>
        </div>
      </div>

      <ul
        ref={track}
        // `tabIndex` makes the overflow container focusable so it can be
        // scrolled with the arrow keys, which is required whenever a scroll
        // region holds content.
        tabIndex={0}
        role="list"
        aria-label="Cases em destaque"
        className="mt-14 flex snap-x snap-mandatory gap-5 overflow-x-auto px-(--spacing-gutter) pb-6 [scrollbar-width:thin] md:mt-20 md:gap-8"
      >
        {cases.map((entry, index) => (
          <li
            key={entry.slug}
            className="w-[78vw] shrink-0 snap-start sm:w-[52vw] lg:w-[30vw] xl:w-[26vw]"
          >
            <Link href={`/cases/${entry.slug}`} className="group block">
              <CaseMedia
                media={entry.cover}
                canHover={canDrive}
                priority={index === 0}
                sizes="(max-width: 640px) 78vw, (max-width: 1024px) 52vw, 30vw"
                className="aspect-[3/4] w-full"
              />
              <div className="mt-5 flex items-baseline justify-between gap-4 border-t border-white/12 pt-4">
                <div>
                  <h3 className="text-h3 font-light tracking-[-0.02em] text-paper-50">
                    {entry.client}
                  </h3>
                  <p className="mt-1 text-caption uppercase tracking-[0.12em] text-metal-300">
                    <PendingValue
                      value={entry.sector}
                      label="Setor"
                      render={(sector) => <>{sector}</>}
                    />
                  </p>
                </div>
                <span className="text-micro tabular-nums text-metal-500">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </div>
              <p className="mt-3 max-w-[38ch] text-body text-paper-100/60">
                {entry.summary}
              </p>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
};
