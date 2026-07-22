'use client';

import { useRef } from 'react';
import { motion } from 'framer-motion';
import {
  Sparkles,
  Gem,
  ShieldCheck,
  Truck,
  HeartHandshake,
  Gift,
  Award,
  PenTool,
  Layers,
  Smile,
  CalendarCheck,
  Link2,
  Circle,
  Diamond,
  Watch,
  Sparkle,
} from 'lucide-react';
import SectionHeading from '@/components/storefront/SectionHeading';
import Container from '@/components/ui/Container';
import Section from '@/components/ui/Section';

/* ---------------------------------------------------------
   Motion variants — reused across sections for a consistent,
   restrained animation language (fade + slight scale, no bounce).
--------------------------------------------------------- */
const EASE = [0.22, 1, 0.36, 1];

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
};

const fadeLeft = {
  hidden: { opacity: 0, x: -36 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.75, ease: EASE } },
};

const fadeRight = {
  hidden: { opacity: 0, x: 36 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.75, ease: EASE } },
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.94 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.6, ease: EASE } },
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.05 } },
};

const staggerItem = {
  hidden: { opacity: 0, y: 24, rotate: -1 },
  visible: {
    opacity: 1,
    y: 0,
    rotate: 0,
    transition: { duration: 0.6, ease: EASE },
  },
};

const viewport = { once: true, amount: 0.3 };

/* ---------------------------------------------------------
   Data
--------------------------------------------------------- */
const whyChoose = [
  {
    icon: Sparkles,
    title: 'Premium Craftsmanship',
    copy: 'Every piece is finished by hand and checked for balance, weight, and detail before it earns the DESTEOR name.',
  },
  {
    icon: Gem,
    title: 'Elegant Designs',
    copy: 'Refined silhouettes and considered proportions, drawn from the language of fine jewellery.',
  },
  {
    icon: ShieldCheck,
    title: 'Long-Lasting Finish',
    copy: 'Plating and settings built to hold their colour and shine well beyond the first wear.',
  },
  {
    icon: Truck,
    title: 'Nationwide Delivery',
    copy: 'Carefully packaged and delivered wherever you are, with the same care we put into the pieces themselves.',
  },
  {
    icon: HeartHandshake,
    title: 'Affordable Luxury',
    copy: 'Elevated design and finish, priced for everyday indulgence rather than rare occasion.',
  },
  {
    icon: Gift,
    title: 'Perfect for Every Occasion',
    copy: 'From festive gatherings to quiet weekdays, a piece considered for every calendar.',
  },
];

const collection = [
  {
    title: 'Bangles',
    icon: Circle,
    image:
      'https://images.unsplash.com/photo-1543294001-f7cd5d7fb516?auto=format&fit=crop&w=900&q=80',
  },
  {
    title: 'Karas',
    icon: Watch,
    image:
      'https://images.unsplash.com/photo-1705326455036-0fab8ecba04d?auto=format&fit=crop&w=900&q=80',
  },
  {
    title: 'Bracelets',
    icon: Link2,
    image:
      'https://images.unsplash.com/photo-1629118639934-2b241503956c?auto=format&fit=crop&w=900&q=80',
  },
  {
    title: 'Earrings',
    icon: Sparkle,
    image:
      'https://images.unsplash.com/photo-1741579800085-e6dd21d41e51?auto=format&fit=crop&w=900&q=80',
  },
  {
    title: 'Jewellery Sets',
    icon: Layers,
    image:
      'https://images.unsplash.com/photo-1631982690223-8aa4be0a2497?auto=format&fit=crop&w=900&q=80',
  },
  {
    title: 'Pendants',
    icon: Gem,
    image:
      'https://images.unsplash.com/photo-1611955167811-4711904bb9f8?auto=format&fit=crop&w=900&q=80',
  },
  {
    title: 'Rings',
    icon: Diamond,
    image:
      'https://images.unsplash.com/photo-1622398925373-3f91b1e275f5?auto=format&fit=crop&w=900&q=80',
  },
  {
    title: 'Fashion Accessories',
    icon: Sparkles,
    image:
      'https://images.unsplash.com/photo-1741498413585-707c7ffa5f58?auto=format&fit=crop&w=900&q=80',
  },
];

const quality = [
  { icon: Award, text: 'Premium Materials' },
  { icon: PenTool, text: 'Carefully Crafted' },
  { icon: Layers, text: 'High-Quality Finishing' },
  { icon: Smile, text: 'Comfortable to Wear' },
  { icon: CalendarCheck, text: 'Made for Daily & Festive Use' },
];

const values = [
  {
    title: 'Quality',
    copy: 'Materials and finishing that hold up to daily wear, not just a single photograph.',
  },
  {
    title: 'Elegance',
    copy: 'Restraint and proportion over excess — every piece earns its place in the look.',
  },
  {
    title: 'Trust',
    copy: 'Consistent craftsmanship, honest pricing, and packaging that arrives the way it left us.',
  },
  {
    title: 'Customer Satisfaction',
    copy: 'From first browse to daily wear, a considered experience at every step.',
  },
];

