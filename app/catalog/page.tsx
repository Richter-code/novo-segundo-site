import { prisma } from '@/lib/prisma';
import { Prisma } from '@prisma/client';
import CatalogClient from '@/components/catalog/CatalogClient';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Catálogo de Produtos | Agropecuária do Mané',
  description:
    'Encontre os melhores produtos para seu pet, piscina, jardim e agropecuária. Rações, acessórios, tratamento de água, ferramentas e muito mais.',
  openGraph: {
    title: 'Catálogo de Produtos | Agropecuária do Mané',
    description:
      'Encontre os melhores produtos para seu pet, piscina, jardim e agropecuária.',
    type: 'website',
  },
};

export const dynamic = 'force-dynamic';

interface SearchParams {
  page?: string;
  price_min?: string;
  price_max?: string;
  category?: string | string[];
  brand?: string | string[];
  sort?: string;
}

export default async function CatalogPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const sp = await searchParams;

  // Extrai parâmetros
  const page = Math.max(1, parseInt(sp.page || '1', 10));
  const pageSize = 12;
  const priceMin = parseFloat(sp.price_min || '0');
  const priceMax = parseFloat(sp.price_max || '1000');
  const sort = sp.sort || 'newest';

  const categoryIds = Array.isArray(sp.category)
    ? sp.category
    : sp.category
    ? [sp.category]
    : [];
  const brandIds = Array.isArray(sp.brand)
    ? sp.brand
    : sp.brand
    ? [sp.brand]
    : [];

  // Monta filtro Prisma
  const where: Prisma.ProductWhereInput = {
    price: {
      gte: priceMin,
      lte: priceMax,
    },
  };

  if (categoryIds.length > 0) {
    where.categoryId = { in: categoryIds };
  }

  if (brandIds.length > 0) {
    where.brandId = { in: brandIds };
  }

  // Monta ordenação
  let orderBy: Prisma.ProductOrderByWithRelationInput = { createdAt: 'desc' };

  switch (sort) {
    case 'priceAsc':
      orderBy = { price: 'asc' };
      break;
    case 'priceDesc':
      orderBy = { price: 'desc' };
      break;
    case 'nameAsc':
      orderBy = { name: 'asc' };
      break;
    case 'nameDesc':
      orderBy = { name: 'desc' };
      break;
  }

  try {
    // Busca dados em paralelo
    const [products, total, categories, brands] = await Promise.all([
      prisma.product.findMany({
        where,
        orderBy,
        take: pageSize,
        skip: (page - 1) * pageSize,
        include: {
          brand: {
            select: {
              id: true,
              name: true,
            },
          },
          category: {
            select: {
              id: true,
              name: true,
            },
          },
          reviews: {
            select: {
              rating: true,
            },
          },
        },
      }),
      prisma.product.count({ where }),
      prisma.category.findMany({
        select: {
          id: true,
          name: true,
        },
        orderBy: { name: 'asc' },
      }),
      prisma.brand.findMany({
        select: {
          id: true,
          name: true,
        },
        orderBy: { name: 'asc' },
      }),
    ]);

    // Calcula avaliação média
    const productsWithRating = products.map((prod) => {
      const avgRating =
        prod.reviews.length > 0
          ? prod.reviews.reduce((sum, r) => sum + r.rating, 0) /
            prod.reviews.length
          : 0;

      return {
        id: prod.id,
        name: prod.name,
        price: Number(prod.price),
        imageUrl: prod.imageUrl,
        brand: prod.brand,
        avgRating: Number(avgRating.toFixed(1)),
      };
    });

    return (
      <CatalogClient
        initialProducts={productsWithRating}
        categories={categories}
        brands={brands}
        initialTotal={total}
        initialFilters={{
          priceMin,
          priceMax,
          categoryIds,
          brandIds,
          sort,
        }}
      />
    );
  } catch (error) {
    console.error('Erro ao carregar catálogo:', error);
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold">Erro ao carregar produtos</h1>
        <p className="text-muted-foreground mt-2">
          Ocorreu um erro ao buscar os produtos. Tente novamente mais tarde.
        </p>
      </div>
    );
  }
}
