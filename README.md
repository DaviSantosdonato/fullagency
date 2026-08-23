# FULL Agência

Site da FULL — agência de marketing com produtora de vídeo própria.

**"Da ideia ao frame."** Uma abertura cinematográfica controlada pelo scroll,
uma DSLR 3D que reage ao scroll e ao cursor, e tipografia com uma segunda voz
em Shrikhand.

## Rodar

Requer **Node 20+** e **pnpm**.

```bash
pnpm install
pnpm dev
```

http://localhost:3000

## Comandos

```bash
pnpm dev          # desenvolvimento (Turbopack)
pnpm build        # build de produção
pnpm start        # servir o build
pnpm lint         # eslint
pnpm typecheck    # tsc --noEmit
pnpm test         # vitest
pnpm media:hero   # reencodar o vídeo do hero
```

## Documentação

Comece por [`CONTEXT.md`](CONTEXT.md). Depois:

- [`docs/architecture.md`](docs/architecture.md) — stack e estrutura
- [`docs/design-system.md`](docs/design-system.md) — tokens e tipografia
- [`docs/storyboard.md`](docs/storyboard.md) — o hero em vídeo
- [`docs/skills.md`](docs/skills.md) — skills usadas e decisões de mídia
- **[`docs/content-confirmation.md`](docs/content-confirmation.md) — o que a FULL precisa confirmar antes de publicar**

---

## Trocar os materiais

### Vídeo do hero

O corte atual tem **15,08 s**. Os capítulos são definidos em frações
normalizadas, então **qualquer duração funciona sem alterar código**.

```bash
node scripts/encode-hero.mjs caminho/para/o-novo-corte.mp4
```

Isso escreve em `public/media/hero/`:

| Arquivo | O que é |
|---|---|
| `full-camera-flow.mp4` | Desktop — H.264, CRF 21, keyframe a cada 0,25 s, faststart, sem áudio |
| `full-camera-flow-mobile.mp4` | 640 px de largura, CRF 26 |
| `full-camera-flow.webm` | VP9 |
| `full-camera-poster.webp` / `.jpg` | Primeiro frame |

Não substitua os arquivos à mão: o scrub depende de keyframes densos (`-g 6`) e
de `+faststart`. Um MP4 comum trava ao ser buscado. Ver
[`docs/storyboard.md`](docs/storyboard.md#codecs).

Se o novo corte tiver uma narrativa diferente, ajuste as faixas em
[`src/content/hero.ts`](src/content/hero.ts) — os testes garantem que a linha do
tempo cobre 0–1 sem buracos.

### Câmera da produtora

A câmera usada no núcleo criativo é o modelo Sony fornecido pela FULL:
[`public/media/models/sony-alpha-camera.glb`](public/media/models/sony-alpha-camera.glb).
Tem aproximadamente 32 mil triângulos e material PBR. As texturas originais 4K
foram reduzidas para 2K, baixando o GLB de 21,1 MB para 6,9 MB sem alterar a
geometria. A cena, iluminação e rotação ficam em
[`src/components/production/CameraCanvas.tsx`](src/components/production/CameraCanvas.tsx).

O WebGL só é carregado quando a seção está próxima do viewport. Enquanto o GLB
é decodificado, o site mostra um poster do próprio modelo em
[`public/media/brand/sony-camera-poster.png`](public/media/brand/sony-camera-poster.png).
Reduced motion e hardware fraco mantêm o modelo 3D, mas removem scroll, idle e
interação.

O GLB preserva os metadados de origem do arquivo fornecido: “Sony Alpha 3”, de
Khem Jay, sob a licença Sketchfab Standard.

### Logo, fotos e cases

| Caminho | Conteúdo atual | Substituir por |
|---|---|---|
| `public/media/brand/full-logo.png` | 1673×473, do site oficial | SVG vetorial |
| `public/media/brand/full-studio.jpg` | 1920×1280 | Original em alta |
| `public/media/team/*.jpg` | 533×800 | Originais em alta |
| `public/media/cases/*.jpg` | 500×963, capturas de feed | Peças em alta |

Ao trocar dimensões, atualize `width`/`height` em `src/content/*.ts` — os testes
verificam que toda mídia tem dimensões e `alt`.

### Ligar o formulário

```bash
# .env.local
NEXT_PUBLIC_LEAD_ENDPOINT=https://…
```

Sem isso o formulário **não envia nada** e diz isso ao visitante, em vez de
fingir sucesso e perder contatos reais. O `POST` já monta
`{ name, company, whatsapp, email, projectType, message }`.

---

## Estado

| Verificação | Resultado |
|---|---|
| `pnpm lint` | limpo |
| `pnpm typecheck` | limpo |
| `pnpm build` | 17 páginas estáticas |
| `pnpm test` | 41 testes, 2 arquivos |
| Navegador | câmera verificada em `/` e `/produtora`, 1440×900 e 390×844 — **0 erros, 0 overflow horizontal** |
| Hero | scrub verificado nos dois sentidos, 0 → 15,082 s e de volta a 0 |
| Teclado | ordem de tab correta em todas as rotas, foco visível em todo controle |
| Reduced motion | narrativa completa, sem movimento |

Pendências reais estão em
[`docs/content-confirmation.md`](docs/content-confirmation.md) — todas de
conteúdo, nenhuma de código.
