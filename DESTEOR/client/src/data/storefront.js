export const categories = [
  {
    id: 'bridal-sets',
    name: 'Bridal Sets',
    slug: 'bridal-sets',
    description: 'Statement sets designed for ceremonies, portraits, and heirloom moments.',
    image:
      'https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'necklaces',
    name: 'Necklaces',
    slug: 'necklaces',
    description: 'Layered chokers and refined collars with a luminous bridal finish.',
    image:
      'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'earrings',
    name: 'Earrings',
    slug: 'earrings',
    description: 'Pearl drops, crystal chandeliers, and sculptural occasion pieces.',
    image:
      'https://images.unsplash.com/photo-1630019852942-f89202989a59?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'bangles',
    name: 'Bangles',
    slug: 'bangles',
    description: 'Polished stacks for mehndi nights, receptions, and everyday grace.',
    image:
      'https://images.unsplash.com/photo-1602173574767-37ac01994b2a?auto=format&fit=crop&w=1200&q=80',
  },
];

export const collections = [
  {
    id: 'destiny-edit',
    name: 'The Destiny Edit',
    slug: 'destiny-edit',
    description: 'Signature gold-toned bridal pieces for the day everything changes.',
    image:
      'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'moonlit-vows',
    name: 'Moonlit Vows',
    slug: 'moonlit-vows',
    description: 'Ivory pearls and clear stones with a soft evening radiance.',
    image:
      'https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'heritage-glow',
    name: 'Heritage Glow',
    slug: 'heritage-glow',
    description: 'Classic silhouettes inspired by family celebrations and modern brides.',
    image:
      'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=1200&q=80',
  },
];

