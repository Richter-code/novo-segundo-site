import 'dotenv/config'
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

if (!process.env.DATABASE_URL) {
  console.warn('\nWARNING: DATABASE_URL not found in environment. The seed may fail if you did not set .env.\n')
}

const prisma = new PrismaClient()

async function main() {
  const passwordHash = await bcrypt.hash('admin123', 10)
  const admin = await prisma.user.upsert({
    where: { email: 'admin@example.com' },
    update: {},
    create: {
      email: 'admin@example.com',
      name: 'Admin',
      passwordHash,
    },
  })
  await prisma.post.createMany({
    data: [
      { title: 'Saúde do Solo: Guia Prático', content: 'Rotação, adubação verde e análise periódica.', published: true, authorId: admin.id },
      { title: 'Detecção de Pragas com Imagens', content: 'Fluxo multiespectral e thresholds.', published: true, authorId: admin.id },
    ]
  })
  await prisma.product.createMany({
    data: [
      { name: 'Kit Análise de Solo', description: 'Coleta + relatório em 48h', price: 199.90, image: '/images/solo.jpg', published: true },
      { name: 'Monitoramento por Satélite', description: 'Acompanhamento NDVI mensal', price: 349.00, image: '/images/satelite.jpg', published: true },
    ]
  })
  console.log('Seed concluído')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
