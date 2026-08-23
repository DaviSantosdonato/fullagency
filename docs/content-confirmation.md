# Conteúdo a confirmar

Tudo nesta lista precisa da confirmação da FULL **antes** da publicação oficial.
Nada aqui foi inventado: onde a informação não existia publicamente, o site
mostra um marcador em vez de um dado.

Como encontrar tudo no código:

```bash
grep -rn "CONFIRMAR" src/content
```

Em desenvolvimento, cada valor pendente aparece na tela com borda tracejada
violeta (`PendingValue`). Em produção ele degrada para um texto discreto
("a confirmar") — nunca para um dado falso.

---

## 1. Contatos — bloqueante para o lançamento

O site atual da FULL não publica **nenhum** canal direto: toda conversa passa
pelo formulário. Estes campos estão em `src/content/site.ts`:

| Campo | Onde aparece | Situação |
|---|---|---|
| `contact.whatsapp` | `/contato`, rodapé | **Pendente** |
| `contact.email` | `/contato`, rodapé, política de privacidade | **Pendente** |
| `contact.phone` | reservado | **Pendente** |
| `contact.city` | rodapé | **Pendente** |
| `contact.address` | `/contato`, política de privacidade | **Pendente** |
| `contact.cnpj` | política de privacidade | **Pendente** |

> Indício não confirmado: um dos clientes é `@housefitsinop`, o que sugere
> atuação em Sinop/MT. **Não foi publicado no site** — precisa de confirmação
> antes de virar conteúdo.

## 2. Destino do formulário — bloqueante

`src/lib/lead/submit.ts` está **deliberadamente desconectado**. Sem endpoint
definido, nada sai do navegador e o usuário lê que a mensagem foi *montada*,
não enviada.

Para conectar:

1. Defina `NEXT_PUBLIC_LEAD_ENDPOINT` no `.env.local` (e no host).
2. O `POST` já envia `{ name, company, whatsapp, email, projectType, message }`.
3. Confirme quem recebe: e-mail, CRM, WhatsApp Business API ou planilha.

Enquanto isso, o formulário exibe: *"Integração de envio pendente de definição
pela FULL."*

## 3. Números e estatísticas

O site atual mostra três contadores — **anos de experiência**, **% de produção
própria**, **projetos entregues** — mas eles animam a partir de zero e os
valores-alvo não estão no HTML. **Nenhum foi reproduzido aqui.**

O que o novo site publica, e por quê:

- **"Desde 2018"** — confirmado no texto do site atual.
- **"Anos de estrada"** — *calculado* a partir de 2018 (`yearsActive()`), nunca
  digitado à mão. Como as páginas são estáticas, o valor é fixado no build:
  atualiza sozinho a cada novo deploy, e não no virar do ano. Se a FULL passar
  meses sem republicar, vale um rebuild agendado (ou mover a linha para o
  cliente).
- **"Audiovisual: Próprio"** — afirmação qualitativa, confirmada.
- **Projetos entregues** — **não publicado.** Precisa do número real.

## 4. Cases

`src/content/cases.ts`. Todos os clientes e todas as capturas vieram do site
oficial. O que falta em **todos** eles:

| Campo | Situação |
|---|---|
| `year` | **Pendente** em 8/8 cases |
| `outcome` (resultado) | **Pendente** em 8/8 cases |
| `narrative` (história) | **Pendente** em 7/8 — só a Rodobras tem um parágrafo, escrito a partir da descrição pública |
| `sector` da **Cemais** | **Pendente** — não identificado publicamente |

Clientes citados sem peça publicada, listados **apenas como nome** em
`additionalClients`: Show Safra, Colégio San Petrus, Atacado Beira Rio,
Mult Vale, Levplay.

> A FULL publica um depoimento da **Levplay**. Ele **não foi reproduzido** aqui
> porque um depoimento assinado precisa de autorização explícita de quem
> assinou. Se a FULL confirmar, ele entra em `cases.ts`.

