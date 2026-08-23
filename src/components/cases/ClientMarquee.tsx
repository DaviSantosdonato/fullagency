import Image from "next/image";
import Link from "next/link";
import clsx from "clsx";
import { BoltMark } from "@/components/ui/BoltMark";
import { marqueeClients } from "@/content/cases";

const ClientRun = ({ duplicate = false }: { readonly duplicate?: boolean }) => (
  <ul
    role="list"
    aria-hidden={duplicate || undefined}
    className={`client-marquee-group flex shrink-0 items-center ${
      duplicate ? "client-marquee-copy" : ""
    }`}
  >
    {marqueeClients.map((client) => (
      <li
        key={client.name}
        className="flex h-28 w-[clamp(11rem,18vw,17rem)] shrink-0 items-center justify-center pr-[clamp(2rem,4vw,4.5rem)] md:h-32"
      >
        <div
          className={`flex h-full w-full items-center justify-center overflow-hidden px-5 py-4 ${
            client.logo.surface === "light" ? "bg-paper-50" : "bg-transparent"
          }`}
        >
          <Image
            src={client.logo.src}
            alt={duplicate ? "" : `Logo ${client.name}`}
            width={client.logo.width}
            height={client.logo.height}
            loading="eager"
            unoptimized={client.logo.src.endsWith(".svg")}
            className={clsx(
              client.logo.kind === "mark"
                ? "h-20 w-20 rounded-full object-contain md:h-24 md:w-24"
                : "max-h-16 w-auto max-w-full object-contain md:max-h-20",
              client.logo.invertOnDark && "brightness-0 invert",
            )}
          />
        </div>
      </li>
    ))}
  </ul>
);

/**
 * A continuous client credit roll. The duplicate run is visual-only and gives
 * the CSS animation a seamless handoff without cloning content in JavaScript.
 */
export const ClientMarquee = () => (
  <section
    aria-labelledby="client-marquee-title"
    className="relative overflow-hidden border-y border-white/10 bg-ink-900 py-(--spacing-section)"
  >
    <div className="shell mb-12 flex flex-wrap items-end justify-between gap-6 md:mb-16">
      <h2
        id="client-marquee-title"
        className="max-w-[16ch] text-h2 font-light leading-[0.98] tracking-[-0.035em] text-paper-50"
      >
        Marcas atendidas pela FULL
      </h2>
      <Link
        href="/cases"
        className="group inline-flex items-center gap-3 border-b border-white/25 pb-2 text-caption uppercase tracking-[0.14em] text-paper-100/80 transition-colors hover:border-bolt-500 hover:text-paper-50"
      >
        Ver todos os cases
        <BoltMark className="h-3 w-2 text-bolt-500 transition-transform duration-300 group-hover:translate-x-1" />
      </Link>
    </div>

    <div
      data-client-marquee
      className="client-marquee-window overflow-hidden border-y border-white/10 py-7 md:py-9"
    >
      <div className="client-marquee-track flex w-max items-center">
        <ClientRun />
        <ClientRun duplicate />
      </div>
    </div>
  </section>
);
