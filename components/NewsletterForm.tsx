'use client';
import { useState } from 'react';

export default function NewsletterForm() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'ok' | 'error'>('idle');
  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      setStatus(res.ok ? 'ok' : 'error');
      if (res.ok) setEmail('');
    } catch {
      setStatus('error');
    }
  };
  return (
    <form onSubmit={onSubmit} className="flex flex-col sm:flex-row gap-2">
      <input
        type="email"
        required
        placeholder="Seu e-mail"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="px-3 py-2 rounded border text-sm flex-1"
        aria-label="E-mail para promoções"
      />
      <button className="px-4 py-2 rounded bg-primary text-primary-foreground text-sm">
        Cadastrar
      </button>
      {status === 'ok' && (
        <span className="text-xs text-emerald-600">Inscrição realizada!</span>
      )}
      {status === 'error' && (
        <span className="text-xs text-red-600">Erro ao enviar.</span>
      )}
    </form>
  );
}
