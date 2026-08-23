"use client";

import Image from "next/image";
import { useRef } from "react";
import { HandwrittenAccent } from "@/components/ui/HandwrittenAccent";
import { Reveal } from "@/components/motion/Reveal";
import { gsap, useGSAP } from "@/lib/gsap";
import { team } from "@/content/team";

/**
 * The people, arranged as a precise studio contact sheet.
 *
 * Every portrait uses the same 2:3 frame and shares a common baseline. The
 * staggered entrance keeps the reveal alive without leaving the team crooked
 * after the animation finishes.
 */
export const TeamGallery = () => {
  const scope = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const root = scope.current;
      if (!root) return;

      const cards = root.querySelectorAll<HTMLElement>("[data-portrait]");

      gsap.fromTo(
        cards,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.95,
          ease: "expo.out",
          stagger: { each: 0.07, from: "start" },
          scrollTrigger: { trigger: root, start: "top 74%", once: true },
        },
      );
    },
    { scope },
  );

  return (
    <section
      ref={scope}
      aria-labelledby="equipe-titulo"
      className="bg-ink-950 py-(--spacing-section)"
    >
      <div className="shell">
        <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
          <Reveal kind="mask">
            <h2
              id="equipe-titulo"
              className="max-w-[16ch] text-h1 font-light leading-[0.95] tracking-[-0.04em] text-paper-50"
            >
              As pessoas que fazem{" "}
              <HandwrittenAccent>acontecer</HandwrittenAccent>
            </h2>
          </Reveal>

          <Reveal delay={0.12}>
            <p className="max-w-[34ch] text-body text-paper-100/60">
              Estratégia, atendimento, arte e produção sentam na mesma sala. É
              essa proximidade que faz a peça sair com uma linha só.
            </p>
          </Reveal>
        </div>

        <ul className="mt-14 grid grid-cols-2 items-start gap-x-4 gap-y-10 md:mt-20 md:grid-cols-3 md:gap-x-6 lg:grid-cols-4">
          {team.map((member) => (
            <li
              key={member.name}
              data-portrait
              className="grid w-full grid-rows-[auto_auto_1fr]"
            >
              <div className="relative aspect-[2/3] w-full overflow-hidden bg-ink-800">
                <Image
                  src={member.photo}
                  alt={`${member.name}, ${member.role} na FULL`}
                  fill
                  sizes="(max-width: 768px) 45vw, (max-width: 1024px) 30vw, 22vw"
                  className="object-cover grayscale transition-[filter,transform] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] hover:scale-[1.03] hover:grayscale-0"
                />
              </div>
              <h3 className="mt-4 text-body font-medium text-paper-50">
                {member.name}
              </h3>
              <p className="mt-0.5 text-caption uppercase tracking-[0.12em] text-metal-300">
                {member.role}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};
