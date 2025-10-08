import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

if (!process.env.DATABASE_URL) {
  console.warn(
    '\nWARNING: DATABASE_URL not found in environment. The seed may fail if you did not set .env.\n',
  );
}

const prisma = new PrismaClient();

async function main() {
  // Usuário admin para relacionar posts antigos (mantém compatibilidade)
  const passwordHash = await bcrypt.hash('admin123', 10);
  const admin = await prisma.user.upsert({
    where: { email: 'admin@example.com' },
    update: {},
    create: {
      email: 'admin@example.com',
      name: 'Admin',
      passwordHash,
    },
  });

  // Opcional: manter alguns posts de exemplo
  await prisma.post.createMany({
    data: [
      {
        title: 'Saúde do Solo: Guia Prático',
        content: 'Rotação, adubação verde e análise periódica.',
        published: true,
        authorId: admin.id,
      },
      {
        title: 'Detecção de Pragas com Imagens',
        content: 'Fluxo multiespectral e thresholds.',
        published: true,
        authorId: admin.id,
      },
    ],
  });

  // Criar categorias
  const categoriesData = [
    { name: 'Insumos' },
    { name: 'Monitoramento' },
    { name: 'Equipamentos' },
    { name: 'Consultoria' },
    { name: 'Serviços' },
  ];

  await prisma.category.createMany({ data: categoriesData });

  const categories = await prisma.category.findMany();
  const byName = Object.fromEntries(
    categories.map((c) => [c.name, c]),
  ) as Record<string, { id: string }>;

  // Produtos (8–15 itens) com imagens Unsplash/Pexels
  const products = [
    {
      name: 'Kit Análise de Solo',
      description: 'Coleta de amostras e relatório técnico em 48h.',
      price: '199.90',
      imageUrl: 'https://images.unsplash.com/photo-1501004318641-b39e6451bec6',
      categoryId: byName['Serviços'].id,
    },
    {
      name: 'Monitoramento por Satélite (NDVI)',
      description: 'Acompanhamento mensal de índice de vegetação.',
      price: '349.00',
      imageUrl: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa',
      categoryId: byName['Monitoramento'].id,
    },
    {
      name: 'Sonda de Umidade',
      description: 'Medição precisa de umidade do solo.',
      price: '799.00',
      imageUrl:
        'https://images.pexels.com/photos/765491/pexels-photo-765491.jpeg',
      categoryId: byName['Equipamentos'].id,
    },
    {
      name: 'Drones para Mapeamento',
      description: 'Locação de drone para imageamento agrícola.',
      price: '1299.00',
      imageUrl: 'https://images.unsplash.com/photo-1508612761958-e931d843bdd2',
      categoryId: byName['Equipamentos'].id,
    },
    {
      name: 'Fertilizante Orgânico Premium',
      description: 'Composto orgânico para melhoria de solo.',
      price: '89.90',
      imageUrl: 'https://images.unsplash.com/photo-1556909114-9ed521f0b2b1',
      categoryId: byName['Insumos'].id,
    },
    {
      name: 'Sementes de Alta Performance',
      description: 'Blend selecionado para alta produtividade.',
      price: '149.90',
      imageUrl: 'https://images.unsplash.com/photo-1461354464878-ad92f492a5a0',
      categoryId: byName['Insumos'].id,
    },
    {
      name: 'Consultoria Agronômica',
      description: 'Plano técnico personalizado por safra.',
      price: '999.00',
      imageUrl: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5',
      categoryId: byName['Consultoria'].id,
    },
    {
      name: 'Estação Meteorológica Compacta',
      description: 'Coleta de dados climáticos na lavoura.',
      price: '1899.00',
      imageUrl: 'https://images.unsplash.com/photo-1518495973542-4542c06a5843',
      categoryId: byName['Monitoramento'].id,
    },
    {
      name: 'Sensor de pH de Solo',
      description: 'Medição instantânea do pH no campo.',
      price: '349.90',
      imageUrl: 'https://images.unsplash.com/photo-1518779578993-ec3579fee39f',
      categoryId: byName['Equipamentos'].id,
    },
    {
      name: 'Bioestimulante Foliar',
      description: 'Aumento de vigor e resistência da planta.',
      price: '119.90',
      imageUrl: 'https://images.unsplash.com/photo-1501004318641-b39e6451bec6',
      categoryId: byName['Insumos'].id,
    },
  ];

  await prisma.product.createMany({ data: products });

  console.log('Seed concluído: categorias e produtos inseridos.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
