import { CONFIRMAR, type CaseStudy } from "./types";

/**
 * Clients confirmed on fullagencia.com.br (August 2026), each with a real
 * screenshot of work the agency published for them.
 *
 * Sectors are read from the client's own public profile; years, results and
 * project narratives are deliberately open — inventing a metric for a real
 * client is the one mistake this site must not make.
 */
export const cases: readonly CaseStudy[] = [
  {
    slug: "rodobras",
    client: "Rodobras",
    sector: "Rede rodoviária e de serviços",
    summary:
      "Uma rede com alto padrão de confiabilidade precisava que a comunicação carregasse esse mesmo peso.",
    year: CONFIRMAR,
    scope: ["Estratégia", "Produção audiovisual", "Conteúdo"],
    instagram: "https://www.instagram.com/postosrodobras/",
    cover: {
      kind: "image",
      src: "/media/cases/rodobras.jpg",
      alt: "Feed do Instagram da Rodobras produzido pela FULL",
      width: 500,
      height: 963,
    },
    narrative: [
      "A Rodobras já era reconhecida na estrada. O desafio foi traduzir essa confiabilidade para o digital, com um padrão de imagem que não dependesse de improviso.",
      CONFIRMAR,
    ],
    outcome: CONFIRMAR,
  },
  {
    slug: "domina-fibra",
    client: "Domina Fibra",
    sector: "Internet e telecomunicações",
    summary:
      "Serviço técnico explicado de um jeito que o cliente final entende — e quer contratar.",
    year: CONFIRMAR,
    scope: ["Conteúdo", "Campanhas", "Produção audiovisual"],
    instagram: "https://www.instagram.com/dominafibra/",
    cover: {
      kind: "image",
      src: "/media/cases/domina.jpg",
      alt: "Feed do Instagram da Domina Fibra produzido pela FULL",
      width: 500,
      height: 963,
    },
    narrative: [CONFIRMAR],
    outcome: CONFIRMAR,
  },
  {
    slug: "house-fit",
    client: "House Fit",
    sector: "Academia e bem-estar",
    summary:
      "Energia é o produto. A comunicação precisava ter o mesmo ritmo de quem treina lá dentro.",
    year: CONFIRMAR,
    scope: ["Produção audiovisual", "Conteúdo", "Presença digital"],
    instagram: "https://www.instagram.com/housefitsinop/",
    cover: {
      kind: "image",
      src: "/media/cases/house_fit.jpg",
      alt: "Feed do Instagram da House Fit produzido pela FULL",
      width: 500,
      height: 963,
    },
    narrative: [CONFIRMAR],
    outcome: CONFIRMAR,
  },
  {
    slug: "simonetto-casa-siena",
    client: "Simonetto Casa Siena",
    sector: "Móveis e ambientes planejados",
    summary:
      "Produto de alto padrão pede imagem de alto padrão. Sem exceção, em toda peça.",
    year: CONFIRMAR,
    scope: ["Identidade visual", "Produção audiovisual", "Conteúdo"],
    instagram: "https://www.instagram.com/simonetto.casasiena/",
    cover: {
      kind: "image",
      src: "/media/cases/simonetto.jpg",
      alt: "Feed do Instagram da Simonetto Casa Siena produzido pela FULL",
      width: 500,
      height: 963,
    },
    narrative: [CONFIRMAR],
    outcome: CONFIRMAR,
  },
  {
    slug: "escola-allegra",
    client: "Escola Allegra",
    sector: "Educação",
    summary:
      "Instituição de ensino comunicando confiança para quem decide: a família.",
    year: CONFIRMAR,
    scope: ["Estratégia", "Conteúdo", "Campanhas"],
    instagram: "https://www.instagram.com/escolaallegra/",
    cover: {
      kind: "image",
      src: "/media/cases/allegra.jpg",
      alt: "Feed do Instagram da Escola Allegra produzido pela FULL",
      width: 500,
      height: 963,
    },
    narrative: [CONFIRMAR],
    outcome: CONFIRMAR,
  },
  {
    slug: "fabrica-dos-oculos",
    client: "Fábrica dos Óculos",
    sector: "Varejo óptico",
    summary: "Varejo com giro alto e um catálogo que muda toda semana.",
    year: CONFIRMAR,
    scope: ["Conteúdo", "Produção audiovisual", "Campanhas"],
    instagram: "https://www.instagram.com/fabricadosoculos.oficial/",
    cover: {
      kind: "image",
      src: "/media/cases/fabrica_dos_oculos.jpg",
      alt: "Feed do Instagram da Fábrica dos Óculos produzido pela FULL",
      width: 500,
      height: 963,
    },
    narrative: [CONFIRMAR],
    outcome: CONFIRMAR,
  },
  {
    slug: "cemais",
    client: "Cemais",
    sector: CONFIRMAR,
    summary: "Presença digital construída do zero, dentro de um padrão único.",
    year: CONFIRMAR,
    scope: ["Presença digital", "Conteúdo"],
    instagram: "https://www.instagram.com/cemais_/",
    cover: {
      kind: "image",
      src: "/media/cases/cemais.jpg",
      alt: "Feed do Instagram da Cemais produzido pela FULL",
      width: 500,
      height: 963,
    },
    narrative: [CONFIRMAR],
    outcome: CONFIRMAR,
  },
  {
    slug: "bralesi",
    client: "Bralesi Burger",
    sector: "Alimentação",
    summary: "Comida que precisa dar vontade na primeira imagem.",
    year: CONFIRMAR,
    scope: ["Produção audiovisual", "Conteúdo"],
    instagram: "https://www.instagram.com/bralesiburger/",
    cover: {
      kind: "image",
      src: "/media/cases/bralesi.jpg",
      alt: "Feed do Instagram da Bralesi Burger produzido pela FULL",
      width: 500,
      height: 963,
    },
    narrative: [CONFIRMAR],
    outcome: CONFIRMAR,
  },
];

