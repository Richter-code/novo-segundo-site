import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
import { load } from 'cheerio';
import { z } from 'zod';
import { fetchWithTimeout } from '../lib/http';
import { parseCurrencyBRL } from '../lib/parseCurrencyBRL';

const prisma = new PrismaClient();

const ProductSchema = z.object({
  name: z.string().min(1),
  brand: z.string().optional(),
  price: z.number().positive(),
  imageUrl: z.string().url().or(z.literal('')),
  category: z.string().default('PET Cães e Gatos'),
});

type ProductData = z.infer<typeof ProductSchema>;

const TARGET_URL = 'https://www.agroline.com.br/caes-e-gatos?pagina=10';
const ROBOTS_URL = 'https://www.agroline.com.br/robots.txt';

async function checkRobotsTxt(): Promise<boolean> {
  try {
    console.log('📋 Verificando robots.txt...');
    const response = await fetchWithTimeout(ROBOTS_URL, { timeout: 5000 });
    const text = await response.text();

    // Verificação simples: procurar por Disallow que bloqueie o caminho
    const lines = text.split('\n');
    let userAgentSection = false;

    for (const line of lines) {
      const trimmed = line.trim();
      if (trimmed.startsWith('User-agent: *')) {
        userAgentSection = true;
      }
      if (userAgentSection && trimmed.startsWith('Disallow:')) {
        const path = trimmed.replace('Disallow:', '').trim();
        if (path === '/' || TARGET_URL.includes(path)) {
          console.log(`❌ robots.txt bloqueia acesso: "${path}"`);
          return false;
        }
      }
    }

    console.log('✅ robots.txt permite acesso ao caminho /caes-e-gatos');
    return true;
  } catch (error) {
    console.warn(
      '⚠️  Não foi possível ler robots.txt, abortando por segurança:',
      error,
    );
    return false;
  }
}

async function scrapePage(): Promise<ProductData[]> {
  console.log(`🌐 Fazendo fetch de: ${TARGET_URL}`);
  const response = await fetchWithTimeout(TARGET_URL, { timeout: 15000 });
  const html = await response.text();

  const $ = load(html);
  const products: ProductData[] = [];

  // Seletores genéricos (ajustar conforme estrutura real da página)
  $('.product-card, .item-product, [data-product], .produto').each((_, el) => {
    try {
      const $el = $(el);
      const name =
        $el
          .find('h3, .product-name, .titulo, [itemprop="name"]')
          .text()
          .trim() ||
        $el.find('a[title]').attr('title')?.trim() ||
        '';
      const priceText = $el
        .find('.price, .preco, [itemprop="price"]')
        .text()
        .trim();
      const imageUrl =
        $el.find('img').first().attr('src') ||
        $el.find('img').first().attr('data-src') ||
        '';
      const brand = $el.find('.brand, .marca').text().trim() || undefined;

      if (!name || !priceText) return;

      const price = parseCurrencyBRL(priceText);
      if (price === 0) return;

      const product: ProductData = {
        name,
        brand,
        price,
        imageUrl: imageUrl.startsWith('http')
          ? imageUrl
          : imageUrl
          ? `https://www.agroline.com.br${imageUrl}`
          : '',
        category: 'PET Cães e Gatos',
      };

      const validated = ProductSchema.safeParse(product);
      if (validated.success) {
        products.push(validated.data);
      }
    } catch {
      // Ignora erros de parsing individual
    }
  });

  console.log(`📦 Produtos extraídos: ${products.length}`);
  return products;
}

