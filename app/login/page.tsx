"use client"

import { signIn } from 'next-auth/react'
import { useState } from 'react'

export const metadata = {
  title: 'Login — AgroAI'
}

export default function LoginPage() {
  const [email, setEmail] = useState('admin@example.com')
  const [password, setPassword] = useState('admin123')
  const [loading, setLoading] = useState(false)

  const submit = async () => {
    setLoading(true)
    await signIn('credentials', { email, password, callbackUrl: '/' })
    setLoading(false)
  }

  return (
    <div className="max-w-sm mx-auto space-y-4">
      <h2 className="text-2xl font-bold">Entrar</h2>
      <label className="block text-sm font-medium">
        Email
        <input className="w-full border rounded px-3 py-2 mt-1" placeholder="seu@email.com" value={email} onChange={(e) => setEmail(e.target.value)} />
      </label>
      <label className="block text-sm font-medium">
        Senha
        <input className="w-full border rounded px-3 py-2 mt-1" placeholder="••••••" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </label>
      <button className="w-full bg-primary text-primary-foreground rounded py-2" onClick={submit} disabled={loading}>
        {loading ? '...' : 'Entrar'}
      </button>
    </div>
  )
}