const stats = [
  { end: 500, suffix: '+', label: 'Products' },
  { end: 1000, suffix: '+', label: 'Happy Customers' },
  { end: 100, suffix: '%', label: 'Premium Quality' },
  { end: 24, suffix: '/7', label: 'Customer Support' },
];

/* ---------------------------------------------------------
   Small building blocks
--------------------------------------------------------- */
function Counter({ end, suffix, label }) {
  const ref = useRef(null);
  const started = useRef(false);

  const start = () => {
    if (started.current || !ref.current) return;
    started.current = true;
    const duration = 1600;
    const startTime = performance.now();
    const node = ref.current;

    const step = (now) => {
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      node.textContent = Math.floor(eased * end).toString();
      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        node.textContent = end.toString();
      }
    };
    requestAnimationFrame(step);
  };

  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={viewport}
      onViewportEnter={start}
      className="text-center"
    >
      <p className="text-4xl font-semibold text-champagne-gold md:text-5xl">
        <span ref={ref}>0</span>
        {suffix}
      </p>
      <p className="mt-3 text-xs uppercase tracking-[0.25em] text-ivory-white/65">
        {label}
      </p>
    </motion.div>
  );
}

function FloatingOrbs() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      <motion.div
        className="absolute -left-24 -top-24 h-72 w-72 rounded-full bg-champagne-gold/25 blur-3xl"
        animate={{ y: [0, 18, 0], x: [0, 12, 0] }}
        transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-champagne-gold/15 blur-3xl"
        animate={{ y: [0, -16, 0], x: [0, -10, 0] }}
        transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute left-1/2 top-1/3 h-56 w-56 -translate-x-1/2 rounded-full bg-champagne-gold/10 blur-3xl"
        animate={{ opacity: [0.4, 0.8, 0.4] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
      />
    </div>
  );
}

