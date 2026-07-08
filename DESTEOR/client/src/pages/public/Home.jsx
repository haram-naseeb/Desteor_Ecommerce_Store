import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

import Newsletter from '@/components/storefront/Newsletter';
import ProductGrid from '@/components/storefront/ProductGrid';
import SectionHeading from '@/components/storefront/SectionHeading';
import Button from '@/components/ui/Button';
import Container from '@/components/ui/Container';
import Section from '@/components/ui/Section';
import { APP_TAGLINE } from '@/constants/app';
import { ROUTES } from '@/constants/routes';
import { categories, collections, products } from '@/data/storefront';

function Home() {
  const bestSellers = products.filter((product) => product.isBestSeller).slice(0, 4);

  return (
    <>
      <section className="relative min-h-[calc(100vh-73px)] overflow-hidden bg-matte-black text-ivory-white">
        <img
          src="https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?auto=format&fit=crop&w=1800&q=80"
          alt="Luxury bridal jewellery arranged on ivory fabric"
          className="absolute inset-0 h-full w-full object-cover opacity-42"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-matte-black via-matte-black/78 to-matte-black/20" />
        <Container className="relative flex min-h-[calc(100vh-73px)] items-center py-20">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="max-w-3xl"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-champagne-gold">
              Premium Artificial Bridal Jewellery
            </p>
            <h1 className="mt-5 text-5xl leading-tight md:text-7xl">DESTEOR</h1>
            <p className="mt-5 text-xl font-light text-ivory-white/86 md:text-2xl">
              {APP_TAGLINE}
            </p>
            <p className="mt-6 max-w-xl text-sm leading-8 text-ivory-white/70 md:text-base">
              Sculpted for brides who want heirloom presence, modern restraint,
              and a finish that feels intentional from every angle.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link to={ROUTES.SHOP}>
                <Button variant="secondary" size="lg" className="w-full rounded-none sm:w-auto">
                  Explore Shop
                </Button>
              </Link>
              <Link to={ROUTES.ABOUT}>
                <Button variant="ghost" size="lg" className="w-full rounded-none border-ivory-white/35 text-ivory-white hover:border-champagne-gold sm:w-auto">
                  Our Story
                </Button>
              </Link>
            </div>
          </motion.div>
        </Container>
      </section>

      <Section tone="light">
        <Container>
          <SectionHeading
            eyebrow="Collections"
            title="Designed around the ceremony"
            description="Each edit is built for a different bridal mood, from luminous pearls to warm heritage gold."
          />
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {collections.map((collection) => (
              <Link
                key={collection.id}
                to={ROUTES.SHOP}
                className="group relative min-h-96 overflow-hidden bg-matte-black"
              >
                <img
                  src={collection.image}
                  alt={collection.name}
                  className="absolute inset-0 h-full w-full object-cover opacity-70 transition duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-matte-black via-matte-black/40 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-6 text-ivory-white">
                  <p className="text-xs uppercase tracking-[0.25em] text-champagne-gold">
                    {collection.slug}
                  </p>
                  <h3 className="mt-2 text-2xl">{collection.name}</h3>
                  <p className="mt-3 text-sm leading-6 text-ivory-white/72">
                    {collection.description}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </Container>
      </Section>

      <Section className="bg-white">
        <Container>
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <SectionHeading
              eyebrow="Best Sellers"
              title="Most requested pieces"
              description="A focused selection of bridal favourites chosen for polish, proportion, and repeat wear."
            />
            <Link to={ROUTES.SHOP} className="text-sm font-semibold uppercase tracking-[0.22em] text-matte-black hover:text-champagne-gold">
              View all
            </Link>
          </div>
          <div className="mt-10">
            <ProductGrid products={bestSellers} />
          </div>
        </Container>
      </Section>

      <Section tone="light">
        <Container>
          <SectionHeading
            eyebrow="Categories"
            title="Find your finishing piece"
            align="center"
          />
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {categories.map((category) => (
              <Link
                key={category.id}
                to={ROUTES.SHOP}
                className="group border border-matte-black/10 bg-white p-4 transition duration-300 hover:-translate-y-1 hover:shadow-elevated"
              >
                <div className="aspect-[4/3] overflow-hidden bg-matte-black/5">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                </div>
                <h3 className="mt-5 text-xl text-matte-black">{category.name}</h3>
                <p className="mt-2 text-sm leading-6 text-matte-black/60">
                  {category.description}
                </p>
              </Link>
            ))}
          </div>
        </Container>
      </Section>

      <Newsletter />
    </>
  );
}

export default Home;
