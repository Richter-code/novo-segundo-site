'use client'

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
  const { register, handleSubmit, formState } = useForm<ContactData>({
    resolver: zodResolver(contactSchema),
  })

  const onSubmit = (data: ContactData) => {
    // event handler de exemplo
    console.log('Enviar:', data)
    alert('Formulário enviado — veja o console')
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
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Enviar</button>
      </div>
      {formState.errors && (
        <pre className="text-sm text-red-600">{JSON.stringify(formState.errors, null, 2)}</pre>
      )}
    </form>
  )
}
