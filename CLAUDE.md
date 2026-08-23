# CLAUDE.md

Site da **FULL Agência**. Next.js 16 (App Router) · React 19 · TS strict ·
Tailwind v4 · GSAP · React Three Fiber. Package manager: **pnpm**.

## Leia primeiro

| Se você vai mexer em… | Leia |
|---|---|
| qualquer coisa | [`CONTEXT.md`](CONTEXT.md) |
| estrutura, stack, carregamento | [`docs/architecture.md`](docs/architecture.md) |
| cor, tipo, espaçamento, motion | [`docs/design-system.md`](docs/design-system.md) |
| o hero em vídeo | [`docs/storyboard.md`](docs/storyboard.md) |
| a câmera da produtora | [`docs/skills.md`](docs/skills.md) |
| **texto de qualquer tipo** | [`docs/content-confirmation.md`](docs/content-confirmation.md) |

## Comandos

```bash
pnpm dev
pnpm lint && pnpm typecheck && pnpm test && pnpm build
```

## Regras deste repositório

1. **Não invente informação comercial.** Sem clientes, prêmios, números,
   resultados, depoimentos ou serviços que não estejam confirmados. Dado que
   falta vira `CONFIRMAR` em `src/content/` e renderiza por `PendingValue`.
2. **Texto mora em `src/content/`**, nunca em JSX.
3. **Cor, tamanho e duração moram em `@theme`** (`src/styles/globals.css`).
   Nada de valor mágico em componente.
4. **A palavra cursiva tem de ser sufixo do título** — ver `splitScriptWord`.
5. **Toda camada cinemática precisa de fallback**: reduced motion e hardware
   fraco recebem a mesma mensagem, sem movimento. `useDeviceProfile` decide.
6. **TypeScript fixado em 6 e ESLint em 9** de propósito — ver
   `docs/architecture.md`.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
