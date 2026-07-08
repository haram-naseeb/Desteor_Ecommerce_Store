import { motion } from 'framer-motion';

function PageHero({ eyebrow, title, description, image }) {
  return (
    <section className="relative overflow-hidden bg-matte-black text-ivory-white">
      {image && (
        <img
          src={image}
          alt=""
          className="absolute inset-0 h-full w-full object-cover opacity-35"
        />
      )}
      <div className="absolute inset-0 bg-matte-black/55" />
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55 }}
        className="relative mx-auto max-w-7xl px-6 py-20 md:py-28"
      >
        {eyebrow && (
          <p className="text-xs font-semibold uppercase tracking-[0.32em] text-champagne-gold">
            {eyebrow}
          </p>
        )}
        <h1 className="mt-4 max-w-3xl text-4xl leading-tight md:text-6xl">
          {title}
        </h1>
        {description && (
          <p className="mt-5 max-w-2xl text-base leading-8 text-ivory-white/76 md:text-lg">
            {description}
          </p>
        )}
      </motion.div>
    </section>
  );
}

export default PageHero;
