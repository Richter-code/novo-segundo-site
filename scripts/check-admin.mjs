import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  try {
    const user = await prisma.user.findUnique({ where: { email: 'admin@example.com' } })
    if (user) console.log('FOUND', { email: user.email, id: user.id })
    else console.log('NOT FOUND')
  } catch (e) {
    console.error('ERROR', e)
    process.exit(1)
  } finally {
    await prisma.$disconnect()
  }
}

main()
