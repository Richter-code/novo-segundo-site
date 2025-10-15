import { prisma } from '@/lib/prisma';
import { Prisma } from '@prisma/client';
import CatalogClient from '@/components/catalog/CatalogClient';

export const metadata = { title: 'Piscina — Agro Mané' };
export const dynamic = 'force-dynamic';

export default async function PiscinaPage() {
  const where: Prisma.ProductWhereInput = {
    category: { name: { contains: 'Piscina' } },
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
        title="Piscina"
        subtitle="Cloro, algicidas, filtros e bombas. Tudo para tratamento de água."
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
    console.error('Erro em /piscina:', error);
    return (
      <CatalogClient
        title="Piscina"
        subtitle="Cloro, algicidas, filtros e bombas. Tudo para tratamento de água."
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
