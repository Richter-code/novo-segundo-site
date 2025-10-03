export const metadata = {
  title: 'Sobre Nós — Agro Mané',
  description: 'Conheça a história da Agro Mané: 30+ anos de tradição, 7 lojas em Piracicaba e compromisso com a comunidade.',
}

export default function About() {
  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-3xl md:text-4xl font-bold mb-3">Sobre a Agro Mané</h1>
        <p className="text-lg text-muted-foreground">
          Uma história de tradição, crescimento e compromisso com Piracicaba.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Nossa História</h2>
        <div className="prose dark:prose-invert max-w-none">
          <p>
            Fundada em <strong>1991</strong> por <strong>Manuel &ldquo;Mané&rdquo; Severi</strong>, a Agro Mané nasceu com o objetivo de 
            oferecer produtos de qualidade e atendimento diferenciado para pets, piscinas e jardins em Piracicaba.
          </p>
          <p>
            Ao longo de mais de <strong>30 anos</strong>, crescemos de uma única loja para uma rede de <strong>7 unidades</strong> 
            espalhadas pela cidade, sempre mantendo os valores familiares e o compromisso com nossos clientes.
          </p>
          <p>
            Hoje, somos referência em variedade de produtos, preços justos, atendimento humanizado e serviços especializados 
            como veterinários parceiros, banho & tosa e entrega em domicílio.
          </p>
        </div>
      </section>

      <section className="grid md:grid-cols-2 gap-6">
        <div className="rounded-lg border p-6">
          <h3 className="text-xl font-semibold mb-3">Tradição Familiar</h3>
          <p className="text-muted-foreground">
            Desde a fundação, mantemos o espírito familiar e o cuidado pessoal com cada cliente. 
            Nosso time conhece as necessidades da comunidade e está sempre pronto para ajudar.
          </p>
        </div>
        <div className="rounded-lg border p-6">
          <h3 className="text-xl font-semibold mb-3">Responsabilidade Social</h3>
          <p className="text-muted-foreground">
            Promovemos regularmente <strong>feirinhas de adoção</strong> em parceria com ONGs locais, 
            contribuindo para o bem-estar animal e a conscientização da comunidade.
          </p>
        </div>
      </section>

      <section className="bg-muted/30 rounded-lg p-6">
        <h2 className="text-2xl font-semibold mb-4">Nossos Valores</h2>
        <ul className="grid md:grid-cols-3 gap-4">
          <li className="flex items-start gap-2">
            <span className="text-primary text-xl">✓</span>
            <div>
              <strong>Qualidade</strong>
              <p className="text-sm text-muted-foreground">Produtos selecionados e serviços de excelência.</p>
            </div>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-primary text-xl">✓</span>
            <div>
              <strong>Atendimento</strong>
              <p className="text-sm text-muted-foreground">Equipe treinada e pronta para orientar.</p>
            </div>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-primary text-xl">✓</span>
            <div>
              <strong>Comunidade</strong>
              <p className="text-sm text-muted-foreground">Compromisso social e apoio à adoção responsável.</p>
            </div>
          </li>
        </ul>
      </section>
    </div>
  )
}
