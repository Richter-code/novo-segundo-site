'use client';
import NewsletterForm from './NewsletterForm';

export default function Footer() {
  return (
    <footer className="border-t border-border py-10 mt-12 bg-background">
      <div className="container mx-auto px-6 text-sm">
        <div className="grid md:grid-cols-4 gap-8">
          <div className="space-y-2">
            <div className="font-semibold">Atendimento</div>
            <div>Seg a Sex - 09:00 às 17:30</div>
            <div>
              <a href="tel:+551933000000" className="hover:underline">
                (19) 3300-0000
              </a>
            </div>
            <div>
              <a
                href={`https://wa.me/${
                  process.env.NEXT_PUBLIC_WHATSAPP_PHONE || '5519999999999'
                }`}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline"
              >
                WhatsApp
              </a>
            </div>
            <div>
              <a
                href="mailto:contato@agromane.com.br"
                className="hover:underline"
              >
                contato@agromane.com.br
              </a>
            </div>
          </div>
          <div className="space-y-2">
            <div className="font-semibold">Institucional</div>
            <ul className="space-y-1 text-muted-foreground">
              <li>
                <a href="/about" className="hover:underline">
                  A empresa
                </a>
              </li>
              <li>
                <a href="/contact" className="hover:underline">
                  Atendimento
                </a>
              </li>
              <li>
                <a href="/policies/delivery" className="hover:underline">
                  Políticas de Entrega
                </a>
              </li>
              <li>
                <a href="/policies/privacy" className="hover:underline">
                  Política de Privacidade
                </a>
              </li>
            </ul>
          </div>
          <div className="space-y-2">
            <div className="font-semibold">Páginas</div>
            <ul className="space-y-1 text-muted-foreground">
              <li>
                <a href="/products" className="hover:underline">
                  Produtos
                </a>
              </li>
              <li>
                <a href="/categories" className="hover:underline">
                  Categorias
                </a>
              </li>
              <li>
                <a href="/units" className="hover:underline">
                  Unidades
                </a>
              </li>
              <li>
                <a href="/blog" className="hover:underline">
                  Blog
                </a>
              </li>
            </ul>
          </div>
          <div className="space-y-3">
            <div className="font-semibold">Receba promoções</div>
            <p className="text-muted-foreground">
              Cadastre seu e-mail e receba ofertas e novidades.
            </p>
            <NewsletterForm />
          </div>
        </div>

        <div className="mt-8 text-center text-muted-foreground">
          <p>
            © {new Date().getFullYear()} Agro Mané. Todos os direitos
            reservados.
          </p>
          <p className="mt-1">
            7 lojas em Piracicaba-SP | Tudo para Pet, Piscina e Jardim
          </p>
        </div>
      </div>
    </footer>
  );
}
