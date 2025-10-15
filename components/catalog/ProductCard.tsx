'use client';
import Image from 'next/image';
import { StarIcon } from '@heroicons/react/24/solid';
import { ShoppingCartIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

interface ProductCardProps {
  product: {
    id: string;
    name: string;
    price: number;
    imageUrl: string;
    brand?: { name: string } | null;
    avgRating: number;
  };
}

export default function ProductCard({ product }: ProductCardProps) {
  const installmentValue = product.price / 10;
  const hasDiscount = false;

  return (
    <div className="group bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col h-full">
      <Link href={`/products/${product.id}`} className="relative block">
        <div className="relative w-full aspect-square bg-gray-50 dark:bg-gray-800">
          <Image
            src={product.imageUrl}
            alt={product.name}
            fill
            className="object-contain p-4 group-hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          />
          {hasDiscount && (
            <div className="absolute top-2 left-2 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded">
              -15%
            </div>
          )}
        </div>
      </Link>

      <div className="p-3 flex flex-col flex-1">
        {product.brand && (
          <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-1">
            {product.brand.name}
          </p>
        )}

        <Link href={`/products/${product.id}`}>
          <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100 line-clamp-2 min-h-[2.5rem] mb-2 hover:text-primary transition-colors">
            {product.name}
          </h3>
        </Link>

        {product.avgRating > 0 && (
          <div className="flex items-center gap-1 mb-2">
            {[...Array(5)].map((_, i) => (
              <StarIcon
                key={i}
                className={`h-3 w-3 ${
                  i < Math.floor(product.avgRating)
                    ? 'text-yellow-400'
                    : 'text-gray-300'
                }`}
              />
            ))}
            <span className="text-xs text-gray-500 ml-1">
              ({product.avgRating.toFixed(1)})
            </span>
          </div>
        )}

        <div className="mt-auto space-y-1">
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold text-gray-900 dark:text-white">
              R$ {product.price.toFixed(2)}
            </span>
          </div>
          <p className="text-xs text-gray-600 dark:text-gray-400">
            ou <span className="font-semibold">10x</span> de{' '}
            <span className="font-semibold text-green-600 dark:text-green-500">
              R$ {installmentValue.toFixed(2)}
            </span>
          </p>
        </div>

        <button
          onClick={(e) => {
            e.preventDefault();
            alert(`${product.name} adicionado ao carrinho!`);
          }}
          className="mt-3 w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2.5 px-4 rounded-md transition-colors duration-200 flex items-center justify-center gap-2 text-sm"
        >
          <ShoppingCartIcon className="h-5 w-5" />
          COMPRAR
        </button>
      </div>
    </div>
  );
}