async function getMockData(): Promise<ProductData[]> {
  console.log('🧪 Usando dados MOCK (robots.txt bloqueou ou fetch falhou)');
  return [
    {
      name: 'Ração Premium Cães Adultos 15kg',
      brand: 'Royal Canin',
      price: 289.9,
      imageUrl: 'https://images.unsplash.com/photo-1558944351-c0bcb7ddce78',
      category: 'PET Cães e Gatos',
    },
    {
      name: 'Ração Golden Gatos Castrados 10kg',
      brand: 'PremieRpet',
      price: 219.9,
      imageUrl: 'https://images.unsplash.com/photo-1518791841217-8f162f1e1131',
      category: 'PET Cães e Gatos',
    },
    {
      name: 'Petiscos Biscoitos para Cães',
      brand: 'Pedigree',
      price: 12.9,
      imageUrl: 'https://images.unsplash.com/photo-1589924691995-400dc9ecc119',
      category: 'PET Cães e Gatos',
    },
    {
      name: 'Areia Higiênica Gatos 4kg',
      brand: 'Chalesco',
      price: 29.9,
      imageUrl: 'https://images.unsplash.com/photo-1574158622682-e40e69881006',
      category: 'PET Cães e Gatos',
    },
    {
      name: 'Coleira Antipulgas Cães',
      brand: 'Bayer',
      price: 89.9,
      imageUrl: 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e',
      category: 'PET Cães e Gatos',
    },
    {
      name: 'Shampoo Neutro Pet 500ml',
      brand: 'Petlab',
      price: 24.9,
      imageUrl: 'https://images.unsplash.com/photo-1601758228041-f3b2795255f1',
      category: 'PET Cães e Gatos',
    },
    {
      name: 'Comedouro Duplo Inox',
      brand: 'Chalesco',
      price: 45.9,
      imageUrl: 'https://images.unsplash.com/photo-1541781774459-bb2af2f05b55',
      category: 'PET Cães e Gatos',
    },
    {
      name: 'Brinquedo Mordedor Cães',
      brand: 'Furacão Pet',
      price: 19.9,
      imageUrl: 'https://images.unsplash.com/photo-1581888227599-779811939961',
      category: 'PET Cães e Gatos',
    },
    {
      name: 'Caixa de Transporte Pet Nº3',
      brand: 'Plast Pet',
      price: 159.9,
      imageUrl: 'https://images.unsplash.com/photo-1541899481282-d53bffe3c35d',
      category: 'PET Cães e Gatos',
    },
    {
      name: 'Tapete Higiênico 80x60 30un',
      brand: 'Chalesco',
      price: 49.9,
      imageUrl: 'https://images.unsplash.com/photo-1530281700549-e82e7bf110d6',
      category: 'PET Cães e Gatos',
    },
    {
      name: 'Ração Special Dog Premium 20kg',
      brand: 'Special Dog',
      price: 179.9,
      imageUrl: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb',
      category: 'PET Cães e Gatos',
    },
    {
      name: 'Antipulgas Gatos',
      brand: 'Frontline',
      price: 69.9,
      imageUrl: 'https://images.unsplash.com/photo-1596492784531-6e6eb5ea9993',
      category: 'PET Cães e Gatos',
    },
  ];
}

async function importProducts(products: ProductData[]) {
  let created = 0;
  let updated = 0;

  for (const p of products) {
    // Upsert category
    const category = await prisma.category.upsert({
      where: { id: 'cat_pet_caes_gatos' },
      update: {},
      create: { id: 'cat_pet_caes_gatos', name: p.category },
    });

    // Upsert brand (se houver)
    let brandId: string | undefined;
    if (p.brand) {
      const brand = await prisma.brand.upsert({
        where: { id: `brand_${p.brand.toLowerCase().replace(/\s+/g, '_')}` },
        update: {},
        create: {
          id: `brand_${p.brand.toLowerCase().replace(/\s+/g, '_')}`,
          name: p.brand,
        },
      });
      brandId = brand.id;
    }

    // Upsert product
    const existing = await prisma.product.findFirst({
      where: { name: p.name, categoryId: category.id },
    });

    if (existing) {
      await prisma.product.update({
        where: { id: existing.id },
        data: {
          price: p.price,
          imageUrl: p.imageUrl,
          brandId,
        },
      });
      updated++;
    } else {
      await prisma.product.create({
        data: {
          name: p.name,
          description: p.brand ? `Marca: ${p.brand}` : '',
          price: p.price,
          imageUrl: p.imageUrl,
          categoryId: category.id,
          brandId,
        },
      });
      created++;
    }
  }

  console.log(
    `✅ Import concluído: ${created} criados, ${updated} atualizados.`,
  );
}

async function main() {
  const allowed = await checkRobotsTxt();

  let products: ProductData[];
  if (allowed) {
    try {
      products = await scrapePage();
      if (products.length === 0) {
        console.log('⚠️  Nenhum produto extraído, usando dados MOCK');
        products = await getMockData();
      }
    } catch (error) {
      console.error('❌ Erro ao fazer scraping, usando dados MOCK:', error);
      products = await getMockData();
    }
  } else {
    products = await getMockData();
  }

  await importProducts(products);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
