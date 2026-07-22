import { Mail, MapPin, Phone } from 'lucide-react';
import { motion } from 'framer-motion';

import Container from '@/components/ui/Container';
import Section from '@/components/ui/Section';

const EASE = [0.22, 1, 0.36, 1];

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.05 } },
};

const staggerItem = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
};

const viewport = { once: true, amount: 0.3 };

function InstagramIcon(props) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.2" cy="6.8" r="0.6" fill="currentColor" stroke="none" />
    </svg>
  );
}

function FacebookIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M13.5 21v-7.5h2.5l.4-3h-2.9V8.4c0-.87.24-1.46 1.5-1.46H16.5V4.35c-.26-.03-1.14-.1-2.16-.1-2.14 0-3.6 1.3-3.6 3.7v2.55H8.25v3H10.74V21h2.76Z" />
    </svg>
  );
}

const directContacts = [
  {
    icon: MapPin,
    label: 'Visit',
    value: 'Lahore, Pakistan',
  },
  {
    icon: Mail,
    label: 'Email',
    value: 'desteor14@gmail.com',
    href: 'mailto:desteor14@gmail.com',
  },
  {
    icon: Phone,
    label: 'Call',
    value: '+92 311 7122991',
    href: 'tel:+923117122991',
  },
];

const socialLinks = [
  {
    label: 'Instagram',
    handle: '@desteor',
    href: 'https://www.instagram.com/desteorr/',
    icon: InstagramIcon,
  },
  {
    label: 'Facebook',
    handle: 'DESTEOR',
    href: 'https://www.facebook.com/profile.php?id=61592422882982&ref=PROFILE_EDIT_xav_ig_profile_page_web#',
    icon: FacebookIcon,
  },
];

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
    </div>
  );
}

function Contact() {
  return (
    <>
      {/* Hero */}
      <Section className="relative overflow-hidden bg-ivory-white">
        <FloatingOrbs />
        <Container className="relative py-20 text-center md:py-28">
          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="text-xs font-semibold uppercase tracking-[0.3em] text-champagne-gold"
          >
            Contact
          </motion.p>
          <motion.h1
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.1 }}
            className="mx-auto mt-5 max-w-2xl text-4xl leading-tight text-matte-black md:text-5xl"
          >
            Begin a Conversation with DESTEOR
          </motion.h1>
          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.2 }}
            className="mx-auto mt-6 max-w-md text-base leading-8 text-matte-black/68"
          >
            Questions about styling, availability, or care — reach us
            directly through any of the channels below.
          </motion.p>
        </Container>
      </Section>

      {/* Direct contact cards */}
      <Section className="bg-white">
        <Container>
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            className="grid gap-5 sm:grid-cols-3"
          >
            {directContacts.map(({ icon: Icon, label, value, href }) => {
              const cardClass =
                'group flex flex-col items-center rounded-2xl border border-champagne-gold/25 bg-ivory-white/60 p-8 text-center shadow-sm backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-champagne-gold/60 hover:shadow-lg';

              const content = (
                <>
                  <span className="flex h-12 w-12 items-center justify-center rounded-full bg-champagne-gold/12 text-champagne-gold transition-transform duration-300 group-hover:scale-110">
                    <Icon className="h-5 w-5" strokeWidth={1.75} aria-hidden="true" />
                  </span>
                  <p className="mt-5 text-xs uppercase tracking-[0.25em] text-matte-black/45">
                    {label}
                  </p>
                  <p className="mt-2 text-lg text-matte-black">{value}</p>
                </>
              );

              return (
                <motion.div key={label} variants={staggerItem}>
                  {href ? (
                    <a href={href} className={cardClass}>
                      {content}
                    </a>
                  ) : (
                    <div className={cardClass}>{content}</div>
                  )}
                </motion.div>
              );
            })}
          </motion.div>
        </Container>
      </Section>

      {/* Follow DESTEOR */}
      <Section tone="light">
        <Container className="text-center">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
          >
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-champagne-gold">
              Follow Along
            </p>
            <h2 className="mt-3 text-3xl text-matte-black md:text-4xl">
              Follow DESTEOR
            </h2>
            <p className="mx-auto mt-4 max-w-md text-base leading-7 text-matte-black/65">
              New arrivals, styling ideas, and behind-the-scenes moments —
              follow along for the latest.
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            className="mx-auto mt-10 flex max-w-md flex-col gap-4 sm:flex-row sm:justify-center"
          >
            {socialLinks.map(({ label, handle, href, icon: Icon }) => (
              <motion.a
                key={label}
                variants={staggerItem}
                href={href}
                target="_blank"
                rel="noreferrer"
                whileHover={{ y: -3 }}
                className="group flex flex-1 items-center gap-3 rounded-2xl border border-champagne-gold/30 bg-white px-5 py-4 shadow-sm transition-colors duration-300 hover:border-champagne-gold/70 hover:shadow-md"
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-champagne-gold/12 text-champagne-gold transition-transform duration-300 group-hover:scale-110">
                  <Icon className="h-4 w-4" aria-hidden="true" />
                </span>
                <span className="text-left">
                  <span className="block text-sm text-matte-black">{label}</span>
                  <span className="block text-xs text-matte-black/50">{handle}</span>
                </span>
              </motion.a>
            ))}
          </motion.div>
        </Container>
      </Section>
    </>
  );
}

export default Contact;