/**
 * Clients the agency names publicly but for which no published piece is
 * available yet. Listed as names only — no invented scope, no invented story.
 */
export const additionalClients: readonly string[] = [
  "Show Safra",
  "Colégio San Petrus",
  "Atacado Beira Rio",
  "Mult Vale",
  "Levplay",
];

export interface MarqueeClient {
  readonly name: string;
  readonly logo: {
    readonly src: string;
    readonly width: number;
    readonly height: number;
    readonly kind: "wordmark" | "mark";
    readonly surface: "dark" | "light";
    readonly invertOnDark?: boolean;
  };
  /** Official page from which the exact artwork was obtained. */
  readonly source: string;
}

/**
 * Official client artwork only. Wordmarks come from each company's website;
 * the three local marks come from the confirmed public profiles already tied
 * to the case records above. No typeface or logo is reconstructed in CSS.
 */
export const marqueeClients: readonly MarqueeClient[] = [
  {
    name: "Rodobras",
    logo: {
      src: "/media/clients/rodobras.png",
      width: 346,
      height: 50,
      kind: "wordmark",
      surface: "dark",
    },
    source: "https://gruporodobras.com.br/rede-rodobras",
  },
  {
    name: "Show Safra",
    logo: {
      src: "/media/clients/show-safra.png",
      width: 543,
      height: 178,
      kind: "wordmark",
      surface: "dark",
    },
    source: "https://www.showsafra.com.br/",
  },
  {
    name: "Simonetto Casa Siena",
    logo: {
      src: "/media/clients/simonetto.svg",
      width: 2313,
      height: 522,
      kind: "wordmark",
      surface: "dark",
      invertOnDark: true,
    },
    source: "https://www.simonetto.com.br/",
  },
  {
    name: "Atacado Beira Rio",
    logo: {
      src: "/media/clients/beira-rio.png",
      width: 300,
      height: 100,
      kind: "wordmark",
      surface: "dark",
    },
    source: "https://lojasbeirario.com.br/sobre/",
  },
  {
    name: "Domina Fibra",
    logo: {
      src: "/media/clients/domina-fibra.png",
      width: 1250,
      height: 250,
      kind: "wordmark",
      surface: "dark",
    },
    source: "https://dominafibra.com.br/",
  },
  {
    name: "Mult Vale",
    logo: {
      src: "/media/clients/mult-vale.png",
      width: 395,
      height: 170,
      kind: "wordmark",
      surface: "dark",
    },
    source: "https://www.multvale.com/",
  },
  {
    name: "House Fit",
    logo: {
      src: "/media/clients/house-fit.jpg",
      width: 100,
      height: 100,
      kind: "mark",
      surface: "dark",
    },
    source: "https://www.instagram.com/housefitsinop/",
  },
  {
    name: "Fábrica dos Óculos",
    logo: {
      src: "/media/clients/fabrica-dos-oculos.jpg",
      width: 100,
      height: 100,
      kind: "mark",
      surface: "dark",
    },
    source: "https://www.instagram.com/fabricadosoculos.oficial/",
  },
  {
    name: "Escola Allegra",
    logo: {
      src: "/media/clients/escola-allegra.jpg",
      width: 100,
      height: 100,
      kind: "mark",
      surface: "dark",
    },
    source: "https://www.instagram.com/escolaallegra/",
  },
];

export const featuredCases = cases.slice(0, 4);

export const getCase = (slug: string): CaseStudy | undefined =>
  cases.find((entry) => entry.slug === slug);
