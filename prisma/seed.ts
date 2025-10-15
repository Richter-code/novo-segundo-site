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
    // lojista
    { name: 'Pet' },
    { name: 'Piscina' },
    { name: 'Jardim' },
    { name: 'Agro' },
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

  // Inserir produtos de exemplo para as páginas temáticas (Pet, Piscina, Jardim/Agro)
  async function ensureCategory(name: string) {
    const found = await prisma.category.findFirst({ where: { name } });
    if (found) return found;
    return prisma.category.create({ data: { name } });
  }

  const pet = await ensureCategory('Pet');
  const piscina = await ensureCategory('Piscina');
  const jardim = await ensureCategory('Jardim');
  const agro = await ensureCategory('Agro');

  async function ensureProduct(
    name: string,
    categoryId: string,
    data: { description: string; price: string | number; imageUrl: string },
  ) {
    const exists = await prisma.product.findFirst({
      where: { name, categoryId },
    });
    if (exists) return exists;
    const { description, price, imageUrl } = data;
    return prisma.product.create({
      data: { name, description, price, imageUrl, categoryId },
    });
  }

  await ensureProduct('Ração Premium Cães Adultos 10kg', pet.id, {
    description: 'Alimento completo e balanceado para cães adultos.',
    price: '189.90',
    imageUrl: 'https://images.unsplash.com/photo-1558944351-c0bcb7ddce78',
  });
  await ensureProduct('Cloro Granulado 10 kg', piscina.id, {
    description: 'Tratamento de água para piscinas residenciais.',
    price: '289.90',
    imageUrl: 'https://images.unsplash.com/photo-1483721310020-03333e577078',
  });
  await ensureProduct('Sementes de Grama Batatais 1 kg', jardim.id, {
    description: 'Cobertura de gramado com alta adaptação.',
    price: '49.90',
    imageUrl: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee',
  });
  await ensureProduct('Adubo NPK 10-10-10 5 kg', agro.id, {
    description: 'Fertilizante granulado para diversas culturas.',
    price: '79.90',
    imageUrl: 'https://images.unsplash.com/photo-1615486363878-80f95f4fc3b5',
  });

  // Clínicas (mantém para compatibilidade, mas não usado no seed atual)
  await prisma.clinic.upsert({
    where: { name: 'Clínica Vet Agromane' },
    update: {},
    create: {
      name: 'Clínica Vet Agromane',
      address: 'Av. Central, 123',
      phone: '(11) 5555-0000',
      imageUrl: 'https://images.unsplash.com/photo-1568572933382-74d440642117',
    },
  });

  // Skip veterinary service categories for now (not in current schema focus)
  /*
  await prisma.serviceCategory.createMany({
    data: [
      { name: 'Consultas' },
      { name: 'Vacinação' },
      { name: 'Exames' },
      { name: 'Banho & Tosa' },
    ],
  })

  const svcCatList = await prisma.serviceCategory.findMany()
  const svcByName: Record<string, { id: string }> = Object.fromEntries(
    svcCatList.map((c: { id: string; name: string }) => [c.name, { id: c.id }])
  )

  // Serviços veterinários
  await prisma.vetService.createMany({
    data: [
      { name: 'Consulta Geral', description: 'Avaliação clínica completa.', price: '120.00', durationMinutes: 30, clinicId: clinic.id, categoryId: svcByName['Consultas'].id },
      { name: 'Vacina V10', description: 'Vacinação polivalente canina.', price: '90.00', durationMinutes: 20, clinicId: clinic.id, categoryId: svcByName['Vacinação'].id },
      { name: 'Exame de Sangue', description: 'Hemograma completo.', price: '150.00', durationMinutes: 25, clinicId: clinic.id, categoryId: svcByName['Exames'].id },
      { name: 'Banho & Tosa Completo', description: 'Higienização e tosa higiênica.', price: '100.00', durationMinutes: 60, clinicId: clinic.id, categoryId: svcByName['Banho & Tosa'].id },
    ],
  })

  // Veterinários
  await prisma.veterinarian.createMany({
    data: [
      { name: 'Dra. Ana Silva', specialty: 'Clínica Geral', clinicId: clinic.id },
      { name: 'Dr. Bruno Souza', specialty: 'Dermatologia', clinicId: clinic.id },
    ],
  })

  // Pets e agendamentos
  const buddy = await prisma.pet.upsert({
    where: { id: 'pet_buddy' },
    update: {},
    create: { id: 'pet_buddy', name: 'Buddy', species: 'DOG', breed: 'Labrador', ownerId: admin.id },
  })
  const luna = await prisma.pet.upsert({
    where: { id: 'pet_luna' },
    update: {},
    create: { id: 'pet_luna', name: 'Luna', species: 'CAT', breed: 'Siamês', ownerId: admin.id },
  })

  const services = await prisma.vetService.findMany({ take: 2 })
  if (services.length > 0) {
    await prisma.appointment.createMany({
      data: [
        { serviceId: services[0].id, petId: buddy.id, ownerId: admin.id, scheduledAt: new Date(Date.now() + 86400000), status: 'CONFIRMED' },
        { serviceId: services[1].id, petId: luna.id, ownerId: admin.id, scheduledAt: new Date(Date.now() + 2 * 86400000), status: 'PENDING' },
      ],
    })
  }
  */

  console.log('Seed concluído: categorias, produtos, clínica.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
