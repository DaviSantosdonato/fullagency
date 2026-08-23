import type { Metadata } from "next";
import { PageIntro } from "@/components/ui/PageIntro";
import { LeadForm } from "@/components/contact/LeadForm";
import { PendingValue } from "@/components/ui/PendingValue";
import { Reveal } from "@/components/motion/Reveal";
import { contact, socials } from "@/content/site";

export const metadata: Metadata = {
  title: "Contato",
  description:
    "Conte o que a sua empresa precisa comunicar. Estratégia, produção e conteúdo com equipe própria.",
};

export default function ContactPage() {
  return (
    <>
      <PageIntro
        kicker="Vamos conversar"
        title="Conta pra gente o que você precisa comunicar"
        scriptWord="comunicar"
        lead="Leva poucos minutos. Quem lê é a nossa equipe — não um formulário automático."
      />

      <section className="shell grid gap-14 pb-(--spacing-section) lg:grid-cols-[1.4fr_1fr] lg:gap-24">
        <Reveal>
          <LeadForm />
        </Reveal>

        <Reveal delay={0.12}>
          <aside className="flex flex-col gap-9 border-t border-white/12 pt-8 lg:border-l lg:border-t-0 lg:pl-12 lg:pt-0">
            <div>
              <h2 className="text-micro uppercase tracking-[0.2em] text-metal-500">
                Onde nos achar
              </h2>
              <ul className="mt-4 flex flex-col gap-2.5">
                {socials.map((social) => (
                  <li key={social.href}>
                    <a
                      href={social.href}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="text-body text-paper-100/75 transition-colors hover:text-paper-50"
                    >
                      {social.label}{" "}
                      <span className="text-metal-500">{social.handle}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="text-micro uppercase tracking-[0.2em] text-metal-500">
                Canais diretos
              </h2>
              <ul className="mt-4 flex flex-col gap-2.5 text-body text-paper-100/75">
                <li>
                  <PendingValue
                    value={contact.whatsapp}
                    label="WhatsApp"
                    render={(number) => (
                      <a href={`https://wa.me/${number.replace(/\D/g, "")}`}>
                        WhatsApp {number}
                      </a>
                    )}
                  />
                </li>
                <li>
                  <PendingValue
                    value={contact.email}
                    label="E-mail"
                    render={(email) => <a href={`mailto:${email}`}>{email}</a>}
                  />
                </li>
                <li>
                  <PendingValue
                    value={contact.address}
                    label="Endereço"
                    render={(address) => <span>{address}</span>}
                  />
                </li>
              </ul>
            </div>

            <p className="max-w-[34ch] text-caption text-metal-300">
              As vagas para novos projetos por mês são limitadas, porque cada
              análise é feita à mão pela nossa equipe.
            </p>
          </aside>
        </Reveal>
      </section>
    </>
  );
}
