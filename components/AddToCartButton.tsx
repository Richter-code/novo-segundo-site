'use client';
import React from 'react';

type Props = {
  id: string;
  name: string;
  price: string;
  imageUrl: string;
  className?: string;
  children?: React.ReactNode;
};

export default function AddToCartButton({
  id,
  name,
  price,
  imageUrl,
  className,
  children,
}: Props) {
  const add = () => {
    try {
      const raw = localStorage.getItem('cart_v1');
      type CartItem = {
        id: string;
        name: string;
        price: string;
        imageUrl: string;
        qty?: number;
      };
      const items: CartItem[] = raw ? JSON.parse(raw) : [];
      const idx = Array.isArray(items)
        ? items.findIndex((i: CartItem) => i.id === id)
        : -1;
      if (idx >= 0) items[idx].qty = (items[idx].qty || 1) + 1;
      else items.push({ id, name, price, imageUrl, qty: 1 });
      localStorage.setItem('cart_v1', JSON.stringify(items));
      window.dispatchEvent(new StorageEvent('storage', { key: 'cart_v1' }));
    } catch {
      // ignore
    }
  };
  return (
    <button onClick={add} className={className}>
      {children ?? 'Adicionar ao carrinho'}
    </button>
  );
}
