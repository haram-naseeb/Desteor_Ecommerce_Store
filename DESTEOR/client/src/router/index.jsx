import { createBrowserRouter } from 'react-router-dom';

import MainLayout from '@/layouts/MainLayout';
import AuthLayout from '@/layouts/AuthLayout';
import AdminLayout from '@/layouts/AdminLayout';
import ProtectedRoute from '@/components/ProtectedRoute';
import Cart from '@/pages/Cart';
import ForgotPassword from '@/pages/ForgotPassword';
import Login from '@/pages/Login';
import Profile from '@/pages/Profile';
import Register from '@/pages/Register';
import ResetPassword from '@/pages/ResetPassword';
import About from '@/pages/public/About';
import Contact from '@/pages/public/Contact';
import Home from '@/pages/public/Home';
import NotFound from '@/pages/public/NotFound';
import ProductDetails from '@/pages/public/ProductDetails';
import Shop from '@/pages/public/Shop';

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
    path: '/admin',
    element: <AdminLayout />,
    children: [],
  },
]);

export default router;
