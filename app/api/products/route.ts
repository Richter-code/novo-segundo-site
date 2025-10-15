import { prisma } from '../../../lib/prisma';
import { NextRequest, NextResponse } from 'next/server';
import { Prisma } from '@prisma/client';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);

  const page = Math.max(1, parseInt(searchParams.get('page') || '1'));
  const pageSize = Math.min(
    100,
    Math.max(1, parseInt(searchParams.get('pageSize') || '24')),
  );
  const category = searchParams.get('category') || undefined;
  const brand = searchParams.get('brand') || undefined;
  const priceMin = parseFloat(searchParams.get('priceMin') || '0');
  const priceMax = parseFloat(searchParams.get('priceMax') || '999999');
  const sort = searchParams.get('sort') || 'createdAt_desc';

  const where: Prisma.ProductWhereInput = {};
  if (category) {
    where.category = { name: category };
  }
  if (brand) {
    where.brand = { name: brand };
  }
  if (priceMin > 0 || priceMax < 999999) {
    where.price = {};
    if (priceMin > 0) where.price.gte = priceMin;
    if (priceMax < 999999) where.price.lte = priceMax;
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

  try {
    const [total, items] = await Promise.all([
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
    ]);

    return NextResponse.json({
      items: items.map((p) => ({
        id: p.id,
        name: p.name,
        description: p.description,
        price: p.price.toString(),
        imageUrl: p.imageUrl,
        category: p.category.name,
        brand: p.brand?.name || null,
      })),
      total,
      page,
      pageSize,
      totalPages: Math.ceil(total / pageSize),
    });
  } catch (error) {
    console.error('API /products error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch products' },
      { status: 500 },
    );
  }
}
