'use client';
import { Slider } from '@/components/ui/slider';
import { useState } from 'react';

interface FilterSidebarProps {
  categories: Array<{ id: string; name: string }>;
  brands: Array<{ id: string; name: string }>;
  onFiltersChange: (filters: {
    priceMin: number;
    priceMax: number;
    categoryIds: string[];
    brandIds: string[];
  }) => void;
  initialFilters?: {
    priceMin?: number;
    priceMax?: number;
    categoryIds?: string[];
    brandIds?: string[];
  };
}

export default function FilterSidebar({
  categories,
  brands,
  onFiltersChange,
  initialFilters,
}: FilterSidebarProps) {
  // Estado local dos filtros selecionados
  const [priceRange, setPriceRange] = useState<[number, number]>([
    initialFilters?.priceMin || 0,
    initialFilters?.priceMax || 1000,
  ]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>(
    initialFilters?.categoryIds || [],
  );
  const [selectedBrands, setSelectedBrands] = useState<string[]>(
    initialFilters?.brandIds || [],
  );

  // Handler para mudança de qualquer filtro: notifica o parent via onFiltersChange
  function updateFilters() {
    onFiltersChange({
      priceMin: priceRange[0],
      priceMax: priceRange[1],
      categoryIds: selectedCategories,
      brandIds: selectedBrands,
    });
  }

  // Função para limpar todos os filtros
  function clearFilters() {
    setPriceRange([0, 1000]);
    setSelectedCategories([]);
    setSelectedBrands([]);
    onFiltersChange({
      priceMin: 0,
      priceMax: 1000,
      categoryIds: [],
      brandIds: [],
    });
  }

  return (
    <aside className="p-4 border-r bg-card rounded-lg space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Filtros</h2>
        <button
          onClick={clearFilters}
          className="text-sm text-muted-foreground hover:text-foreground"
        >
          Limpar
        </button>
      </div>

      {/* Filtro de faixa de preço */}
      <div className="space-y-3">
        <label className="font-medium text-sm">Faixa de Preço (R$)</label>
        <Slider
          defaultValue={priceRange}
          max={1000}
          step={10}
          minStepsBetweenThumbs={1}
          className="mt-2"
          onValueChange={(val) => {
            // 'val' é um array com [min, max] selecionado
            setPriceRange(val as [number, number]);
          }}
          onValueCommit={() => updateFilters()} // atualiza filtros ao soltar o slider
        />
        <div className="text-sm text-muted-foreground flex justify-between mt-1">
          <span>R$ {priceRange[0]}</span>
          <span>R$ {priceRange[1]}</span>
        </div>
      </div>

      {/* Filtro por Categoria */}
      {categories.length > 0 && (
        <div className="space-y-2">
          <h3 className="font-medium text-sm">Categoria</h3>
          <div className="max-h-48 overflow-y-auto space-y-1">
            {categories.map((cat) => (
              <div key={cat.id} className="flex items-center">
                <input
                  id={`cat-${cat.id}`}
                  type="checkbox"
                  value={cat.id}
                  checked={selectedCategories.includes(cat.id)}
                  className="mr-2 cursor-pointer h-4 w-4 rounded border-gray-300"
                  onChange={(e) => {
                    const id = e.target.value;
                    setSelectedCategories(
                      (prev) =>
                        e.target.checked
                          ? [...prev, id] // adiciona categoria selecionada
                          : prev.filter((c) => c !== id), // remove se desmarcada
                    );
                    // Atualiza filtros após pequeno delay
                    setTimeout(updateFilters, 100);
                  }}
                />
                <label
                  htmlFor={`cat-${cat.id}`}
                  className="cursor-pointer text-sm"
                >
                  {cat.name}
                </label>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Filtro por Marca */}
      {brands.length > 0 && (
        <div className="space-y-2">
          <h3 className="font-medium text-sm">Marca</h3>
          <div className="max-h-48 overflow-y-auto space-y-1">
            {brands.map((brand) => (
              <div key={brand.id} className="flex items-center">
                <input
                  id={`brand-${brand.id}`}
                  type="checkbox"
                  value={brand.id}
                  checked={selectedBrands.includes(brand.id)}
                  className="mr-2 cursor-pointer h-4 w-4 rounded border-gray-300"
                  onChange={(e) => {
                    const id = e.target.value;
                    setSelectedBrands((prev) =>
                      e.target.checked
                        ? [...prev, id]
                        : prev.filter((b) => b !== id),
                    );
                    setTimeout(updateFilters, 100);
                  }}
                />
                <label
                  htmlFor={`brand-${brand.id}`}
                  className="cursor-pointer text-sm"
                >
                  {brand.name}
                </label>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Botão aplicar filtros */}
      <button
        onClick={updateFilters}
        className="w-full px-4 py-2 bg-primary text-primary-foreground rounded text-sm font-medium hover:bg-primary/90 transition-colors"
      >
        Aplicar Filtros
      </button>
    </aside>
  );
}
