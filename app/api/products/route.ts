import { prisma } from '../../../lib/prisma';
import { NextRequest, NextResponse } from 'next/server';
import { Prisma } from '@prisma/client';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    // Extrai e converte parâmetros de query
    const page = Math.max(1, parseInt(searchParams.get('page') || '1', 10));
    const pageSize = Math.min(
      24,
      Math.max(1, parseInt(searchParams.get('pageSize') || '12', 10)),
    );
    const priceMin = parseFloat(searchParams.get('price_min') || '0');
    const priceMax = parseFloat(searchParams.get('price_max') || '999999');
    const sortParam = searchParams.get('sort') || 'newest';
    const categoryIds = searchParams.getAll('category').filter(Boolean);
    const brandIds = searchParams.getAll('brand').filter(Boolean);

    // Monta objeto de filtro para Prisma
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

    // Monta critério de ordenação para Prisma
    let orderBy: Prisma.ProductOrderByWithRelationInput = { createdAt: 'desc' };

    switch (sortParam) {
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
      case 'newest':
      default:
        orderBy = { createdAt: 'desc' };
        break;
    }

    // Paginação: define quantidade e offset
    const skip = (page - 1) * pageSize;

    // Consulta ao banco via Prisma com reviews incluídas
    const [products, total] = await Promise.all([
      prisma.product.findMany({
        skip,
        take: pageSize,
        where,
        orderBy,
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
    ]);

    // Calcula avgRating para cada produto
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
        category: prod.category,
        avgRating: Number(avgRating.toFixed(1)),
      };
    });

    return NextResponse.json({
      products: productsWithRating,
      total,
      page,
      pageSize,
      totalPages: Math.ceil(total / pageSize),
    });
  } catch (error) {
    console.error('Erro ao buscar produtos:', error);
    return NextResponse.json(
      { error: 'Erro ao buscar produtos' },
      { status: 500 },
    );
  }
}
