import Link from 'next/link';
import { prisma } from '../../lib/prisma';

export const metadata = { title: 'Categorias — Agro Mané' };
export const dynamic = 'force-dynamic';

export default async function CategoriesPage() {
  const categories = await prisma.category.findMany({
    orderBy: { name: 'asc' },
  });
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Categorias</h2>
      <ul className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {categories.map((c) => (
          <li key={c.id} className="rounded border p-4 hover:bg-muted/40">
            <div className="font-semibold">{c.name}</div>
            <div className="mt-2 text-sm">
              <Link
                href={`/products?category=${encodeURIComponent(c.name)}`}
                className="underline"
              >
                Ver produtos
              </Link>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
