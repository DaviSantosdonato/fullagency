import type { Metadata } from "next";
import { PageIntro } from "@/components/ui/PageIntro";
import { TeamGallery } from "@/components/culture/TeamGallery";
import { ContactCTA } from "@/components/contact/ContactCTA";
import { Reveal } from "@/components/motion/Reveal";
import { HandwrittenAccent } from "@/components/ui/HandwrittenAccent";
import { site, yearsActive } from "@/content/site";

export const metadata: Metadata = {
  title: "Sobre",
  description:
    "A FULL nasceu em 2018 para construir marcas que atravessam o tempo — com estratégia, criação e produção no mesmo time.",
};

export default function AboutPage() {
  return (
    <>
      <PageIntro
        kicker="Quem somos"
        title="Desde 2018, construindo marcas que ficam"
        scriptWord="que ficam"
        lead={`A FULL nasceu com um propósito claro: estabelecer cultura. Não a cultura do algoritmo ou da métrica de curto prazo — a que atravessa o tempo.`}
      />

      <section
        aria-labelledby="sobre-texto"
        className="bg-paper-100 py-(--spacing-section) text-ink-950"
        data-ground="paper"
      >
        <div className="shell grid gap-12 lg:grid-cols-[1fr_1.2fr] lg:gap-20">
          <Reveal>
            <h2
              id="sobre-texto"
              className="text-h2 font-light leading-[1.02] tracking-[-0.03em]"
            >
              Grandes marcas não são feitas de campanhas isoladas. São feitas de{" "}
              <HandwrittenAccent className="text-bolt-600">histórias</HandwrittenAccent>{" "}
              que se sustentam.
            </h2>
          </Reveal>

          <Reveal delay={0.1} className="flex flex-col gap-6">
            <p className="text-lead text-ink-950/75">
              São {yearsActive()} anos construindo comunicação para empresas e
              instituições que levam a própria reputação a sério — do
              posicionamento à peça que vai ao ar.
            </p>
            <p className="text-body text-ink-950/65">
              Somos movidos por criatividade e por um pensamento que ousa sair da
              caixa, resgatando o que há de mais valioso: o legado. É por isso
              que a {site.shortName} mantém estratégia, criação e produção sob o
              mesmo teto — quando essas três coisas conversam, a marca para de
              parecer três empresas diferentes.
            </p>
            <p className="text-body text-ink-950/65">
              Cremos em um Deus que estabelece cultura. Essa é a nossa missão:
              estabelecer uma nova cultura na comunicação.
            </p>
          </Reveal>
        </div>
      </section>

      <TeamGallery />
      <ContactCTA />
    </>
  );
}
