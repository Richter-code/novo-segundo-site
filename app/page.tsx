import Card from '../components/Card'
import Button from '../components/Button'
import { PawPrint, Waves, Leaf, MessageCircle, MapPin } from 'lucide-react'

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
}

export default function Home() {
  const wa = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '5519999990000'
  const waText = encodeURIComponent('Olá! Gostaria de mais informações sobre produtos e serviços da Agro Mané.')
  return (
    <div className="space-y-10">
      {/* Hero */}
      <section aria-label="Hero — Agro Mané" className="relative overflow-hidden rounded-xl p-8 md:p-12 bg-gradient-to-br from-green-50 to-emerald-100 dark:from-emerald-900/40 dark:to-green-800/30 border">
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
            Fundada em 1991 por Manuel “Mané” Severi, a Agro Mané é referência em atendimento, variedade e preços justos. 
            Conte com nossas 7 lojas, veterinários parceiros, banho & tosa e entrega em domicílio.
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
            <Button href="/units" variant="secondary" className="text-sm inline-flex items-center">
              <MapPin className="h-4 w-4 mr-2" aria-hidden />
              Conheça as Lojas
            </Button>
          </div>
        </div>
      </section>

      {/* Resumo de categorias */}
      <section aria-label="Categorias — Pet, Piscina e Jardim" className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card title="Pet">
          <div className="flex items-start gap-3">
            <PawPrint className="h-5 w-5 mt-0.5 text-emerald-600" aria-hidden />
            <p>
              Rações, petiscos e acessórios. <strong>Veterinários</strong> disponíveis e <strong>banho & tosa</strong> com equipe parceira.
            </p>
          </div>
        </Card>
        <Card title="Piscina">
          <div className="flex items-start gap-3">
            <Waves className="h-5 w-5 mt-0.5 text-sky-600" aria-hidden />
            <p>
              Soluções para tratamento de água: cloro, algicidas, filtros, bombas e orientações para manter sua piscina cristalina.
            </p>
          </div>
        </Card>
        <Card title="Jardim / Agro">
          <div className="flex items-start gap-3">
            <Leaf className="h-5 w-5 mt-0.5 text-green-700" aria-hidden />
            <p>
              Sementes, adubos, ferramentas e defensivos legais. Tudo para sua horta, gramado e jardim, com orientação especializada.
            </p>
          </div>
        </Card>
      </section>
    </div>
  )
}
