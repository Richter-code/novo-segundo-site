# AgroAI — scaffold Next.js

Projeto inicial com Next.js (App Router), TypeScript, Tailwind CSS, suporte a dark mode, Framer Motion e integração com OpenAI para um Assistente Virtual.

Principais comandos:

```bash
npm install
npm run dev
``` 

Variáveis de ambiente:

- OPENAI_API_KEY — chave da OpenAI para o endpoint do Assistente (opcional)

Estrutura:

- `app/` — páginas (Home, About, Services, Blog, Contact, Assistant)
- `components/` — componentes reutilizáveis (Navbar, Footer, Hero, Button, Card, ThemeProvider, AssistantChat)

Observações:

- Este é um scaffold inicial. Instale dependências adicionais listadas em `package.json` e configure a chave OPENAI_API_KEY para testar a página do Assistente.
# Novo Segundo Site

Scaffold de projeto Next.js (App Router) + TypeScript com Tailwind, shadcn/ui, Zod, react-hook-form, Prisma (Postgres), NextAuth, ESLint, Prettier, Husky, lint-staged e Commitlint.

Passos rápidos para começar:

1. Instalar dependências

```bash
cd "./"
npm install
```

2. Copiar o arquivo de ambiente

```bash
cp .env.example .env
# Preencha as variáveis em .env
```

3. Preparar o Husky (após npm install)

```bash
npm run prepare
```

4. Rodar migrações e seed (se quiser)

```bash
npx prisma migrate dev --name init
npm run prisma:seed
```

5. Rodar em desenvolvimento

```bash
npm run dev
```

6. Deploy

Use o Vercel (recomendado). Configure as variáveis de ambiente no painel do Vercel a partir de `.env`.

Arquivos importantes:
- `prisma/schema.prisma` — schema inicial
- `app/` — rota App Router do Next.js
- `components/ContactForm.tsx` — exemplo com react-hook-form + zod
- `.env.example` — variáveis de ambiente necessárias
Se quiser, posso executar `npm install` e configurar as integrações que exigem CLI (por exemplo, `npx shadcn-ui init`) — já inicializei o shadcn para você.

Extras e comandos úteis

- Iniciar Postgres via Docker Compose (padrão do projeto):

```bash
docker compose up -d db
```

- Rodar migrações (após configurar `DATABASE_URL` no `.env`):

```bash
npx prisma migrate dev --name init
npm run prisma:seed
```

- Preparar Husky (hooks):

```bash
npm run prepare
```

- Testes unitários e E2E:

```bash
npm run test     # vitest
npm run test:e2e # playwright
```

- Deploy no Vercel: configure as variáveis de ambiente do `.env` no painel do Vercel e faça deploy.

Dependências / integrações adicionadas/confirmadas neste repo:

- Next.js, TypeScript, React 19
- Tailwind CSS + @tailwindcss/forms
- shadcn/ui (inicializado)
- Prisma (SQLite local / Postgres para produção)
- NextAuth + @auth/prisma-adapter
- bcrypt / bcryptjs
- React Hook Form + Zod
- Vercel Blob + AWS S3 (SDK) placeholders
- Resend (email)
- ESLint, Prettier, Husky, lint-staged, Commitlint
- Vitest, Playwright

Se quiser que eu ajuste versões (por exemplo forçar React 18 para compatibilidade com algumas libs), ou que eu execute as migrações e o seed agora, me diga qual banco deseja usar (Postgres via Docker ou SQLite local).