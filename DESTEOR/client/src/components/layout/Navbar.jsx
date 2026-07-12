import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  ChevronDown,
  House,
  Mail,
  Info,
  Heart,
  LogOut,
  Menu,
  Package,
  Search,
  ShoppingBag,
  ShoppingCart,
  User,
  X,
} from 'lucide-react';
import { Link, NavLink, useNavigate } from 'react-router-dom';

import { APP_NAME } from '@/constants/app';
import { ROUTES } from '@/constants/routes';
import { useAuth } from '@/hooks/useAuth';
import { useCart } from '@/hooks/useCart';
import { useWishlist } from '@/hooks/useWishlist';

function Navbar() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const { currentUser, isAuthenticated, logout } = useAuth();
  const { totalItems } = useCart();
  const { totalItems: wishlistItems } = useWishlist();
  const [search, setSearch] = useState('');
  const profileMenuRef = useRef(null);

  const linkClass = ({ isActive }) =>
    `relative text-sm font-semibold uppercase tracking-[0.22em] transition-colors after:absolute after:-bottom-2 after:left-0 after:h-0.5 after:w-full after:origin-center after:scale-x-0 after:bg-champagne-gold after:transition-transform after:duration-300 hover:text-champagne-gold hover:after:scale-x-100 ${
      isActive ? 'text-champagne-gold after:scale-x-100' : 'text-ivory-white/86'
    }`;

  const mobileLinkClass = ({ isActive }) =>
    `flex items-center justify-between rounded-xl border border-ivory-white/10 px-4 py-3 text-sm font-semibold uppercase tracking-[0.2em] transition-colors ${
      isActive
        ? 'bg-ivory-white/10 text-champagne-gold'
        : 'text-ivory-white/82 hover:bg-ivory-white/5 hover:text-champagne-gold'
    }`;

  const closeMenu = () => setIsOpen(false);
  const closeProfileMenu = () => setIsProfileOpen(false);

  const handleLogout = async () => {
    await logout();
    closeMenu();
    closeProfileMenu();
  };

  const submitSearch = (event) => {
    event.preventDefault();
    const query = search.trim();
    if (query) navigate(`${ROUTES.SEARCH}?q=${encodeURIComponent(query)}`);
    else navigate(ROUTES.SEARCH);
    closeMenu();
  };

  const authLinks = isAuthenticated
    ? []
    : [
        { label: 'Login', to: ROUTES.LOGIN },
        { label: 'Register', to: ROUTES.REGISTER },
      ];

  const profileItems = isAuthenticated
    ? [
        { label: 'Profile', to: ROUTES.PROFILE, icon: User },
        { label: 'Orders', to: ROUTES.ORDERS, icon: Package },
        { label: 'Wishlist', to: ROUTES.WISHLIST, icon: Heart },
        { label: 'About', to: ROUTES.ABOUT, icon: Info },
        { label: 'Contact', to: ROUTES.CONTACT, icon: Mail },
      ]
    : [];

  useEffect(() => {
    function handlePointerDown(event) {
      if (profileMenuRef.current && !profileMenuRef.current.contains(event.target)) {
        closeProfileMenu();
      }
    }

    function handleKeyDown(event) {
      if (event.key === 'Escape') {
        closeMenu();
        closeProfileMenu();
      }
    }

    document.addEventListener('pointerdown', handlePointerDown);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('pointerdown', handlePointerDown);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <header className="sticky top-0 z-50 border-b border-ivory-white/10 bg-matte-black/90 backdrop-blur-xl supports-[backdrop-filter]:bg-matte-black/80">
      <nav className="mx-auto grid max-w-7xl grid-cols-[1fr_auto_1fr] items-center gap-4 px-6 py-4 lg:grid-cols-[auto_minmax(0,1fr)_auto] lg:gap-8">
        <div className="flex items-center gap-8">
          <Link to={ROUTES.HOME} className="inline-flex items-center gap-3">
            <span className="grid h-11 w-11 place-items-center rounded-2xl border border-champagne-gold/50 bg-white/5 font-heading text-xl text-champagne-gold shadow-lg backdrop-blur-sm">
              D
            </span>
            <span className="font-heading text-xl tracking-[0.35em] text-ivory-white">
              {APP_NAME}
            </span>
          </Link>

        </div>

        <form onSubmit={submitSearch} className="hidden w-full max-w-4xl justify-self-center lg:block">
          <label className="sr-only" htmlFor="navbar-search">Search products</label>
          <div className="relative">
            <input
              id="navbar-search"
              autoComplete="off"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search jewelry, collections, or styles"
              className="header-search w-full rounded-full border border-ivory-white/10 !bg-transparent py-3.5 pl-5 pr-16 text-sm text-ivory-white placeholder:text-ivory-white/45 shadow-[0_12px_30px_rgba(13,13,13,0.18)] outline-none transition-all duration-300 focus:border-champagne-gold focus:!bg-transparent focus:ring-4 focus:ring-champagne-gold/10"
              style={{ color: '#fff', WebkitTextFillColor: '#fff' }}
            />
            <button
              type="submit"
              className="absolute inset-y-1.5 right-1.5 grid w-11 place-items-center rounded-full bg-champagne-gold/14 text-champagne-gold shadow-sm ring-1 ring-champagne-gold/10 transition-colors hover:bg-champagne-gold/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-champagne-gold"
              aria-label="Search products"
            >
              <Search className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>
        </form>

        <div className="flex items-center justify-end gap-2 lg:gap-3">
          {isAuthenticated ? (
            <>
              <Link
                to={ROUTES.HOME}
                className="relative grid h-11 w-11 place-items-center rounded-xl border border-ivory-white/10 bg-white/5 text-ivory-white transition hover:-translate-y-0.5 hover:border-champagne-gold/40 hover:text-champagne-gold"
                aria-label="Home"
              >
                <House className="h-4 w-4" aria-hidden="true" />
              </Link>
              <Link
                to={ROUTES.SHOP}
                className="relative grid h-11 w-11 place-items-center rounded-xl border border-ivory-white/10 bg-white/5 text-ivory-white transition hover:-translate-y-0.5 hover:border-champagne-gold/40 hover:text-champagne-gold"
                aria-label="Shop"
              >
                <ShoppingBag className="h-4 w-4" aria-hidden="true" />
              </Link>
              <Link
                to={ROUTES.WISHLIST}
                className="relative grid h-11 w-11 place-items-center rounded-xl border border-ivory-white/10 bg-white/5 text-ivory-white transition hover:-translate-y-0.5 hover:border-champagne-gold/40 hover:text-champagne-gold"
                aria-label="Wishlist"
              >
                <Heart className="h-4 w-4" aria-hidden="true" />
                {wishlistItems > 0 && (
                  <span className="absolute -right-1 -top-1 grid h-5 min-w-5 place-items-center rounded-full bg-champagne-gold px-1.5 text-[0.65rem] font-bold leading-none text-matte-black">
                    {wishlistItems}
                  </span>
                )}
              </Link>
              <Link
                to={ROUTES.CART}
                className="relative grid h-11 w-11 place-items-center rounded-xl border border-ivory-white/10 bg-white/5 text-ivory-white transition hover:-translate-y-0.5 hover:border-champagne-gold/40 hover:text-champagne-gold"
                aria-label="Cart"
              >
                <ShoppingCart className="h-4 w-4" aria-hidden="true" />
                {totalItems > 0 && (
                  <span className="absolute -right-1 -top-1 grid h-5 min-w-5 place-items-center rounded-full bg-champagne-gold px-1.5 text-[0.65rem] font-bold leading-none text-matte-black">
                    {totalItems}
                  </span>
                )}
              </Link>
              <div ref={profileMenuRef} className="relative">
                <button
                  type="button"
                  onClick={() => setIsProfileOpen((value) => !value)}
                  aria-label="Open profile menu"
                  aria-expanded={isProfileOpen}
                  className="flex items-center gap-2 rounded-xl border border-ivory-white/10 bg-white/5 px-3 py-2 text-sm font-medium text-ivory-white shadow-sm transition hover:-translate-y-0.5 hover:border-champagne-gold/40 hover:text-champagne-gold"
                >
                  <span className="grid h-7 w-7 place-items-center rounded-lg bg-champagne-gold/10 text-champagne-gold">
                    <User className="h-4 w-4" aria-hidden="true" />
                  </span>
                  <ChevronDown
                    className={`h-4 w-4 transition-transform duration-300 ${isProfileOpen ? 'rotate-180' : ''}`}
                    aria-hidden="true"
                  />
                </button>

                <AnimatePresence>
                  {isProfileOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.98 }}
                      transition={{ duration: 0.18 }}
                      className="absolute right-0 top-full mt-3 w-64 overflow-hidden rounded-2xl border border-matte-black/10 bg-ivory-white/98 p-2 shadow-glow backdrop-blur-sm"
                    >
                      <div className="px-3 py-2">
                        <p className="text-xs uppercase tracking-[0.24em] text-champagne-gold">
                          Account
                        </p>
                        <p className="mt-1 text-sm text-matte-black/60">
                          {currentUser?.firstName || 'Your profile'}
                        </p>
                      </div>
                      <div className="my-2 h-px bg-matte-black/10" />
                      {profileItems.map((item) => {
                        const Icon = item.icon;

                        return (
                          <NavLink
                            key={item.label}
                            to={item.to}
                            onClick={closeProfileMenu}
                            className={({ isActive }) =>
                              `flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition ${
                                isActive
                                  ? 'bg-champagne-gold/10 text-matte-black'
                                  : 'text-matte-black/78 hover:bg-matte-black/5 hover:text-matte-black'
                              }`
                            }
                          >
                            <Icon className="h-4 w-4 text-champagne-gold" aria-hidden="true" />
                            {item.label}
                          </NavLink>
                        );
                      })}
                      <div className="my-2 h-px bg-matte-black/10" />
                      <button
                        type="button"
                        onClick={handleLogout}
                        className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm text-matte-black/78 transition hover:bg-red-50 hover:text-red-700"
                      >
                        <LogOut className="h-4 w-4" aria-hidden="true" />
                        Logout
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </>
          ) : (
            <div className="hidden items-center gap-2 lg:flex">
              <Link
                to={ROUTES.HOME}
                className="relative grid h-11 w-11 place-items-center rounded-xl border border-ivory-white/10 bg-white/5 text-ivory-white transition hover:-translate-y-0.5 hover:border-champagne-gold/40 hover:text-champagne-gold"
                aria-label="Home"
              >
                <House className="h-4 w-4" aria-hidden="true" />
              </Link>
              <Link
                to={ROUTES.SHOP}
                className="relative grid h-11 w-11 place-items-center rounded-xl border border-ivory-white/10 bg-white/5 text-ivory-white transition hover:-translate-y-0.5 hover:border-champagne-gold/40 hover:text-champagne-gold"
                aria-label="Shop"
              >
                <ShoppingBag className="h-4 w-4" aria-hidden="true" />
              </Link>
              <div ref={profileMenuRef} className="relative">
                <button
                  type="button"
                  onClick={() => setIsProfileOpen((value) => !value)}
                  aria-label="Open account menu"
                  aria-expanded={isProfileOpen}
                  className="flex items-center gap-2 rounded-xl border border-ivory-white/10 bg-white/5 px-3 py-2 text-sm font-medium text-ivory-white shadow-sm transition hover:-translate-y-0.5 hover:border-champagne-gold/40 hover:text-champagne-gold"
                >
                  <span className="grid h-7 w-7 place-items-center rounded-lg bg-champagne-gold/10 text-champagne-gold">
                    <User className="h-4 w-4" aria-hidden="true" />
                  </span>
                  <ChevronDown
                    className={`h-4 w-4 transition-transform duration-300 ${isProfileOpen ? 'rotate-180' : ''}`}
                    aria-hidden="true"
                  />
                </button>

                <AnimatePresence>
                  {isProfileOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.98 }}
                      transition={{ duration: 0.18 }}
                      className="absolute right-0 top-full mt-3 w-56 overflow-hidden rounded-2xl border border-matte-black/10 bg-ivory-white/98 p-2 shadow-glow backdrop-blur-sm"
                    >
                      <div className="px-3 py-2">
                        <p className="text-xs uppercase tracking-[0.24em] text-champagne-gold">
                          Welcome
                        </p>
                        <p className="mt-1 text-sm text-matte-black/60">Sign in to your account</p>
                      </div>
                      <div className="my-2 h-px bg-matte-black/10" />
                      {authLinks.map((item) => (
                        <NavLink
                          key={item.label}
                          to={item.to}
                          onClick={closeProfileMenu}
                          className={({ isActive }) =>
                            `flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition ${
                              isActive
                                ? 'bg-champagne-gold/10 text-matte-black'
                                : 'text-matte-black/78 hover:bg-matte-black/5 hover:text-matte-black'
                            }`
                          }
                        >
                          <User className="h-4 w-4 text-champagne-gold" aria-hidden="true" />
                          {item.label}
                        </NavLink>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          )}

          <button
            type="button"
            className="grid h-11 w-11 place-items-center rounded-xl border border-ivory-white/10 bg-white/5 text-ivory-white transition hover:-translate-y-0.5 hover:border-champagne-gold/40 hover:text-champagne-gold lg:hidden"
            aria-label={isOpen ? 'Close navigation' : 'Open navigation'}
            aria-expanded={isOpen}
            onClick={() => setIsOpen((value) => !value)}
          >
            {isOpen ? <X className="h-5 w-5" aria-hidden="true" /> : <Menu className="h-5 w-5" aria-hidden="true" />}
          </button>
        </div>
      </nav>

      {isOpen && (
        <div className="border-t border-ivory-white/10 bg-matte-black/98 px-6 py-5 lg:hidden">
          <div className="flex flex-col gap-4">
            <form onSubmit={submitSearch} className="relative">
              <label className="sr-only" htmlFor="mobile-navbar-search">
                Search products
              </label>
              <input
                id="mobile-navbar-search"
                autoComplete="off"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search jewelry, collections, or styles"
                className="header-search w-full rounded-full border border-ivory-white/10 !bg-transparent py-3.5 pl-5 pr-16 text-sm text-ivory-white placeholder:text-ivory-white/45 shadow-[0_12px_30px_rgba(13,13,13,0.18)] outline-none transition-all duration-300 focus:border-champagne-gold focus:!bg-transparent focus:ring-4 focus:ring-champagne-gold/10"
                style={{ color: '#fff', WebkitTextFillColor: '#fff' }}
              />
              <button
                type="submit"
                className="absolute inset-y-1.5 right-1.5 grid w-11 place-items-center rounded-full bg-champagne-gold/14 text-champagne-gold shadow-sm ring-1 ring-champagne-gold/10 transition-colors hover:bg-champagne-gold/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-champagne-gold"
                aria-label="Search products"
              >
                <Search className="h-4 w-4" aria-hidden="true" />
              </button>
            </form>
            <div className="grid grid-cols-2 gap-3">
              <Link to={ROUTES.HOME} className={mobileLinkClass} onClick={closeMenu} aria-label="Home">
                <span>Home</span>
                <House className="h-4 w-4 text-champagne-gold" aria-hidden="true" />
              </Link>
              <Link to={ROUTES.SHOP} className={mobileLinkClass} onClick={closeMenu} aria-label="Shop">
                <span>Shop</span>
                <ShoppingBag className="h-4 w-4 text-champagne-gold" aria-hidden="true" />
              </Link>
            </div>
            {authLinks.map((item) => (
              <NavLink key={item.label} to={item.to} className={mobileLinkClass} onClick={closeMenu}>
                {item.label}
              </NavLink>
            ))}
            {isAuthenticated && (
              <>
                <NavLink to={ROUTES.WISHLIST} className={mobileLinkClass} onClick={closeMenu}>
                  Wishlist
                  <span className="rounded-full bg-champagne-gold px-2 py-1 text-[0.65rem] font-bold uppercase tracking-[0.18em] text-matte-black">
                    {wishlistItems}
                  </span>
                </NavLink>
                <NavLink to={ROUTES.CART} className={mobileLinkClass} onClick={closeMenu}>
                  Cart
                  <span className="rounded-full bg-champagne-gold px-2 py-1 text-[0.65rem] font-bold uppercase tracking-[0.18em] text-matte-black">
                    {totalItems}
                  </span>
                </NavLink>
                <button
                  type="button"
                  onClick={handleLogout}
                  className="rounded-xl border border-ivory-white/10 px-4 py-3 text-left text-sm font-medium uppercase tracking-[0.2em] text-ivory-white/82 transition hover:bg-ivory-white/5 hover:text-champagne-gold"
                >
                  Logout
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}

export default Navbar;
