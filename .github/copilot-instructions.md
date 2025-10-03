# Instruções rápidas para agentes de IA

Arquivo criado/atualizado para orientar agentes de codificação que trabalham neste repositório Next.js + TypeScript.

Resumo (1 linha): Next.js (App Router) + TypeScript, Tailwind, Prisma (SQLite local ok), NextAuth e integração com OpenAI para um Assistente.

Pontos essenciais que um agente precisa saber

- Estrutura principal
  - `app/` — rotas do App Router (p.ex. `app/assistant`, `app/blog`, `app/api/*`). Páginas são `page.tsx`; APIs serverless usam `route.ts`.
  - `components/` — componentes React reutilizáveis (ex.: `AssistantChat.tsx`, `AssistantClient.tsx`, `ContactForm.tsx`, `Navbar.tsx`).
  - `content/posts/` — posts em MDX (`.mdx`) consumidos por `lib/mdx.ts`.
  - `lib/` — helpers: `prisma.ts`, `auth.ts`, `mdx.ts`, `utils.ts`.
  - `prisma/` — `schema.prisma`, `seed.ts`, banco local `prisma/dev.db`.
  - `styles/` — `globals.css`, Tailwind config `tailwind.config.cjs`.

- Comandos e workflows úteis
  - Instalar: `npm install`
  - Preparar Husky: `npm run prepare`
  - Desenvolver: `npm run dev` (inicia `next dev`)
  - Health check local: `npm run health` (curl em `/api/health`)
  - Migrações Prisma: `npx prisma migrate dev --name init`
  - Seed Prisma: `npm run prisma:seed` (usa `ts-node --transpile-only prisma/seed.ts`)
  - Banco via Docker (opcional): `docker compose up -d db`
  - Testes: `npm run test` (vitest), `npm run test:e2e` (playwright)

- Variáveis de ambiente importantes
  - `OPENAI_API_KEY` — usado por endpoints do Assistente (ex.: `app/api/assistant/*`).
  - `DATABASE_URL` — Prisma (p.ex. `file:./prisma/dev.db` para SQLite local).
  - `NEXTAUTH_SECRET`, `NEXTAUTH_URL` — para NextAuth.
  - Outras chaves: `RESEND_API_KEY`, credenciais S3/AWS se o projeto usar upload/armazenamento.

- Padrões concretos observados neste repositório
  - API de streaming: existe implementação em `app/api/assistant/stream/route.ts`; use esse padrão para respostas em stream (readable streams / SSE).
  - Páginas: crie `app/<route>/page.tsx` com export default React component e, se necessário, `route.ts` para métodos POST/GET server-side.
  - MDX: adicione posts em `content/posts/*.mdx`. `lib/mdx.ts` contém utilitários para ler frontmatter e renderizar MDX.
  - Prisma: `prisma/dev.db` existe para desenvolvimento rápido; altere `DATABASE_URL` se quiser usar Postgres (há exemplos no `README.md`).
  - Estilização: Tailwind + `styles/globals.css`. Evite CSS global pesado — prefira classes utilitárias.

- Arquivos que vale inspecionar antes de mudanças relevantes
  - `package.json` — scripts e dependências (vitest, playwright, prisma, husky).
  - `prisma/schema.prisma`, `prisma/seed.ts` — alterações de DB e seed.
  - `app/layout.tsx`, `app/page.tsx` — layout global e ponto de entrada.
  - `components/AssistantChat.tsx`, `components/AssistantClient.tsx` — referência para integração OpenAI / UI.
  - `app/api/assistant/route.ts` e `app/api/assistant/stream/route.ts` — endpoints do assistente.

Boas práticas específicas (não genéricas)

- Commits: siga mensagens curtas e descritivas. O repositório usa Commitlint + Husky; rode `npm run prepare` após instalar.
- Não exfiltrar segredos: nunca commitar `OPENAI_API_KEY`, `NEXTAUTH_SECRET` ou `DATABASE_URL` com credenciais reais.
- PRs pequenos: alterações em `prisma/schema.prisma` devem vir com migrações e um plano de seed/testes.
- Para endpoints que fazem streaming, copie o padrão de `app/api/assistant/stream/route.ts` (manuseio de ReadableStream e resposta chunked).

Exemplos rápidos

- Criar rota API simples (modelo):
  - arquivo: `app/api/hello/route.ts`
  - conteúdo mínimo (serverless): exporte `GET` ou `POST` que retornem `new Response(JSON.stringify({ ok: true }))`.

- Criar post MDX:
  - adicione `content/posts/meu-post.mdx` com frontmatter YAML
  - garantir que `lib/mdx.ts` consegue ler o arquivo (padrão já implementado)

Questões abertas / onde pedir ao humano

- Se o deploy deve usar Postgres ou SQLite em produção — tomar decisão antes de alterar `schema.prisma`.
- Se quiser que eu gere PR template, workflow de CI ou exemplos de testes (unit/e2e), diga qual prefere.

Se quiser atualização/adição: posso incluir exemplos de PR, tests unitários mínimos, ou um template de endpoint stream.
