import { Outlet } from 'react-router-dom';

import Footer from '@/components/layout/Footer';
import Navbar from '@/components/layout/Navbar';

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
      <Navbar />

      <main className="flex-1">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}

export default MainLayout;
