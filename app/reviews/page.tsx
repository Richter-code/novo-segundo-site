import { Star } from 'lucide-react'

export const metadata = {
  title: 'Avaliações — Agro Mané',
  description: 'Veja o que nossos clientes dizem sobre a Agro Mané: atendimento, variedade, preços e entrega.',
}

type Review = {
  id: number
  name: string
  location: string
  rating: number
  comment: string
}

const reviews: Review[] = [
  {
    id: 1,
    name: 'Maria Silva',
    location: 'Centro, Piracicaba',
    rating: 5,
    comment:
      'Atendimento excepcional! A equipe é super atenciosa e sempre me ajuda a escolher a melhor ração para minha cachorrinha. Preços justos e variedade incrível.',
  },
  {
    id: 2,
    name: 'João Santos',
    location: 'Vila Rezende, Piracicaba',
    rating: 5,
    comment:
      'Compro tudo para minha piscina na Agro Mané há anos. Produtos de qualidade e orientação gratuita para manter a água sempre cristalina. Recomendo!',
  },
  {
    id: 3,
    name: 'Ana Paula',
    location: 'Paulista, Piracicaba',
    rating: 5,
    comment:
      'A entrega em domicílio é rápida e o pessoal do banho & tosa faz um trabalho impecável. Meu gato sempre volta lindinho e cheiroso!',
  },
  {
    id: 4,
    name: 'Carlos Mendes',
    location: 'Santa Terezinha, Piracicaba',
    rating: 5,
    comment:
      'Ótima variedade de sementes e adubos para minha horta caseira. Os funcionários entendem muito do assunto e sempre dão dicas valiosas.',
  },
  {
    id: 5,
    name: 'Fernanda Costa',
    location: 'Jardim Elite, Piracicaba',
    rating: 5,
    comment:
      'Tradição e qualidade! Compro na Agro Mané desde que me mudei para Piracicaba. Preços honestos e sempre encontro o que preciso.',
  },
]

export default function ReviewsPage() {
  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-3xl md:text-4xl font-bold mb-3">Avaliações de Clientes</h1>
        <p className="text-lg text-muted-foreground">
          Veja o que nossos clientes falam sobre nossos produtos, atendimento e serviços.
        </p>
      </header>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {reviews.map((review) => (
          <article key={review.id} className="rounded-lg border p-5 space-y-3 flex flex-col">
            <div className="flex items-center gap-2">
              {Array.from({ length: review.rating }).map((_, i) => (
                <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" aria-hidden />
              ))}
            </div>
            <p className="text-sm flex-1">&ldquo;{review.comment}&rdquo;</p>
            <footer className="text-sm text-muted-foreground">
              <div className="font-semibold">{review.name}</div>
              <div>{review.location}</div>
            </footer>
          </article>
        ))}
      </div>

      <aside className="bg-primary/5 rounded-lg p-6 text-center">
        <h2 className="text-xl font-semibold mb-2">Deixe sua Avaliação</h2>
        <p className="text-muted-foreground mb-4">
          Sua opinião é importante para nós! Compartilhe sua experiência nas redes sociais ou deixe um comentário em nossas lojas.
        </p>
      </aside>

      <aside className="bg-muted/30 rounded-lg p-4 text-center text-sm text-muted-foreground">
        <strong>Nota:</strong> As avaliações acima são exemplos. Substitua pelos depoimentos reais de clientes.
      </aside>
    </div>
  )
}
