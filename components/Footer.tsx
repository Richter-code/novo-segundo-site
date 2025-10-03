export default function Footer() {
  return (
    <footer className="border-t border-border py-8 mt-12 bg-background">
      <div className="container mx-auto px-6 text-center text-sm text-muted-foreground">
        <p>© {new Date().getFullYear()} Agro Mané. Todos os direitos reservados.</p>
        <p className="mt-1">7 lojas em Piracicaba-SP | Tudo para Pet, Piscina e Jardim</p>
      </div>
    </footer>
  )
}
