import { NextResponse } from 'next/server'
import OpenAI from 'openai'

export async function POST(req: Request) {
  const { prompt } = await req.json()

  const key = process.env.OPENAI_API_KEY

  if (!key) {
    return NextResponse.json({ reply: 'OpenAI API key não configurada no servidor.' }, { status: 500 })
  }

  const client = new OpenAI({ apiKey: key })

  try {
    const completion = await client.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [{ role: 'system', content: 'Você é um assistente especializado em agropecuária.' }, { role: 'user', content: prompt }],
      max_tokens: 600,
    })

    const text = completion.choices?.[0]?.message?.content || 'Sem resposta'
    return NextResponse.json({ reply: text })
  } catch {
    return NextResponse.json({ reply: 'Erro ao consultar o serviço de IA.' }, { status: 500 })
  }
}
