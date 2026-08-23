import type { ProcessStep, TeamMember } from "./types";

/**
 * Names, roles and photographs published by the agency itself. Nothing here is
 * generated — if a seat is not on fullagencia.com.br, it is not on this list.
 */
export const team: readonly TeamMember[] = [
  { name: "Suellen Perugini", role: "Diretora Executiva", photo: "/media/team/suellen.jpg" },
  { name: "Vitor Perugini", role: "Diretor Executivo", photo: "/media/team/vitor.jpg" },
  { name: "Larissa", role: "Head FullProduz", photo: "/media/team/larissa.jpg" },
  { name: "Davi", role: "Diretor de Arte", photo: "/media/team/davi.jpg" },
  { name: "Bernardo", role: "Design", photo: "/media/team/bernardo.jpg" },
  { name: "Henrique", role: "Filmmaker", photo: "/media/team/henrique.jpg" },
  { name: "Thais", role: "Head de Atendimento", photo: "/media/team/thais.jpg" },
  { name: "Ana Paula", role: "Head de Projetos", photo: "/media/team/ana-paula.jpg" },
];

/** The four steps the agency already describes, rewritten in its own voice. */
export const processSteps: readonly ProcessStep[] = [
  {
    index: "01",
    verb: "Pensar",
    title: "Diagnóstico",
    body: "A gente olha para a sua comunicação como o seu cliente olha: em três segundos. Depois mostra exatamente onde ela está dizendo menos do que a sua empresa é.",
  },
  {
    index: "02",
    verb: "Focar",
    title: "Estratégia",
    body: "Posicionamento, mensagem e conceito de campanha definidos junto com você — no tamanho certo do seu negócio, não no tamanho de um modelo pronto.",
  },
  {
    index: "03",
    verb: "Produzir",
    title: "Produção própria",
    body: "A FullProduz grava e edita com padrão de estúdio. Vídeo, foto e roteiro feitos por quem participou da estratégia desde o começo.",
  },
  {
    index: "04",
    verb: "Colocar no mundo",
    title: "Veiculação",
    body: "A campanha vai para os canais certos, as peças são gerenciadas e o resultado é acompanhado. Nada fica parado numa pasta.",
  },
];
