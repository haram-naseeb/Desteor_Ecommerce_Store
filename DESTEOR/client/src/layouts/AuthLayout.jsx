import { Outlet, Link } from 'react-router-dom';
import { ROUTES } from '@/constants/routes';
import { APP_NAME, APP_TAGLINE } from '@/constants/app';

/**
 * AuthLayout
 *
 * Minimal, centered shell for Login / Register / Forgot Password.
 * Deliberately excludes the full site nav/footer — auth is presented
 * as a focused moment, not embedded in the usual site chrome.
 */
function AuthLayout() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-matte-black px-6 py-12">
      <Link to={ROUTES.HOME} className="mb-10 text-center">
        <span className="block font-heading text-2xl tracking-widest text-champagne-gold">
          {APP_NAME}
        </span>
        <span className="mt-1 block font-body text-xs tracking-wide text-ivory-white/60">
          {APP_TAGLINE}
        </span>
      </Link>

      <div className="w-full max-w-md rounded-card bg-ivory-white p-8 shadow-elevated">
        <Outlet />
      </div>
    </div>
  );
}

export default AuthLayout;
