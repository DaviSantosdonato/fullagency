import { CONFIRMAR, type NavItem, type Pending, type SocialLink } from "./types";

/**
 * Brand-level facts.
 *
 * Confirmed from fullagencia.com.br (August 2026): the name, the positioning
 * line, the founding year, the in-house production arm, and the three social
 * profiles. The site publishes no phone number, e-mail, WhatsApp, address or
 * CNPJ anywhere — every enquiry goes through the form — so those stay open.
 */
export const site = {
  name: "FULL Agência",
  shortName: "FULL",
  /** The line the agency leads with. */
  positioning: "A agência de marketing com produtora de vídeo própria.",
  signature: "nós comunicamos",
  foundedYear: 2018,
  productionArm: "FullProduz",
  description:
    "Estratégia, criação e produção audiovisual no mesmo time. A FULL constrói a presença digital de empresas que levam a própria reputação a sério.",
  url: "https://fullagencia.com.br",
} as const;

export const contact = {
  whatsapp: CONFIRMAR as Pending<string>,
  phone: CONFIRMAR as Pending<string>,
  email: CONFIRMAR as Pending<string>,
  city: CONFIRMAR as Pending<string>,
  address: CONFIRMAR as Pending<string>,
  cnpj: CONFIRMAR as Pending<string>,
} as const;

export const socials: readonly SocialLink[] = [
  {
    label: "Instagram",
    href: "https://instagram.com/fullagencia",
    handle: "@fullagencia",
  },
  {
    label: "LinkedIn",
    href: "https://linkedin.com/company/fullagencia",
    handle: "/fullagencia",
  },
  {
    label: "Facebook",
    href: "https://facebook.com/fullagencia",
    handle: "/fullagencia",
  },
];

export const primaryNav: readonly NavItem[] = [
  { label: "Serviços", href: "/servicos" },
  { label: "Cases", href: "/cases" },
  { label: "Produtora", href: "/produtora" },
  { label: "Sobre", href: "/sobre" },
];

export const footerNav: readonly NavItem[] = [
  { label: "Início", href: "/" },
  ...primaryNav,
  { label: "Contato", href: "/contato" },
];

export const ctaLabel = "Vamos conversar";

/** Years in operation, derived — never a hand-typed number that goes stale. */
export const yearsActive = (now: Date = new Date()): number =>
  now.getFullYear() - site.foundedYear;
