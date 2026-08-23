# Arquitetura

## Stack

| Camada | Escolha | Versão |
|---|---|---|
| Framework | Next.js, App Router, Turbopack | 16.3.2 |
| UI | React | 19.2.8 |
| Linguagem | TypeScript `strict` + `noUncheckedIndexedAccess` | 6.0.3 |
| Estilo | Tailwind CSS v4 (`@theme` em CSS) | 4.3.3 |
| Motion | GSAP + ScrollTrigger + `@gsap/react` | 3.15 |
| Imagem | `next/image` + assets AVIF/WebP/PNG | integrado ao Next |
| 3D | React Three Fiber + drei + Three.js | 9.7 / 10.7 / 0.182 |
| Testes | Vitest + Testing Library + jsdom | 4.1 |
| Lint | ESLint 9 + `eslint-config-next` (flat) | 9.39 |
| Package manager | pnpm | 11.5.3 |

Sem `shadcn/ui`: os únicos primitives necessários eram um formulário e um
diálogo, e ambos precisavam de comportamento específico (máscara de telefone,
foco no primeiro erro, `inert`). Puxar a dependência e depois sobrescrever a
aparência inteira custaria mais do que escrever.

### Duas versões fixadas de propósito

- **TypeScript 6, não 7.** O `tsc` 7 (compilador nativo em Go) checa o projeto
  sem erros, mas `typescript-eslint` ainda não suporta a API do TS 7 — o lint
  quebra por completo. Um projeto que não roda lint é pior que um projeto no
  compilador anterior.
- **ESLint 9, não 10.** `eslint-plugin-react@7.37` (dependência de
  `eslint-config-next`) usa a API antiga de `context.getFilename()`, removida no
  ESLint 10.

Revisitar quando as duas cadeias alcançarem.

## Estrutura

```
src/
├── app/                      # rotas (App Router)
│   ├── layout.tsx            # shell: fontes, header, footer, grão, skip link
│   ├── page.tsx              # home
│   ├── servicos/ cases/ produtora/ sobre/ contato/ privacidade/
│   ├── cases/[slug]/         # SSG a partir de generateStaticParams
│   └── not-found.tsx
├── components/               # por domínio, nunca uma pasta gigante
│   ├── chrome/               # EditorialHeader, MobileMenu, Footer, FullLogo
│   ├── hero/                 # CinematicScrollHero, HeroChapter, Manifesto
│   ├── production/           # CreativeCore, CinematicCamera, CameraCanvas
│   ├── cases/                # CaseShowcase, CaseMedia
│   ├── services/             # ServiceChapter
│   ├── culture/              # ProcessTimeline, TeamGallery
│   ├── contact/              # ContactCTA, LeadForm
│   ├── motion/               # MotionProvider, Reveal
│   └── ui/                   # BoltMark, HandwrittenAccent, PageIntro, PendingValue
├── content/                  # dados tipados — a única fonte de texto
├── lib/                      # módulos profundos, API pequena
│   ├── lead/schema.ts        # validação pura (+ testes)
│   ├── lead/submit.ts        # ponto de integração isolado
│   ├── useScrollVideo.ts     # scrub por scroll
│   ├── useDeviceProfile.ts   # reduced motion / ponteiro / potência
│   └── splitScriptWord.ts, gsap.ts, fonts.ts, cn.ts
└── styles/globals.css        # tokens
```

## Camada de conteúdo

Nenhum texto vive em JSX. Tudo passa por `src/content/*`, com tipos em
`types.ts`. Dois ganhos:

1. `grep -rn "CONFIRMAR" src/content` lista tudo que a FULL ainda precisa
   aprovar, num comando.
2. É a costura para um CMS: troque o corpo dos módulos por `fetch`, mantenha os
   tipos.

`Pending<T> = T | "[CONFIRMAR]"` obriga cada leitura a decidir o que fazer com
um valor não confirmado. O componente `PendingValue` é o único lugar que
renderiza um: tracejado violeta em desenvolvimento, "a confirmar" discreto em
produção. **Um marcador nunca vira um dado falso** — e uma checagem no
`verify.py` falha se o texto `[CONFIRMAR]` aparecer cru em qualquer página.

## Os módulos que carregam a complexidade

### `useScrollVideo`

API: `{ videoRef, state, subscribe }`. Toda a dificuldade fica dentro.

