import { Outlet, NavLink, useNavigate } from 'react-router-dom';
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
  { label: 'Dashboard', path: ROUTES.ADMIN.DASHBOARD },
  { label: 'Products', path: ROUTES.ADMIN.PRODUCTS },
  { label: 'Orders', path: ROUTES.ADMIN.ORDERS },
  { label: 'Users', path: ROUTES.ADMIN.USERS },
  { label: 'Categories', path: ROUTES.ADMIN.CATEGORIES },
  { label: 'Collections', path: ROUTES.ADMIN.COLLECTIONS },
];

function AdminLayout() {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = async () => {
    await logout();
    navigate(ROUTES.LOGIN, { replace: true });
  };

  return (
    <div className="flex min-h-screen bg-ivory-white">
      <aside className="flex w-64 shrink-0 flex-col border-r border-matte-black/10 bg-matte-black text-ivory-white">
        <div className="px-6 py-6">
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
                `rounded-md px-3 py-2 font-body text-sm transition-colors hover:bg-ivory-white/10 hover:text-champagne-gold ${isActive ? 'bg-ivory-white/10 text-champagne-gold' : 'text-ivory-white/80'}`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
        <div className="mt-auto p-3">
          <button
            type="button"
            onClick={handleLogout}
            className="w-full rounded-md px-3 py-2 text-left font-body text-sm text-ivory-white/80 transition-colors hover:bg-ivory-white/10 hover:text-champagne-gold"
          >
            Logout
          </button>
        </div>
      </aside>

      <div className="flex flex-1 flex-col">
        <header className="border-b border-matte-black/10 bg-ivory-white px-8 py-4">
          <span className="font-body text-sm text-matte-black/60">DESTEOR Admin</span>
        </header>

        <main className="flex-1 p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default AdminLayout;
