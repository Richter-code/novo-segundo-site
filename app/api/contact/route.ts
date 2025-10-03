import { NextResponse } from 'next/server'
import { z } from 'zod'

const contactSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  message: z.string().min(5),
})

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const data = contactSchema.parse(body)

    // Aqui você poderia salvar em DB, enviar email, etc. No scaffold apenas logamos.
    // eslint-disable-next-line no-console
    console.log('Contact received:', data)

    return NextResponse.json({ ok: true })
  } catch (e: unknown) {
    const message = e instanceof Error ? e.message : 'invalid'
    return NextResponse.json({ ok: false, error: message }, { status: 400 })
  }
}
