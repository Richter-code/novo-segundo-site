'use client';
import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

interface FilterSidebarProps {
  categories: string[];
  brands: string[];
}

export default function FilterSidebar({
  categories,
  brands,
}: FilterSidebarProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [category, setCategory] = useState(searchParams.get('category') || '');
  const [brand, setBrand] = useState(searchParams.get('brand') || '');
  const [priceMin, setPriceMin] = useState(searchParams.get('priceMin') || '');
  const [priceMax, setPriceMax] = useState(searchParams.get('priceMax') || '');

  const applyFilters = () => {
    const params = new URLSearchParams();
    if (category) params.set('category', category);
    if (brand) params.set('brand', brand);
    if (priceMin) params.set('priceMin', priceMin);
    if (priceMax) params.set('priceMax', priceMax);
    params.set('page', '1'); // Reset to page 1 on filter change

    router.push(`/pets?${params.toString()}`);
  };

  const clearFilters = () => {
    setCategory('');
    setBrand('');
    setPriceMin('');
    setPriceMax('');
    router.push('/pets');
  };

  return (
    <aside className="space-y-6 p-4 border rounded-lg bg-card">
      <div>
        <h3 className="font-semibold mb-3">Filtros</h3>
      </div>

      <div className="space-y-2">
        <label htmlFor="filter-category" className="text-sm font-medium">
          Categoria
        </label>
        <select
          id="filter-category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full px-3 py-2 rounded border text-sm"
        >
          <option value="">Todas</option>
          {categories.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>

      <div className="space-y-2">
        <label htmlFor="filter-brand" className="text-sm font-medium">
          Marca
        </label>
        <select
          id="filter-brand"
          value={brand}
          onChange={(e) => setBrand(e.target.value)}
          className="w-full px-3 py-2 rounded border text-sm"
        >
          <option value="">Todas</option>
          {brands.map((b) => (
            <option key={b} value={b}>
              {b}
            </option>
          ))}
        </select>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Faixa de Preço (R$)</label>
        <div className="flex gap-2">
          <input
            type="number"
            placeholder="Mín"
            value={priceMin}
            onChange={(e) => setPriceMin(e.target.value)}
            className="w-1/2 px-2 py-1 rounded border text-sm"
          />
          <input
            type="number"
            placeholder="Máx"
            value={priceMax}
            onChange={(e) => setPriceMax(e.target.value)}
            className="w-1/2 px-2 py-1 rounded border text-sm"
          />
        </div>
      </div>

      <div className="flex gap-2">
        <button
          onClick={applyFilters}
          className="flex-1 px-4 py-2 bg-primary text-primary-foreground rounded text-sm font-medium hover:bg-primary/90"
        >
          Aplicar
        </button>
        <button
          onClick={clearFilters}
          className="px-4 py-2 border rounded text-sm hover:bg-muted"
        >
          Limpar
        </button>
      </div>
    </aside>
  );
}
