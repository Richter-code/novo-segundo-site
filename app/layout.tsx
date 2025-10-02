import './globals.css'
import { ReactNode } from 'react'

export const metadata = {
  title: 'Novo Segundo Site',
  description: 'Scaffold com Next.js + Prisma + Tailwind',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>
        <main className="container mx-auto p-6">{children}</main>
      </body>
    </html>
  )
}
