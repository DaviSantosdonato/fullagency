"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { HandwrittenAccent } from "@/components/ui/HandwrittenAccent";
import { BoltMark } from "@/components/ui/BoltMark";
import { gsap, useGSAP } from "@/lib/gsap";
import { cn } from "@/lib/cn";
import { splitScriptWord } from "@/lib/splitScriptWord";
import type { Service } from "@/content/types";

/**
 * A service as a chapter, not a card.
 *
 * Each one is a full-width band that alternates side, so scrolling the list
 * feels like turning pages rather than scanning a grid. The media is revealed
 * from behind a moving mask and drifts against the page - the only two motions
 * in the section, both tied to reading position.
 */
export const ServiceChapter = ({
  service,
  index,
}: {
  readonly service: Service;
  readonly index: number;
}) => {
  const scope = useRef<HTMLElement>(null);
  const flipped = index % 2 === 1;

  useGSAP(
    () => {
      const root = scope.current;
      if (!root) return;

      const frame = root.querySelector("[data-frame]");
      const media = root.querySelector("[data-media]");
      const copy = root.querySelectorAll("[data-copy] > *");

      if (frame) {
        gsap.fromTo(
          frame,
          { clipPath: flipped ? "inset(0 0 0 100%)" : "inset(0 100% 0 0)" },
          {
            clipPath: "inset(0 0% 0 0%)",
            duration: 1.25,
            ease: "expo.out",
            scrollTrigger: { trigger: root, start: "top 78%", once: true },
          },
        );
      }

      if (media) {
        gsap.fromTo(
          media,
          { yPercent: -6, scale: 1.1 },
          {
            yPercent: 6,
            scale: 1.1,
            ease: "none",
            scrollTrigger: {
              trigger: root,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          },
        );
      }

      gsap.fromTo(
        copy,
        { y: 26, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          ease: "expo.out",
          stagger: 0.08,
          scrollTrigger: { trigger: root, start: "top 76%", once: true },
        },
      );
    },
    { scope, dependencies: [flipped] },
  );

  const { head, script } = splitScriptWord(service.title, service.scriptWord);

  return (
    <section
      ref={scope}
      aria-labelledby={`servico-${service.slug}`}
      className="border-t border-white/10 py-(--spacing-section) first:border-t-0"
    >
      <div className="shell">
        <div
          className={cn(
            "grid items-center gap-10 lg:grid-cols-2 lg:gap-16 [&>*]:min-w-0",
            flipped && "lg:[&>*:first-child]:order-2",
          )}
        >
          <div data-frame className="relative aspect-[4/5] w-full overflow-hidden sm:aspect-[3/2] lg:aspect-[4/5]">
            <div data-media className="absolute inset-0">
              <Image
                src={service.media.src}
                alt={service.media.alt}
                fill
                loading={index === 0 ? "eager" : "lazy"}
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-gradient-to-t from-ink-950/70 to-transparent"
            />
          </div>

          <div data-copy className="min-w-0">
            <p className="mb-6 flex items-center gap-3 text-micro uppercase tracking-[0.22em] text-bolt-400">
              <BoltMark className="h-3 w-2" />
              {service.index} — Serviço
            </p>

            <h2
              id={`servico-${service.slug}`}
              // `text-h2`, not `text-h1`: this heading lives in a half-width
              // column, and the display step is scaled for a full-bleed line.
              // At h1 size a long script word like "constância" needs more
              // width than the column has and spills past the viewport.
              className="text-h2 font-light leading-[1] tracking-[-0.03em] text-paper-50"
            >
              {head}{" "}
              {script ? <HandwrittenAccent>{script}</HandwrittenAccent> : null}
            </h2>

            <p className="mt-7 max-w-(--width-measure) text-lead text-paper-100/80">
              {service.lead}
            </p>
            <p className="mt-5 max-w-(--width-measure) text-body text-paper-100/60">
              {service.body}
            </p>

            <ul className="mt-9 flex flex-wrap gap-x-6 gap-y-3">
              {service.deliverables.map((item) => (
                <li
                  key={item}
                  className="flex items-center gap-2 text-caption uppercase tracking-[0.1em] text-metal-300"
                >
                  <span aria-hidden="true" className="h-1 w-1 bg-bolt-500" />
                  {item}
                </li>
              ))}
            </ul>

            <Link
              href="/contato"
              className="group mt-10 inline-flex items-center gap-3 border-b border-white/25 pb-2 text-caption uppercase tracking-[0.14em] text-paper-100/80 transition-colors hover:border-bolt-500 hover:text-paper-50"
            >
              Falar sobre {service.title.toLowerCase()}
              <BoltMark className="h-3 w-2 text-bolt-500 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};
