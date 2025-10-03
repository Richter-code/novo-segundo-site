import { NextResponse } from 'next/server'
import OpenAI from 'openai'

export const dynamic = 'force-dynamic'

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const prompt = searchParams.get('prompt') || ''
  const key = process.env.OPENAI_API_KEY
  if (!key) return new NextResponse('OpenAI key not set', { status: 500 })

  const client = new OpenAI({ apiKey: key })

  const stream = new ReadableStream<Uint8Array>({
    async start(controller) {
      const encoder = new TextEncoder()
      try {
        const completion = await client.chat.completions.create({
          model: 'gpt-4o-mini',
          stream: true,
          messages: [
            { role: 'system', content: 'Você é um assistente especializado em agropecuária.' },
            { role: 'user', content: prompt },
          ],
        })

        for await (const chunk of completion) {
          const delta = chunk.choices?.[0]?.delta?.content
          if (delta) {
            controller.enqueue(encoder.encode(`data: ${delta}\n\n`))
          }
        }
        controller.enqueue(encoder.encode('event: end\ndata: [DONE]\n\n'))
        controller.close()
      } catch {
        controller.enqueue(encoder.encode('event: error\ndata: error\n\n'))
        controller.close()
      }
    },
  })

  return new NextResponse(stream, {
    headers: {
      'Content-Type': 'text/event-stream; charset=utf-8',
      'Cache-Control': 'no-cache, no-transform',
      Connection: 'keep-alive',
      'X-Accel-Buffering': 'no',
    },
  })
}
