import { createBrowserRouter } from 'react-router-dom';

import MainLayout from '@/layouts/MainLayout';
import AuthLayout from '@/layouts/AuthLayout';
import AdminLayout from '@/layouts/AdminLayout';
import ProtectedRoute from '@/components/ProtectedRoute';
import AdminRoute from '@/components/AdminRoute';
import Cart from '@/pages/Cart';
import Checkout from '@/pages/Checkout';
import ForgotPassword from '@/pages/ForgotPassword';
import Login from '@/pages/Login';
import OrderDetails from '@/pages/OrderDetails';
import Orders from '@/pages/Orders';
import Profile from '@/pages/Profile';
import Register from '@/pages/Register';
import ResetPassword from '@/pages/ResetPassword';
import Wishlist from '@/pages/Wishlist';
import About from '@/pages/public/About';
import Contact from '@/pages/public/Contact';
import Home from '@/pages/public/Home';
import NotFound from '@/pages/public/NotFound';
import ProductDetails from '@/pages/public/ProductDetails';
import Shop from '@/pages/public/Shop';
import Search from '@/pages/public/Search';
import Dashboard from '@/pages/admin/Dashboard';
import AdminProducts from '@/pages/admin/Products';
import AdminOrders from '@/pages/admin/Orders';
import TaxonomyPage from '@/pages/admin/TaxonomyPage';
import AdminUsers from '@/pages/admin/Users';

/**
 * router/index.jsx
 *
 * Centralized route tree. Layouts wrap their respective sections;
 * page components will be added as children in future sprints
 * (Sprint 1 only proves the layout/routing skeleton).
 */
const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: 'shop',
        element: <Shop />,
      },
      {
        path: 'shop/:slug',
        element: <ProductDetails />,
      },
      {
        path: 'search',
        element: <Search />,
      },
      {
        path: 'about',
        element: <About />,
      },
      {
        path: 'contact',
        element: <Contact />,
      },
      {
        element: <ProtectedRoute />,
        children: [
          {
            path: 'profile',
            element: <Profile />,
          },
          {
            path: 'cart',
            element: <Cart />,
          },
          {
            path: 'wishlist',
            element: <Wishlist />,
          },
          {
            path: 'checkout',
            element: <Checkout />,
          },
          {
            path: 'orders',
            element: <Orders />,
          },
          {
            path: 'orders/:id',
            element: <OrderDetails />,
          },
        ],
      },
      {
        path: '*',
        element: <NotFound />,
      },
    ],
  },
  {
    path: '/',
    element: <AuthLayout />,
    children: [
      {
        path: 'login',
        element: <Login />,
      },
      {
        path: 'register',
        element: <Register />,
      },
      {
        path: 'forgot-password',
        element: <ForgotPassword />,
      },
      {
        path: 'reset-password/:token',
        element: <ResetPassword />,
      },
    ],
  },
  {
    element: <AdminRoute />,
    children: [{ path: '/admin', element: <AdminLayout />, children: [
      { index: true, element: <Dashboard /> },
      { path: 'dashboard', element: <Dashboard /> },
      { path: 'products', element: <AdminProducts /> },
      { path: 'orders', element: <AdminOrders /> },
      { path: 'users', element: <AdminUsers /> },
      { path: 'categories', element: <TaxonomyPage type="categories" title="Categories" /> },
    ] }],
  },
]);

export default router;
