import Image from 'next/image';
import Link from 'next/link';

interface ProductCardProps {
  id: string;
  name: string;
  brand?: string | null;
  price: string;
  imageUrl: string;
}

export default function ProductCard({
  id,
  name,
  brand,
  price,
  imageUrl,
}: ProductCardProps) {
  const priceNum = parseFloat(price);
  const formattedPrice = isNaN(priceNum)
    ? price
    : priceNum.toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL',
      });

  return (
    <article className="border rounded-lg overflow-hidden bg-card hover:shadow-lg transition-shadow">
      <Link href={`/products/${id}`}>
        <div className="relative h-48 w-full bg-muted">
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt={name}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
            />
          ) : (
            <div className="flex items-center justify-center h-full text-muted-foreground text-sm">
              Sem imagem
            </div>
          )}
        </div>
      </Link>
      <div className="p-4 space-y-2">
        {brand && (
          <div className="text-xs text-muted-foreground uppercase">{brand}</div>
        )}
        <Link href={`/products/${id}`}>
          <h3 className="font-medium text-sm line-clamp-2 hover:underline">
            {name}
          </h3>
        </Link>
        <div className="text-lg font-bold text-green-600">{formattedPrice}</div>
        <button className="w-full px-4 py-2 bg-green-600 text-white rounded text-sm font-medium hover:bg-green-700 transition-colors">
          COMPRAR
        </button>
      </div>
    </article>
  );
}
