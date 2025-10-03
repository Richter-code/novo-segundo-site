import Hero from '../components/Hero'
import Card from '../components/Card'

export default function Home() {
  return (
    <div className="space-y-8">
      <Hero />
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card title="Consultoria Agronômica">Avaliações de solo e recomendações de manejo para aumentar produtividade.</Card>
        <Card title="Monitoramento">Soluções com imagens de satélite e sensores IoT para detecção precoce de pragas.</Card>
        <Card title="Assistente Virtual">Pergunte ao nosso assistente sobre manejo, nutrição e práticas sustentáveis.</Card>
      </section>
    </div>
  )
}
