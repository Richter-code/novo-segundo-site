import { prisma } from '../../lib/prisma';
import { Prisma } from '@prisma/client';
import type { Product } from '@prisma/client';
import ProductCard from '../../components/ProductCard';
import Breadcrumbs from '../../components/Breadcrumbs';
import Link from 'next/link';

export const metadata = { title: 'Produtos — Agro Mané' };
export const dynamic = 'force-dynamic';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default async function ProductsPage({ searchParams }: any) {
  // Next.js may provide async searchParams — await it before using its properties
  const sp = await searchParams;

  const q = (Array.isArray(sp?.q) ? sp?.q[0] : sp?.q)?.toString()?.trim();
  const category = (
    Array.isArray(sp?.category) ? sp?.category[0] : sp?.category
  )
    ?.toString()
    ?.trim();
  const sort =
    (Array.isArray(sp?.sort) ? sp?.sort[0] : sp?.sort)?.toString()?.trim() ||
    'newest';
  const page =
    Number((Array.isArray(sp?.page) ? sp?.page[0] : sp?.page) ?? '1') || 1;
  const pageSize = 24;

  // Construir filtro 'where' dinamicamente
  const where: Prisma.ProductWhereInput = {};
  const and: Prisma.ProductWhereInput[] = [];
  if (q) {
    and.push({
      OR: [{ name: { contains: q } }, { description: { contains: q } }],
    });
  }
  if (category) {
    and.push({ category: { name: { equals: category } } });
  }
  if (and.length) where.AND = and;

  // Order by
  let orderBy: Prisma.ProductOrderByWithRelationInput = { createdAt: 'desc' };
  switch (sort) {
    case 'price_asc':
      orderBy = { price: 'asc' };
      break;
    case 'price_desc':
      orderBy = { price: 'desc' };
      break;
    case 'name_asc':
      orderBy = { name: 'asc' };
      break;
    case 'name_desc':
      orderBy = { name: 'desc' };
      break;
    default:
      orderBy = { createdAt: 'desc' };
  }

  // Resultados com tratamento para falhas de banco/desatualização
  let categories: Array<{ id: string; name: string }> = [];
  let products: Array<Product & { category?: { id: string; name: string } }> =
    [];
  let total = 0;

  try {
    // buscar categorias para o filtro
    categories = await prisma.category.findMany({ orderBy: { name: 'asc' } });

    // contar e buscar produtos paginados
    const [count, rows] = await Promise.all([
      prisma.product.count({ where }),
      prisma.product.findMany({
        where,
        include: { category: true },
        orderBy,
        take: pageSize,
        skip: Math.max(0, (page - 1) * pageSize),
      }),
    ]);

    total = count;
    products = rows;
  } catch (err: unknown) {
    // Banco possivelmente desatualizado ou ausente. Logamos e continuamos com listas vazias.
    // eslint-disable-next-line no-console
    console.error('Prisma query failed on Products page:', err);
    categories = [];
    products = [];
    total = 0;
  }

  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const prevPage = page > 1 ? page - 1 : 1;
  const nextPage = page < totalPages ? page + 1 : totalPages;

  return (
    <div className="space-y-6">
      <Breadcrumbs items={[{ label: 'Produtos' }]} />
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold">Produtos</h2>
          <p className="text-sm text-muted-foreground">
            Selecione uma categoria ou pesquise para encontrar produtos.
          </p>
        </div>
        <form className="flex gap-2 flex-wrap" action="/products" method="get">
          <input
            name="q"
            defaultValue={q}
            placeholder="Buscar produtos"
            aria-label="Buscar produtos"
            className="px-3 py-2 rounded border text-sm min-w-[220px]"
          />
          <select
            name="category"
            defaultValue={category}
            aria-label="Filtrar por categoria"
            className="px-3 py-2 rounded border text-sm"
          >
            <option value="">Todas categorias</option>
            {categories.map((c) => (
              <option key={c.id} value={c.name}>
                {c.name}
              </option>
            ))}
          </select>
          <select
            name="sort"
            defaultValue={sort}
            aria-label="Ordenar"
            className="px-3 py-2 rounded border text-sm"
          >
            <option value="newest">Mais recentes</option>
            <option value="price_asc">Preço: menor para maior</option>
            <option value="price_desc">Preço: maior para menor</option>
            <option value="name_asc">Nome: A-Z</option>
            <option value="name_desc">Nome: Z-A</option>
          </select>
          {/* resetar para página 1 ao submeter */}
          <input type="hidden" name="page" value={1} />
          <button className="px-3 py-2 rounded bg-primary text-primary-foreground text-sm">
            Aplicar
          </button>
        </form>
      </div>

      {products.length === 0 ? (
        <div className="text-sm text-muted-foreground">
          Nenhum produto encontrado. Tente outros termos ou categoria.
        </div>
      ) : null}

      <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((p) => (
          <ProductCard
            key={p.id}
            id={p.id}
            name={p.name}
            description={p.description}
            price={(p.price ?? 0).toString()}
            imageUrl={p.imageUrl ?? ''}
          />
        ))}
      </div>

      <div className="flex items-center justify-between pt-4">
        <Link href="/contact" className="text-sm underline">
          Não encontrou? Fale com a gente
        </Link>

        {/* paginação simples */}
        <div className="flex items-center gap-2 text-sm">
          <span className="text-muted-foreground">
            Página {page} de {totalPages}
          </span>
          <div className="flex gap-2">
            <Link
              href={{
                pathname: '/products',
                query: { q, category, sort, page: prevPage },
              }}
              className={`px-3 py-2 rounded border ${
                page <= 1 ? 'pointer-events-none opacity-50' : ''
              }`}
              aria-disabled={page <= 1}
            >
              Anterior
            </Link>
            <Link
              href={{
                pathname: '/products',
                query: { q, category, sort, page: nextPage },
              }}
              className={`px-3 py-2 rounded border ${
                page >= totalPages ? 'pointer-events-none opacity-50' : ''
              }`}
              aria-disabled={page >= totalPages}
            >
              Próxima
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
