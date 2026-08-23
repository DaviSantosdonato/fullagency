# Design system

Tudo abaixo vive em `@theme` no [`src/styles/globals.css`](../src/styles/globals.css).
Não há valor de cor, tamanho ou duração escrito à mão dentro de componente.

## De onde vem a identidade

Extraída dos materiais reais da FULL, não escolhida:

- **`#A400FF`** — amostrado do `logo_full_color.png`. É a cor do raio na
  marca e a cor com que o estúdio da agência é fisicamente iluminado (a foto
  oficial da equipe é banhada de violeta).
- **Branco** — o wordmark "FULL" é branco puro.
- **Preto profundo** — o site atual roda sobre `#050505`/`#0A0A0A`.
- **Raio** — o único elemento gráfico da marca. Redesenhado em vetor
  (`BoltMark`) para ficar nítido em qualquer tamanho e aceitar `currentColor`.

### Sobre o "gradiente roxo genérico"

O briefing pede para evitá-lo. A tensão é aparente: aqui o violeta **não** é
escolha de template — é a marca. A resolução foi tratá-lo como **fonte de luz**,
nunca como preenchimento:

- flare da lente e o ponto de luz inicial do hero
- uma poça radial única atrás da câmera — a mesma luz do estúdio
- fios de 1 px, anéis de foco, marcadores
- **uma palavra por vez** na fonte cursiva
- reflexo violeta contido nas bordas e no vidro da câmera

Não existe em lugar nenhum um gradiente violeta→rosa, um botão com fundo em
degradê, ou um card com borda colorida.

## Cores

| Token | Valor | Uso |
|---|---|---|
| `--color-ink-950` | `#030304` | Fundo do documento |
| `--color-ink-900` | `#070709` | Seções alternadas |
| `--color-ink-800` | `#0c0c10` | Superfície de mídia |
| `--color-ink-700` … `-500` | `#131318` … `#26262f` | Elevação, bordas |
| `--color-paper-50` | `#faf8f4` | Texto sobre escuro |
| `--color-paper-100` | `#f4f1ea` | Fundo das seções editoriais claras |
| `--color-paper-200/300` | `#e7e2d7` / `#cec8ba` | Bordas e apoios no claro |
| `--color-bolt-500` | `#a400ff` | **A marca.** Acento, foco, luz |
| `--color-bolt-400` | `#c24dff` | Cursiva sobre escuro, estados de erro |
| `--color-bolt-600` | `#8400cc` | Cursiva sobre papel (contraste) |
| `--color-metal-100/300/500/700` | frios | Legendas, especulares, hairlines |

O off-white é **quente** (`#f4f1ea`), não branco puro — é o que dá a leitura
editorial em vez de "dashboard claro".

## Tipografia

Duas personalidades, carregadas via `next/font` com `display: swap`.

### Space Mono — estrutura

Navegação, títulos, corpo, botões, legendas. Pesos reais 400 e 700; as antigas
utilities de peso leve caem naturalmente em 400, sem síntese de um desenho que
a Space Mono não oferece.

Escala fluida em `clamp()`, cada passo com `line-height` e `letter-spacing`
próprios — títulos grandes precisam de tracking negativo, legendas precisam de
tracking positivo, e amarrar os dois ao token evita que isso seja re-decidido em
cada componente.

| Token | Faixa | Onde |
|---|---|---|
| `--text-micro` | 11 px, `0.16em` | Kickers, numeração |
| `--text-caption` | 12–13 px, `0.08em` | Rótulos, meta |
| `--text-body` | 16–17 px | Corpo |
| `--text-lead` | 18–22 px | Parágrafo de abertura |
| `--text-h3` | 22–28 px | Títulos de seção |
| `--text-h2` | 28–48 px | Títulos |
| `--text-h1` | 36–72 px | Título de página |
| `--text-display` | 40–104 px | Manifesto, CTA final |

### Shrikhand — a assinatura

Só em palavras estratégicas, no fim da frase: *ideia*, *foco*, *no mesmo time*,
*dentro de casa*, *lembrado*, *presença*, *acontecer*, *melhor*, *comunicar*.
Nunca um parágrafo.

