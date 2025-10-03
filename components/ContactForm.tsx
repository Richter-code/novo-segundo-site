"use client"

import React from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

const contactSchema = z.object({
  name: z.string().min(2, 'Nome muito curto'),
  email: z.string().email('Email inválido'),
  message: z.string().min(5, 'Mensagem muito curta'),
})

type ContactData = z.infer<typeof contactSchema>

export default function ContactForm() {
  const { register, handleSubmit, formState, reset } = useForm<ContactData>({
    resolver: zodResolver(contactSchema),
  })

  const [status, setStatus] = React.useState<'idle' | 'sending' | 'success' | 'error'>('idle')

  const onSubmit = async (data: ContactData) => {
    try {
      setStatus('sending')
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      if (!res.ok) throw new Error('Erro no envio')
      setStatus('success')
      reset()
    } catch (e) {
      console.error(e)
      setStatus('error')
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 max-w-md">
      <div>
        <label className="block text-sm font-medium">Nome</label>
        <input {...register('name')} className="mt-1 block w-full rounded border px-3 py-2" />
      </div>
      <div>
        <label className="block text-sm font-medium">Email</label>
        <input {...register('email')} className="mt-1 block w-full rounded border px-3 py-2" />
      </div>
      <div>
        <label className="block text-sm font-medium">Mensagem</label>
        <textarea {...register('message')} className="mt-1 block w-full rounded border px-3 py-2" />
      </div>
      <div>
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded" disabled={status === 'sending'}>
          {status === 'sending' ? 'Enviando...' : 'Enviar'}
        </button>
      </div>
      {formState.errors && (
        <pre className="text-sm text-red-600">{JSON.stringify(formState.errors, null, 2)}</pre>
      )}
      {status === 'success' && <p className="text-green-600">Mensagem enviada com sucesso. Obrigado!</p>}
      {status === 'error' && <p className="text-red-600">Erro ao enviar. Tente novamente mais tarde.</p>}
    </form>
  )
}
