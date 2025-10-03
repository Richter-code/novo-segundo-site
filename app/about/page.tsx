export const metadata = {
  title: 'Sobre — AgroAI',
  description: 'Nossa missão: levar tecnologia ao produtor rural.'
}

export default function About() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Sobre a AgroAI</h2>
      <p>
        A AgroAI nasceu com o objetivo de apoiar produtores rurais com recomendações práticas, monitoramento
        de lavouras e automação de decisões. Unimos agronomia, ciência de dados e tecnologia embarcada.
      </p>
      <section className="grid md:grid-cols-2 gap-6">
        <div>
          <h3 className="font-semibold">Nossa equipe</h3>
          <p>Engenheiros agrônomos, cientistas de dados e desenvolvedores trabalhando para resultados mensuráveis.</p>
        </div>
        <div>
          <h3 className="font-semibold">Visão</h3>
          <p>Promover produtividade sustentável e lucratividade para pequenas e médias propriedades.</p>
        </div>
      </section>
    </div>
  )
}
