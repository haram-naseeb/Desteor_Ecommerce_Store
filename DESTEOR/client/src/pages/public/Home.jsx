import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import CallToAction from '@/components/storefront/CallToAction';
import ProductGrid from '@/components/storefront/ProductGrid';
import SectionHeading from '@/components/storefront/SectionHeading';
import Button from '@/components/ui/Button';
import Container from '@/components/ui/Container';
import Loader from '@/components/ui/Loader';
import Section from '@/components/ui/Section';
import { APP_TAGLINE } from '@/constants/app';
import { ROUTES } from '@/constants/routes';
import { getCategories } from '@/services/category.service';
import { getFeaturedProducts } from '@/services/product.service';
import mainImage from '@/assets/main.jpg';

function Home() {
  const [categories, setCategories] = useState([]);
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let isMounted = true;

    async function loadStorefront() {
      try {
        const [categoryData, featuredData] = await Promise.all([
          getCategories(),
          getFeaturedProducts(10),
        ]);

        if (!isMounted) return;
        setCategories(categoryData);
        setFeaturedProducts(featuredData);
      } catch (requestError) {
        if (isMounted) {
          setError(requestError.message || 'Unable to load storefront products.');
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    loadStorefront();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <>
      <section className="relative min-h-[calc(100vh-73px)] overflow-hidden bg-matte-black text-ivory-white">
        <img
          src={mainImage}
          alt="Luxury jewellery arranged on ivory fabric"
          className="absolute inset-0 h-full w-full object-cover opacity-42"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-matte-black via-matte-black/78 to-matte-black/20" />
        <Container className="relative flex min-h-[calc(100vh-73px)] items-start py-20">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="pt-8 max-w-3xl"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-champagne-gold">
              Premium Luxury Jewellery
            </p>
            <h1 className="mt-5 text-5xl leading-tight md:text-7xl">DESTEOR</h1>
            <p className="mt-5 text-xl font-light text-ivory-white/86 md:text-2xl">
              {APP_TAGLINE}
            </p>
            <p className="mt-6 max-w-xl text-sm leading-8 text-ivory-white/70 md:text-base">
              Sculpted for modern elegance with a focus
            </p>
            <p className="mt-4 max-w-xl text-sm leading-8 text-ivory-white/70 md:text-base">
              on proportion, finish, and enduring wear.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link to={ROUTES.SHOP}>
                <Button variant="secondary" size="lg" className="w-full sm:w-auto">
                  Explore Shop
                </Button>
              </Link>
              <Link to={ROUTES.ABOUT}>
                <Button variant="ghost" size="lg" className="w-full border-ivory-white/25 text-ivory-white hover:border-champagne-gold sm:w-auto">
                  Our Story
                </Button>
              </Link>
            </div>
          </motion.div>
        </Container>
      </section>

      {/* Collections removed from homepage */}

      <Section className="bg-white">
        <Container>
          {loading && (
            <div className="mb-10 flex justify-center">
              <Loader label="Loading featured products" />
            </div>
          )}
          {error && (
            <div className="mb-10 border border-matte-black/10 bg-ivory-white p-5 text-sm text-matte-black/68">
              {error}
            </div>
          )}
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <SectionHeading
              eyebrow="Featured Collection"
              title="Handpicked for Every Occasion"
              description="Discover our most loved artificial jewellery, carefully selected for style, elegance, and everyday luxury."
            />
            <Link to={ROUTES.SHOP} className="text-sm font-semibold uppercase tracking-[0.22em] text-matte-black hover:text-champagne-gold">
              View all
            </Link>
          </div>
          <div className="mt-10">
            <ProductGrid products={featuredProducts} />
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
                to={`${ROUTES.SHOP}?category=${category.slug}`}
                className="group overflow-hidden rounded-3xl border border-matte-black/10 bg-white/90 p-4 shadow-subtle transition-all duration-300 hover:-translate-y-1 hover:shadow-glow"
              >
                <div className="aspect-[4/3] overflow-hidden rounded-2xl bg-matte-black/5">
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

      <CallToAction />
    </>
  );
}

export default Home;