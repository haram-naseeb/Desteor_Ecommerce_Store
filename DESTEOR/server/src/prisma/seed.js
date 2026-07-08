const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const categories = [
  {
    name: 'Rings',
    slug: 'rings',
    description: 'Refined bands and statement rings for engagements, ceremonies, and daily shine.',
    image:
      'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=1200&q=80',
  },
  {
    name: 'Necklaces',
    slug: 'necklaces',
    description: 'Layered chokers, collars, and haar-inspired silhouettes with a luminous bridal finish.',
    image:
      'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=1200&q=80',
  },
  {
    name: 'Bracelets',
    slug: 'bracelets',
    description: 'Polished cuffs and delicate stacks for mehndi nights, receptions, and everyday grace.',
    image:
      'https://images.unsplash.com/photo-1602173574767-37ac01994b2a?auto=format&fit=crop&w=1200&q=80',
  },
  {
    name: 'Earrings',
    slug: 'earrings',
    description: 'Pearl drops, crystal chandeliers, and sculptural occasion earrings.',
    image:
      'https://images.unsplash.com/photo-1630019852942-f89202989a59?auto=format&fit=crop&w=1200&q=80',
  },
];

const collections = [
  {
    name: 'The Destiny Edit',
    slug: 'destiny-edit',
    description: 'Signature champagne-gold pieces for the day everything changes.',
    image:
      'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=1200&q=80',
  },
  {
    name: 'Moonlit Vows',
    slug: 'moonlit-vows',
    description: 'Ivory pearls and clear stones with a soft evening radiance.',
    image:
      'https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?auto=format&fit=crop&w=1200&q=80',
  },
  {
    name: 'Heritage Glow',
    slug: 'heritage-glow',
    description: 'Classic silhouettes inspired by family celebrations and modern brides.',
    image:
      'https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?auto=format&fit=crop&w=1200&q=80',
  },
  {
    name: 'Celestial Atelier',
    slug: 'celestial-atelier',
    description: 'Light-catching forms with star-set crystal details and polished restraint.',
    image:
      'https://images.unsplash.com/photo-1599459183200-59c7687a0275?auto=format&fit=crop&w=1200&q=80',
  },
];

const imagePool = {
  rings: [
    'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1603974372039-adc49044b6bd?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1589674781759-c21c37956a44?auto=format&fit=crop&w=1200&q=80',
  ],
  necklaces: [
    'https://images.unsplash.com/photo-1599643477877-530eb83abc8e?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?auto=format&fit=crop&w=1200&q=80',
  ],
  bracelets: [
    'https://images.unsplash.com/photo-1602173574767-37ac01994b2a?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1608042314453-ae338d80c427?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&w=1200&q=80',
  ],
  earrings: [
    'https://images.unsplash.com/photo-1630019852942-f89202989a59?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1611652022419-a9419f74343d?auto=format&fit=crop&w=1200&q=80',
  ],
};

const baseSpecifications = {
  rings: [
    ['Finish', 'Champagne gold polish'],
    ['Stones', 'Cubic zirconia and crystal accents'],
    ['Size', 'Adjustable fit'],
    ['Care', 'Wipe with a soft dry cloth'],
  ],
  necklaces: [
    ['Finish', 'Champagne gold tone'],
    ['Stones', 'Faux pearls and clear crystals'],
    ['Closure', 'Adjustable lobster clasp'],
    ['Care', 'Store flat in the DESTEOR pouch'],
  ],
  bracelets: [
    ['Finish', 'Matte champagne gold'],
    ['Stones', 'Crystal pave details'],
    ['Size', 'Adjustable or medium fit'],
    ['Care', 'Keep separated from sharp pieces'],
  ],
  earrings: [
    ['Finish', 'Polished gold tone'],
    ['Stones', 'Faceted crystal and pearl accents'],
    ['Back', 'Secure push back closure'],
    ['Care', 'Avoid perfume and moisture'],
  ],
};

