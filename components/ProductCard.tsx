import Image from 'next/image';
import Link from 'next/link';

type ProductCardProps = {
  id: string;
  name: string;
  price: string | number;
  imageUrl: string;
  description?: string;
};

export default function ProductCard({
  id,
  name,
  price,
  imageUrl,
  description,
}: ProductCardProps) {
  const priceStr = typeof price === 'string' ? price : price.toFixed(2);
  return (
    <div className="rounded-lg border bg-card text-card-foreground shadow-sm overflow-hidden flex flex-col">
      <Link href={`/products/${id}`} className="relative aspect-[4/3] bg-muted">
        <Image
          src={imageUrl}
          alt={name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover"
          priority={false}
        />
      </Link>
      <div className="p-4 flex-1 flex flex-col gap-2">
        <Link
          href={`/products/${id}`}
          className="font-semibold line-clamp-2 min-h-[3rem]"
        >
          {name}
        </Link>
        {description ? (
          <p className="text-sm text-muted-foreground line-clamp-2">
            {description}
          </p>
        ) : null}
        <div className="mt-auto flex items-center justify-between pt-2">
          <span className="font-bold">R$ {priceStr}</span>
          <Link
            href={`/products/${id}`}
            className="px-3 py-2 text-sm rounded bg-primary text-primary-foreground"
          >
            Ver detalhes
          </Link>
        </div>
      </div>
    </div>
  );
}
