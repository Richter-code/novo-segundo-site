'use client';
import NewsletterForm from './NewsletterForm';
import { siteConfig, waLink } from '../lib/site';

export default function Footer() {
  return (
    <footer className="border-t border-border py-10 mt-12 bg-background">
      <div className="container mx-auto px-6 text-sm">
        <div className="grid md:grid-cols-4 gap-8">
          <div className="space-y-2">
            <div className="font-semibold">Atendimento</div>
            <div>{siteConfig.hours}</div>
            <div>
              <a
                href={`tel:${siteConfig.supportPhone}`}
                className="hover:underline"
              >
                {siteConfig.supportPhone}
              </a>
            </div>
            <div>
              <a
                href={waLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline"
              >
                WhatsApp
              </a>
            </div>
            <div>
              <a
                href={`mailto:${siteConfig.supportEmail}`}
                className="hover:underline"
              >
                {siteConfig.supportEmail}
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
          <div className="mt-2 flex items-center justify-center gap-4 text-xs">
            {siteConfig.socials.instagram ? (
              <a
                href={siteConfig.socials.instagram}
                target="_blank"
                rel="noreferrer"
                className="hover:underline"
              >
                Instagram
              </a>
            ) : null}
            {siteConfig.socials.facebook ? (
              <a
                href={siteConfig.socials.facebook}
                target="_blank"
                rel="noreferrer"
                className="hover:underline"
              >
                Facebook
              </a>
            ) : null}
            {siteConfig.socials.youtube ? (
              <a
                href={siteConfig.socials.youtube}
                target="_blank"
                rel="noreferrer"
                className="hover:underline"
              >
                YouTube
              </a>
            ) : null}
            {siteConfig.socials.tiktok ? (
              <a
                href={siteConfig.socials.tiktok}
                target="_blank"
                rel="noreferrer"
                className="hover:underline"
              >
                TikTok
              </a>
            ) : null}
          </div>
        </div>
      </div>
    </footer>
  );
}
