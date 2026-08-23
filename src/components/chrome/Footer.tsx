import Link from "next/link";
import { FullLogo } from "./FullLogo";
import { BoltMark } from "@/components/ui/BoltMark";
import { PendingValue } from "@/components/ui/PendingValue";
import { contact, footerNav, site, socials } from "@/content/site";

export const Footer = () => (
  <footer className="border-t border-white/10 bg-ink-950">
    <div className="shell py-16 md:py-20">
      <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr] md:gap-8">
        <div>
          <FullLogo className="h-8 w-auto" />
          <p className="mt-6 max-w-[34ch] text-body text-paper-100/60">
            {site.positioning}
          </p>
          <p className="mt-6 flex items-center gap-2 text-micro uppercase tracking-[0.22em] text-metal-300">
            <BoltMark className="h-3 w-2 text-bolt-500" />
            {site.signature}
          </p>
        </div>

        <nav aria-label="Navegação do rodapé">
          <h2 className="mb-5 text-micro uppercase tracking-[0.22em] text-metal-500">
            Navegação
          </h2>
          <ul className="flex flex-col gap-2.5">
            {footerNav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-body text-paper-100/70 transition-colors duration-300 hover:text-paper-50"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="mb-5 text-micro uppercase tracking-[0.22em] text-metal-500">
            Contato
          </h2>
          <ul className="flex flex-col gap-2.5">
            {socials.map((social) => (
              <li key={social.href}>
                <a
                  href={social.href}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="text-body text-paper-100/70 transition-colors duration-300 hover:text-paper-50"
                >
                  {social.label}{" "}
                  <span className="text-metal-500">{social.handle}</span>
                </a>
              </li>
            ))}
            <li className="text-body text-paper-100/70">
              <PendingValue
                value={contact.email}
                label="E-mail"
                render={(email) => <a href={`mailto:${email}`}>{email}</a>}
              />
            </li>
            <li className="text-body text-paper-100/70">
              <PendingValue
                value={contact.city}
                label="Localização"
                render={(city) => <span>{city}</span>}
              />
            </li>
          </ul>
        </div>
      </div>

      <div className="mt-14 flex flex-col gap-4 border-t border-white/10 pt-7 text-caption text-metal-500 sm:flex-row sm:items-center sm:justify-between">
        <p>
          © {new Date().getFullYear()} {site.name}. Todos os direitos reservados.
        </p>
        <div className="flex flex-wrap items-center gap-6">
          <Link
            href="/privacidade"
            className="transition-colors duration-300 hover:text-paper-100"
          >
            Política de privacidade
          </Link>
          <span>Site por {site.shortName}</span>
        </div>
      </div>
    </div>
  </footer>
);
