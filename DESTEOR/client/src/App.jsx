import { RouterProvider } from 'react-router-dom';
import router from '@/router';

/**
 * App.jsx
 *
 * Top-level app shell. Wires the centralized router. Future global
 * providers (e.g. an auth context, a query client) are added here as
 * they're introduced — kept minimal for Sprint 1 since none exist yet.
 */
function App() {
  return <RouterProvider router={router} />;
}

export default App;
