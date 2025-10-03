"use client"

import { ReactNode } from 'react'
import { SessionProvider } from 'next-auth/react'
import ThemeProvider from './ThemeProvider'

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <SessionProvider>
      <ThemeProvider>{children}</ThemeProvider>
    </SessionProvider>
  )
}
