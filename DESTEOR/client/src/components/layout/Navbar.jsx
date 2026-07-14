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

const iconButtonClass =
  'relative grid h-10 w-10 place-items-center rounded-xl border border-ivory-white/10 bg-white/5 text-ivory-white transition hover:-translate-y-0.5 hover:border-champagne-gold/40 hover:text-champagne-gold sm:h-11 sm:w-11';

function Navbar() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isAccountDrawerOpen, setIsAccountDrawerOpen] = useState(false);
  const { currentUser, isAuthenticated, logout } = useAuth();
  const { totalItems } = useCart();
  const { totalItems: wishlistItems } = useWishlist();
  const [search, setSearch] = useState('');
  const profileMenuRef = useRef(null);
  const accountDrawerRef = useRef(null);

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
        setIsAccountDrawerOpen(false);
      }
    }

    document.addEventListener('pointerdown', handlePointerDown);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('pointerdown', handlePointerDown);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  useEffect(() => {
    if (!isAccountDrawerOpen) return undefined;

    const drawer = accountDrawerRef.current;
    const previousActive = document.activeElement;
    const focusableSelector = 'a, button, input, [tabindex]:not([tabindex="-1"])';
    const focusable = drawer ? Array.from(drawer.querySelectorAll(focusableSelector)).filter((el) => !el.hasAttribute('disabled')) : [];
    if (focusable.length) focusable[0].focus();

    function onKeyDown(e) {
      if (e.key === 'Escape') {
        setIsAccountDrawerOpen(false);
        return;
      }
      if (e.key === 'Tab' && focusable.length) {
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    }

    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      try { previousActive && previousActive.focus(); } catch (err) {}
    };
  }, [isAccountDrawerOpen]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  return (
    <header className="sticky top-0 z-50 border-b border-ivory-white/10 bg-matte-black/90 backdrop-blur-xl supports-[backdrop-filter]:bg-matte-black/80">
      <nav className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3 sm:px-6 sm:py-4 lg:grid lg:grid-cols-[auto_minmax(0,1fr)_auto] lg:items-center lg:gap-8">
        <Link to={ROUTES.HOME} className="inline-flex min-w-0 items-center gap-2 sm:gap-3" onClick={() => navigate(ROUTES.HOME)}>
          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-2xl border border-champagne-gold/50 bg-white/5 font-heading text-xl text-champagne-gold shadow-lg backdrop-blur-sm sm:h-11 sm:w-11">
            D
          </span>
          <span className="hidden truncate font-heading text-lg tracking-[0.25em] text-ivory-white sm:inline sm:text-xl sm:tracking-[0.35em]">
            {APP_NAME}
          </span>
        </Link>

        <form onSubmit={submitSearch} className="hidden w-full max-w-4xl justify-self-center lg:block">
          <label className="sr-only" htmlFor="navbar-search">Search products</label>
          <div className="relative">
            <input
              id="navbar-search"
              autoComplete="off"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search jewelry, styles"
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

        <div className="flex shrink-0 items-center justify-end gap-1.5 sm:gap-2 lg:gap-3">
          {isAuthenticated && (
            <div className="flex items-center gap-1.5 sm:gap-2 lg:hidden">
              <Link to={ROUTES.WISHLIST} className={iconButtonClass} aria-label="Wishlist">
                <Heart className="h-4 w-4" aria-hidden="true" />
                {wishlistItems > 0 && (
                  <span className="absolute -right-1 -top-1 grid h-5 min-w-5 place-items-center rounded-full bg-champagne-gold px-1.5 text-[0.65rem] font-bold leading-none text-matte-black">
                    {wishlistItems}
                  </span>
                )}
              </Link>
              <Link to={ROUTES.CART} className={iconButtonClass} aria-label="Cart">
                <ShoppingCart className="h-4 w-4" aria-hidden="true" />
                {totalItems > 0 && (
                  <span className="absolute -right-1 -top-1 grid h-5 min-w-5 place-items-center rounded-full bg-champagne-gold px-1.5 text-[0.65rem] font-bold leading-none text-matte-black">
                    {totalItems}
                  </span>
                )}
              </Link>
            </div>
          )}

          {isAuthenticated ? (
            <div className="hidden items-center gap-2 lg:flex">
              <Link to={ROUTES.HOME} className={iconButtonClass} aria-label="Home" onClick={() => navigate(ROUTES.HOME)}>
                <House className="h-4 w-4" aria-hidden="true" />
              </Link>
              <Link to={ROUTES.SHOP} className={iconButtonClass} aria-label="Shop">
                <ShoppingBag className="h-4 w-4" aria-hidden="true" />
              </Link>
              <Link to={ROUTES.WISHLIST} className={iconButtonClass} aria-label="Wishlist">
                <Heart className="h-4 w-4" aria-hidden="true" />
                {wishlistItems > 0 && (
                  <span className="absolute -right-1 -top-1 grid h-5 min-w-5 place-items-center rounded-full bg-champagne-gold px-1.5 text-[0.65rem] font-bold leading-none text-matte-black">
                    {wishlistItems}
                  </span>
                )}
              </Link>
              <Link to={ROUTES.CART} className={iconButtonClass} aria-label="Cart">
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
            </div>
          ) : (
            <div className="hidden items-center gap-2 lg:flex">
              <Link to={ROUTES.HOME} className={iconButtonClass} aria-label="Home" onClick={() => navigate(ROUTES.HOME)}>
                <House className="h-4 w-4" aria-hidden="true" />
              </Link>
              <Link to={ROUTES.SHOP} className={iconButtonClass} aria-label="Shop">
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
            className={`${iconButtonClass} lg:hidden mr-2`}
            aria-label="Open account drawer"
            onClick={() => setIsAccountDrawerOpen(true)}
          >
            <User className="h-4 w-4" aria-hidden="true" />
          </button>

          <button
            type="button"
            className={`${iconButtonClass} lg:hidden`}
            aria-label={isOpen ? 'Close navigation' : 'Open navigation'}
            aria-expanded={isOpen}
            onClick={() => setIsOpen((value) => !value)}
          >
            {isOpen ? <X className="h-5 w-5" aria-hidden="true" /> : <Menu className="h-5 w-5" aria-hidden="true" />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.button
              type="button"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.18 }}
              className="fixed inset-0 z-40 bg-matte-black/60 backdrop-blur-sm lg:hidden"
              aria-label="Close navigation"
              onClick={closeMenu}
            />

            <motion.aside
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'tween', duration: 0.25 }}
              className="fixed inset-y-0 left-0 z-50 flex w-[min(18rem,85vw)] flex-col overflow-auto rounded-tr-2xl rounded-br-2xl border-r border-ivory-white/10 bg-matte-black text-ivory-white shadow-glow lg:hidden"
            >
              <div className="flex items-center justify-between px-4 py-4">
                <div>
                  <span className="font-heading text-sm tracking-[0.25em] text-champagne-gold">DESTEOR</span>
                  <p className="text-xs text-ivory-white/60">Customer navigation</p>
                </div>
                <button
                  type="button"
                  onClick={closeMenu}
                  className="grid h-10 w-10 place-items-center rounded-xl border border-ivory-white/10 bg-white/5 text-ivory-white transition hover:border-champagne-gold/40 hover:text-champagne-gold"
                  aria-label="Close navigation"
                >
                  <X className="h-5 w-5" aria-hidden="true" />
                </button>
              </div>

              <div className="border-t border-ivory-white/10 px-4 pt-4">
                <form onSubmit={submitSearch} className="relative mb-5">
                  <label className="sr-only" htmlFor="mobile-navbar-search">Search products</label>
                  <input
                    id="mobile-navbar-search"
                    autoComplete="off"
                    value={search}
                    onChange={(event) => setSearch(event.target.value)}
                    placeholder="Search jewelry, styles"
                    className="header-search w-full rounded-2xl border border-ivory-white/10 bg-matte-black/90 py-3.5 pl-5 pr-11 text-sm text-ivory-white placeholder:text-ivory-white/45 outline-none"
                    style={{ color: '#fff', WebkitTextFillColor: '#fff' }}
                  />
                  <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2 grid h-10 w-10 place-items-center rounded-full bg-champagne-gold/14 text-champagne-gold" aria-label="Search products">
                    <Search className="h-4 w-4" aria-hidden="true" />
                  </button>
                </form>

                <nav className="grid gap-2">
                  <NavLink
                    to={ROUTES.HOME}
                    className={({ isActive }) =>
                      `flex items-center justify-between gap-3 rounded-xl px-4 py-3 text-sm font-body transition-all duration-300 ${
                        isActive
                          ? 'bg-ivory-white/10 text-champagne-gold shadow-inner'
                          : 'text-ivory-white/80 hover:-translate-y-0.5 hover:bg-ivory-white/10 hover:text-champagne-gold'
                      }`
                    }
                    onClick={closeMenu}
                  >
                    <span>Home</span>
                    <House className="h-4 w-4 text-champagne-gold" aria-hidden="true" />
                  </NavLink>
                  <NavLink
                    to={ROUTES.SHOP}
                    className={({ isActive }) =>
                      `flex items-center justify-between gap-3 rounded-xl px-4 py-3 text-sm font-body transition-all duration-300 ${
                        isActive
                          ? 'bg-ivory-white/10 text-champagne-gold shadow-inner'
                          : 'text-ivory-white/80 hover:-translate-y-0.5 hover:bg-ivory-white/10 hover:text-champagne-gold'
                      }`
                    }
                    onClick={closeMenu}
                  >
                    <span>Shop</span>
                    <ShoppingBag className="h-4 w-4 text-champagne-gold" aria-hidden="true" />
                  </NavLink>
                  {isAuthenticated &&
                    profileItems.map((item) => {
                      const Icon = item.icon;
                      return (
                        <NavLink
                          key={item.label}
                          to={item.to}
                          className={({ isActive }) =>
                            `flex items-center justify-between gap-3 rounded-xl px-4 py-3 text-sm font-body transition-all duration-300 ${
                              isActive
                                ? 'bg-ivory-white/10 text-champagne-gold shadow-inner'
                                : 'text-ivory-white/80 hover:-translate-y-0.5 hover:bg-ivory-white/10 hover:text-champagne-gold'
                            }`
                          }
                          onClick={closeMenu}
                        >
                          <span>{item.label}</span>
                          <Icon className="h-4 w-4 text-champagne-gold" aria-hidden="true" />
                        </NavLink>
                      );
                    })}

                  {authLinks.map((item) => (
                    <NavLink
                      key={item.label}
                      to={item.to}
                      className={({ isActive }) =>
                        `flex items-center justify-between gap-3 rounded-xl px-4 py-3 text-sm font-body transition-all duration-300 ${
                          isActive
                            ? 'bg-ivory-white/10 text-champagne-gold shadow-inner'
                            : 'text-ivory-white/80 hover:-translate-y-0.5 hover:bg-ivory-white/10 hover:text-champagne-gold'
                        }`
                      }
                      onClick={closeMenu}
                    >
                      <span>{item.label}</span>
                    </NavLink>
                  ))}

                  {isAuthenticated && (
                    <button
                      type="button"
                      onClick={() => {
                        handleLogout();
                        closeMenu();
                      }}
                      className="flex items-center justify-between rounded-xl border border-ivory-white/10 px-4 py-3 text-sm font-semibold uppercase tracking-[0.2em] text-ivory-white/82 transition hover:bg-ivory-white/5 hover:text-champagne-gold"
                    >
                      <span>Logout</span>
                      <LogOut className="h-4 w-4 text-champagne-gold" aria-hidden="true" />
                    </button>
                  )}
                </nav>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isAccountDrawerOpen && (
          <>
            <motion.button
              type="button"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.18 }}
              className="fixed inset-0 z-40 bg-matte-black/60 backdrop-blur-sm lg:hidden"
              aria-label="Close account drawer"
              onClick={() => setIsAccountDrawerOpen(false)}
            />

            <motion.aside
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'tween', duration: 0.28 }}
              className="fixed inset-y-0 left-0 z-50 w-[min(92vw,18rem)] flex flex-col overflow-auto rounded-tr-2xl rounded-br-2xl border-r border-ivory-white/10 bg-matte-black/98 p-4 lg:hidden"
              ref={accountDrawerRef}
              role="dialog"
              aria-modal="true"
              aria-label="Account drawer"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="grid h-10 w-10 place-items-center rounded-2xl bg-white/5 text-champagne-gold font-heading">D</span>
                  <div>
                    <p className="font-heading text-sm tracking-[0.25em] text-ivory-white">My Account</p>
                    <p className="text-xs text-ivory-white/60">Manage your account</p>
                  </div>
                </div>
                <button type="button" onClick={() => setIsAccountDrawerOpen(false)} className="grid h-10 w-10 place-items-center rounded-xl border border-ivory-white/10 bg-white/5 text-ivory-white">
                  <X className="h-5 w-5" aria-hidden="true" />
                </button>
              </div>

              <div className="my-4 grid gap-2">
                <NavLink to={ROUTES.PROFILE} className={mobileLinkClass} onClick={() => setIsAccountDrawerOpen(false)}>
                  <span>Profile</span>
                  <User className="h-4 w-4 text-champagne-gold" aria-hidden="true" />
                </NavLink>

                <NavLink to={ROUTES.ORDERS} className={mobileLinkClass} onClick={() => setIsAccountDrawerOpen(false)}>
                  <span>Orders</span>
                  <Package className="h-4 w-4 text-champagne-gold" aria-hidden="true" />
                </NavLink>

                <NavLink to={ROUTES.WISHLIST} className={mobileLinkClass} onClick={() => setIsAccountDrawerOpen(false)}>
                  <span>Wishlist</span>
                  <Heart className="h-4 w-4 text-champagne-gold" aria-hidden="true" />
                </NavLink>

                <NavLink to={ROUTES.CART} className={mobileLinkClass} onClick={() => setIsAccountDrawerOpen(false)}>
                  <span>Cart</span>
                  <ShoppingCart className="h-4 w-4 text-champagne-gold" aria-hidden="true" />
                </NavLink>
              </div>

              <div className="mt-auto pt-4">
                <button type="button" onClick={() => { handleLogout(); setIsAccountDrawerOpen(false); }} className="flex w-full items-center justify-between rounded-xl border border-ivory-white/10 px-4 py-3 text-left text-sm font-semibold uppercase tracking-[0.2em] text-ivory-white/82 transition hover:bg-ivory-white/5 hover:text-champagne-gold">
                  <span>Logout</span>
                  <LogOut className="h-4 w-4 text-champagne-gold" aria-hidden="true" />
                </button>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}

export default Navbar;
