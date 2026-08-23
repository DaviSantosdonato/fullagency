# Agent Skills — inventário e uso

Registro honesto de quais skills instaladas foram usadas neste projeto, quais
foram avaliadas e descartadas, e o que **não existia** nesta máquina.

## Onde procurei

```
C:\Users\User\.claude\skills\          # skills locais + symlinks para .agents/skills
C:\Users\User\.agents\skills\          # bundle Higgsfield
C:\Users\User\.claude\plugins\cache\        # plugins instalados (mattpocock-skills 1.2.3 etc.)
C:\Users\User\.claude\plugins\marketplaces\ # catálogo oficial
```

## Usadas

| Skill | Onde entrou |
|---|---|
| `frontend-design` | Direção de arte: decisão de usar o violeta da marca como fonte de luz cirúrgica em vez de gradiente, sistema tipográfico de duas personalidades, composições assimétricas. |
| `ui-ux-pro-max` | Referência para escala tipográfica fluida, hierarquia e regras de espaçamento que viraram os tokens em `src/styles/globals.css`. |
| `webapp-testing` | Toda a verificação em navegador. Playwright dirigido por scripts próprios: 63 screenshots (9 páginas × 7 viewports), detector de overflow horizontal, contagem de `<h1>`, landmarks, imagens quebradas, vazamento de `[CONFIRMAR]`, erros de console, scrub do hero nos dois sentidos, teclado, reduced motion e formulário. |
| `mattpocock-skills:code-review` | Revisão final do diff antes da entrega. |

## Avaliadas e não usadas — com o motivo

| Skill | Por que não |
|---|---|
| `brand-guidelines` | Aplica a identidade da **Anthropic**. Este projeto tem identidade própria (violeta `#A400FF` + raio), extraída dos materiais reais da FULL. Usar seria sobrescrever a marca do cliente. |
| `theme-factory` | Temas pré-definidos. O briefing pede direção autoral; um tema de prateleira é exatamente o "cara de template" que ele proíbe. |
| `algorithmic-art` / `canvas-design` | A câmera pedia geometria navegável; arte em p5.js ou uma prancha PDF continuaria plana. |
| `imagegen` | Foi usado numa tentativa intermediária de recorte fotorealista. A imagem foi rejeitada por continuar plana e saiu do projeto quando o GLB foi aprovado. |
| `higgsfield-generate` | Foi usado numa tentativa intermediária de reconstruir a referência como GLB. O resultado também foi rejeitado e substituído pelo modelo Sony fornecido pelo usuário. |
| `web-artifacts-builder` | Para artefatos HTML na claude.ai. Isto é um app Next.js num repositório. |
| `implement-spec`, `/to-spec`, `/to-tickets` | O briefing já era a especificação — detalhado, com critérios de aceitação. Converter para spec e depois para tickets seria reescrever o que já estava escrito, gastando contexto sem alterar o resultado. |
| `git-guardrails-claude-code`, `setup-pre-commit` | Adicionam hooks ao repositório do usuário. Não foram pedidos e mudariam o fluxo de trabalho de quem herdar o projeto. Fáceis de rodar depois se a FULL quiser. |
| `setup-ts-deep-modules` | O princípio (módulos profundos, API pequena) foi aplicado à mão — `useScrollVideo`, `lead/schema.ts` e `splitScriptWord.ts`. A skill instala uma estrutura de pastas que não combina com o App Router. |
| `mattpocock-skills:tdd` | Usado o espírito, não o ritual: validação do formulário e utilitários puros foram escritos com testes. Rodar o loop formal em componentes de motion não paga. |
| `mattpocock-skills:diagnosing-bugs` | Os bugs encontrados (clipping da fonte cursiva, sentinela do header, overflow do grid) foram diagnosticados direto no navegador em segundos. |
| `mattpocock-skills:prototype`, `research` | Sem pergunta de design em aberto que justificasse um protótipo descartável ou uma rodada de pesquisa. |
| `loop-me`, `claude-handoff` | Não aplicáveis a uma entrega única. |
| Outras skills Higgsfield (`brandkit`, `websites`, …) | O trabalho exigia apenas geração de asset 3D. Marca e hospedagem continuam fora do escopo. |
| `migrate-to-shoehorn`, `scaffold-exercises` | Sem relação com o projeto. |

## `/setup-matt-pocock-skills`

Não foi executado: a biblioteca **já está instalada** como plugin
(`plugins/cache/claude-plugins-official/mattpocock-skills/1.2.3`) e disponível
como `mattpocock-skills:*`. Rodar o setup de novo seria redundante.

---

## Por que a solução 3D mudou

A primeira versão do núcleo criativo construía uma lente procedural em
Three.js. Tecnicamente funcionava, mas a silhueta não comunicava uma câmera de
verdade. Uma segunda tentativa usou um PNG fotorealista, porém o parallax apenas
inclinava um plano e não criava volume convincente.

A solução final veio do arquivo `sony-camera-4k.zip` fornecido pelo usuário. O
GLB Sony foi mantido como geometria real e suas texturas foram reduzidas de 4K
para 2K antes de ser empacotado em
[`public/media/models/sony-alpha-camera.glb`](../public/media/models/sony-alpha-camera.glb).
O resultado conserva os 31.776 triângulos e o material PBR, mas cai de 21,1 MB
para 6,92 MB. O scroll muda a orientação real da geometria e a luz violeta se
desloca sobre o relevo da câmera.

O GLB só carrega perto da seção. Em reduced motion ou hardware fraco ele continua
3D, mas usa `frameloop="demand"` e fica parado. O poster do próprio modelo cobre
apenas o intervalo de download e decodificação.
