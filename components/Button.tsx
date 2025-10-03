"use client"

import { ReactNode } from 'react'

export default function Button({ children, onClick }: { children: ReactNode; onClick?: () => void }) {
  return (
    <button
      onClick={onClick}
      className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded shadow hover:opacity-95"
    >
      {children}
    </button>
  )
}
