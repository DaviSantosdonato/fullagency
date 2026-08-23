import type { Metadata } from "next";
import { PageIntro } from "@/components/ui/PageIntro";
import { PendingValue } from "@/components/ui/PendingValue";
import { contact, site } from "@/content/site";

export const metadata: Metadata = {
  title: "Política de privacidade",
  robots: { index: false, follow: true },
};

/**
 * A skeleton, deliberately.
 *
 * A privacy policy is a legal document. Generating plausible-sounding clauses
 * for a real company would be worse than useless, so this page states the
 * structure and what the site actually does, and marks the rest for the
 * agency's own legal review.
 */
export default function PrivacyPage() {
  return (
    <>
      <PageIntro
        kicker="Legal"
        title="Política de privacidade"
        lead="Este texto precisa da revisão jurídica da FULL antes da publicação. O que está descrito abaixo reflete o comportamento real deste site."
      />

      <section className="shell flex max-w-(--width-measure) flex-col gap-8 pb-(--spacing-section) text-body text-paper-100/70">
        <div>
          <h2 className="mb-3 text-h3 font-light text-paper-50">
            Dados que este site coleta
          </h2>
          <p>
            Apenas o que você digita no formulário de contato: nome, empresa,
            WhatsApp, e-mail, tipo de projeto e mensagem. Não há cookies de
            rastreamento, pixels de publicidade nem analytics de terceiros nesta
            versão do site.
          </p>
        </div>

        <div>
          <h2 className="mb-3 text-h3 font-light text-paper-50">
            Para onde esses dados vão
          </h2>
          <p>
            O destino do formulário ainda não foi definido pela FULL. Enquanto
            não estiver configurado, nenhuma informação sai do seu navegador.
          </p>
        </div>

        <div>
          <h2 className="mb-3 text-h3 font-light text-paper-50">
            Seus direitos (LGPD)
          </h2>
          <p>
            Você pode solicitar acesso, correção ou exclusão dos seus dados a
            qualquer momento pelo canal abaixo.
          </p>
          <p className="mt-3">
            <PendingValue
              value={contact.email}
              label="E-mail do encarregado de dados"
              render={(email) => <a href={`mailto:${email}`}>{email}</a>}
            />
          </p>
        </div>

        <div>
          <h2 className="mb-3 text-h3 font-light text-paper-50">Responsável</h2>
          <p>{site.name}</p>
          <p className="mt-2">
            <PendingValue value={contact.cnpj} label="CNPJ" render={(v) => <>{v}</>} />
          </p>
          <p className="mt-2">
            <PendingValue
              value={contact.address}
              label="Endereço"
              render={(v) => <>{v}</>}
            />
          </p>
        </div>
      </section>
    </>
  );
}
