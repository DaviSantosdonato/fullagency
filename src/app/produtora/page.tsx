import type { Metadata } from "next";
import Image from "next/image";
import { PageIntro } from "@/components/ui/PageIntro";
import { CreativeCore } from "@/components/production/CreativeCore";
import { ProcessTimeline } from "@/components/culture/ProcessTimeline";
import { ContactCTA } from "@/components/contact/ContactCTA";
import { Reveal } from "@/components/motion/Reveal";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Produtora",
  description:
    "A FullProduz é a produtora de vídeo da FULL. Câmeras profissionais, equipe de produção e roteiro dentro do mesmo time.",
};

export default function ProducerPage() {
  return (
    <>
      <PageIntro
        kicker={`${site.productionArm} — produtora própria`}
        title="O audiovisual não sai de casa"
        scriptWord="de casa"
        lead="Câmera, luz, direção, roteiro e edição. A produtora é da agência, o que significa que a estratégia chega inteira até o corte final."
      />

      <section aria-label="Estúdio da FULL" className="shell">
        <Reveal kind="mask">
          <div className="relative aspect-[16/10] w-full overflow-hidden md:aspect-[2/1]">
            <Image
              src="/media/brand/full-studio.jpg"
              alt="Equipe da FULL reunida no estúdio, com iluminação montada"
              fill
              sizes="100vw"
              priority
              className="object-cover"
            />
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mt-5 max-w-(--width-measure) text-caption text-metal-300">
            O estúdio da FULL. A luz violeta das fotos não é filtro — é como a
            sala é montada.
          </p>
        </Reveal>
      </section>

      <CreativeCore />
      <ProcessTimeline />
      <ContactCTA />
    </>
  );
}
