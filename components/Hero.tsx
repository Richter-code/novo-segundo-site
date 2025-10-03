import Button from './Button'

export default function Hero() {
  return (
    <section className="rounded-lg p-8 bg-gradient-to-r from-green-50 to-green-100 dark:from-green-900 dark:to-green-800 shadow-md">
      <div className="max-w-3xl">
        <h1 className="text-3xl md:text-4xl font-extrabold mb-4">AgroAI — Tecnologia para sua produção</h1>
        <p className="text-lg mb-6">Consultoria, monitoramento e assistente virtual para otimizar produtividade e reduzir custos no campo.</p>
        <div className="flex gap-3">
          <Button>Conhecer serviços</Button>
        </div>
      </div>
    </section>
  )
}
