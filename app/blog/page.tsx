import Link from 'next/link'
// import { listPosts, type PostMeta } from '../../lib/mdx'

export const metadata = {
  title: 'Blog — AgroAI',
  description: 'Artigos e novidades sobre tecnologia para o campo.'
}

type PostMeta = { slug: string; title: string; excerpt?: string }

export default async function Blog() {
  // Mock data até configurar MDX
  const posts: PostMeta[] = [
    { slug: 'como-melhorar-solo', title: 'Como melhorar a saúde do solo', excerpt: 'Práticas de rotação e adubação para recuperar produtividade.' },
    { slug: 'deteccao-pragas', title: 'Detecção precoce de pragas com imagens', excerpt: 'Fluxo de trabalho usando imagens multiespectrais.' },
  ]
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Blog</h2>
      <div className="grid md:grid-cols-2 gap-4">
        {posts.map((p) => (
          <Link key={p.slug} href={`/blog/${p.slug}`} className="p-4 border border-border rounded block">
            <h3 className="font-semibold">{p.title}</h3>
            <p className="text-sm text-muted-foreground">{p.excerpt}</p>
          </Link>
        ))}
      </div>
    </div>
  )
}
