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

Se quiser, posso executar `npm install` e configurar as integrações que exigem CLI (por exemplo, `npx shadcn-ui init`) — quer que eu rode a instalação agora?