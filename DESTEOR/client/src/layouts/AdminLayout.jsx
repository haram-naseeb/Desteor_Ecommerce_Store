import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  Layers3,
  LogOut,
  Package,
  Settings,
  Shapes,
  ShoppingBag,
  Users,
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

function AdminLayout() {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = async () => {
    await logout();
    navigate(ROUTES.LOGIN, { replace: true });
  };

  return (
    <div className="flex min-h-screen bg-transparent">
      <aside className="flex w-72 shrink-0 flex-col border-r border-matte-black/10 bg-matte-black text-ivory-white shadow-glow">
        <div className="px-6 py-7">
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
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-xl px-4 py-3 font-body text-sm transition-all duration-300 hover:-translate-y-0.5 hover:bg-ivory-white/10 hover:text-champagne-gold ${isActive ? 'bg-ivory-white/10 text-champagne-gold shadow-inner' : 'text-ivory-white/80'}`
              }
            >
              <item.icon className="h-4 w-4" aria-hidden="true" />
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
            <LogOut className="h-4 w-4" aria-hidden="true" />
            Logout
          </button>
        </div>
      </aside>

      <div className="flex flex-1 flex-col">
        <header className="border-b border-matte-black/10 bg-ivory-white/85 px-8 py-5 backdrop-blur-sm">
          <div className="flex items-center justify-between gap-4">
            <div>
              <span className="font-body text-xs uppercase tracking-[0.24em] text-champagne-gold">
                Management
              </span>
              <h1 className="mt-1 font-heading text-xl text-matte-black">DESTEOR Admin</h1>
            </div>
            <button type="button" className="inline-flex items-center gap-2 rounded-xl border border-matte-black/10 bg-white px-4 py-2 text-sm text-matte-black/70 shadow-sm transition hover:border-champagne-gold hover:text-matte-black">
              <Settings className="h-4 w-4" aria-hidden="true" />
              Settings
            </button>
          </div>
        </header>

        <main className="flex-1 p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default AdminLayout;
