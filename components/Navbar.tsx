"use client"

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { Menu } from 'lucide-react'
import ThemeToggle from './ThemeToggle'
import { useSession, signOut } from 'next-auth/react'

export default function Navbar() {
  const path = usePathname()
  const [open, setOpen] = useState(false)

  const links = [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'Sobre' },
    { href: '/services', label: 'Serviços' },
    { href: '/products', label: 'Produtos' },
    { href: '/units', label: 'Unidades' },
    { href: '/reviews', label: 'Avaliações' },
    { href: '/blog', label: 'Blog' },
    { href: '/contact', label: 'Contato' },
  ]

  return (
    <header className="border-b border-border bg-background">
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="/" className="text-lg font-bold">
          Agro Mané
        </Link>
        {/* Desktop nav */}
        <nav className="hidden md:flex gap-4 items-center">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={
                'px-3 py-2 rounded text-sm ' + (path === l.href ? 'bg-primary text-primary-foreground' : 'hover:bg-muted/50')
              }
            >
              {l.label}
            </Link>
          ))}
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
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className={
                  'px-3 py-2 rounded text-sm ' + (path === l.href ? 'bg-primary text-primary-foreground' : 'hover:bg-muted/50')
                }
              >
                {l.label}
              </Link>
            ))}
            <div className="flex items-center gap-3 pt-2">
              <AuthSection />
              <ThemeToggle />
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}

function AuthSection() {
  const { data } = useSession()
  if (!data?.user) return (
    <Link href="/login" className="px-3 py-2 rounded border text-sm">Entrar</Link>
  )
  return (
    <div className="flex items-center gap-2">
      <Link href="/admin" className="px-3 py-2 rounded border text-sm">Admin</Link>
      <span className="text-sm">Olá, {data.user.name || data.user.email}</span>
      <button className="px-3 py-2 rounded border text-sm" onClick={() => signOut({ callbackUrl: '/' })}>Sair</button>
    </div>
  )
}
