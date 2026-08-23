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

/**
 * The strongest names in the agency's confirmed client roster, ordered for a
 * balanced marquee rhythm. These are rendered as names rather than simulated
 * logos until the agency supplies each brand's official vector artwork.
 */
export const marqueeClients: readonly string[] = [
  "Rodobras",
  "Show Safra",
  "Simonetto Casa Siena",
  "Atacado Beira Rio",
  "Domina Fibra",
  "House Fit",
  "Colégio San Petrus",
  "Fábrica dos Óculos",
  "Mult Vale",
  "Levplay",
];

export const featuredCases = cases.slice(0, 4);

export const getCase = (slug: string): CaseStudy | undefined =>
  cases.find((entry) => entry.slug === slug);
