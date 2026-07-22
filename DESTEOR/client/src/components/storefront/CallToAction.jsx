import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

import Button from '@/components/ui/Button';
import Container from '@/components/ui/Container';
import Section from '@/components/ui/Section';
import { ROUTES } from '@/constants/routes';

const containerVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1],
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

function CallToAction() {
  return (
    <Section className="bg-white">
      <Container>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={containerVariants}
          className="relative overflow-hidden rounded-[32px] bg-matte-black px-6 py-16 text-center shadow-2xl sm:px-12 sm:py-20 md:rounded-[40px] md:py-24"
        >
          {/* Decorative background elements */}
          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            {/* Radial gold glow */}
            <div className="absolute left-1/2 top-1/2 h-[140%] w-[140%] -translate-x-1/2 -translate-y-1/2 bg-[radial-gradient(circle,_rgba(196,164,102,0.12)_0%,_transparent_60%)]" />

            {/* Blurred gold circles */}
            <motion.div
              className="absolute -left-16 -top-16 h-64 w-64 rounded-full bg-champagne-gold/20 blur-3xl"
              animate={{ y: [0, 14, 0] }}
              transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
            />
            <motion.div
              className="absolute -bottom-20 -right-10 h-72 w-72 rounded-full bg-champagne-gold/15 blur-3xl"
              animate={{ y: [0, -16, 0] }}
              transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
            />

            {/* Subtle border glow */}
            <div className="absolute inset-0 rounded-[32px] border border-champagne-gold/15 md:rounded-[40px]" />

            {/* Tiny sparkle accents */}
            <motion.span
              className="absolute left-[18%] top-[22%] h-1.5 w-1.5 rounded-full bg-champagne-gold/70"
              animate={{ opacity: [0.2, 1, 0.2] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            />
            <motion.span
              className="absolute right-[22%] top-[32%] h-1 w-1 rounded-full bg-champagne-gold/60"
              animate={{ opacity: [0.15, 0.9, 0.15] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 0.8 }}
            />
            <motion.span
              className="absolute bottom-[24%] left-[30%] h-1 w-1 rounded-full bg-champagne-gold/60"
              animate={{ opacity: [0.2, 0.8, 0.2] }}
              transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: 1.4 }}
            />
          </div>

          <div className="relative mx-auto max-w-2xl">
            <motion.p
              variants={itemVariants}
              className="text-xs font-semibold uppercase tracking-[0.35em] text-champagne-gold"
            >
              Discover More
            </motion.p>

            <motion.h2
              variants={itemVariants}
              className="mt-5 text-3xl leading-tight text-ivory-white sm:text-4xl md:text-5xl"
            >
              Find the Perfect Piece for Every Occasion
            </motion.h2>

            <motion.p
              variants={itemVariants}
              className="mx-auto mt-6 max-w-xl text-sm leading-7 text-ivory-white/70 md:text-base md:leading-8"
            >
              Explore our collection of premium artificial jewellery designed to
              complement your everyday style, festive celebrations, and special
              moments.
            </motion.p>

            <motion.div
              variants={itemVariants}
              className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
            >
              <motion.div
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.25, ease: 'easeOut' }}
                className="w-full sm:w-auto"
              >
                <Link to={ROUTES.SHOP} className="block">
                  <Button
                    variant="secondary"
                    size="lg"
                    className="w-full shadow-[0_0_0_rgba(196,164,102,0)] transition-shadow duration-300 hover:shadow-[0_0_28px_rgba(196,164,102,0.45)] sm:w-auto"
                  >
                    Explore Collection
                  </Button>
                </Link>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.25, ease: 'easeOut' }}
                className="w-full sm:w-auto"
              >
                <Link to={ROUTES.CONTACT} className="block">
                  <Button
                    variant="ghost"
                    size="lg"
                    className="w-full border-ivory-white/25 text-ivory-white transition-colors duration-300 hover:border-champagne-gold hover:text-champagne-gold sm:w-auto"
                  >
                    Contact Us
                  </Button>
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </Container>
    </Section>
  );
}

export default CallToAction;