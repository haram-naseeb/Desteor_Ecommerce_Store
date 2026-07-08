import { useState } from 'react';
import { FiMenu, FiX } from 'react-icons/fi';
import { Link, NavLink } from 'react-router-dom';

import { APP_NAME } from '@/constants/app';
import { ROUTES } from '@/constants/routes';
import { useAuth } from '@/hooks/useAuth';

const navItems = [
  { label: 'Home', to: ROUTES.HOME },
  { label: 'Shop', to: ROUTES.SHOP },
  { label: 'About', to: ROUTES.ABOUT },
  { label: 'Contact', to: ROUTES.CONTACT },
];

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { currentUser, isAuthenticated, logout } = useAuth();

  const linkClass = ({ isActive }) =>
    `text-sm font-medium uppercase tracking-[0.22em] transition-colors ${
      isActive ? 'text-champagne-gold' : 'text-ivory-white/78 hover:text-champagne-gold'
    }`;

  const closeMenu = () => setIsOpen(false);

  const handleLogout = async () => {
    await logout();
    closeMenu();
  };

  const authLinks = isAuthenticated
    ? [
        {
          label: currentUser?.firstName ? `Profile` : 'Profile',
          to: ROUTES.PROFILE,
        },
      ]
    : [
        { label: 'Login', to: ROUTES.LOGIN },
        { label: 'Register', to: ROUTES.REGISTER },
      ];

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
