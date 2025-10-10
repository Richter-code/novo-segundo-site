'use client';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

type CartItem = {
  id: string;
  name: string;
  price: string;
  imageUrl: string;
  qty?: number;
};

export default function CartPage() {
  const [items, setItems] = useState<CartItem[]>([]);
  useEffect(() => {
    try {
      const raw = localStorage.getItem('cart_v1');
      setItems(raw ? JSON.parse(raw) : []);
    } catch {
      setItems([]);
    }
  }, []);

  const total = items.reduce(
    (sum, i) => sum + (parseFloat(i.price) || 0) * (i.qty || 1),
    0,
  );

  const update = (next: CartItem[]) => {
    setItems(next);
    localStorage.setItem('cart_v1', JSON.stringify(next));
    window.dispatchEvent(new StorageEvent('storage', { key: 'cart_v1' }));
  };

  const changeQty = (id: string, delta: number) => {
    const next = items.map((i) =>
      i.id === id ? { ...i, qty: Math.max(1, (i.qty || 1) + delta) } : i,
    );
    update(next);
  };
  const remove = (id: string) => update(items.filter((i) => i.id !== id));
  const clear = () => update([]);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Carrinho</h1>
      {items.length === 0 ? (
        <div className="text-sm text-muted-foreground">
          Seu carrinho está vazio.{' '}
          <Link className="underline" href="/products">
            Ver produtos
          </Link>
        </div>
      ) : (
        <div className="grid md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-4">
            {items.map((i) => (
              <div
                key={i.id}
                className="flex items-center gap-4 rounded border p-3"
              >
                <div className="relative w-20 h-16 overflow-hidden rounded">
                  <Image
                    src={i.imageUrl}
                    alt={i.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex-1">
                  <div className="font-semibold">{i.name}</div>
                  <div className="text-sm text-muted-foreground">
                    R$ {i.price}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    className="px-2 rounded border"
                    onClick={() => changeQty(i.id, -1)}
                  >
                    -
                  </button>
                  <span>{i.qty || 1}</span>
                  <button
                    className="px-2 rounded border"
                    onClick={() => changeQty(i.id, 1)}
                  >
                    +
                  </button>
                </div>
                <button
                  className="px-3 py-2 rounded border text-sm"
                  onClick={() => remove(i.id)}
                >
                  Remover
                </button>
              </div>
            ))}
          </div>
          <aside className="rounded border p-4 h-fit">
            <div className="flex items-center justify-between font-semibold">
              <span>Total</span>
              <span>R$ {total.toFixed(2)}</span>
            </div>
            <a
              href={`https://wa.me/${
                process.env.NEXT_PUBLIC_WHATSAPP_PHONE || '5511999999999'
              }?text=${encodeURIComponent(
                'Olá! Quero finalizar a compra: ' +
                  items
                    .map((i) => `${i.qty || 1}x ${i.name} (R$ ${i.price})`)
                    .join(', '),
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center justify-center w-full px-4 py-2 rounded bg-primary text-primary-foreground"
            >
              Finalizar pelo WhatsApp
            </a>
            <button
              className="mt-2 w-full px-4 py-2 rounded border"
              onClick={clear}
            >
              Limpar carrinho
            </button>
          </aside>
        </div>
      )}
    </div>
  );
}
