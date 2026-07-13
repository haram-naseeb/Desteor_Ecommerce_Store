import { useEffect, useState } from 'react';
import { Outlet, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import {
  LayoutDashboard,
  Layers3,
  LogOut,
  Menu,
  Package,
  Settings,
  Shapes,
  ShoppingBag,
  Users,
  X,
} from 'lucide-react';

import { ROUTES } from '@/constants/routes';
import { APP_NAME } from '@/constants/app';
import { useAuth } from '@/hooks/useAuth';

/**
 * AdminLayout
 *
 * Sidebar + top bar shell for the admin panel. Structurally distinct
 * from MainLayout since admin is an internal tool, not a customer-facing
 * brand experience. Navigation links point at ROUTES.ADMIN.* constants;
 * Pages are protected by AdminRoute before this layout renders.
 */
const ADMIN_NAV_ITEMS = [
  { label: 'Dashboard', path: ROUTES.ADMIN.DASHBOARD, icon: LayoutDashboard },
  { label: 'Products', path: ROUTES.ADMIN.PRODUCTS, icon: ShoppingBag },
  { label: 'Orders', path: ROUTES.ADMIN.ORDERS, icon: Package },
  { label: 'Users', path: ROUTES.ADMIN.USERS, icon: Users },
  { label: 'Categories', path: ROUTES.ADMIN.CATEGORIES, icon: Shapes },
  { label: 'Collections', path: ROUTES.ADMIN.COLLECTIONS, icon: Layers3 },
];

function AdminSidebar({ onNavigate }) {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = async () => {
    await logout();
    navigate(ROUTES.LOGIN, { replace: true });
  };

  return (
    <>
      <div className="px-5 py-6 sm:px-6 sm:py-7">
        <span className="font-heading text-lg tracking-widest text-champagne-gold">
          {APP_NAME}
        </span>
        <span className="mt-1 block font-body text-xs tracking-wide text-ivory-white/50">
          Admin Panel
        </span>
      </div>

      <nav className="flex flex-col gap-1 px-3">
        {ADMIN_NAV_ITEMS.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            onClick={onNavigate}
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-xl px-4 py-3 font-body text-sm transition-all duration-300 hover:-translate-y-0.5 hover:bg-ivory-white/10 hover:text-champagne-gold ${isActive ? 'bg-ivory-white/10 text-champagne-gold shadow-inner' : 'text-ivory-white/80'}`
            }
          >
            <item.icon className="h-4 w-4 shrink-0" aria-hidden="true" />
            {item.label}
          </NavLink>
        ))}
      </nav>

      <div className="mt-auto p-3">
        <button
          type="button"
          onClick={handleLogout}
          className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left font-body text-sm text-ivory-white/80 transition-all duration-300 hover:-translate-y-0.5 hover:bg-ivory-white/10 hover:text-champagne-gold"
        >
          <LogOut className="h-4 w-4 shrink-0" aria-hidden="true" />
          Logout
        </button>
      </div>
    </>
  );
}

function AdminLayout() {
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const closeSidebar = () => setIsSidebarOpen(false);

  useEffect(() => {
    closeSidebar();
  }, [location.pathname]);

  useEffect(() => {
    function handleKeyDown(event) {
      if (event.key === 'Escape') {
        closeSidebar();
      }
    }

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isSidebarOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isSidebarOpen]);

  return (
    <div className="flex min-h-screen bg-transparent">
      <aside className="hidden w-72 shrink-0 flex-col border-r border-matte-black/10 bg-matte-black text-ivory-white shadow-glow lg:flex">
        <AdminSidebar />
      </aside>

      <AnimatePresence>
        {isSidebarOpen && (
          <>
            <motion.button
              type="button"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-40 bg-matte-black/60 backdrop-blur-sm lg:hidden"
              aria-label="Close navigation"
              onClick={closeSidebar}
            />
            <motion.aside
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'tween', duration: 0.25 }}
              className="fixed inset-y-0 left-0 z-50 flex w-[min(18rem,85vw)] flex-col border-r border-matte-black/10 bg-matte-black text-ivory-white shadow-glow lg:hidden"
            >
              <div className="flex items-center justify-end px-3 pt-3">
                <button
                  type="button"
                  onClick={closeSidebar}
                  className="grid h-10 w-10 place-items-center rounded-xl border border-ivory-white/10 bg-white/5 text-ivory-white transition hover:border-champagne-gold/40 hover:text-champagne-gold"
                  aria-label="Close navigation"
                >
                  <X className="h-5 w-5" aria-hidden="true" />
                </button>
              </div>
              <AdminSidebar onNavigate={closeSidebar} />
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="border-b border-matte-black/10 bg-ivory-white/85 px-4 py-4 backdrop-blur-sm sm:px-6 sm:py-5 lg:px-8">
          <div className="flex items-center justify-between gap-3">
            <div className="flex min-w-0 items-center gap-3">
              <button
                type="button"
                onClick={() => setIsSidebarOpen(true)}
                className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-matte-black/10 bg-white text-matte-black/70 shadow-sm transition hover:border-champagne-gold hover:text-matte-black lg:hidden"
                aria-label="Open navigation"
                aria-expanded={isSidebarOpen}
              >
                <Menu className="h-5 w-5" aria-hidden="true" />
              </button>
              <div className="min-w-0">
                <span className="font-body text-xs uppercase tracking-[0.24em] text-champagne-gold">
                  Management
                </span>
                <h1 className="truncate font-heading text-lg text-matte-black sm:text-xl">
                  DESTEOR Admin
                </h1>
              </div>
            </div>
            <button
              type="button"
              className="inline-flex shrink-0 items-center gap-2 rounded-xl border border-matte-black/10 bg-white px-3 py-2 text-sm text-matte-black/70 shadow-sm transition hover:border-champagne-gold hover:text-matte-black sm:px-4"
            >
              <Settings className="h-4 w-4" aria-hidden="true" />
              <span className="hidden sm:inline">Settings</span>
            </button>
          </div>
        </header>

        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default AdminLayout;