const products = [
  ['Aurelia Solitaire Ring', 'rings', 'destiny-edit', 5200, null, 18, true, true],
  ['Seraphine Pearl Halo Ring', 'rings', 'moonlit-vows', 6100, 5600, 14, true, false],
  ['Celeste Crystal Band', 'rings', 'celestial-atelier', 3900, null, 25, false, true],
  ['Mehrunisa Dome Ring', 'rings', 'heritage-glow', 7400, null, 11, false, false],
  ['Noor Marquise Ring', 'rings', 'moonlit-vows', 6800, null, 16, true, false],
  ['Ivara Stack Ring Set', 'rings', 'destiny-edit', 8200, 7600, 10, false, true],
  ['Amara Oval Ring', 'rings', 'celestial-atelier', 5700, null, 19, false, false],
  ['Zarmina Bridal Ring', 'rings', 'heritage-glow', 9100, null, 8, true, true],
  ['Lyra Open Ring', 'rings', 'celestial-atelier', 4300, null, 22, false, false],
  ['Saira Crystal Crown Ring', 'rings', 'destiny-edit', 6400, null, 13, false, false],

  ['Aurelia Bridal Necklace Set', 'necklaces', 'destiny-edit', 18900, null, 9, true, true],
  ['Seraphine Pearl Choker', 'necklaces', 'moonlit-vows', 9200, null, 15, true, true],
  ['Noor Layered Haar', 'necklaces', 'heritage-glow', 14800, 13900, 7, true, false],
  ['Celeste Crystal Collar', 'necklaces', 'celestial-atelier', 11800, null, 12, false, true],
  ['Mehrunisa Temple Necklace', 'necklaces', 'heritage-glow', 16400, null, 6, false, false],
  ['Ivara Minimal Pendant', 'necklaces', 'moonlit-vows', 4900, null, 24, false, false],
  ['Amara Reception Choker', 'necklaces', 'destiny-edit', 10300, null, 14, true, false],
  ['Zarmina Pearl Haar', 'necklaces', 'heritage-glow', 15600, 14900, 8, false, true],
  ['Lyra Tennis Necklace', 'necklaces', 'celestial-atelier', 12500, null, 10, false, false],
  ['Saira Ceremony Collar', 'necklaces', 'destiny-edit', 13200, null, 9, false, false],

  ['Aurelia Crystal Bracelet', 'bracelets', 'destiny-edit', 7200, null, 20, true, true],
  ['Seraphine Pearl Bracelet', 'bracelets', 'moonlit-vows', 5800, null, 18, false, false],
  ['Celeste Tennis Bracelet', 'bracelets', 'celestial-atelier', 7900, 7300, 17, true, true],
  ['Mehrunisa Bangle Stack', 'bracelets', 'heritage-glow', 7600, null, 16, true, true],
  ['Noor Hinged Cuff', 'bracelets', 'heritage-glow', 6900, null, 13, false, false],
  ['Ivara Chain Bracelet', 'bracelets', 'moonlit-vows', 4100, null, 26, false, false],
  ['Amara Statement Cuff', 'bracelets', 'destiny-edit', 6800, null, 12, false, true],
  ['Zarmina Crystal Kada', 'bracelets', 'heritage-glow', 8500, null, 9, false, false],
  ['Lyra Star Bracelet', 'bracelets', 'celestial-atelier', 5300, null, 19, false, false],
  ['Saira Pearl Stack', 'bracelets', 'moonlit-vows', 6200, 5900, 15, false, false],

  ['Aurelia Drop Earrings', 'earrings', 'destiny-edit', 6400, null, 21, true, true],
  ['Seraphine Pearl Drops', 'earrings', 'moonlit-vows', 3900, null, 28, false, false],
  ['Celeste Crystal Earrings', 'earrings', 'celestial-atelier', 5400, null, 24, true, true],
  ['Mehrunisa Chandbali Earrings', 'earrings', 'heritage-glow', 8700, 8100, 11, true, true],
  ['Noor Bridal Jhumkas', 'earrings', 'heritage-glow', 9500, null, 10, false, true],
  ['Ivara Pearl Studs', 'earrings', 'moonlit-vows', 2900, null, 35, false, false],
  ['Amara Reception Hoops', 'earrings', 'destiny-edit', 4700, null, 18, false, false],
  ['Zarmina Crystal Tikka Earrings', 'earrings', 'heritage-glow', 7200, null, 12, false, false],
  ['Lyra Starburst Earrings', 'earrings', 'celestial-atelier', 6100, null, 17, true, false],
  ['Saira Pearl Chandeliers', 'earrings', 'moonlit-vows', 7800, null, 14, false, false],
];

function slugify(value) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

function createDescription(name, categorySlug, collectionSlug) {
  const categoryCopy = {
    rings: 'a polished ring designed to finish bridal styling with quiet confidence',
    necklaces: 'a refined necklace silhouette made for layered bridal moments',
    bracelets: 'a graceful wrist piece that balances ceremony detail with repeat wear',
    earrings: 'light-catching earrings shaped for veils, portraits, and evening receptions',
  };
  const collectionCopy = {
    'destiny-edit': 'signature champagne warmth',
    'moonlit-vows': 'ivory pearl luminosity',
    'heritage-glow': 'classic South Asian celebration detail',
    'celestial-atelier': 'crystal radiance and clean modern lines',
  };

  return `${name} is ${categoryCopy[categorySlug]}, finished with ${collectionCopy[collectionSlug]} and crafted for DESTEOR's luxury artificial jewellery edit.`;
}

async function main() {
  const categoryRecords = {};
  const collectionRecords = {};

  for (const category of categories) {
    categoryRecords[category.slug] = await prisma.category.upsert({
      where: { slug: category.slug },
      update: category,
      create: category,
    });
  }

  for (const collection of collections) {
    collectionRecords[collection.slug] = await prisma.collection.upsert({
      where: { slug: collection.slug },
      update: collection,
      create: collection,
    });
  }

  for (const [
    name,
    categorySlug,
    collectionSlug,
    price,
    salePrice,
    stock,
    featured,
    bestSeller,
  ] of products) {
    const slug = slugify(name);
    const product = await prisma.product.upsert({
      where: { slug },
      update: {
        name,
        description: createDescription(name, categorySlug, collectionSlug),
        price,
        salePrice,
        stock,
        featured,
        bestSeller,
        categoryId: categoryRecords[categorySlug].id,
        collectionId: collectionRecords[collectionSlug].id,
      },
      create: {
        name,
        slug,
        description: createDescription(name, categorySlug, collectionSlug),
        price,
        salePrice,
        stock,
        featured,
        bestSeller,
        categoryId: categoryRecords[categorySlug].id,
        collectionId: collectionRecords[collectionSlug].id,
      },
    });

    await prisma.productImage.deleteMany({ where: { productId: product.id } });
    await prisma.productSpecification.deleteMany({ where: { productId: product.id } });

    await prisma.productImage.createMany({
      data: imagePool[categorySlug].map((url, index) => ({
        url,
        altText: `${name} product view ${index + 1}`,
        displayOrder: index,
        productId: product.id,
      })),
    });

    await prisma.productSpecification.createMany({
      data: baseSpecifications[categorySlug].map(([label, value], index) => ({
        label,
        value,
        displayOrder: index,
        productId: product.id,
      })),
    });
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    // eslint-disable-next-line no-console
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