- ScrollTrigger **só informa progresso**; o `<video>` é buscado no máximo uma
  vez por frame, num único callback do `gsap.ticker`.
- Suavização exponencial com constante de tempo (`1 - e^(-dt/τ)`, τ = 85 ms) em
  vez de lerp fixo: o toque é idêntico a 60 Hz e a 144 Hz.
- `SEEK_EPSILON = 15 ms` (menos de meio frame a 24 fps) evita buscas que custam
  um decode e não mudam nada; com snap no fim, garante que o último frame é
  alcançado.
- Preparação do elemento: um ciclo `play()`/`pause()` mudo força o decoder a
  produzir um frame — sem isso o elemento fica preto até a primeira busca
  resolver, e no iOS a busca simplesmente não funciona.
- `progress` sai por **subscrição**, não por state: muda todo frame e não pode
  reconciliar o React.

### `components/production/CinematicCamera.tsx`

A casca adia o bundle 3D com `next/dynamic` e só monta o canvas depois de um
`IntersectionObserver` detectar a seção a 75% de viewport de distância. Um
poster do próprio modelo ocupa o espaço até o GLB terminar de carregar, evitando
flash vazio. GSAP entrega ao canvas apenas o progresso normalizado do scroll.

### `components/production/CameraCanvas.tsx`

Contém a cena real: GLB PBR, câmera de perspectiva e um rig de luzes com recorte
violeta lateral. `useFrame` combina uma órbita pequena de scroll, resposta ao
ponteiro e idle, todos sobre a malha — não sobre um PNG.
Reduced motion e hardware fraco mantêm o canvas, mas congelam o modelo para
evitar trabalho contínuo de renderização.

### `lib/lead/schema.ts`

Validação e máscara de telefone como funções puras. É a parte que vale testar,
porque um formulário que rejeita silenciosamente um celular brasileiro válido
custa um cliente real. 24 testes cobrem DDD, fixo de 10 dígitos, código do país,
pontuação colada e e-mails malformados.

## Estratégia de carregamento

| Recurso | Quando |
|---|---|
| Hero (poster) | Imediato, `priority` |
| Hero (vídeo) | `preload="auto"`; variante `-mobile` em telas estreitas |
| Câmera da produtora | Poster imediato; bundle R3F e GLB Sony de 6,92 MB somente quando a seção se aproxima |
| Imagens abaixo da dobra | `next/image` com `sizes` explícito |
| Vídeo de hover nos cases | Elemento criado no `pointerenter`, destruído no leave |
| Fontes | `next/font`, self-hosted, `display: swap` |

`useDeviceProfile` centraliza a decisão de degradar. Resolve **num efeito**, não
durante o render, para servidor e primeiro paint concordarem — sem hydration
mismatch. Sinais: `prefers-reduced-motion`, `pointer: coarse`, largura,
`hardwareConcurrency`, `deviceMemory`.

Quando degrada:

| Camada | Fallback |
|---|---|
| Hero | Poster + os 4 textos empilhados, legíveis; seção vira 1 viewport |
| Câmera da produtora | O mesmo GLB estático, sem idle, scroll ou ponteiro |
| Cases | Rolagem horizontal nativa com snap, sem mapeamento vertical |
| Reveals | Estado final, sem animação |

## Limpeza

- `useGSAP` com `scope` reverte tudo o que criou no unmount.
- `useScrollVideo` mata seu trigger e remove seu callback do ticker.
- `CinematicCamera` usa `useGSAP` com `scope` e desconecta o observer no
  unmount; o Canvas desmonta seu loop e recursos WebGL junto com a seção.
- `MobileMenu` restaura `body.overflow` e devolve o foco ao botão que o abriu.
- `CaseMedia` pausa e descarta o vídeo ao sair o ponteiro.

## Formulário — ponto de integração

`src/lib/lead/submit.ts` está **deliberadamente desconectado**. Sem endpoint
confirmado, nada sai do navegador e a UI diz que a mensagem foi *montada*, não
enviada. Para ligar de verdade: defina `NEXT_PUBLIC_LEAD_ENDPOINT` — o `POST`
com o payload já está escrito. Nada mais muda.

## Comandos

```bash
pnpm dev          # desenvolvimento
pnpm build        # build de produção
pnpm start        # servir o build
pnpm lint         # eslint
pnpm typecheck    # tsc --noEmit
pnpm test         # vitest
pnpm media:hero   # reencodar o hero (passe o master como argumento)
```
