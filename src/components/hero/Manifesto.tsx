"use client";

import { useRef } from "react";
import { HandwrittenAccent } from "@/components/ui/HandwrittenAccent";
import { gsap, useGSAP } from "@/lib/gsap";
import { site, yearsActive } from "@/content/site";

/**
 * The manifesto: the first thing the visitor reads after the camera leaves.
 *
 * The headline is set as two lines that arrive from behind a mask, one after
 * the other, while the whole block drifts a little slower than the page. That
 * parallax is the only decoration in the section - the rest is type.
 */
export const Manifesto = () => {
  const scope = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const root = scope.current;
      if (!root) return;

      const lines = root.querySelectorAll("[data-line]");

      gsap.fromTo(
        lines,
        { yPercent: 108 },
        {
          yPercent: 0,
          duration: 1.15,
          ease: "expo.out",
          stagger: 0.12,
          scrollTrigger: { trigger: root, start: "top 72%", once: true },
        },
      );

      gsap.to(root.querySelector("[data-drift]"), {
        yPercent: -9,
        ease: "none",
        scrollTrigger: {
          trigger: root,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
    },
    { scope },
  );

  return (
    <section
      ref={scope}
      aria-labelledby="manifesto-titulo"
      className="relative bg-paper-100 py-(--spacing-section) text-ink-950"
      data-ground="paper"
    >
      <div className="shell">
        <div className="grid gap-12 lg:grid-cols-[1fr_auto] lg:items-end">
          <div data-drift>
            <p className="mb-8 text-micro uppercase tracking-[0.22em] text-bolt-600">
              Manifesto
            </p>

            <h2
              id="manifesto-titulo"
              className="text-display font-light leading-[0.88] tracking-[-0.05em]"
            >
              <span className="block overflow-hidden">
                <span data-line className="block">
                  Não é sobre
                </span>
              </span>
              <span className="block overflow-hidden">
                <span data-line className="block">
                  aparecer mais.
                </span>
              </span>
              <span className="mt-2 block overflow-hidden md:mt-3">
                <span data-line className="block text-ink-950/45">
                  É sobre ser{" "}
                  <HandwrittenAccent className="text-bolt-600" underline>
                    lembrado
                  </HandwrittenAccent>
                </span>
              </span>
            </h2>
          </div>

          <dl className="flex shrink-0 gap-10 border-t border-ink-950/15 pt-6 lg:flex-col lg:gap-8 lg:border-l lg:border-t-0 lg:pl-10 lg:pt-0">
            <div>
              <dt className="text-micro uppercase tracking-[0.2em] text-ink-950/45">
                Desde
              </dt>
              <dd className="mt-1 text-h3 font-light tabular-nums">
                {site.foundedYear}
              </dd>
            </div>
            <div>
              <dt className="text-micro uppercase tracking-[0.2em] text-ink-950/45">
                Anos de estrada
              </dt>
              <dd className="mt-1 text-h3 font-light tabular-nums">
                {yearsActive()}
              </dd>
            </div>
            <div>
              <dt className="text-micro uppercase tracking-[0.2em] text-ink-950/45">
                Audiovisual
              </dt>
              <dd className="mt-1 text-h3 font-light">Próprio</dd>
            </div>
          </dl>
        </div>

        <div className="mt-16 grid gap-8 border-t border-ink-950/15 pt-10 md:grid-cols-2 md:gap-16 lg:mt-24">
          <p className="text-lead text-ink-950/75">
            A maioria das agências pega um modelo de post, troca a cor e publica.
            Quando precisa de vídeo, chama alguém que nunca pisou na sua empresa.
          </p>
          <p className="text-lead text-ink-950/75">
            A gente faz o contrário. Estratégia, criação e produção sentam na
            mesma sala — e é por isso que a peça que sai daqui parece uma decisão,
            não um improviso.
          </p>
        </div>
      </div>
    </section>
  );
};
