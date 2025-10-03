"use client"

import { useState, useRef } from 'react'

export default function AssistantChat() {
  const [query, setQuery] = useState('')
  const [loading, setLoading] = useState(false)
  const [messages, setMessages] = useState<{ from: 'user' | 'assistant'; text: string }[]>([])
  const controllerRef = useRef<AbortController | null>(null)

  const send = async () => {
    if (!query.trim()) return
    const userMsg = { from: 'user' as const, text: query }
    setMessages((m) => [...m, userMsg])
    setQuery('')
    setLoading(true)
    try {
      controllerRef.current?.abort()
      const ctrl = new AbortController()
      controllerRef.current = ctrl
      const res = await fetch(`/api/assistant/stream?prompt=${encodeURIComponent(userMsg.text)}`, {
        signal: ctrl.signal,
      })
      const reader = res.body?.getReader()
      const decoder = new TextDecoder()
      let acc = ''
      setMessages((m) => [...m, { from: 'assistant', text: '' }])
      if (!reader) throw new Error('stream error')
      // loop de leitura do stream
      // eslint-disable-next-line no-constant-condition
      while (true) {
        const { value, done } = await reader.read()
        if (done) break
        const chunk = decoder.decode(value)
        const lines = chunk.split('\n\n').filter(Boolean)
        for (const line of lines) {
          if (line.startsWith('data: ')) {
            const delta = line.replace('data: ', '')
            if (delta !== '[DONE]') {
              acc += delta
              setMessages((m) => {
                const copy = [...m]
                copy[copy.length - 1] = { from: 'assistant', text: acc }
                return copy
              })
            }
          }
        }
      }
    } catch {
      setMessages((m) => [...m, { from: 'assistant', text: 'Erro ao contatar assistente.' }])
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-3xl space-y-4">
      <div className="space-y-2">
        {messages.map((m, i) => (
          <div
            key={i}
            className={
              'p-3 rounded ' + (m.from === 'user' ? 'bg-primary text-primary-foreground self-end' : 'bg-card text-card-foreground')
            }
          >
            {m.text}
          </div>
        ))}
      </div>
      <div className="flex gap-2">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="flex-1 rounded border px-3 py-2"
          placeholder="Pergunte algo sobre manejo de solo, pragas ou produtividade..."
        />
        <button onClick={send} disabled={loading} className="px-4 py-2 bg-primary text-primary-foreground rounded">
          {loading ? '...' : 'Enviar'}
        </button>
      </div>
    </div>
  )
}