export const products = [
  {
    id: 'p1',
    name: 'Aurelia Bridal Necklace Set',
    slug: 'aurelia-bridal-necklace-set',
    category: 'Bridal Sets',
    categorySlug: 'bridal-sets',
    collection: 'The Destiny Edit',
    price: 18900,
    badge: 'Best Seller',
    isBestSeller: true,
    description:
      'A champagne gold bridal set with a sculpted collar necklace, coordinated earrings, and hand-set crystal accents.',
    images: [
      'https://images.unsplash.com/photo-1599643477877-530eb83abc8e?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=1200&q=80',
    ],
    specs: {
      Finish: 'Champagne gold polish',
      Stones: 'Cubic zirconia and pearl accents',
      Includes: 'Necklace and earrings',
      Care: 'Store dry in the DESTEOR pouch',
    },
  },
  {
    id: 'p2',
    name: 'Seraphine Pearl Choker',
    slug: 'seraphine-pearl-choker',
    category: 'Necklaces',
    categorySlug: 'necklaces',
    collection: 'Moonlit Vows',
    price: 9200,
    badge: 'New Arrival',
    isBestSeller: true,
    description:
      'A luminous pearl choker framed with crystal stations for nikah, engagement, and reception styling.',
    images: [
      'https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1506630448388-4e683c67ddb0?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1599459182681-c938b7f53482?auto=format&fit=crop&w=1200&q=80',
    ],
    specs: {
      Finish: 'Ivory pearl and gold tone',
      Stones: 'Glass pearls and clear crystals',
      Closure: 'Adjustable lobster clasp',
      Care: 'Avoid perfume and moisture',
    },
  },
  {
    id: 'p3',
    name: 'Celeste Crystal Earrings',
    slug: 'celeste-crystal-earrings',
    category: 'Earrings',
    categorySlug: 'earrings',
    collection: 'Moonlit Vows',
    price: 5400,
    badge: 'Limited',
    isBestSeller: true,
    description:
      'Light-catching drop earrings with a clean silhouette, made for veils, buns, and evening portraits.',
    images: [
      'https://images.unsplash.com/photo-1630019852942-f89202989a59?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1611652022419-a9419f74343d?auto=format&fit=crop&w=1200&q=80',
    ],
    specs: {
      Finish: 'Polished gold tone',
      Stones: 'Faceted crystal drops',
      Length: '7.2 cm',
      Care: 'Wipe with a soft dry cloth',
    },
  },
  {
    id: 'p4',
    name: 'Mehrunisa Bangle Stack',
    slug: 'mehrunisa-bangle-stack',
    category: 'Bangles',
    categorySlug: 'bangles',
    collection: 'Heritage Glow',
    price: 7600,
    badge: 'Ceremony Edit',
    isBestSeller: true,
    description:
      'A balanced bangle stack mixing matte gold texture, delicate stones, and bridal warmth.',
    images: [
      'https://images.unsplash.com/photo-1602173574767-37ac01994b2a?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1608042314453-ae338d80c427?auto=format&fit=crop&w=1200&q=80',
    ],
    specs: {
      Finish: 'Matte champagne gold',
      Includes: 'Set of 12 bangles',
      Size: 'Medium, 2.6 inch',
      Care: 'Keep separated from sharp pieces',
    },
  },
  {
    id: 'p5',
    name: 'Noor Layered Haar',
    slug: 'noor-layered-haar',
    category: 'Necklaces',
    categorySlug: 'necklaces',
    collection: 'Heritage Glow',
    price: 14800,
    badge: 'Signature',
    isBestSeller: false,
    description:
      'A graceful layered haar with pearl lines and warm gold detailing for traditional bridal looks.',
    images: [
      'https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1603561596112-db1d8a043e12?auto=format&fit=crop&w=1200&q=80',
    ],
    specs: {
      Finish: 'Antique champagne gold',
      Stones: 'Pearl strands and crystal detail',
      Includes: 'Long necklace only',
      Care: 'Store flat after wear',
    },
  },
  {
    id: 'p6',
    name: 'Zarmina Bridal Tikka',
    slug: 'zarmina-bridal-tikka',
    category: 'Bridal Sets',
    categorySlug: 'bridal-sets',
    collection: 'The Destiny Edit',
    price: 4600,
    badge: "Editor's Pick",
    isBestSeller: false,
    description:
      'A refined bridal tikka with a centered crystal motif and soft pearl movement.',
    images: [
      'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1603974372039-adc49044b6bd?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1615655096345-61a54750068d?auto=format&fit=crop&w=1200&q=80',
    ],
    specs: {
      Finish: 'Champagne gold tone',
      Stones: 'Cubic zirconia and faux pearls',
      Length: 'Adjustable chain',
      Care: 'Secure in box when not worn',
    },
  },
  {
    id: 'p7',
    name: 'Ivara Pearl Drops',
    slug: 'ivara-pearl-drops',
    category: 'Earrings',
    categorySlug: 'earrings',
    collection: 'Moonlit Vows',
    price: 3900,
    badge: 'Minimal',
    isBestSeller: false,
    description:
      'Understated pearl drop earrings for intimate events, pre-wedding dinners, and repeat wear.',
    images: [
      'https://images.unsplash.com/photo-1599459183200-59c7687a0275?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1619119069152-a2b331eb392a?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1619119069412-9111347b0df8?auto=format&fit=crop&w=1200&q=80',
    ],
    specs: {
      Finish: 'Polished gold tone',
      Stones: 'Single faux pearl drop',
      Length: '3.8 cm',
      Care: 'Avoid contact with water',
    },
  },
  {
    id: 'p8',
    name: 'Amara Statement Cuff',
    slug: 'amara-statement-cuff',
    category: 'Bangles',
    categorySlug: 'bangles',
    collection: 'The Destiny Edit',
    price: 6800,
    badge: 'Reception',
    isBestSeller: false,
    description:
      'A clean statement cuff with crystal borders, made to anchor minimalist bridal styling.',
    images: [
      'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1608042314453-ae338d80c427?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1602752250015-52934bc45613?auto=format&fit=crop&w=1200&q=80',
    ],
    specs: {
      Finish: 'Gloss champagne gold',
      Stones: 'Crystal pave border',
      Size: 'Adjustable open cuff',
      Care: 'Clean gently with microfiber',
    },
  },
];

export const formatPrice = (price) =>
  new Intl.NumberFormat('en-PK', {
    style: 'currency',
    currency: 'PKR',
    maximumFractionDigits: 0,
  }).format(price);
