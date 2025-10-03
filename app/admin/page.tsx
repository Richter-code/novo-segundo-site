// import { prisma } from '../../lib/prisma'
import Link from 'next/link'

export const metadata = { title: 'Dashboard — AgroAI' }

export default async function AdminPage() {
  // Mock data até configurar o banco
  const products = [
    { id: '1', name: 'Kit Análise de Solo', price: { toString: () => '199.90' } },
    { id: '2', name: 'Monitoramento Satélite', price: { toString: () => '349.00' } },
  ]
  const posts = [
    { id: '1', title: 'Saúde do Solo: Guia Prático', published: true },
    { id: '2', title: 'Detecção de Pragas', published: true },
  ]

  return (
    <div className="space-y-8">
      <section>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-xl font-bold">Produtos</h2>
          <Link href="#" className="text-sm underline">Novo produto</Link>
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          {products.map((p) => (
            <div key={p.id} className="border rounded p-4">
              <div className="font-semibold">{p.name}</div>
              <div className="text-sm text-muted-foreground">R$ {p.price.toString()}</div>
              <div className="flex gap-2 mt-2">
                <button className="px-3 py-1 border rounded">Editar</button>
                <button className="px-3 py-1 border rounded">Excluir</button>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-xl font-bold">Artigos</h2>
          <Link href="#" className="text-sm underline">Novo artigo</Link>
        </div>
        <div className="space-y-3">
          {posts.map((p) => (
            <div key={p.id} className="border rounded p-4 flex items-center justify-between">
              <div>
                <div className="font-semibold">{p.title}</div>
                <div className="text-sm text-muted-foreground">{p.published ? 'Publicado' : 'Rascunho'}</div>
              </div>
              <div className="flex gap-2">
                <button className="px-3 py-1 border rounded">Editar</button>
                <button className="px-3 py-1 border rounded">Excluir</button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
