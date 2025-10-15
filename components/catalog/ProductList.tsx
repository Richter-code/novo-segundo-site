'use client';
import { useState } from 'react';
import ProductCard from './ProductCard';

interface Product {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
  brand?: { name: string } | null;
  avgRating: number;
}

interface ProductListProps {
  initialProducts: Product[];
  filters: {
    priceMin: number;
    priceMax: number;
    categoryIds: string[];
    brandIds: string[];
    sort: string;
  };
  hasMore: boolean;
}

export default function ProductList({
  initialProducts,
  filters,
  hasMore: initialHasMore,
}: ProductListProps) {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(initialHasMore);

  async function loadMore() {
    if (loading || !hasMore) return;

    setLoading(true);
    const nextPage = page + 1;

    // Monta a query string com filtros e próxima página
    const params = new URLSearchParams({
      page: nextPage.toString(),
      price_min: filters.priceMin.toString(),
      price_max: filters.priceMax.toString(),
      sort: filters.sort,
    });

    filters.categoryIds.forEach((catId) =>
      params.append('category', catId.toString()),
    );
    filters.brandIds.forEach((brandId) =>
      params.append('brand', brandId.toString()),
    );

    try {
      const res = await fetch(`/api/products?${params.toString()}`);
      const data = await res.json();
      const newProducts: Product[] = data.products || [];

      if (newProducts.length === 0) {
        setHasMore(false);
      } else {
        setProducts((prev) => [...prev, ...newProducts]);
        setPage(nextPage);
        // Verifica se há mais produtos
        if (newProducts.length < 12) {
          setHasMore(false);
        }
      }
    } catch (error) {
      console.error('Erro ao carregar mais produtos:', error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      {/* Grid de produtos */}
      {products.length === 0 ? (
        <div className="text-center py-12 text-muted-foreground">
          <p className="text-lg">
            Nenhum produto encontrado com os filtros selecionados.
          </p>
          <p className="text-sm mt-2">
            Tente ajustar os filtros ou limpar a busca.
          </p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {/* Botão Carregar Mais */}
          {hasMore && (
            <div className="text-center mt-8">
              {loading ? (
                <div className="inline-flex items-center gap-2 text-muted-foreground">
                  <svg
                    className="animate-spin h-5 w-5"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  <span>Carregando...</span>
                </div>
              ) : (
                <button
                  onClick={loadMore}
                  className="px-6 py-3 bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/80 transition-colors font-medium"
                >
                  Carregar mais produtos
                </button>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
}
