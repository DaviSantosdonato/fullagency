import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BoltMark } from "@/components/ui/BoltMark";
import { PendingValue } from "@/components/ui/PendingValue";
import { ContactCTA } from "@/components/contact/ContactCTA";
import { Reveal } from "@/components/motion/Reveal";
import { cases, getCase } from "@/content/cases";
import { isPending } from "@/content/types";

interface Params {
  readonly slug: string;
}

export const generateStaticParams = (): Params[] =>
  cases.map((entry) => ({ slug: entry.slug }));

export const generateMetadata = async ({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> => {
  const { slug } = await params;
  const entry = getCase(slug);
  if (!entry) return { title: "Case não encontrado" };

  return { title: entry.client, description: entry.summary };
};

export default async function CasePage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const entry = getCase(slug);
  if (!entry) notFound();

  return (
    <>
      <article>
        <header className="shell pb-14 pt-36 md:pt-48">
          <Reveal>
            <p className="mb-7 flex items-center gap-3 text-micro uppercase tracking-[0.22em] text-bolt-400">
              <BoltMark className="h-3 w-2" />
              <PendingValue
                value={entry.sector}
                label="Setor"
                render={(sector) => <>{sector}</>}
              />
            </p>
          </Reveal>

          <Reveal kind="mask">
            <h1 className="text-display font-light leading-[0.9] tracking-[-0.05em] text-paper-50">
              {entry.client}
            </h1>
          </Reveal>

          <Reveal delay={0.12}>
            <p className="mt-8 max-w-(--width-measure) text-lead text-paper-100/70">
              {entry.summary}
            </p>
          </Reveal>
        </header>

        <Reveal kind="mask" className="shell">
          <div className="relative aspect-[4/5] w-full overflow-hidden sm:aspect-[16/9]">
            <Image
              src={entry.cover.src}
              alt={entry.cover.alt}
              fill
              sizes="100vw"
              priority
              className="object-cover"
            />
          </div>
        </Reveal>

        <div className="shell grid gap-12 py-(--spacing-section) lg:grid-cols-[18rem_1fr] lg:gap-20">
          <Reveal>
            <dl className="flex flex-col gap-7 border-t border-white/12 pt-7">
              <div>
                <dt className="text-micro uppercase tracking-[0.2em] text-metal-500">
                  Escopo
                </dt>
                <dd className="mt-2 flex flex-col gap-1 text-body text-paper-100/75">
                  {entry.scope.map((item) => (
                    <span key={item}>{item}</span>
                  ))}
                </dd>
              </div>
              <div>
                <dt className="text-micro uppercase tracking-[0.2em] text-metal-500">
                  Ano
                </dt>
                <dd className="mt-2 text-body text-paper-100/75">
                  <PendingValue
                    value={entry.year}
                    label="Ano"
                    render={(year) => <>{year}</>}
                  />
                </dd>
              </div>
              <div>
                <dt className="text-micro uppercase tracking-[0.2em] text-metal-500">
                  Resultado
                </dt>
                <dd className="mt-2 text-body text-paper-100/75">
                  <PendingValue
                    value={entry.outcome}
                    label="Resultado"
                    render={(outcome) => <>{outcome}</>}
                  />
                </dd>
              </div>
              {entry.instagram ? (
                <div>
                  <dt className="text-micro uppercase tracking-[0.2em] text-metal-500">
                    Perfil
                  </dt>
                  <dd className="mt-2">
                    <a
                      href={entry.instagram}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="group inline-flex items-center gap-2 text-body text-paper-100/75 transition-colors hover:text-paper-50"
                    >
                      Ver no Instagram
                      <BoltMark className="h-3 w-2 text-bolt-500 transition-transform group-hover:translate-x-1" />
                    </a>
                  </dd>
                </div>
              ) : null}
            </dl>
          </Reveal>

          <Reveal delay={0.1} className="flex flex-col gap-6 border-t border-white/12 pt-7">
            {entry.narrative.map((paragraph, index) =>
              isPending(paragraph) ? (
                <p key={`pendente-${index}`} className="text-body">
                  <PendingValue
                    value={paragraph}
                    label="História do case"
                    render={(text) => <>{text}</>}
                  />
                </p>
              ) : (
                <p key={paragraph} className="text-lead text-paper-100/75">
                  {paragraph}
                </p>
              ),
            )}
          </Reveal>
        </div>

        <nav aria-label="Outros cases" className="shell pb-(--spacing-section)">
          <h2 className="text-caption uppercase tracking-[0.16em] text-metal-300">
            Outros cases
          </h2>
          <ul className="mt-6 flex flex-wrap gap-x-8 gap-y-3">
            {cases
              .filter((other) => other.slug !== entry.slug)
              .slice(0, 4)
              .map((other) => (
                <li key={other.slug}>
                  <Link
                    href={`/cases/${other.slug}`}
                    className="text-h3 font-light tracking-[-0.02em] text-paper-100/60 transition-colors hover:text-paper-50"
                  >
                    {other.client}
                  </Link>
                </li>
              ))}
          </ul>
        </nav>
      </article>

      <ContactCTA />
    </>
  );
}
