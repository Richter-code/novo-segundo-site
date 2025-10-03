// Temporariamente desabilitado - configure gray-matter e filesystem access
export type PostMeta = { slug: string; title: string; date: string; excerpt?: string }

export async function listPosts(): Promise<PostMeta[]> {
  return []
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function getPost(_slug: string): Promise<{ meta: Omit<PostMeta, 'slug'>; content: string }> {
  return { meta: { title: 'Placeholder', date: '2025-10-02' }, content: 'Configure MDX primeiro' }
}
