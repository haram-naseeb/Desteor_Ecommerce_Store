import { motion } from 'framer-motion';
import { Link, Outlet } from 'react-router-dom';

import { APP_NAME, APP_TAGLINE } from '@/constants/app';
import { ROUTES } from '@/constants/routes';
import ScrollToTop from '@/components/ScrollToTop';

function AuthLayout() {
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-matte-black px-6 py-12">
      <ScrollToTop />
      <img
        src="https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=1800&q=80"
        alt=""
        className="absolute inset-0 h-full w-full object-cover opacity-18"
      />
      <div className="absolute inset-0 bg-matte-black/78" />
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
        className="relative w-full max-w-md"
      >
        <Link to={ROUTES.HOME} className="mb-8 block text-center">
          <span className="block font-heading text-3xl tracking-[0.35em] text-champagne-gold">
            {APP_NAME}
          </span>
          <span className="mt-2 block text-xs uppercase tracking-[0.22em] text-ivory-white/64">
            {APP_TAGLINE}
          </span>
        </Link>

        <div className="rounded-2xl border border-champagne-gold/45 bg-ivory-white p-7 shadow-[0_24px_70px_rgba(0,0,0,0.5)] md:p-8">
          <Outlet />
        </div>
      </motion.div>
    </div>
  );
}

export default AuthLayout;
