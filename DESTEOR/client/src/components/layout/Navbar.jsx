import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { FiHeart, FiMenu, FiSearch, FiShoppingBag, FiX } from 'react-icons/fi';
import { Link, NavLink, useNavigate } from 'react-router-dom';

import { APP_NAME } from '@/constants/app';
import { ROUTES } from '@/constants/routes';
import { useAuth } from '@/hooks/useAuth';
import { useCart } from '@/hooks/useCart';
import { useWishlist } from '@/hooks/useWishlist';

const navItems = [
  { label: 'Home', to: ROUTES.HOME },
  { label: 'Shop', to: ROUTES.SHOP },
  { label: 'About', to: ROUTES.ABOUT },
  { label: 'Contact', to: ROUTES.CONTACT },
];

function Navbar() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const { currentUser, isAuthenticated, logout } = useAuth();
  const { totalItems } = useCart();
  const { totalItems: wishlistItems } = useWishlist();
  const [search, setSearch] = useState('');

  const linkClass = ({ isActive }) =>
    `text-sm font-medium uppercase tracking-[0.22em] transition-colors ${
      isActive ? 'text-champagne-gold' : 'text-ivory-white/78 hover:text-champagne-gold'
    }`;

  const closeMenu = () => setIsOpen(false);

  const handleLogout = async () => {
    await logout();
    closeMenu();
  };

  const submitSearch = (event) => {
    event.preventDefault();
    const query = search.trim();
    if (query) navigate(`${ROUTES.SEARCH}?q=${encodeURIComponent(query)}`);
    else navigate(ROUTES.SEARCH);
    closeMenu();
  };

  const authLinks = isAuthenticated
    ? [
        ...(currentUser?.role === 'ADMIN' ? [{ label: 'Admin Dashboard', to: ROUTES.ADMIN.DASHBOARD }] : []),
        {
          label: currentUser?.firstName ? `Profile` : 'Profile',
          to: ROUTES.PROFILE,
        },
        {
          label: 'Orders',
          to: ROUTES.ORDERS,
        },
      ]
    : [
        { label: 'Login', to: ROUTES.LOGIN },
        { label: 'Register', to: ROUTES.REGISTER },
      ];

  const cartLink = (
    <NavLink
      to={ROUTES.CART}
      className={({ isActive }) =>
        `relative inline-flex items-center gap-2 text-sm font-medium uppercase tracking-[0.22em] transition-colors ${
          isActive ? 'text-champagne-gold' : 'text-ivory-white/78 hover:text-champagne-gold'
        }`
      }
      onClick={closeMenu}
    >
      <FiShoppingBag aria-hidden="true" />
      Cart
      <AnimatePresence mode="popLayout">
        {totalItems > 0 && (
          <motion.span
            key={totalItems}
            initial={{ scale: 0.6, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.6, opacity: 0 }}
            className="grid h-5 min-w-5 place-items-center rounded-full bg-champagne-gold px-1.5 text-[0.65rem] font-bold leading-none text-matte-black"
          >
            {totalItems}
          </motion.span>
        )}
      </AnimatePresence>
    </NavLink>
  );

  const wishlistLink = (
    <NavLink to={ROUTES.WISHLIST} className={linkClass} onClick={closeMenu}>
      <span className="relative inline-flex items-center gap-2"><FiHeart aria-hidden="true" />Wishlist{wishlistItems > 0 && <span className="grid h-5 min-w-5 place-items-center rounded-full bg-champagne-gold px-1.5 text-[0.65rem] font-bold leading-none text-matte-black">{wishlistItems}</span>}</span>
    </NavLink>
  );

  return (
    <header className="sticky top-0 z-50 border-b border-ivory-white/10 bg-matte-black/95 backdrop-blur">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link to={ROUTES.HOME} className="inline-flex items-center gap-3">
          <span className="grid h-10 w-10 place-items-center border border-champagne-gold/60 font-heading text-xl text-champagne-gold">
            D
          </span>
          <span className="font-heading text-xl tracking-[0.35em] text-ivory-white">
            {APP_NAME}
          </span>
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          {navItems.map((item) => (
            <NavLink key={item.to} to={item.to} className={linkClass}>
              {item.label}
            </NavLink>
          ))}
          {authLinks.map((item) => (
            <NavLink key={item.label} to={item.to} className={linkClass}>
              {item.label}
            </NavLink>
          ))}
          <form onSubmit={submitSearch} className="relative">
            <label className="sr-only" htmlFor="navbar-search">Search products</label>
            <FiSearch className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-ivory-white/55" aria-hidden="true" />
            <input id="navbar-search" value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search" className="w-28 border-b border-ivory-white/30 bg-transparent py-1 pl-8 text-sm text-ivory-white outline-none placeholder:text-ivory-white/45 focus:border-champagne-gold xl:w-40" />
          </form>
          {isAuthenticated && wishlistLink}
          {isAuthenticated && cartLink}
          {isAuthenticated && (
            <button
              type="button"
              onClick={handleLogout}
              className="text-sm font-medium uppercase tracking-[0.22em] text-ivory-white/78 transition-colors hover:text-champagne-gold"
            >
              Logout
            </button>
          )}
        </div>

        <button
          type="button"
          className="grid h-10 w-10 place-items-center border border-ivory-white/20 text-ivory-white md:hidden"
          aria-label={isOpen ? 'Close navigation' : 'Open navigation'}
          aria-expanded={isOpen}
          onClick={() => setIsOpen((value) => !value)}
        >
          {isOpen ? <FiX aria-hidden="true" /> : <FiMenu aria-hidden="true" />}
        </button>
      </nav>

      {isOpen && (
        <div className="border-t border-ivory-white/10 bg-matte-black px-6 py-5 md:hidden">
          <div className="flex flex-col gap-5">
            <form onSubmit={submitSearch} className="relative">
              <label className="sr-only" htmlFor="mobile-navbar-search">Search products</label>
              <FiSearch className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-ivory-white/55" aria-hidden="true" />
              <input id="mobile-navbar-search" value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search products" className="w-full border border-ivory-white/25 bg-transparent py-2 pl-9 pr-3 text-sm text-ivory-white outline-none placeholder:text-ivory-white/45 focus:border-champagne-gold" />
            </form>
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={linkClass}
                onClick={closeMenu}
              >
                {item.label}
              </NavLink>
            ))}
            {authLinks.map((item) => (
              <NavLink
                key={item.label}
                to={item.to}
                className={linkClass}
                onClick={closeMenu}
              >
                {item.label}
              </NavLink>
            ))}
            {isAuthenticated && wishlistLink}
            {isAuthenticated && cartLink}
            {isAuthenticated && (
              <button
                type="button"
                onClick={handleLogout}
                className="text-left text-sm font-medium uppercase tracking-[0.22em] text-ivory-white/78 transition-colors hover:text-champagne-gold"
              >
                Logout
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
}

export default Navbar;
