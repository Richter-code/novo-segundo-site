import { PawPrint, Waves, Leaf, Stethoscope, Droplets, ShowerHead } from 'lucide-react'

export const metadata = {
  title: 'Produtos & Serviços — Agro Mané',
  description: 'Tudo para Pet, Piscina e Jardim: rações, veterinários, banho & tosa, tratamento de água, adubos e mais.',
}

export default function Services() {
  return (
    <div className="space-y-10">
      <header>
        <h1 className="text-3xl md:text-4xl font-bold mb-3">Produtos & Serviços</h1>
        <p className="text-lg text-muted-foreground">
          Soluções completas para pets, piscinas e jardins. Qualidade, variedade e atendimento especializado.
        </p>
      </header>

      {/* Pet */}
      <section className="space-y-4">
        <div className="flex items-center gap-3">
          <PawPrint className="h-8 w-8 text-emerald-600" aria-hidden />
          <h2 className="text-2xl font-semibold">Pet</h2>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="rounded-lg border p-5">
            <h3 className="font-semibold text-lg mb-2">Rações e Petiscos</h3>
            <p className="text-sm text-muted-foreground">
              Variedade completa de rações premium, super premium e standard para cães, gatos, aves e peixes. 
              Petiscos, suplementos e alimentos naturais.
            </p>
          </div>
          <div className="rounded-lg border p-5">
            <h3 className="font-semibold text-lg mb-2">Acessórios e Brinquedos</h3>
            <p className="text-sm text-muted-foreground">
              Casinhas, camas, coleiras, guias, roupas, brinquedos interativos e tudo para o conforto do seu pet.
            </p>
          </div>
          <div className="rounded-lg border p-5 bg-primary/5">
            <div className="flex items-start gap-2">
              <Stethoscope className="h-5 w-5 text-primary mt-0.5" aria-hidden />
              <div>
                <h3 className="font-semibold text-lg mb-2">Veterinários Parceiros</h3>
                <p className="text-sm text-muted-foreground">
                  Contamos com veterinários disponíveis para consultas, vacinas e orientações. Agende na loja mais próxima.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-lg border p-5 bg-primary/5">
            <div className="flex items-start gap-2">
              <ShowerHead className="h-5 w-5 text-primary mt-0.5" aria-hidden />
              <div>
                <h3 className="font-semibold text-lg mb-2">Banho & Tosa</h3>
                <p className="text-sm text-muted-foreground">
                  Serviço de banho, tosa higiênica e estética com equipe parceira qualificada. Agende e deixe seu pet lindo!
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Piscina */}
      <section className="space-y-4">
        <div className="flex items-center gap-3">
          <Waves className="h-8 w-8 text-sky-600" aria-hidden />
          <h2 className="text-2xl font-semibold">Piscina</h2>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="rounded-lg border p-5">
            <h3 className="font-semibold text-lg mb-2">Tratamento de Água</h3>
            <p className="text-sm text-muted-foreground">
              Cloro, algicidas, clarificantes, estabilizadores de pH e kits completos para manter sua piscina cristalina e segura.
            </p>
          </div>
          <div className="rounded-lg border p-5">
            <h3 className="font-semibold text-lg mb-2">Equipamentos</h3>
            <p className="text-sm text-muted-foreground">
              Filtros, bombas, aquecedores, aspiradores, peneiras e acessórios para limpeza e manutenção profissional.
            </p>
          </div>
          <div className="rounded-lg border p-5">
            <div className="flex items-start gap-2">
              <Droplets className="h-5 w-5 text-sky-600 mt-0.5" aria-hidden />
              <div>
                <h3 className="font-semibold text-lg mb-2">Consultoria Especializada</h3>
                <p className="text-sm text-muted-foreground">
                  Nossa equipe oferece orientação gratuita para ajustar a química da água e resolver problemas como algas e turbidez.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Jardim / Agro */}
      <section className="space-y-4">
        <div className="flex items-center gap-3">
          <Leaf className="h-8 w-8 text-green-700" aria-hidden />
          <h2 className="text-2xl font-semibold">Jardim / Agro</h2>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="rounded-lg border p-5">
            <h3 className="font-semibold text-lg mb-2">Sementes e Mudas</h3>
            <p className="text-sm text-muted-foreground">
              Sementes de hortaliças, flores, gramados e árvores. Mudas frutíferas, ornamentais e plantas para horta caseira.
            </p>
          </div>
          <div className="rounded-lg border p-5">
            <h3 className="font-semibold text-lg mb-2">Adubos e Substratos</h3>
            <p className="text-sm text-muted-foreground">
              Adubos orgânicos, NPK, substratos, condicionadores de solo e húmus para jardins, hortas e gramados.
            </p>
          </div>
          <div className="rounded-lg border p-5">
            <h3 className="font-semibold text-lg mb-2">Ferramentas e Equipamentos</h3>
            <p className="text-sm text-muted-foreground">
              Pás, enxadas, regadores, mangueiras, pulverizadores e equipamentos para manutenção de áreas verdes.
            </p>
          </div>
          <div className="rounded-lg border p-5">
            <h3 className="font-semibold text-lg mb-2">Defensivos Legalizados</h3>
            <p className="text-sm text-muted-foreground">
              Produtos certificados para controle de pragas e doenças em jardins e pequenas culturas, com orientação de uso.
            </p>
          </div>
        </div>
      </section>

      {/* Entrega */}
      <section className="bg-muted/30 rounded-lg p-6 text-center">
        <h2 className="text-xl font-semibold mb-2">Entrega em Domicílio</h2>
        <p className="text-muted-foreground">
          Facilitamos sua vida: pedidos acima de um valor mínimo têm frete grátis em Piracicaba. 
          Consulte condições na loja mais próxima ou pelo WhatsApp.
        </p>
      </section>
    </div>
  )
}
