# Página /pets - Documentação

## Visão Geral

Implementação da página `/pets` (PET Cães e Gatos) com scraping ético de dados da Agroline, filtros avançados, ordenação e paginação.

## Stack Técnica

- **Framework**: Next.js 15 (App Router)
- **Linguagem**: TypeScript
- **Estilização**: Tailwind CSS + shadcn/ui
- **Banco de Dados**: Prisma + SQLite (dev)
- **Scraping**: Cheerio + Undici (fetch nativo)
- **Validação**: Zod

## Estrutura de Arquivos

```
app/
  pets/
    page.tsx              # Página principal /pets com grid de produtos
  api/
    products/
      route.ts            # API endpoint com filtros e paginação

components/
  pet/
    FilterSidebar.tsx     # Sidebar com filtros (categoria, marca, preço)
    ProductCard.tsx       # Card de produto com imagem, nome, marca, preço

scripts/
  scrapeAgrolinePets.ts   # Script de scraping ético com verificação robots.txt

lib/
  http.ts                 # Utilitário fetch com user-agent e timeout
  parseCurrencyBRL.ts     # Parser de moeda brasileira (R$ 12,66 → 12.66)
  site.ts                 # Configuração de contatos e redes sociais

prisma/
  schema.prisma           # Schema com modelos Product, Category, Brand
  migrations/             # Migrations do Prisma
```

## Modelos Prisma

### Brand

```prisma
model Brand {
  id        String    @id @default(cuid())
  name      String
  products  Product[]
  createdAt DateTime  @default(now())
}
```

### Product (atualizado)

```prisma
model Product {
  id          String    @id @default(cuid())
  name        String
  description String
  price       Decimal
  imageUrl    String
  category    Category  @relation(fields: [categoryId], references: [id])
  categoryId  String
  brand       Brand?    @relation(fields: [brandId], references: [id])
  brandId     String?
  createdAt   DateTime  @default(now())
}
```

## Como Usar

### 1. Executar Migração

```bash
npx prisma migrate dev
```

### 2. Executar Scraper (Agroline)

O scraper verifica automaticamente o `robots.txt` antes de fazer qualquer requisição:

```bash
pnpm scrape:agroline:pets
```

**Importante**:

- Respeita robots.txt da Agroline
- Faz apenas 1 requisição HTTP (não crawl)
- Salva apenas URLs de imagens (não baixa arquivos)
- User-agent identificado: `AgroMane-Bot/1.0`
- Timeout de 10s por requisição

### 3. Executar Seed (Dados Mock)

Se o scraping não for permitido ou falhar, use dados mock:

```bash
pnpm prisma:seed
```

### 4. Executar Aplicação

```bash
pnpm dev
```

Acesse: `http://localhost:3000/pets`

## API Endpoint

### GET /api/products

**Query Parameters**:

| Parâmetro | Tipo   | Descrição                | Exemplo           |
| --------- | ------ | ------------------------ | ----------------- |
| page      | number | Página atual (min: 1)    | `?page=2`         |
| pageSize  | number | Itens por página (1-100) | `?pageSize=24`    |
| category  | string | Filtrar por categoria    | `?category=Pet`   |
| brand     | string | Filtrar por marca        | `?brand=Royal`    |
| priceMin  | number | Preço mínimo             | `?priceMin=50`    |
| priceMax  | number | Preço máximo             | `?priceMax=200`   |
| sort      | string | Ordenação (veja abaixo)  | `?sort=price_asc` |

**Valores de Sort**:

- `newest` - Mais recentes (padrão)
- `price_asc` - Menor preço
- `price_desc` - Maior preço
- `name_asc` - Nome A-Z
- `name_desc` - Nome Z-A

**Resposta**:

```json
{
  "items": [
    {
      "id": "clx...",
      "name": "Ração Premium Cães Adultos",
      "description": "Alimento completo e balanceado",
      "price": 189.9,
      "imageUrl": "https://...",
      "category": { "id": "...", "name": "Pet" },
      "brand": { "id": "...", "name": "Royal Canin" }
    }
  ],
  "total": 120,
  "page": 1,
  "pageSize": 24
}
```

## Funcionalidades da Página /pets

### Filtros (Sidebar)

1. **Categoria**: Select com todas as categorias disponíveis
2. **Marca**: Select com todas as marcas cadastradas
3. **Faixa de Preço**: Campos de input para valor mínimo e máximo
4. **Limpar Filtros**: Botão para resetar todos os filtros

### Ordenação

Dropdown no topo da lista com opções:

- Mais recentes
- Menor preço
- Maior preço
- Nome A-Z
- Nome Z-A

### Paginação

- Navegação por páginas (Anterior/Próxima)
- Indicador de página atual
- Preserva filtros e ordenação ao navegar

### Grid de Produtos

- Layout responsivo:
  - Mobile: 1 coluna
  - Tablet: 2-3 colunas
  - Desktop: 4 colunas
- Cada card exibe:
  - Imagem do produto
  - Nome
  - Marca
  - Preço formatado (R$)
  - Botão "COMPRAR" (placeholder)

## Compliance e Ética

### Política de Scraping

✅ **O que fazemos**:

- Verificamos robots.txt antes de qualquer requisição
- Fazemos apenas 1 requisição pontual (não crawl massivo)
- Usamos user-agent identificável
- Respeitamos timeout e rate limits
- Salvamos apenas URLs públicas (não baixamos imagens)

❌ **O que NÃO fazemos**:

- Não ignoramos robots.txt
- Não fazemos crawling em massa
- Não baixamos/hospedamos imagens de terceiros
- Não copiamos código/CSS/JS proprietário
- Não usamos dados para fins comerciais sem autorização

### Aviso Legal

Os dados extraídos são **apenas para demonstração e desenvolvimento**. Para uso em produção:

1. Obtenha autorização expressa da Agroline
2. Utilize API oficial se disponível
3. Considere parcerias comerciais
4. Respeite termos de uso e direitos autorais

## Testes

### Verificar Lint e Type-Check

```bash
pnpm lint
pnpm typecheck
```

### Build de Produção

```bash
pnpm build
```

## Melhorias Futuras

- [ ] Testes unitários (Vitest)
- [ ] Testes E2E (Playwright)
- [ ] Cache de produtos (Redis/Memcached)
- [ ] Busca full-text (Algolia/MeiliSearch)
- [ ] Sistema de favoritos
- [ ] Comparação de produtos
- [ ] Reviews e avaliações
- [ ] Carrinho de compras funcional
- [ ] Integração com gateway de pagamento
- [ ] Painel admin para CRUD de produtos

## Suporte

Para dúvidas ou problemas:

1. Verifique esta documentação
2. Consulte o código comentado
3. Abra uma issue no GitHub
4. Entre em contato com o time de desenvolvimento

---

**Última atualização**: 15 de outubro de 2025
**Versão**: 1.0.0
