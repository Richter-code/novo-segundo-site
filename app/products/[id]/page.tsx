import Breadcrumbs from '../../../components/Breadcrumbs';
import Image from 'next/image';
import { prisma } from '../../../lib/prisma';
import Link from 'next/link';
import AddToCartButton from '../../../components/AddToCartButton';

export const dynamic = 'force-dynamic';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default async function ProductDetailPage({ params }: any) {
  const product = await prisma.product.findUnique({
    where: { id: params.id },
    include: { category: true },
  });
  if (!product) return <div className="py-12">Produto não encontrado.</div>;
  const price = product.price.toString();
  return (
    <div className="space-y-4">
      <Breadcrumbs
        items={[
          { label: 'Produtos', href: '/products' },
          { label: product.name },
        ]}
      />
      <div className="grid md:grid-cols-2 gap-8">
        <div className="relative aspect-[4/3] rounded-lg overflow-hidden border bg-muted">
          <Image
            src={product.imageUrl}
            alt={product.name}
            fill
            className="object-cover"
          />
        </div>
        <div>
          <div className="text-sm text-muted-foreground">
            {product.category?.name}
          </div>
          <h1 className="text-2xl md:text-3xl font-bold mt-1">
            {product.name}
          </h1>
          <div className="mt-4 text-emerald-700 dark:text-emerald-400 text-xl font-extrabold">
            R$ {price}
          </div>
          <p className="mt-4 text-muted-foreground leading-relaxed">
            {product.description}
          </p>
          <div className="mt-6 flex gap-3">
            <AddToCartButton
              id={product.id}
              name={product.name}
              price={price}
              imageUrl={product.imageUrl}
              className="px-4 py-2 rounded bg-primary text-primary-foreground"
            />
            <Link href="/products" className="px-4 py-2 rounded border">
              Voltar
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
