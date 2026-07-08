import { RouterProvider } from 'react-router-dom';
import { AuthProvider } from '@/contexts/AuthContext';
import router from '@/router';

/**
 * App.jsx
 *
 * Top-level app shell. Wires the centralized router. Future global
 * providers (e.g. an auth context, a query client) are added here as
 * they're introduced — kept minimal for Sprint 1 since none exist yet.
 */
function App() {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}

export default App;
