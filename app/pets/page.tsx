import { prisma } from '../../lib/prisma';
import { Prisma } from '@prisma/client';
import FilterSidebar from '../../components/pet/FilterSidebar';
import ProductCard from '../../components/pet/ProductCard';
import Link from 'next/link';
import Breadcrumbs from '../../components/Breadcrumbs';

export const metadata = {
  title: 'PET Cães e Gatos | Agropecuária do Mané',
  description:
    'Tudo para seu pet: rações, petiscos, brinquedos e acessórios das melhores marcas.',
};

export const dynamic = 'force-dynamic';

interface SearchParams {
  page?: string;
  category?: string;
  brand?: string;
  priceMin?: string;
  priceMax?: string;
  sort?: string;
}

export default async function PetsPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const sp = await searchParams;

  const page = Math.max(1, parseInt(sp?.page || '1'));
  const pageSize = 24;
  const category = sp?.category || undefined;
  const brand = sp?.brand || undefined;
  const priceMin = sp?.priceMin ? parseFloat(sp.priceMin) : undefined;
  const priceMax = sp?.priceMax ? parseFloat(sp.priceMax) : undefined;
  const sort = sp?.sort || 'newest';

  const where: Prisma.ProductWhereInput = {};
  if (category) {
    where.category = { name: { contains: category } };
  }
  if (brand) {
    where.brand = { name: { contains: brand } };
  }
  if (priceMin !== undefined || priceMax !== undefined) {
    where.price = {};
    if (priceMin !== undefined) where.price.gte = priceMin;
    if (priceMax !== undefined) where.price.lte = priceMax;
  }

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
  }

  type ProductWithRelations = Prisma.ProductGetPayload<{
    include: { category: true; brand: true };
  }>;

  let products: ProductWithRelations[] = [];
  let total = 0;
  let categories: string[] = [];
  let brands: string[] = [];

  try {
    const [count, items, allCategories, allBrands] = await Promise.all([
      prisma.product.count({ where }),
      prisma.product.findMany({
        where,
        include: {
          category: true,
          brand: true,
        },
        orderBy,
        take: pageSize,
        skip: (page - 1) * pageSize,
      }),
      prisma.category.findMany({ select: { name: true } }),
      prisma.brand.findMany({ select: { name: true } }),
    ]);

    total = count;
    products = items;
    categories = allCategories.map((c) => c.name);
    brands = allBrands.map((b) => b.name);
  } catch (error) {
    console.error('Error fetching pets products:', error);
  }

  const totalPages = Math.max(1, Math.ceil(total / pageSize));

  return (
    <div className="space-y-6">
      <Breadcrumbs items={[{ label: 'PET Cães e Gatos' }]} />

      <header className="space-y-2">
        <h1 className="text-3xl font-bold">PET Cães e Gatos</h1>
        <p className="text-muted-foreground">
          Encontre tudo para seu pet: rações, petiscos, brinquedos e muito mais.
        </p>
      </header>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Sidebar */}
        <div className="md:w-64 flex-shrink-0">
          <FilterSidebar categories={categories} brands={brands} />
        </div>

        {/* Products Grid */}
        <div className="flex-1 space-y-4">
          {/* Controls */}
          <div className="flex items-center justify-between">
            <div className="text-sm text-muted-foreground">
              {total} produtos encontrados
            </div>
            <div className="flex items-center gap-2">
              <label htmlFor="sort-select" className="text-sm">
                Ordenar:
              </label>
              <form method="get" className="inline">
                <select
                  id="sort-select"
                  name="sort"
                  defaultValue={sort}
                  onChange={(e) => e.currentTarget.form?.submit()}
                  className="px-3 py-2 rounded border text-sm"
                >
                  <option value="newest">Mais recentes</option>
                  <option value="price_asc">Menor preço</option>
                  <option value="price_desc">Maior preço</option>
                  <option value="name_asc">Nome A-Z</option>
                  <option value="name_desc">Nome Z-A</option>
                </select>
              </form>
            </div>
          </div>

          {/* Grid */}
          {products.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              Nenhum produto encontrado com os filtros selecionados.
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {products.map((p) => (
                <ProductCard
                  key={p.id}
                  id={p.id}
                  name={p.name}
                  brand={p.brand?.name}
                  price={p.price.toString()}
                  imageUrl={p.imageUrl}
                />
              ))}
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 pt-6">
              <Link
                href={{
                  pathname: '/pets',
                  query: { ...sp, page: Math.max(1, page - 1) },
                }}
                className={`px-4 py-2 rounded border ${
                  page <= 1
                    ? 'pointer-events-none opacity-50'
                    : 'hover:bg-muted'
                }`}
              >
                Anterior
              </Link>
              <span className="px-4 py-2 text-sm">
                Página {page} de {totalPages}
              </span>
              <Link
                href={{
                  pathname: '/pets',
                  query: { ...sp, page: Math.min(totalPages, page + 1) },
                }}
                className={`px-4 py-2 rounded border ${
                  page >= totalPages
                    ? 'pointer-events-none opacity-50'
                    : 'hover:bg-muted'
                }`}
              >
                Próxima
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
