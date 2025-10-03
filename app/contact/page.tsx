import ContactForm from '../../components/ContactForm'

export const metadata = {
  title: 'Contato — AgroAI',
  description: 'Entre em contato para solicitar orçamento ou tirar dúvidas.'
}

export default function Contact() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Contato</h2>
      <p>Preencha o formulário abaixo e nossa equipe entrará em contato.</p>
      <ContactForm />
    </div>
  )
}
