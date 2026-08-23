"use client";

import { HandwrittenAccent } from "@/components/ui/HandwrittenAccent";
import { Reveal } from "@/components/motion/Reveal";
import { CinematicCamera } from "./CinematicCamera";
import { services } from "@/content/services";
import { site } from "@/content/site";
import { useDeviceProfile } from "@/lib/useDeviceProfile";

/**
 * "Produtora dentro de casa" — the agency's own equipment as the argument.
 *
 * The camera is a real GLB reconstructed from the supplied DSLR reference.
 * It receives restrained scroll/pointer motion; reduced-motion and low-power
 * users keep the same 3D composition in a static, demand-rendered state.
 */
export const CreativeCore = () => {
  const { reducedMotion, coarsePointer, lowPower, resolved } =
    useDeviceProfile();

  return (
    <section
      id="nucleo-criativo"
      aria-labelledby="nucleo-titulo"
      className="relative overflow-hidden bg-ink-950 py-(--spacing-section)"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 h-[70vmin] w-[70vmin] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-40 blur-[90px]"
        style={{
          background:
            "radial-gradient(circle, rgba(164,0,255,0.55) 0%, rgba(164,0,255,0.12) 45%, transparent 70%)",
        }}
      />

      <div className="shell relative">
        <Reveal>
          <p className="mb-5 text-micro uppercase tracking-[0.22em] text-bolt-400">
            {site.productionArm} — produtora própria
          </p>
        </Reveal>

        <Reveal kind="mask">
          <h2
            id="nucleo-titulo"
            className="max-w-[15ch] text-h1 font-light leading-[0.95] tracking-[-0.04em] text-paper-50"
          >
            A câmera é nossa. A equipe também. Tudo acontece{" "}
            <HandwrittenAccent>dentro de casa</HandwrittenAccent>.
          </h2>
        </Reveal>

        <Reveal delay={0.1}>
          <p className="mt-8 max-w-(--width-measure) text-lead text-paper-100/70">
            Ninguém terceiriza nada. Quem grava esteve na reunião de estratégia,
            e quem escreve o roteiro sabe qual lente vai estar montada na hora da
            captação.
          </p>
        </Reveal>

        <div className="mt-16 grid gap-10 lg:mt-20 lg:grid-cols-[1fr_minmax(0,26rem)] lg:items-center lg:gap-16">
          <div className="relative aspect-square min-h-[18rem] w-full sm:aspect-[4/3] lg:aspect-square">
            <CinematicCamera
              interactive={
                resolved && !coarsePointer && !reducedMotion && !lowPower
              }
              motionEnabled={resolved && !reducedMotion && !lowPower}
              render3D={resolved}
            />
          </div>

          <ul className="flex flex-col">
            {services.map((service, index) => (
              <li key={service.slug}>
                <Reveal delay={index * 0.05}>
                  <div className="flex items-baseline gap-5 border-t border-white/10 py-5">
                    <span className="text-micro tabular-nums text-metal-500">
                      {service.index}
                    </span>
                    <div>
                      <h3 className="text-h3 font-light tracking-[-0.02em] text-paper-50">
                        {service.title}
                      </h3>
                      <p className="mt-1.5 text-body text-paper-100/60">
                        {service.lead}
                      </p>
                    </div>
                  </div>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};
