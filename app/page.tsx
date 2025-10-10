import Card from '../components/Card';
import Button from '../components/Button';
import { PawPrint, Waves, Leaf, MessageCircle, MapPin } from 'lucide-react';
import { prisma } from '../lib/prisma';
import ProductCard from '../components/ProductCard';
import Image from 'next/image';
import Callouts from '../components/Callouts';
import BrandsStrip from '../components/BrandsStrip';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Agro Mané — Tudo para Pet, Piscina e Jardim',
  description:
    'Rede de 7 lojas em Piracicaba-SP. Tudo para Pet, Piscina e Jardim, simples assim! Veterinários, banho & tosa, entrega e produtos para seu dia a dia.',
  keywords: [
    'pet shop Piracicaba',
    'agropecuária',
    'ração',
    'banho e tosa',
    'piscina',
    'tratamento de piscina',
    'jardinagem',
    'agro',
  ],
};

export default async function Home() {
  const wa =
    process.env.NEXT_PUBLIC_WHATSAPP_PHONE ||
    process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ||
    '5519999990000';
  const waText = encodeURIComponent(
    'Olá! Gostaria de mais informações sobre produtos e serviços da Agro Mané.',
  );
  const [featured, categories] = await Promise.all([
    prisma.product.findMany({
      orderBy: { createdAt: 'desc' },
      take: 8,
      include: { category: true },
    }),
    prisma.category.findMany({ orderBy: { name: 'asc' }, take: 6 }),
  ]);
  return (
    <div className="space-y-12">
      {/* Hero */}
      <section
        aria-label="Hero — Agro Mané"
        className="relative overflow-hidden rounded-xl p-8 md:p-12 bg-gradient-to-br from-green-50 to-emerald-100 dark:from-emerald-900/40 dark:to-green-800/30 border"
      >
        <div className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-emerald-500/10 blur-3xl" />
        <div className="pointer-events-none absolute -left-24 -bottom-24 h-64 w-64 rounded-full bg-green-600/10 blur-3xl" />
        <div className="relative max-w-4xl">
          <span className="inline-flex items-center gap-2 mb-3 rounded-full border px-3 py-1 text-xs md:text-sm bg-white/70 dark:bg-black/20">
            <span className="h-2 w-2 rounded-full bg-emerald-600" aria-hidden />
            30+ anos de tradição em Piracicaba
          </span>
          <h1 className="text-3xl md:text-5xl font-extrabold leading-tight">
            Tudo para Pet, Piscina e Jardim, simples assim!
          </h1>
          <p className="mt-4 text-base md:text-lg text-muted-foreground">
            Fundada em 1991 por Manuel “Mané” Severi, a Agro Mané é referência
            em atendimento, variedade e preços justos. Conte com nossas 7 lojas,
            veterinários parceiros, banho & tosa e entrega em domicílio.
          </p>
          <div className="mt-6 flex flex-col sm:flex-row gap-3">
            <Button
              href={`https://wa.me/${wa}?text=${waText}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm"
            >
              <MessageCircle className="h-4 w-4" aria-hidden />
              <span>Fale no WhatsApp</span>
            </Button>
            <Button
              href="/units"
              variant="secondary"
              className="text-sm inline-flex items-center"
            >
              <MapPin className="h-4 w-4 mr-2" aria-hidden />
              Conheça as Lojas
            </Button>
          </div>
        </div>
      </section>

      {/* Banners rápidos */}
      <section className="grid md:grid-cols-3 gap-4">
        {[
          'https://images.unsplash.com/photo-1596495578065-8ae9ee2f3f2e',
          'https://images.unsplash.com/photo-1501004318641-b39e6451bec6',
          'https://images.unsplash.com/photo-1451187580459-43490279c0fa',
        ].map((src, i) => (
          <div
            key={i}
            className="relative h-40 md:h-48 rounded-lg overflow-hidden border bg-muted"
          >
            <Image src={src} alt="Banner" fill className="object-cover" />
            <div className="absolute inset-0 bg-black/20" />
          </div>
        ))}
      </section>

      <Callouts />

      <BrandsStrip />

      {/* Categorias populares */}
      <section
        aria-label="Categorias — Pet, Piscina e Jardim"
        className="space-y-3"
      >
        <h2 className="text-xl font-bold">Categorias</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card title="Pet">
            <div className="flex items-start gap-3">
              <PawPrint
                className="h-5 w-5 mt-0.5 text-emerald-600"
                aria-hidden
              />
              <p>
                Rações, petiscos e acessórios. <strong>Veterinários</strong>{' '}
                disponíveis e <strong>banho & tosa</strong> com equipe parceira.
              </p>
            </div>
          </Card>
          <Card title="Piscina">
            <div className="flex items-start gap-3">
              <Waves className="h-5 w-5 mt-0.5 text-sky-600" aria-hidden />
              <p>
                Soluções para tratamento de água: cloro, algicidas, filtros,
                bombas e orientações para manter sua piscina cristalina.
              </p>
            </div>
          </Card>
          <Card title="Jardim / Agro">
            <div className="flex items-start gap-3">
              <Leaf className="h-5 w-5 mt-0.5 text-green-700" aria-hidden />
              <p>
                Sementes, adubos, ferramentas e defensivos legais. Tudo para sua
                horta, gramado e jardim, com orientação especializada.
              </p>
            </div>
          </Card>
        </div>
      </section>

      {categories.length > 0 && (
        <section aria-label="Explore por categoria" className="space-y-3">
          <h2 className="text-xl font-bold">Explore por categoria</h2>
          <ul className="grid sm:grid-cols-2 md:grid-cols-3 gap-3">
            {categories.map((c) => (
              <li key={c.id}>
                <a
                  href={`/products?category=${encodeURIComponent(c.name)}`}
                  className="block rounded border px-4 py-3 hover:bg-muted/40"
                >
                  <span className="font-medium">{c.name}</span>
                </a>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Vitrine de Produtos */}
      <section aria-label="Destaques" className="space-y-3">
        <div className="flex items-end justify-between">
          <h2 className="text-xl font-bold">Destaques</h2>
          <Button href="/products" variant="secondary" className="text-sm">
            Ver todos
          </Button>
        </div>
        {featured.length === 0 ? (
          <p className="text-sm text-muted-foreground">
            Sem produtos no momento.
          </p>
        ) : (
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">
            {featured.map((p) => (
              <ProductCard
                key={p.id}
                id={p.id}
                name={p.name}
                price={p.price.toString()}
                imageUrl={p.imageUrl}
                description={p.category?.name}
              />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
