# CONTEXT — FULL Agência

## O que é isto

Site experimental novo, construído do zero para a **FULL Agência** — agência de
marketing com produtora de vídeo própria (a **FullProduz**), ativa desde 2018.

Não é redesenho do site atual. `fullagencia.com.br` foi consultado apenas como
**fonte de fatos**: identidade, posicionamento, clientes, equipe e voz.

## O conceito

**"Da ideia ao frame."**

Uma ideia surge como ponto de luz, ganha foco dentro de uma lente e vira
produção profissional. A narrativa existe porque o argumento comercial da FULL
é literalmente esse: quem escreve a estratégia é quem opera a câmera.

## O que foi confirmado no site oficial

- "A agência de marketing com produtora de vídeo própria."
- "A sua empresa é profissional. A sua presença digital também precisa ser."
- Assinatura: **"nós comunicamos"**
- Desde **2018**; propósito declarado: "estabelecer cultura"
- Produtora interna: **FullProduz**
- "Câmeras profissionais, equipe de produção, equipe de estratégia, tudo no
  mesmo time. Ninguém terceiriza nada."
- Processo em 4 passos: Diagnóstico → Estratégia → Produção própria → Veiculação
- Marca: violeta **`#A400FF`** + branco + raio
- Redes: `@fullagencia` no Instagram, Facebook e LinkedIn
- 8 clientes com peça publicada + 5 citados por nome
- 8 pessoas na equipe, com foto e cargo

## O que **não** foi confirmado

O site oficial não publica telefone, WhatsApp, e-mail, endereço nem CNPJ — todo
contato passa pelo formulário. Os três contadores de estatística animam a partir
de zero e os valores-alvo não estão no HTML.

**Nada disso foi inventado.** Ver [`docs/content-confirmation.md`](docs/content-confirmation.md)
para a lista completa e o checklist de lançamento.

```bash
grep -rn "CONFIRMAR" src/content
```

## Decisões que valem saber

**O violeta é da marca, não de um template.** O briefing pedia para evitar
"gradiente roxo genérico". O violeta aqui é a cor do raio no logo e a luz com
que o estúdio da FULL é fisicamente iluminado. A saída foi usá-lo como **fonte
de luz** — flare, anel, uma palavra por vez — e nunca como preenchimento em
degradê.

**O vídeo tem 15,08 s, não 30 s.** O briefing descrevia um corte de ~30 s. O
corte atual tem 15,08 s e contém a progressão pedida. Os
capítulos foram escritos em **frações normalizadas** derivadas das marcações
originais, e o tempo real vem sempre de `video.duration`. Trocar o arquivo não
exige tocar em código.

**A lente procedural foi substituída pelo modelo Sony fornecido.** A primeira
versão lia como uma lente isolada e artificial; as tentativas geradas também não
atingiram a qualidade esperada. O núcleo criativo agora usa o GLB real enviado
pela FULL, com material PBR, órbita por scroll, parallax do ponteiro e iluminação
violeta no próprio espaço 3D.

**O formulário não envia nada.** Sem destino confirmado, ele diz honestamente
que a mensagem foi *montada*, não enviada. `src/lib/lead/submit.ts` é o ponto de
conexão.

## Mapa

| Documento | Para quê |
|---|---|
| [`docs/architecture.md`](docs/architecture.md) | Stack, estrutura, módulos, carregamento, limpeza |
| [`docs/design-system.md`](docs/design-system.md) | Tokens, tipografia, motion, armadilhas conhecidas |
| [`docs/storyboard.md`](docs/storyboard.md) | Os 5 tempos do hero, encoding, o que foi verificado |
| [`docs/skills.md`](docs/skills.md) | Quais skills entraram e as decisões de mídia |
| [`docs/content-confirmation.md`](docs/content-confirmation.md) | **Tudo que a FULL precisa confirmar antes de publicar** |
| [`README.md`](README.md) | Como rodar, como trocar os materiais |
