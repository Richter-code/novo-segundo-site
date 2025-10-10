import { prisma } from '../../lib/prisma';
import { Prisma } from '@prisma/client';
import ProductCard from '../../components/ProductCard';
import Link from 'next/link';

export const metadata = { title: 'Produtos — Agro Mané' };
export const dynamic = 'force-dynamic';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default async function ProductsPage({ searchParams }: any) {
  const q = (
    Array.isArray(searchParams?.q) ? searchParams?.q[0] : searchParams?.q
  )
    ?.toString()
    ?.trim();
  const category = (
    Array.isArray(searchParams?.category)
      ? searchParams?.category[0]
      : searchParams?.category
  )
    ?.toString()
    ?.trim();
  const sort =
    (Array.isArray(searchParams?.sort)
      ? searchParams?.sort[0]
      : searchParams?.sort
    )
      ?.toString()
      ?.trim() || 'newest';
  const page =
    Number(
      (Array.isArray(searchParams?.page)
        ? searchParams?.page[0]
        : searchParams?.page) ?? '1',
    ) || 1;
  const pageSize = 24;

  const categories = await prisma.category.findMany({
    orderBy: { name: 'asc' },
  });
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

  let orderBy: Prisma.ProductOrderByWithRelationInput;
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

  const [total, products] = await Promise.all([
    prisma.product.count({ where }),
    prisma.product.findMany({
      where,
      include: { category: true },
      orderBy,
      take: pageSize,
      skip: Math.max(0, (page - 1) * pageSize),
    }),
  ]);

  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const prevPage = page > 1 ? page - 1 : 1;
  const nextPage = page < totalPages ? page + 1 : totalPages;

  return (
    <div className="space-y-6">
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
            price={p.price.toString()}
            imageUrl={p.imageUrl}
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
