import ContactForm from '../components/ContactForm'

export default function Home() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Bem vindo ao scaffold</h1>
      <p className="mb-6">Exemplo de formulário usando react-hook-form + zod</p>
      <ContactForm />
    </div>
  )
}
