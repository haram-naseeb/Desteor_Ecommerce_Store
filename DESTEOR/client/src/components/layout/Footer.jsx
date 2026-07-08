import { Link } from 'react-router-dom';

import { APP_NAME, APP_TAGLINE } from '@/constants/app';
import { ROUTES } from '@/constants/routes';

function Footer() {
  return (
    <footer className="bg-matte-black text-ivory-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-12 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <p className="font-heading text-2xl tracking-[0.35em]">{APP_NAME}</p>
          <p className="mt-3 max-w-sm text-sm leading-7 text-ivory-white/65">
            {APP_TAGLINE} Premium artificial bridal jewellery for the moments
            that become family stories.
          </p>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-champagne-gold">
            Explore
          </p>
          <div className="mt-4 flex flex-col gap-3 text-sm text-ivory-white/70">
            <Link to={ROUTES.SHOP} className="hover:text-champagne-gold">
              Shop
            </Link>
            <Link to={ROUTES.ABOUT} className="hover:text-champagne-gold">
              About
            </Link>
            <Link to={ROUTES.CONTACT} className="hover:text-champagne-gold">
              Contact
            </Link>
          </div>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-champagne-gold">
            Studio
          </p>
          <div className="mt-4 space-y-3 text-sm leading-6 text-ivory-white/70">
            <p>Lahore, Pakistan</p>
            <p>hello@desteor.com</p>
            <p>Mon-Sat, 11:00 AM - 7:00 PM</p>
          </div>
        </div>
      </div>
      <div className="border-t border-ivory-white/10 py-5 text-center text-xs uppercase tracking-[0.24em] text-ivory-white/45">
        Copyright {new Date().getFullYear()} {APP_NAME}. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;
