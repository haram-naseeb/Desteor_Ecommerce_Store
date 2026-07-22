import { Outlet } from 'react-router-dom';

import Navbar from '@/components/layout/Navbar';
import ScrollToTop from '@/components/ScrollToTop';

/**
 * MainLayout
 *
 * Shell for the public storefront: Home, Shop, Product Details, About,
 * Contact. Owns navigation and footer chrome only; page content renders
 * through the <Outlet />. No business logic lives here.
 */
function MainLayout() {
  return (
    <div className="flex min-h-screen flex-col bg-transparent">
      <ScrollToTop />
      <Navbar />

      <main className="flex-1">
        <Outlet />
      </main>
    </div>
  );
}

export default MainLayout;
