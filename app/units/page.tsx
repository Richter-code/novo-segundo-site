import { MapPin, Phone, Clock } from 'lucide-react'

export const metadata = {
  title: 'Unidades — Agro Mané',
  description: 'Conheça as 7 lojas da Agro Mané em Piracicaba-SP com endereços, telefones e horários.',
}

type Unit = {
  id: number
  name: string
  address: string
  phone: string
  whatsapp: string
  hours: string
}

const units: Unit[] = [
  {
    id: 1,
    name: 'Loja 1 — Centro',
    address: 'Rua Exemplo, 100 - Centro, Piracicaba - SP',
    phone: '(19) 3421-0000',
    whatsapp: '(19) 99999-0001',
    hours: 'Seg a Sex: 8h-18h | Sáb: 8h-14h',
  },
  {
    id: 2,
    name: 'Loja 2 — Vila Rezende',
    address: 'Av. Exemplo, 200 - Vila Rezende, Piracicaba - SP',
    phone: '(19) 3421-0001',
    whatsapp: '(19) 99999-0002',
    hours: 'Seg a Sex: 8h-18h | Sáb: 8h-14h',
  },
  {
    id: 3,
    name: 'Loja 3 — Paulista',
    address: 'Rua Exemplo, 300 - Paulista, Piracicaba - SP',
    phone: '(19) 3421-0002',
    whatsapp: '(19) 99999-0003',
    hours: 'Seg a Sex: 8h-18h | Sáb: 8h-14h',
  },
  {
    id: 4,
    name: 'Loja 4 — Santa Terezinha',
    address: 'Av. Exemplo, 400 - Santa Terezinha, Piracicaba - SP',
    phone: '(19) 3421-0003',
    whatsapp: '(19) 99999-0004',
    hours: 'Seg a Sex: 8h-18h | Sáb: 8h-14h',
  },
  {
    id: 5,
    name: 'Loja 5 — Jardim Elite',
    address: 'Rua Exemplo, 500 - Jardim Elite, Piracicaba - SP',
    phone: '(19) 3421-0004',
    whatsapp: '(19) 99999-0005',
    hours: 'Seg a Sex: 8h-18h | Sáb: 8h-14h',
  },
  {
    id: 6,
    name: 'Loja 6 — Piracicamirim',
    address: 'Av. Exemplo, 600 - Piracicamirim, Piracicaba - SP',
    phone: '(19) 3421-0005',
    whatsapp: '(19) 99999-0006',
    hours: 'Seg a Sex: 8h-18h | Sáb: 8h-14h',
  },
  {
    id: 7,
    name: 'Loja 7 — Nova Piracicaba',
    address: 'Rua Exemplo, 700 - Nova Piracicaba, Piracicaba - SP',
    phone: '(19) 3421-0006',
    whatsapp: '(19) 99999-0007',
    hours: 'Seg a Sex: 8h-18h | Sáb: 8h-14h',
  },
]

export default function UnitsPage() {
  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-3xl md:text-4xl font-bold mb-3">Nossas Unidades</h1>
        <p className="text-lg text-muted-foreground">
          7 lojas em Piracicaba para atendê-lo com qualidade e variedade. Escolha a mais próxima de você!
        </p>
      </header>

      <div className="grid gap-6 md:grid-cols-2">
        {units.map((unit) => (
          <article key={unit.id} className="rounded-lg border p-5 space-y-3">
            <h2 className="text-xl font-semibold">{unit.name}</h2>
            <div className="space-y-2 text-sm">
              <div className="flex items-start gap-2">
                <MapPin className="h-4 w-4 text-muted-foreground mt-0.5 shrink-0" aria-hidden />
                <span>{unit.address}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-muted-foreground shrink-0" aria-hidden />
                <div className="flex flex-col sm:flex-row sm:gap-3">
                  <span>
                    <strong>Fixo:</strong> {unit.phone}
                  </span>
                  <span>
                    <strong>WhatsApp:</strong>{' '}
                    <a
                      href={`https://wa.me/55${unit.whatsapp.replace(/\D/g, '')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline"
                    >
                      {unit.whatsapp}
                    </a>
                  </span>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <Clock className="h-4 w-4 text-muted-foreground mt-0.5 shrink-0" aria-hidden />
                <span>{unit.hours}</span>
              </div>
            </div>
          </article>
        ))}
      </div>

      <aside className="bg-muted/30 rounded-lg p-6 text-center">
        <p className="text-sm text-muted-foreground">
          <strong>Nota:</strong> Os endereços, telefones e horários são exemplos. Atualize com os dados reais de cada unidade.
        </p>
      </aside>
    </div>
  )
}
