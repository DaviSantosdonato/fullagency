import Link from "next/link";
import { HandwrittenAccent } from "@/components/ui/HandwrittenAccent";
import { BoltMark } from "@/components/ui/BoltMark";
import { Reveal } from "@/components/motion/Reveal";
import { socials } from "@/content/site";

/**
 * The closing argument, using the line the agency already leads with.
 */
export const ContactCTA = () => (
  <section
    aria-labelledby="cta-titulo"
    className="relative overflow-hidden bg-paper-100 py-(--spacing-section) text-ink-950"
    data-ground="paper"
  >
    <div className="shell relative">
      <Reveal>
        <p className="mb-8 flex items-center gap-3 text-micro uppercase tracking-[0.22em] text-bolt-600">
          <BoltMark className="h-3 w-2" />
          Vem pro time
        </p>
      </Reveal>

      <Reveal kind="mask">
        <h2
          id="cta-titulo"
          className="max-w-[22ch] text-h1 font-light leading-[0.95] tracking-[-0.04em]"
        >
          A sua empresa é profissional.
          <span className="mt-2 block text-ink-950/45 md:mt-3">
            A sua <HandwrittenAccent className="text-bolt-600">presença</HandwrittenAccent>{" "}
            também precisa ser.
          </span>
        </h2>
      </Reveal>

      <div className="mt-14 flex flex-col gap-8 border-t border-ink-950/15 pt-10 md:flex-row md:items-center md:justify-between">
        <Reveal>
          <Link
            href="/contato"
            className="group inline-flex items-center gap-4 bg-ink-950 px-8 py-5 text-caption uppercase tracking-[0.14em] text-paper-50 transition-colors duration-300 hover:bg-bolt-500"
          >
            Vamos criar algo juntos
            <BoltMark className="h-4 w-3 transition-transform duration-300 group-hover:translate-x-1.5" />
          </Link>
        </Reveal>

        <Reveal delay={0.1}>
          <ul className="flex flex-wrap gap-x-8 gap-y-3">
            {socials.map((social) => (
              <li key={social.href}>
                <a
                  href={social.href}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="text-caption uppercase tracking-[0.12em] text-ink-950/55 transition-colors hover:text-ink-950"
                >
                  {social.label}
                </a>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </div>
  </section>
);
