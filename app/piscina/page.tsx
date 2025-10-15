import Breadcrumbs from '../../components/Breadcrumbs';
import ProductCard from '../../components/ProductCard';
import { prisma } from '../../lib/prisma';
import type { Product } from '@prisma/client';
import Link from 'next/link';

export const metadata = { title: 'Piscina — Agro Mané' };
export const dynamic = 'force-dynamic';

export default async function PiscinaPage() {
  let products: Array<Product> = [];
  try {
    products = await prisma.product.findMany({
      where: { category: { name: { contains: 'Piscina' } } },
      orderBy: { createdAt: 'desc' },
      take: 24,
    });
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('Prisma failed on /piscina:', err);
  }

  return (
    <div className="space-y-6">
      <Breadcrumbs items={[{ label: 'Piscina' }]} />
      <header className="space-y-2">
        <h1 className="text-2xl font-bold">Piscina</h1>
        <p className="text-muted-foreground text-sm">
          Cloro, algicidas, filtros e bombas. Tudo para tratamento de água e
          manutenção.
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
        Não achou? Veja todos os{' '}
        <Link
          className="underline"
          href={{ pathname: '/products', query: { category: 'Piscina' } }}
        >
          produtos de Piscina
        </Link>
        .
      </footer>
    </div>
  );
}
