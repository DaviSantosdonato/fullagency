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
        key={client}
        className="flex shrink-0 items-center gap-[clamp(2rem,4vw,4.5rem)] pr-[clamp(2rem,4vw,4.5rem)]"
      >
        <span className="whitespace-nowrap text-[clamp(1.5rem,2.5vw,2.9rem)] font-bold leading-none tracking-[-0.055em] text-paper-50">
          {client}
        </span>
        <BoltMark className="h-[clamp(1.05rem,1.65vw,1.7rem)] w-auto shrink-0 text-bolt-500" />
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
    className="relative overflow-hidden border-y border-white/10 bg-ink-950 py-8 md:py-10"
  >
    <div className="shell mb-7 flex flex-wrap items-center justify-between gap-3 md:mb-9">
      <h2
        id="client-marquee-title"
        className="text-caption uppercase tracking-[0.17em] text-paper-100/72"
      >
        Marcas atendidas pela FULL
      </h2>
      <p className="text-micro uppercase tracking-[0.16em] text-metal-500">
        Estratégia · conteúdo · produção
      </p>
    </div>

    <div
      data-client-marquee
      className="client-marquee-window overflow-hidden"
    >
      <div className="client-marquee-track flex w-max items-center">
        <ClientRun />
        <ClientRun duplicate />
      </div>
    </div>
  </section>
);
