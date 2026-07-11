import { Navigate, Outlet } from 'react-router-dom';
import Loader from '@/components/ui/Loader';
import { ROUTES } from '@/constants/routes';
import { useAuth } from '@/hooks/useAuth';
function AdminRoute() { const { currentUser, loading } = useAuth(); if (loading) return <div className="grid min-h-screen place-items-center"><Loader size="lg" /></div>; return currentUser?.role === 'ADMIN' ? <Outlet /> : <Navigate to={ROUTES.HOME} replace />; }
export default AdminRoute;
