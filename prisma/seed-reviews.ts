import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function seedReviews() {
  console.log('🌱 Seeding reviews...');

  // Busca todos os produtos
  const products = await prisma.product.findMany({ take: 20 });

  for (const product of products) {
    // Cria 2-5 reviews aleatórias para cada produto
    const reviewCount = Math.floor(Math.random() * 4) + 2;

    for (let i = 0; i < reviewCount; i++) {
      await prisma.review.create({
        data: {
          productId: product.id,
          rating: Math.floor(Math.random() * 3) + 3, // 3-5 estrelas
          comment: `Produto de qualidade! Review #${i + 1}`,
          userName: `Cliente ${i + 1}`,
        },
      });
    }
  }

  console.log('✅ Reviews criadas!');
}

seedReviews()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
