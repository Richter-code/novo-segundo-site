import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
import fs from 'node:fs';
import path from 'node:path';
import { z } from 'zod';

const prisma = new PrismaClient();

const ProductSchema = z.object({
  name: z.string().min(1),
  description: z.string().default(''),
  price: z.union([z.number(), z.string()]).transform((v) => Number(v)),
  imageUrl: z.string().url().or(z.literal('')).default(''),
  category: z.string().min(1),
});
const PayloadSchema = z.object({ products: z.array(ProductSchema) });

async function main() {
  const file =
    process.argv[2] || path.join(process.cwd(), 'data', 'products.json');
  if (!fs.existsSync(file)) {
    console.error(`Arquivo não encontrado: ${file}`);
    console.error(
      'Crie um JSON seguindo o exemplo em data/products.sample.json',
    );
    process.exit(1);
  }
  const raw = fs.readFileSync(file, 'utf-8');
  const data = JSON.parse(raw);
  const parsed = PayloadSchema.safeParse(data);
  if (!parsed.success) {
    console.error('JSON inválido:', parsed.error.flatten());
    process.exit(1);
  }

  const { products } = parsed.data;
  // garantir categorias: findFirst por nome; se não existir, cria
  const categories = new Map<string, string>();
  for (const p of products) {
    if (!categories.has(p.category)) {
      const existing = await prisma.category.findFirst({
        where: { name: p.category },
      });
      let c = existing;
      if (!c) {
        c = await prisma.category.create({ data: { name: p.category } });
      }
      categories.set(p.category, c.id);
    }
  }

  let created = 0;
  let updated = 0;
  for (const p of products) {
    const categoryId = categories.get(p.category)!;
    const exists = await prisma.product.findFirst({
      where: { name: p.name, categoryId },
    });
    if (exists) {
      await prisma.product.update({
        where: { id: exists.id },
        data: {
          description: p.description,
          price: p.price,
          imageUrl: p.imageUrl,
        },
      });
      updated++;
    } else {
      await prisma.product.create({
        data: {
          name: p.name,
          description: p.description,
          price: p.price,
          imageUrl: p.imageUrl,
          categoryId,
        },
      });
      created++;
    }
  }

  console.log(`Import concluído: ${created} criados, ${updated} atualizados.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
