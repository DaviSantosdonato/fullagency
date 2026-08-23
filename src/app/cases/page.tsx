import type { Metadata } from "next";
import Link from "next/link";
import { PageIntro } from "@/components/ui/PageIntro";
import { CaseMedia } from "@/components/cases/CaseMedia";
import { ContactCTA } from "@/components/contact/ContactCTA";
import { Reveal } from "@/components/motion/Reveal";
import { PendingValue } from "@/components/ui/PendingValue";
import { additionalClients, cases } from "@/content/cases";

export const metadata: Metadata = {
  title: "Cases",
  description:
    "Empresas e instituições cuja comunicação a FULL constrói — estratégia, produção audiovisual e presença digital.",
};

export default function CasesPage() {
  return (
    <>
      <PageIntro
        kicker="Cases"
        title="Marcas que já comunicam melhor"
        scriptWord="melhor"
        lead="Cada perfil abaixo é trabalho publicado. Números e resultados só entram aqui quando a FULL confirmar cada um — nada de métrica inventada."
      />

      <section aria-label="Todos os cases" className="shell pb-(--spacing-section)">
        <ul className="grid gap-x-6 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
          {cases.map((entry, index) => (
            <li key={entry.slug}>
              <Reveal delay={(index % 3) * 0.06}>
                <Link href={`/cases/${entry.slug}`} className="group block">
                  <CaseMedia
                    media={entry.cover}
                    priority={index < 3}
                    sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 30vw"
                    className="aspect-[3/4] w-full"
                  />
                  <h2 className="mt-5 text-h3 font-light tracking-[-0.02em] text-paper-50">
                    {entry.client}
                  </h2>
                  <p className="mt-1 text-caption uppercase tracking-[0.12em] text-metal-300">
                    <PendingValue
                      value={entry.sector}
                      label="Setor"
                      render={(sector) => <>{sector}</>}
                    />
                  </p>
                  <p className="mt-3 text-body text-paper-100/60">{entry.summary}</p>
                </Link>
              </Reveal>
            </li>
          ))}
        </ul>

        <Reveal className="mt-20 border-t border-white/10 pt-10">
          <h2 className="text-caption uppercase tracking-[0.16em] text-metal-300">
            Também no time
          </h2>
          <ul className="mt-5 flex flex-wrap gap-x-8 gap-y-3">
            {additionalClients.map((client) => (
              <li key={client} className="text-lead font-light text-paper-100/70">
                {client}
              </li>
            ))}
          </ul>
        </Reveal>
      </section>

      <ContactCTA />
    </>
  );
}