## 5. Serviços

Os seis serviços em `src/content/services.ts` foram derivados do que a FULL já
descreve (diagnóstico, posicionamento, "vídeo, foto, roteiro", execução e
veiculação de campanha, gestão de Instagram, direção de arte). **A nomenclatura
e o escopo precisam de uma passada da equipe** — especialmente:

- "Identidade visual" — inferido do cargo de Diretor de Arte, não de uma página
  de serviço.
- "Presença digital" — nome escolhido aqui; a FULL pode ter outro.
- Listas de entregáveis: plausíveis, não confirmadas.

## 6. Equipe

`src/content/team.ts` — nomes, cargos e fotos vieram do site oficial. Confirmar:

- **Sobrenomes** de Larissa, Davi, Bernardo, Henrique, Thais e Ana Paula (o site
  atual só publica o primeiro nome).
- Grafia de **"Suellen"** — o arquivo de imagem original chama-se `suelen.jpg`,
  mas o texto do site diz "Suellen".
- Grafia de **"Larissa"** — arquivo original `larrisa.jpg`.
- O cargo publicado como **"FILMMARKER"** foi normalizado para **"Filmmaker"**.
  Confirmar se era erro de digitação.

## 7. Textos institucionais

- A frase de fé — *"Cremos em um Deus que estabelece cultura"* — é da própria
  FULL e foi mantida em `/sobre`, praticamente na íntegra. **Confirmar se deve
  permanecer** neste novo site e nesta posição.
- O critério comercial *"fatura acima de R$ 40 mil/mês"* aparece no site atual.
  **Não foi reproduzido** — é uma barreira comercial explícita e a FULL deve
  decidir se ela entra na nova narrativa.
- FAQ: as quatro perguntas do site atual foram identificadas, mas as respostas
  carregam via JavaScript e não puderam ser lidas. **A seção de FAQ não foi
  construída** — se a FULL quiser, precisa fornecer as respostas.

## 8. Mídia

| Asset | Origem | Ação |
|---|---|---|
| `public/media/hero/full-camera-*` | `202608231441.mp4` (15,16 s; master Full HD/60 fps) | Corte escolhido para o scroll e otimizado para desktop e mobile |
| `public/media/clients/*` | Sites e perfis oficiais das nove marcas exibidas | Logos originais usadas na faixa da home; não redesenhar tipografia em CSS |
| `public/media/brand/full-logo.png` | site oficial, 1673×473 | Pedir o vetor (SVG/AI) |
| `public/media/brand/full-studio.jpg` | site oficial, 1920×1280 | Pedir o original em alta |
| `public/media/team/*.jpg` | site oficial, 533×800 | Pedir os originais |
| `public/media/cases/*.jpg` | site oficial, 500×963 | São capturas de feed; ideal substituir por peças em alta |

Não há vídeos de bastidores nem clipes de hover para os cases. `CaseMedia` já
aceita `hoverVideo` — basta fornecer os arquivos.

## 9. Jurídico

`/privacidade` é um **esqueleto**, marcado `noindex`. Descreve corretamente o
que este site faz (só o formulário coleta dados; sem analytics, sem pixels), mas
precisa de revisão jurídica e dos dados do responsável antes de publicar.

---

## Checklist de lançamento

- [ ] WhatsApp, e-mail, endereço e CNPJ preenchidos
- [ ] Endpoint do formulário definido e testado
- [ ] Número de projetos entregues (ou decisão de não publicar)
- [ ] Ano e resultado de pelo menos os 4 cases em destaque
- [ ] Sobrenomes e grafias da equipe conferidos
- [ ] Decisão sobre a frase de fé e sobre o critério de faturamento
- [ ] Depoimento da Levplay autorizado (ou removido do escopo)
- [ ] Política de privacidade revisada juridicamente
- [ ] Logo em vetor e fotos em alta resolução entregues
