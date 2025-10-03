import type { NextAuthOptions } from 'next-auth'
import type { Adapter } from 'next-auth/adapters'
import Credentials from 'next-auth/providers/credentials'
import { PrismaAdapter } from '@auth/prisma-adapter'
import { prisma } from './prisma'
import bcrypt from 'bcryptjs'

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma) as unknown as Adapter,
  session: { strategy: 'jwt' },
  providers: [
    Credentials({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Senha', type: 'password' },
      },
      async authorize(creds) {
        if (!creds?.email || !creds.password) return null
        const user = await prisma.user.findUnique({ where: { email: creds.email } })
        const passwordHash = (user as unknown as { passwordHash?: string })?.passwordHash
        if (!user || !passwordHash) return null
        const ok = await bcrypt.compare(creds.password, passwordHash)
        if (!ok) return null
        return { id: user.id, email: user.email, name: user.name || undefined }
      },
    }),
  ],
  pages: {
    signIn: '/login',
  },
}
