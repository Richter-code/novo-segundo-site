import AssistantClient from '../../components/AssistantClient'

export const metadata = {
  title: 'Assistente — AgroAI',
  description: 'Assistente virtual para dúvidas técnicas sobre agropecuária.'
}

export default function AssistantPage() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Assistente Virtual</h2>
      <p>Converse com nosso assistente para obter recomendações práticas.</p>
      <AssistantClient />
    </div>
  )
}
