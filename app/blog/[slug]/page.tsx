export async function generateStaticParams() {
  return [
    { slug: 'como-melhorar-solo' },
    { slug: 'deteccao-pragas' },
  ]
}

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const posts: Record<string, { title: string; date: string; content: string }> = {
    'como-melhorar-solo': {
      title: 'Como melhorar a saúde do solo',
      date: '2025-10-02',
      content:
        'Melhorar a saúde do solo envolve: rotação de culturas, cobertura vegetal, adubação orgânica. A análise periódica de solo é essencial para decisões de adubação.',
    },
    'deteccao-pragas': {
      title: 'Detecção precoce de pragas com imagens',
      date: '2025-10-02',
      content:
        'Utilize imagens multiespectrais e algoritmos de visão computacional para detectar pragas antes que causem danos significativos às culturas.',
    },
  }

  const post = posts[slug] || { title: 'Post não encontrado', date: '', content: 'Este post não existe.' }

  return (
    <article className="prose dark:prose-invert max-w-none">
      <h1 className="text-3xl font-bold mb-2">{post.title}</h1>
      <p className="text-sm text-muted-foreground mb-6">{post.date}</p>
      <div className="whitespace-pre-line">{post.content}</div>
    </article>
  )
}
