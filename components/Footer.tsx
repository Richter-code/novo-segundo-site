export default function Footer() {
  return (
    <footer className="border-t border-border py-8 mt-12 bg-background">
      <div className="container mx-auto px-6 text-center text-sm text-muted-foreground">
        <p>© {new Date().getFullYear()} AgroAI. Todos os direitos reservados.</p>
      </div>
    </footer>
  )
}
