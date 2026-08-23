import type { Metadata } from "next";
import { PageIntro } from "@/components/ui/PageIntro";
import { ServiceChapter } from "@/components/services/ServiceChapter";
import { ContactCTA } from "@/components/contact/ContactCTA";
import { services } from "@/content/services";

export const metadata: Metadata = {
  title: "Serviços",
  description:
    "Estratégia, produção audiovisual, conteúdo, campanhas, identidade e presença digital — tudo com equipe e câmera próprias.",
};

export default function ServicesPage() {
  return (
    <>
      <PageIntro
        kicker="Serviços"
        title="Seis frentes, um time"
        scriptWord="um time"
        lead="Não vendemos pacotes soltos. Cada frente abaixo existe para sustentar a anterior — e todas passam pela mesma sala."
      />
      {services.map((service, index) => (
        <ServiceChapter key={service.slug} service={service} index={index} />
      ))}
      <ContactCTA />
    </>
  );
}
