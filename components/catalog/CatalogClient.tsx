'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import FilterSidebar from '@/components/catalog/FilterSidebar';
import SortDropdown from '@/components/catalog/SortDropdown';
import ProductList from '@/components/catalog/ProductList';

interface Product {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
  brand?: { name: string } | null;
  avgRating: number;
}

interface CatalogClientProps {
  initialProducts: Product[];
  categories: Array<{ id: string; name: string }>;
  brands: Array<{ id: string; name: string }>;
  initialTotal: number;
  initialFilters: {
    priceMin: number;
    priceMax: number;
    categoryIds: string[];
    brandIds: string[];
    sort: string;
  };
}

export default function CatalogClient({
  initialProducts,
  categories,
  brands,
  initialTotal,
  initialFilters,
}: CatalogClientProps) {
  const router = useRouter();

  const [filters, setFilters] = useState(initialFilters);
  const [products, setProducts] = useState(initialProducts);
  const [total, setTotal] = useState(initialTotal);
  const [loading, setLoading] = useState(false);

  // Atualiza URL e busca produtos quando filtros mudam
  const handleFiltersChange = async (newFilters: {
    priceMin: number;
    priceMax: number;
    categoryIds: string[];
    brandIds: string[];
  }) => {
    setLoading(true);

    const updatedFilters = { ...newFilters, sort: filters.sort };
    setFilters(updatedFilters);

    // Monta query string
    const params = new URLSearchParams();
    params.set('page', '1');
    params.set('price_min', newFilters.priceMin.toString());
    params.set('price_max', newFilters.priceMax.toString());
    params.set('sort', filters.sort);
    newFilters.categoryIds.forEach((id) => params.append('category', id));
    newFilters.brandIds.forEach((id) => params.append('brand', id));

    // Atualiza URL
    router.push(`/catalog?${params.toString()}`, { scroll: false });

    // Busca produtos
    try {
      const res = await fetch(`/api/products?${params.toString()}`);
      const data = await res.json();
      setProducts(data.products || []);
      setTotal(data.total || 0);
    } catch (error) {
      console.error('Erro ao buscar produtos:', error);
    } finally {
      setLoading(false);
    }
  };

  // Atualiza ordenação
  const handleSortChange = async (sortId: string) => {
    setLoading(true);

    const updatedFilters = { ...filters, sort: sortId };
    setFilters(updatedFilters);

    // Monta query string
    const params = new URLSearchParams();
    params.set('page', '1');
    params.set('price_min', filters.priceMin.toString());
    params.set('price_max', filters.priceMax.toString());
    params.set('sort', sortId);
    filters.categoryIds.forEach((id) => params.append('category', id));
    filters.brandIds.forEach((id) => params.append('brand', id));

    // Atualiza URL
    router.push(`/catalog?${params.toString()}`, { scroll: false });

    // Busca produtos
    try {
      const res = await fetch(`/api/products?${params.toString()}`);
      const data = await res.json();
      setProducts(data.products || []);
      setTotal(data.total || 0);
    } catch (error) {
      console.error('Erro ao buscar produtos:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Catálogo de Produtos</h1>
        <p className="text-muted-foreground">
          Encontre os melhores produtos para seu pet, piscina, jardim e agro
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Sidebar de Filtros */}
        <div className="md:w-64 flex-shrink-0">
          <FilterSidebar
            categories={categories}
            brands={brands}
            onFiltersChange={handleFiltersChange}
            initialFilters={filters}
          />
        </div>

        {/* Área Principal */}
        <div className="flex-1">
          {/* Barra de controles */}
          <div className="flex items-center justify-between mb-6">
            <div className="text-sm text-muted-foreground">
              {loading ? (
                <span>Carregando...</span>
              ) : (
                <span>
                  <strong>{total}</strong> produtos encontrados
                </span>
              )}
            </div>

            {/* Dropdown de Ordenação */}
            <div className="flex items-center gap-2">
              <label htmlFor="sort-dropdown" className="text-sm font-medium">
                Ordenar por:
              </label>
              <SortDropdown
                onSortChange={handleSortChange}
                defaultSort={filters.sort}
              />
            </div>
          </div>

          {/* Lista de Produtos */}
          {loading ? (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
          ) : (
            <ProductList
              initialProducts={products}
              filters={filters}
              hasMore={products.length < total}
            />
          )}
        </div>
      </div>
    </div>
  );
}