/* ---------------------------------------------------------
   Page
--------------------------------------------------------- */
function About() {
  return (
    <>
      {/* Hero */}
      <Section className="relative overflow-hidden bg-ivory-white">
        <FloatingOrbs />
        <Container className="relative py-24 text-center md:py-32">
          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="text-xs font-semibold uppercase tracking-[0.3em] text-champagne-gold"
          >
            About DESTEOR
          </motion.p>
          <motion.h1
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.1 }}
            className="mx-auto mt-5 max-w-3xl text-4xl leading-tight text-matte-black md:text-6xl"
          >
            Jewellery That Defines Every Moment
          </motion.h1>
          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.2 }}
            className="mx-auto mt-6 max-w-xl text-base leading-8 text-matte-black/68 md:text-lg"
          >
            At DESTEOR, we create premium artificial jewellery designed for every
            occasion — from everyday elegance to festive celebrations.
          </motion.p>
        </Container>
      </Section>

      {/* Brand Story */}
      <Section tone="light">
        <Container className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <motion.div
            variants={fadeLeft}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
          >
            <SectionHeading
              eyebrow="Our Story"
              title="A house built for timeless adornment"
              description="DESTEOR was created to make premium-looking jewellery accessible without compromising elegance, quality, or style. We draw from the language of fine jewellery while keeping every piece wearable, versatile, and true to modern life."
            />
          </motion.div>
          <motion.div
            variants={fadeRight}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            className="border-l border-champagne-gold/50 pl-6 text-lg leading-9 text-matte-black/70"
          >
            From festive celebrations to everyday moments, our pieces are
            designed to hold their shine — in photographs, in motion, and in
            the small rituals of daily life.
          </motion.div>
        </Container>
      </Section>

      {/* Why Choose DESTEOR */}
      <Section className="bg-white">
        <Container>
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
          >
            <SectionHeading
              eyebrow="Why DESTEOR"
              title="Why choose DESTEOR"
              description="Everything we make is measured against one standard: does it feel premium in the hand, not just in a photograph."
            />
          </motion.div>
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
          >
            {whyChoose.map(({ icon: Icon, title, copy }) => (
              <motion.div
                key={title}
                variants={staggerItem}
                whileHover={{ y: -6 }}
                className="group rounded-2xl border border-champagne-gold/30 bg-ivory-white/60 p-6 shadow-sm backdrop-blur-sm transition-shadow duration-300 hover:border-champagne-gold/70 hover:shadow-lg"
              >
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-champagne-gold/15 text-champagne-gold transition-transform duration-300 group-hover:scale-110">
                  <Icon size={20} strokeWidth={1.75} />
                </span>
                <h3 className="mt-5 text-lg text-matte-black">{title}</h3>
                <p className="mt-2 text-sm leading-7 text-matte-black/65">
                  {copy}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </Container>
      </Section>

      {/* Our Collection */}
      <Section tone="light">
        <Container>
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
          >
            <SectionHeading
              eyebrow="Our Collection"
              title="Jewellery that completes your style"
              description="Timeless elegance and everyday luxury, crafted for every occasion."
            />
          </motion.div>
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-4"
          >
            {collection.map(({ title, icon: Icon, image }) => (
              <motion.div
                key={title}
                variants={scaleIn}
                whileHover={{ y: -4 }}
                className="group relative overflow-hidden rounded-2xl border border-champagne-gold/25 bg-matte-black shadow-sm"
              >
                <div className="aspect-[3/4] w-full overflow-hidden">
                  <img
                    src={image}
                    alt={title}
                    className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-matte-black/80 via-matte-black/10 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 flex items-center gap-2 p-4">
                  <Icon size={16} className="text-champagne-gold" strokeWidth={1.75} />
                  <span className="text-sm text-ivory-white">{title}</span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </Container>
      </Section>

      {/* Quality */}
      <Section className="bg-white">
        <Container className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <motion.div
            variants={fadeLeft}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            className="order-2 lg:order-1"
          >
            <SectionHeading
              eyebrow="Quality"
              title="Built to be worn, not just admired"
              description="Premium materials and careful construction, so every piece performs as well on a Tuesday as it does at a celebration."
            />
            <motion.ul
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={viewport}
              className="mt-8 space-y-4"
            >
              {quality.map(({ icon: Icon, text }) => (
                <motion.li
                  key={text}
                  variants={staggerItem}
                  className="flex items-center gap-3"
                >
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-champagne-gold/15 text-champagne-gold">
                    <Icon size={17} strokeWidth={1.75} />
                  </span>
                  <span className="text-base text-matte-black/75">{text}</span>
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>
          <motion.div
            variants={fadeRight}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            className="order-1 lg:order-2"
          >
            <img
              src="https://images.unsplash.com/photo-1701777696655-17fb18395ccc?auto=format&fit=crop&w=1300&q=80"
              alt="Jewellery finishing detail"
              className="aspect-[4/3] w-full rounded-2xl object-cover shadow-md"
            />
          </motion.div>
        </Container>
      </Section>

      {/* Mission */}
      <Section className="bg-matte-black text-ivory-white">
        <Container className="mx-auto max-w-2xl text-center">
          <motion.p
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            className="text-xs font-semibold uppercase tracking-[0.3em] text-champagne-gold"
          >
            Our Mission
          </motion.p>
          <motion.h2
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            transition={{ delay: 0.1 }}
            className="mt-4 text-3xl md:text-4xl"
          >
            Elegance made accessible
          </motion.h2>
          <motion.p
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            transition={{ delay: 0.2 }}
            className="mt-6 text-base leading-8 text-ivory-white/70"
          >
            To bring elegant artificial jewellery to everyone by combining
            timeless design, premium craftsmanship, and affordable luxury.
          </motion.p>
        </Container>
      </Section>

      {/* Values */}
      <Section tone="light">
        <Container>
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
          >
            <SectionHeading eyebrow="What We Protect" title="Our values" />
          </motion.div>
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            className="mt-10 grid gap-5 md:grid-cols-4"
          >
            {values.map((value) => (
              <motion.div
                key={value.title}
                variants={staggerItem}
                whileHover={{ y: -5 }}
                className="rounded-2xl border border-champagne-gold/30 bg-white p-6 shadow-sm transition-shadow duration-300 hover:shadow-md"
              >
                <h3 className="text-lg text-matte-black">{value.title}</h3>
                <p className="mt-3 text-sm leading-7 text-matte-black/65">
                  {value.copy}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </Container>
      </Section>

      {/* Statistics */}
      <Section className="relative overflow-hidden bg-matte-black text-ivory-white">
        <FloatingOrbs />
        <Container className="relative">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            {stats.map((stat) => (
              <Counter key={stat.label} {...stat} />
            ))}
          </div>
        </Container>
      </Section>

      {/* CTA */}
      <Section className="relative overflow-hidden bg-white">
        <Container className="relative py-20 text-center">
          <motion.div
            variants={scaleIn}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            className="mx-auto max-w-2xl rounded-3xl border border-champagne-gold/30 bg-ivory-white/60 px-8 py-14 backdrop-blur-sm"
          >
            <h2 className="text-3xl text-matte-black md:text-4xl">
              Discover Jewellery You&rsquo;ll Love
            </h2>
            <p className="mx-auto mt-4 max-w-md text-base leading-7 text-matte-black/65">
              Timeless elegance and everyday luxury, ready for whatever the
              occasion calls for.
            </p>
            <motion.a
              href="/shop"
              whileHover={{
                scale: 1.04,
                boxShadow: '0 0 32px rgba(191, 155, 92, 0.45)',
              }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.25 }}
              className="mt-8 inline-block rounded-full bg-matte-black px-8 py-3 text-sm uppercase tracking-[0.2em] text-ivory-white"
            >
              Explore Collection
            </motion.a>
          </motion.div>
        </Container>
      </Section>
    </>
  );
}

export default About;