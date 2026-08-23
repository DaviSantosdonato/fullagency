import type { Service } from "./types";

/**
 * Six chapters, not six cards.
 *
 * Each one is grounded in something the agency already says it does:
 * diagnosis and positioning, in-house filming and editing ("vídeo, foto,
 * roteiro"), campaign execution and placement, day-to-day social presence, and
 * visual identity work carried by the art direction seat. Naming and scope
 * still need a pass from the team — see docs/content-confirmation.md.
 */
export const services: readonly Service[] = [
  {
    slug: "estrategia",
    index: "01",
    title: "Estratégia e posicionamento",
    lead: "Antes de gravar qualquer coisa, a gente entende o que a sua empresa é.",
    body: "Olhamos para a sua comunicação atual, para o seu público e para o que a concorrência está fazendo. Sai dali o posicionamento, a mensagem e o conceito que vão sustentar tudo o que vem depois — do roteiro ao anúncio.",
    deliverables: [
      "Diagnóstico da comunicação atual",
      "Definição de posicionamento e mensagem",
      "Conceito de campanha",
      "Direcionamento de conteúdo",
    ],
    media: {
      kind: "image",
      src: "/media/team/vitor.jpg",
      alt: "Direção executiva da FULL em reunião de estratégia",
      width: 533,
      height: 800,
    },
  },
  {
    slug: "producao-audiovisual",
    index: "02",
    title: "Produção audiovisual",
    lead: "Câmera profissional, equipe de produção e roteirista. Tudo aqui dentro.",
    body: "A FullProduz é a nossa produtora. Ela grava, dirige e edita as peças com padrão de estúdio — institucional, campanha, conteúdo de rotina. Nenhuma etapa vai para freelancer, o que significa que quem filma já esteve na reunião de estratégia.",
    deliverables: [
      "Vídeo institucional",
      "Filme de campanha",
      "Fotografia de marca",
      "Roteiro e direção",
      "Edição, cor e finalização",
    ],
    media: {
      kind: "image",
      src: "/media/brand/full-studio.jpg",
      alt: "Estúdio da FULL montado com iluminação e equipe reunida",
      width: 1920,
      height: 1280,
    },
  },
  {
    slug: "conteudo",
    index: "03",
    title: "Conteúdo com constância",
    scriptWord: "constância",
    lead: "Não é postar mais. É produzir melhor, toda semana.",
    body: "Um feed que parece feito às pressas diz mais sobre a sua empresa do que qualquer proposta comercial. A gente assume a rotina de conteúdo com o mesmo cuidado de uma campanha: pauta, gravação, edição e publicação dentro de uma linha só.",
    deliverables: [
      "Planejamento de pauta",
      "Gravação recorrente",
      "Edição e finalização",
      "Publicação e acompanhamento",
    ],
    media: {
      kind: "image",
      src: "/media/cases/rodobras.jpg",
      alt: "Feed de conteúdo produzido pela FULL para a Rodobras",
      width: 500,
      height: 963,
    },
  },
  {
    slug: "campanhas",
    index: "04",
    title: "Campanhas e veiculação",
    scriptWord: "veiculação",
    lead: "A campanha não termina quando o vídeo fica pronto.",
    body: "A gente executa, gerencia as peças e leva a comunicação para os canais que fazem sentido para o seu negócio. O objetivo é simples: colocar a mensagem certa na frente das pessoas certas, com a qualidade que a sua empresa já tem.",
    deliverables: [
      "Desdobramento de peças",
      "Gestão da campanha",
      "Veiculação nos canais certos",
      "Acompanhamento de entrega",
    ],
    media: {
      kind: "image",
      src: "/media/cases/domina.jpg",
      alt: "Peças de campanha produzidas pela FULL para a Domina Fibra",
      width: 500,
      height: 963,
    },
  },
  {
    slug: "identidade",
    index: "05",
    title: "Identidade visual",
    scriptWord: "visual",
    lead: "Uma marca reconhecível em três segundos, sem precisar do logo.",
    body: "Tipografia, cor, enquadramento, ritmo de edição. Quando esses elementos são decididos de propósito, cada peça reforça a anterior — e a sua empresa para de parecer uma empresa diferente em cada canal.",
    deliverables: [
      "Sistema visual da marca",
      "Direção de arte",
      "Padrões para peças e vídeo",
      "Aplicações digitais",
    ],
    media: {
      kind: "image",
      src: "/media/team/davi.jpg",
      alt: "Direção de arte da FULL trabalhando em identidade visual",
      width: 533,
      height: 800,
    },
  },
  {
    slug: "presenca-digital",
    index: "06",
    title: "Presença digital",
    scriptWord: "digital",
    lead: "O lugar onde tudo isso encosta no seu cliente.",
    body: "Perfis, site, materiais de proposta — os pontos em que alguém decide se a sua empresa é grande ou pequena antes de falar com você. A gente cuida para que essa primeira impressão esteja do tamanho do seu nome.",
    deliverables: [
      "Gestão de perfis",
      "Materiais institucionais",
      "Padronização entre canais",
      "Acompanhamento contínuo",
    ],
    media: {
      kind: "image",
      src: "/media/cases/house_fit.jpg",
      alt: "Presença digital construída pela FULL para a House Fit",
      width: 500,
      height: 963,
    },
  },
];

export const getService = (slug: string): Service | undefined =>
  services.find((service) => service.slug === slug);