A utility `.script` carrega as correções ópticas num lugar só, porque as métricas
da Shrikhand não batem com as da Space Mono:

```css
font-size: 1em;             /* Shrikhand já tem bastante massa visual */
line-height: 0.9;
transform: translateY(0.02em);  /* alinha a baseline com a Space Mono */
max-inline-size: 100%;      /* nunca estoura uma track de grid */
overflow-wrap: break-word;
```

As duas últimas linhas existem por causa de um bug real: um `inline-block`
reporta a largura inteira como `min-content`, e uma palavra manuscrita grande
empurrava uma coluna `1fr` para além do viewport em `/servicos`.

### A regra do sufixo

A palavra cursiva tem de ser **sufixo** do título. O título é remontado como
`head + script`; um trecho no meio inverteria a frase ("Identidade visual" com
acento em "Identidade" viraria "visual *Identidade*").

[`splitScriptWord`](../src/lib/splitScriptWord.ts) garante isso: se a frase não
for sufixo, o título renderiza inteiro na sans. Ênfase errada é um problema
pequeno; frase embaralhada é um problema grande. Um teste força a invariante.

### Como a palavra aparece

`HandwrittenAccent` revela com **`clip-path` horizontal** — tinta chegando da
esquerda — mais um brilho violeta que segue a pena e some, e opcionalmente um
traço SVG desenhado por `stroke-dashoffset`.

Clipping não participa do layout. A frase já ocupa a largura final no primeiro
frame, então **não há layout shift**. É por isso que é um clip e não um efeito
de máquina de escrever.

## Espaçamento e layout

| Token | Valor |
|---|---|
| `--spacing-gutter` | `clamp(1.25rem, 0.6rem + 3vw, 4.5rem)` |
| `--spacing-section` | `clamp(5rem, 3rem + 9vw, 11rem)` |
| `--width-shell` | `96rem` |
| `--width-measure` | `62ch` |

`.shell` é o único container. Composições são assimétricas por padrão
(`grid-cols-[1fr_auto]`, `[1.4fr_1fr]`, `[18rem_1fr]`) — nunca colunas iguais,
que é o que faz um site parecer template.

## Motion

| Token | Valor |
|---|---|
| `--ease-out-expo` | `cubic-bezier(0.16, 1, 0.3, 1)` |
| `--ease-in-out-quint` | `cubic-bezier(0.83, 0, 0.17, 1)` |
| `--duration-fast` / `-base` / `-slow` / `-reveal` | 220 / 420 / 720 / 1100 ms |

Uma primitiva de entrada só: [`Reveal`](../src/components/motion/Reveal.tsx),
com dois modos — `up` (deslocamento + fade) e `mask` (clip vertical). Ter uma
primitiva é o que impede o site de acumular doze triggers ligeiramente
diferentes.

> A máscara termina em `inset(-30% -10% -35% -10%)`, **fora** da caixa. Terminar
> em `inset(0…)` cortava os descendentes da fonte de destaque no instante em que a animação
> acabava — bug real, encontrado no navegador.

### Sem JS, sem motion

`[data-reveal]` começa oculto **apenas** quando o `<html>` tem `js-ready`, que só
é adicionado se o usuário não pediu menos movimento. Bundle bloqueado, hidratação
falhada ou `prefers-reduced-motion`: a página renderiza no estado **final**,
legível. Nunca em branco.

## Grão

Uma camada `position: fixed` com `feTurbulence` inline em data-URI, 5,5 % de
opacidade, `mix-blend-mode: overlay`. Uma só para o documento inteiro — mais
barata que pseudo-elementos por seção e nunca "anda" contra o scroll.

## Foco

`:focus-visible` com contorno de 2 px em `--color-bolt-400`, e
`--color-bolt-600` sob `[data-ground="paper"]` para manter contraste no claro.

> Cuidado ao editar campos de formulário: `outline-none` do Tailwind fica na
> layer de utilities e **vence** a regra de `:focus-visible` na base. Foi assim
> que os campos ficaram sem anel de foco até a verificação por teclado pegar.
