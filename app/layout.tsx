import '../styles/globals.css'
import { ReactNode } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Providers from '../components/Providers'

export const metadata = {
  title: 'AgroAI — Soluções para Agropecuária',
  description:
    'AgroAI: consultoria e ferramentas digitais para agropecuária — assistência virtual, serviços e conteúdos técnicos.',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>
        <Providers>
          <div className="min-h-screen flex flex-col bg-background text-foreground">
            <Navbar />
            <main className="container mx-auto px-6 py-10 flex-1">{children}</main>
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  )
}
