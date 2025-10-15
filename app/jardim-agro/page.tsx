import { prisma } from '@/lib/prisma';
import { Prisma } from '@prisma/client';
import CatalogClient from '@/components/catalog/CatalogClient';

export const metadata = { title: 'Jardim / Agro — Agro Mané' };
export const dynamic = 'force-dynamic';

export default async function JardimAgroPage() {
  const where: Prisma.ProductWhereInput = {
    OR: [
      { category: { name: { contains: 'Jardim' } } },
      { category: { name: { contains: 'Agro' } } },
    ],
  };
  const pageSize = 12;
  try {
    const [products, total, categories, brands] = await Promise.all([
      prisma.product.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        take: pageSize,
        skip: 0,
        include: { brand: true },
      }),
      prisma.product.count({ where }),
      prisma.category.findMany({
        select: { id: true, name: true },
        orderBy: { name: 'asc' },
      }),
      prisma.brand.findMany({
        select: { id: true, name: true },
        orderBy: { name: 'asc' },
      }),
    ]);

    const mapped = products.map((p) => ({
      id: p.id,
      name: p.name,
      price: Number(p.price),
      imageUrl: p.imageUrl,
      brand: p.brand ? { name: p.brand.name } : null,
      avgRating: 0,
    }));

    return (
      <CatalogClient
        title="Jardim e Agro"
        subtitle="Sementes, adubos, ferramentas e defensivos (com orientação)."
        initialProducts={mapped}
        categories={categories}
        brands={brands}
        initialTotal={total}
        initialFilters={{
          priceMin: 0,
          priceMax: 1000,
          categoryIds: [],
          brandIds: [],
          sort: 'newest',
        }}
      />
    );
  } catch (error) {
    console.error('Erro em /jardim-agro:', error);
    return (
      <CatalogClient
        title="Jardim e Agro"
        subtitle="Sementes, adubos, ferramentas e defensivos (com orientação)."
        initialProducts={[]}
        categories={[]}
        brands={[]}
        initialTotal={0}
        initialFilters={{
          priceMin: 0,
          priceMax: 1000,
          categoryIds: [],
          brandIds: [],
          sort: 'newest',
        }}
      />
    );
  }
}
