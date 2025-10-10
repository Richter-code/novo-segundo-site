'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Menu } from 'lucide-react';
import ThemeToggle from './ThemeToggle';
import { useSession, signOut } from 'next-auth/react';

export default function Navbar() {
  const path = usePathname();
  const [open, setOpen] = useState(false);
  const wa = process.env.NEXT_PUBLIC_WHATSAPP_PHONE || '5511999999999';

  const links = [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'Sobre' },
    { href: '/services', label: 'Serviços' },
    { href: '/products', label: 'Produtos' },
    { href: '/units', label: 'Unidades' },
    { href: '/reviews', label: 'Avaliações' },
    { href: '/blog', label: 'Blog' },
    { href: '/contact', label: 'Contato' },
  ];

  return (
    <header className="border-b border-border bg-background">
      <div className="container mx-auto px-6 py-4 flex items-center gap-4 justify-between">
        <Link href="/" className="text-lg font-bold whitespace-nowrap">
          Agro Mané
        </Link>
        {/* Desktop nav */}
        <nav className="hidden md:flex gap-4 items-center flex-1">
          <form action="/products" method="get" className="flex-1 max-w-xl">
            <label htmlFor="global-search" className="sr-only">
              Buscar produtos
            </label>
            <input
              id="global-search"
              name="q"
              placeholder="Buscar produtos"
              className="w-full px-3 py-2 rounded border text-sm"
            />
          </form>
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={
                'px-3 py-2 rounded text-sm ' +
                (path === l.href
                  ? 'bg-primary text-primary-foreground'
                  : 'hover:bg-muted/50')
              }
            >
              {l.label}
            </Link>
          ))}
          <Link
            href={`/products`}
            className={'px-3 py-2 rounded text-sm hover:bg-muted/50'}
          >
            Loja
          </Link>
          <a
            href={`https://wa.me/${wa}`}
            target="_blank"
            rel="noopener noreferrer"
            className="px-3 py-2 rounded border text-sm"
          >
            WhatsApp
          </a>
          <CartLink />
          <AuthSection />
          <ThemeToggle />
        </nav>

        {/* Mobile trigger */}
        <button
          className="md:hidden inline-flex items-center justify-center rounded border px-3 py-2"
          aria-label="Abrir menu"
          onClick={() => setOpen((v) => !v)}
        >
          <Menu className="h-5 w-5" />
        </button>
      </div>

      {/* Mobile drawer */}
      {open && (
        <div className="md:hidden border-t">
          <nav className="container mx-auto px-6 py-3 flex flex-col gap-2">
            <form action="/products" method="get" className="mb-2">
              <label htmlFor="mobile-search" className="sr-only">
                Buscar produtos
              </label>
              <input
                id="mobile-search"
                name="q"
                placeholder="Buscar produtos"
                className="w-full px-3 py-2 rounded border text-sm"
              />
            </form>
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className={
                  'px-3 py-2 rounded text-sm ' +
                  (path === l.href
                    ? 'bg-primary text-primary-foreground'
                    : 'hover:bg-muted/50')
                }
              >
                {l.label}
              </Link>
            ))}
            <div className="flex items-center gap-3 pt-2">
              <a
                href={`https://wa.me/${wa}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-2 rounded border text-sm"
              >
                WhatsApp
              </a>
              <CartLink />
              <AuthSection />
              <ThemeToggle />
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}

function AuthSection() {
  const { data } = useSession();
  if (!data?.user)
    return (
      <Link href="/login" className="px-3 py-2 rounded border text-sm">
        Entrar
      </Link>
    );
  return (
    <div className="flex items-center gap-2">
      <Link href="/admin" className="px-3 py-2 rounded border text-sm">
        Admin
      </Link>
      <span className="text-sm">Olá, {data.user.name || data.user.email}</span>
      <button
        className="px-3 py-2 rounded border text-sm"
        onClick={() => signOut({ callbackUrl: '/' })}
      >
        Sair
      </button>
    </div>
  );
}

function CartLink() {
  const [count, setCount] = useState<number>(0);
  type CartItem = { id: string; qty?: number };
  // Atualiza contador baseado no localStorage
  useEffect(() => {
    if (typeof window === 'undefined') return;
    try {
      const raw = localStorage.getItem('cart_v1');
      const items: CartItem[] = raw ? JSON.parse(raw) : [];
      const c = Array.isArray(items)
        ? items.reduce((a, b) => a + (b.qty || 1), 0)
        : 0;
      setCount(c);
    } catch {
      // ignore
    }
    const handler = () => {
      try {
        const raw2 = localStorage.getItem('cart_v1');
        const items2: CartItem[] = raw2 ? JSON.parse(raw2) : [];
        const c2 = Array.isArray(items2)
          ? items2.reduce((a, b) => a + (b.qty || 1), 0)
          : 0;
        setCount(c2);
      } catch {
        // ignore
      }
    };
    window.addEventListener('storage', handler);
    return () => window.removeEventListener('storage', handler);
  }, []);
  return (
    <Link href="/cart" className="px-3 py-2 rounded border text-sm">
      Carrinho ({count})
    </Link>
  );
}
