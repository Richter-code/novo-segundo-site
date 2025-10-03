import '../styles/globals.css'
import { ReactNode } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Providers from '../components/Providers'

export const metadata = {
  metadataBase: new URL(process.env.SITE_URL || 'http://localhost:3000'),
  title: 'Agro Mané — Tudo para Pet, Piscina e Jardim em Piracicaba',
  description:
    'Rede com 7 lojas em Piracicaba-SP. Rações, banho & tosa, veterinários, produtos para piscina, jardinagem e agro. Mais de 30 anos de tradição e qualidade.',
  keywords: [
    'pet shop Piracicaba',
    'agropecuária Piracicaba',
    'ração para cães e gatos',
    'banho e tosa',
    'tratamento de piscina',
    'produtos para jardim',
    'Agro Mané',
  ],
  authors: [{ name: 'Agro Mané' }],
  creator: 'Agro Mané',
  publisher: 'Agro Mané',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    url: 'https://agromane.com.br',
    siteName: 'Agro Mané',
    title: 'Agro Mané — Tudo para Pet, Piscina e Jardim em Piracicaba',
    description:
      'Rede com 7 lojas em Piracicaba-SP. Rações, banho & tosa, veterinários, produtos para piscina, jardinagem e agro. Mais de 30 anos de tradição e qualidade.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Agro Mané - Tudo para Pet, Piscina e Jardim',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Agro Mané — Tudo para Pet, Piscina e Jardim em Piracicaba',
    description:
      'Rede com 7 lojas em Piracicaba-SP. Rações, banho & tosa, veterinários, produtos para piscina, jardinagem e agro.',
    images: ['/og-image.jpg'],
  },
  verification: {
    google: 'your-google-verification-code',
  },
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon.ico' },
    ],
    apple: '/apple-touch-icon.png',
  },
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
