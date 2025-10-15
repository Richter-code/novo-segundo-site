'use client';
import React from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

type Props = {
  defaultSort?: string;
};

export default function SortSelect({ defaultSort = 'newest' }: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const onChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const params = new URLSearchParams(searchParams?.toString() || '');
    params.set('sort', e.currentTarget.value);
    params.set('page', '1');
    router.push(`/pets?${params.toString()}`);
  };

  return (
    <select
      id="sort-select"
      name="sort"
      aria-label="Ordenar produtos"
      defaultValue={defaultSort}
      onChange={onChange}
      className="px-3 py-2 rounded border text-sm"
    >
      <option value="newest">Mais recentes</option>
      <option value="price_asc">Menor preço</option>
      <option value="price_desc">Maior preço</option>
      <option value="name_asc">Nome A-Z</option>
      <option value="name_desc">Nome Z-A</option>
    </select>
  );
}
