# Storyboard — "Da ideia ao frame"

O hero é a tese do site em cinco tempos: uma ideia surge como ponto de luz,
ganha foco dentro de uma lente, vira equipamento profissional e sai de quadro
deixando o resto da página assumir.

## O material

`202608230103.mp4` — master de **15,10 s**, 3840×2160, 60 fps. As variantes do
site são normalizadas para **15,08 s**, 24 fps e 362 frames.

O corte já contém quase exatamente a progressão pedida:

| Frame | ~t | O que está em quadro |
|---|---|---|
| 0 | 0,0 s | Ponto de luz dentro da lente, quase no escuro |
| 60 | 2,5 s | Frente da lente se revela |
| 157 | 6,5 s | Corpo inteiro da câmera gira em 3/4 |
| 278 | 11,6 s | Câmera retorna para o eixo frontal |
| 326 | 13,6 s | Câmera começa a recuar rapidamente |
| 361 | 15,0 s | Equipamento desaparece e o quadro esvazia |

O corte já começa com um ponto de luz dentro da lente. A composição em CSS
reforça esse início com um plano preto perfurado por uma abertura radial
(`--aperture-r`) e um brilho violeta que desaparece conforme a lente surge.

## Duração: por que nada aqui é medido em segundos

O briefing descreve um corte de ~30 s com marcações absolutas (0–5, 5–13, 13–23,
23–27, 27–30). O material atual tem 15,08 s.

Em vez de reescrever as marcações, os capítulos vivem em **frações normalizadas**
derivadas daquelas razões — `0,167 / 0,433 / 0,767 / 0,90 / 1,0`. O tempo real é
sempre `video.duration`, lido em runtime. Trocar o arquivo por um corte de 30 s
(ou de 12 s) não exige tocar em código nenhum: os capítulos reescalam sozinhos.

Isso está codificado em [`src/content/hero.ts`](../src/content/hero.ts) e
verificado em `src/content/content.test.ts` — a linha do tempo tem de cobrir
0–1 sem buracos.

## Os capítulos

| # | Faixa | Kicker | Linha | Cursiva |
|---|---|---|---|---|
| 01 | 0 → 0,167 | 01 — Ideia | Toda marca começa com uma | *ideia* |
| 02 | 0,167 → 0,433 | 02 — Lente | A gente coloca em | *foco* |
| 03 | 0,433 → 0,767 | 03 — Time | Estratégia, criação e produção | *no mesmo time* |
| 04 | 0,767 → 0,90 | 04 — Casa | Tudo acontece | *dentro de casa* |
| 05 | 0,90 → 1,0 | — | *(silêncio)* | — |

O quinto tempo não tem texto de propósito: a câmera sai de quadro, as legendas
somem e o manifesto assume a tela.

### A palavra escrita pelo scroll

Cada capítulo tem uma palavra na fonte cursiva, e ela **não** é animada por
tempo — o traço acompanha o progresso do próprio capítulo. Rolar devagar escreve
devagar; voltar apaga. É a única animação do site que responde ao gesto do
usuário letra por letra, e é o que amarra a tipografia à narrativa.

A exceção é `ideia`, do primeiro capítulo: ela é desenhada uma vez no
carregamento, em ~1 s. Sem isso, a primeira coisa na tela seria uma frase
incompleta sobre fundo preto — indistinguível de uma página que falhou.

## Envelopes

Cada capítulo tem uma envoltória trapezoidal: entra em 22 % da sua faixa,
segura, sai em 22 %. Os capítulos vizinhos se cruzam nas rampas, então nunca há
um quadro sem texto no meio da narrativa.

O primeiro capítulo **não tem rampa de entrada** — ele já está a 100 % em
`progress = 0`.

## Comportamento do scroll

- Seção de **520 vh** no desktop, **420 vh** no mobile (a mesma distância custa
  muito mais gestos num celular).
- O palco é `position: sticky`, **não** um pin do GSAP. Ele se solta sozinho no
  fim da seção, não injeta spacer e não pode prender o visitante se um
  `ScrollTrigger.refresh()` falhar.
- ScrollTrigger só **informa o progresso**. Quem escreve no DOM é um único
  callback do `gsap.ticker`, com `quickSetter`s em cache. Zero renders do React
  durante o scroll.
- Reverso funciona por construção: o alvo é uma função do progresso, não um
  acumulador.

## Verificado

| Item | Resultado |
|---|---|
| `video.duration` lido em runtime | 15,083 s |
| Scrub direto, 11 posições | `t` de 0 → 15,082 s, linear |
| Scrub reverso, 6 posições | valores idênticos aos da ida, volta a 0 |
| `paused` / `loop` / `muted` | `true` / `false` / `true` |
| `readyState` | 4 (HAVE_ENOUGH_DATA) |
| Poster durante o scrub | opacidade 0 — nunca tela preta, nunca frame congelado |
| Unpin | em `scrollY = 5080`, `stageTop = -1300`: o palco saiu inteiro |
| `prefers-reduced-motion` | seção vira 900 px, sem scrub, com os 4 textos empilhados e legíveis |

## Codecs

`scripts/encode-hero.mjs` produz tudo a partir do master:

```bash
node scripts/encode-hero.mjs caminho/para/o-corte-final.mp4
```

| Saída | Tamanho | Para quê |
|---|---|---|
| `full-camera-flow.mp4` | 3,55 MB | Desktop, H.264 CRF 21 |
| `full-camera-flow-mobile.mp4` | 633 KB | 640 px de largura, CRF 26 |
| `full-camera-flow.webm` | 1,68 MB | VP9, fallback e navegadores sem H.264 |
| `full-camera-poster.webp` / `.jpg` | 5 KB / 8,6 KB | Primeiro frame |

Os dois parâmetros que fazem o scrub funcionar:

- **`fps=24` + `-g 6 -keyint_min 6 -sc_threshold 0`** — normaliza qualquer
  master e produz um keyframe a cada 0,25 s. Buscar um instante qualquer custa decodificar poucos inter-frames.
  Com o GOP padrão, cada busca decodificaria segundos de vídeo.
- **`-movflags +faststart`** — o `moov` no início, para o player poder buscar
  antes do arquivo inteiro chegar.

O áudio é descartado (`-an`): o hero é sempre mudo, e a trilha AAC só atrasava
o `canplay`.

> Vale notar: o Chromium do Playwright não traz codecs proprietários, então a
> verificação automatizada rodou inteira sobre o **WebM**. O fallback não é
> teórico — é o caminho que os testes exercitaram.
