import ContactForm from '../../components/ContactForm'
import { Phone, Mail, MessageCircle, Facebook, Instagram } from 'lucide-react'

export const metadata = {
  title: 'Contato — Agro Mané',
  description: 'Entre em contato conosco: WhatsApp, telefone, e-mail ou visite uma de nossas 7 lojas em Piracicaba.',
}

export default function Contact() {
  const whatsappNumber = '5519999990000' // Substitua pelo número oficial
  const whatsappMessage = 'Olá! Gostaria de mais informações sobre produtos e serviços.'

  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-3xl md:text-4xl font-bold mb-3">Fale Conosco</h1>
        <p className="text-lg text-muted-foreground">
          Estamos prontos para atender você. Escolha o canal de sua preferência.
        </p>
      </header>

      {/* Canais de Contato */}
      <section className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
        <a
          href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center gap-2 rounded-lg border p-5 hover:bg-muted/50 transition"
        >
          <MessageCircle className="h-8 w-8 text-green-600" aria-hidden />
          <span className="font-semibold">WhatsApp</span>
          <span className="text-sm text-muted-foreground">Fale agora</span>
        </a>
        <a
          href="tel:+551934210000"
          className="flex flex-col items-center gap-2 rounded-lg border p-5 hover:bg-muted/50 transition"
        >
          <Phone className="h-8 w-8 text-primary" aria-hidden />
          <span className="font-semibold">Telefone</span>
          <span className="text-sm text-muted-foreground">(19) 3421-0000</span>
        </a>
        <a
          href="mailto:contato@agromane.com.br"
          className="flex flex-col items-center gap-2 rounded-lg border p-5 hover:bg-muted/50 transition"
        >
          <Mail className="h-8 w-8 text-primary" aria-hidden />
          <span className="font-semibold">E-mail</span>
          <span className="text-sm text-muted-foreground">contato@agromane.com.br</span>
        </a>
        <div className="flex flex-col items-center gap-2 rounded-lg border p-5">
          <div className="flex gap-3">
            <a
              href="https://facebook.com/agromane"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook da Agro Mané"
              className="hover:text-primary"
            >
              <Facebook className="h-6 w-6" aria-hidden />
            </a>
            <a
              href="https://instagram.com/agromane"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram da Agro Mané"
              className="hover:text-primary"
            >
              <Instagram className="h-6 w-6" aria-hidden />
            </a>
          </div>
          <span className="font-semibold">Redes Sociais</span>
          <span className="text-sm text-muted-foreground">Siga-nos</span>
        </div>
      </section>

      {/* Formulário */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">Envie uma Mensagem</h2>
        <p className="text-muted-foreground mb-4">
          Preencha o formulário abaixo e nossa equipe entrará em contato o mais breve possível.
        </p>
        <ContactForm />
      </section>

      <aside className="bg-muted/30 rounded-lg p-4 text-sm text-muted-foreground">
        <strong>Nota:</strong> Atualize o número de WhatsApp, telefone, e-mail e links de redes sociais com os dados oficiais.
      </aside>
    </div>
  )
}
