// import { prisma } from '../../lib/prisma'

export const metadata = { title: 'Produtos — AgroAI' }

export default async function ProductsPage() {
  // Mock data até configurar o banco
  const products = [
    { id: '1', name: 'Kit Análise de Solo', description: 'Coleta + relatório em 48h', price: { toString: () => '199.90' } },
    { id: '2', name: 'Monitoramento por Satélite', description: 'Acompanhamento NDVI mensal', price: { toString: () => '349.00' } },
    { id: '3', name: 'Consultoria Agronômica', description: 'Avaliação personalizada da propriedade', price: { toString: () => '499.00' } },
  ]
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Produtos</h2>
      <div className="grid md:grid-cols-3 gap-6">
        {products.map((p) => (
          <div key={p.id} className="rounded border p-4 flex flex-col">
            <div className="font-semibold text-lg">{p.name}</div>
            <div className="text-sm text-muted-foreground mb-2">{p.description}</div>
            <div className="mt-auto flex items-center justify-between">
              <span className="font-semibold">R$ {p.price.toString()}</span>
              <button className="px-3 py-2 bg-primary text-primary-foreground rounded">Comprar</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
