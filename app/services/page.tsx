export const metadata = {
  title: 'Serviços — AgroAI',
  description: 'Serviços para manejo, monitoramento e análise de resultados.'
}

export default function Services() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Serviços</h2>
      <p>Oferecemos um portfólio de soluções adaptadas ao seu tamanho de produção.</p>
      <ul className="grid md:grid-cols-2 gap-4">
        <li className="p-4 border border-border rounded">Diagnóstico de solo e foliar</li>
        <li className="p-4 border border-border rounded">Monitoramento por satélite e drones</li>
        <li className="p-4 border border-border rounded">Plano de manejo integrado de pragas</li>
        <li className="p-4 border border-border rounded">Assistente virtual para suporte técnico</li>
      </ul>
    </div>
  )
}
