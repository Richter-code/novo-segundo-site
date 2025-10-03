"use client"

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import ThemeToggle from './ThemeToggle'
import { useSession, signOut } from 'next-auth/react'

export default function Navbar() {
  const path = usePathname()

  const links = [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'Sobre' },
    { href: '/services', label: 'Serviços' },
    { href: '/products', label: 'Produtos' },
    { href: '/blog', label: 'Blog' },
    { href: '/contact', label: 'Contato' },
    { href: '/assistant', label: 'Assistente' },
  ]

  return (
    <header className="border-b border-border bg-background">
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="/" className="text-lg font-bold">
          AgroAI
        </Link>
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
      </div>
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
