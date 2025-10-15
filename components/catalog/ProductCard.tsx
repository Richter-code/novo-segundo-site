'use client';
import Image from 'next/image';
import { StarIcon } from '@heroicons/react/24/solid';
import { StarIcon as StarOutlineIcon } from '@heroicons/react/24/outline';
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
  // Cálculo de valor da parcela (ex: em até 12x sem juros)
  const installmentValue = product.price / 12;

  // Renderizar estrelas de avaliação
  const renderStars = () => {
    const stars = [];
    const fullStars = Math.floor(product.avgRating);

    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(
          <StarIcon
            key={i}
            className="h-4 w-4 text-yellow-500"
            aria-hidden="true"
          />,
        );
      } else {
        stars.push(
          <StarOutlineIcon
            key={i}
            className="h-4 w-4 text-gray-300"
            aria-hidden="true"
          />,
        );
      }
    }
    return stars;
  };

  return (
    <Link href={`/products/${product.id}`}>
      <div className="group border rounded-lg p-4 hover:shadow-lg transition-shadow bg-card h-full flex flex-col">
        {/* Imagem do produto */}
        <div className="relative w-full h-48 mb-3 overflow-hidden rounded-md bg-gray-100">
          <Image
            src={product.imageUrl}
            alt={`Imagem de ${product.name}`}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
          />
        </div>

        {/* Título e marca */}
        <h3 className="font-semibold text-sm text-foreground line-clamp-2 mb-1 min-h-[2.5rem]">
          {product.name}
        </h3>
        {product.brand && (
          <p className="text-xs text-muted-foreground mb-2">
            {product.brand.name}
          </p>
        )}

        {/* Avaliação em estrelas */}
        <div className="flex items-center gap-1 mb-2">
          {renderStars()}
          <span className="text-xs text-muted-foreground ml-1">
            ({product.avgRating.toFixed(1)})
          </span>
        </div>

        {/* Preço e parcelamento */}
        <div className="mt-auto">
          <p className="text-lg font-bold text-green-600 dark:text-green-500">
            R$ {product.price.toFixed(2)}
          </p>
          <p className="text-xs text-muted-foreground">
            em até 12x de{' '}
            <span className="font-medium">
              R$ {installmentValue.toFixed(2)}
            </span>{' '}
            sem juros
          </p>

          {/* Botão COMPRAR */}
          <button
            onClick={(e) => {
              e.preventDefault();
              // TODO: Adicionar ao carrinho
              alert(`Produto ${product.name} adicionado ao carrinho!`);
            }}
            className="mt-3 w-full bg-primary text-primary-foreground text-center text-sm font-medium py-2 rounded hover:bg-primary/90 transition-colors"
          >
            COMPRAR
          </button>
        </div>
      </div>
    </Link>
  );
}
