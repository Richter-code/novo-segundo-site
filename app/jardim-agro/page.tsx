import Breadcrumbs from '../../components/Breadcrumbs';
import ProductCard from '../../components/ProductCard';
import { prisma } from '../../lib/prisma';
import type { Product } from '@prisma/client';
import Link from 'next/link';

export const metadata = { title: 'Jardim / Agro — Agro Mané' };
export const dynamic = 'force-dynamic';

export default async function JardimAgroPage() {
  let products: Array<Product> = [];
  try {
    products = await prisma.product.findMany({
      where: {
        OR: [
          { category: { name: { contains: 'Jardim' } } },
          { category: { name: { contains: 'Agro' } } },
        ],
      },
      orderBy: { createdAt: 'desc' },
      take: 24,
    });
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('Prisma failed on /jardim-agro:', err);
  }

  return (
    <div className="space-y-6">
      <Breadcrumbs items={[{ label: 'Jardim / Agro' }]} />
      <header className="space-y-2">
        <h1 className="text-2xl font-bold">Jardim / Agro</h1>
        <p className="text-muted-foreground text-sm">
          Sementes, adubos, ferramentas e defensivos (com orientação). Tudo para
          horta, gramado e jardim.
        </p>
      </header>

      <section className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
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
      </section>

      <footer className="pt-2 text-sm">
        Veja também{' '}
        <Link
          className="underline"
          href={{ pathname: '/products', query: { category: 'Jardim' } }}
        >
          produtos de Jardim
        </Link>{' '}
        e{' '}
        <Link
          className="underline"
          href={{ pathname: '/products', query: { category: 'Agro' } }}
        >
          produtos de Agro
        </Link>
        .
      </footer>
    </div>
  );
}
