import { useCallback, useEffect, useMemo, useState } from 'react';

import { AuthContext } from '@/contexts/auth-context';
import { clearTokens, getStoredAccessToken } from '@/services/api';
import {
  loginUser,
  logoutUser,
  refreshSession,
  registerUser,
  verifyUser,
} from '@/services/auth.service';

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const logout = useCallback(async () => {
    await logoutUser();
    setCurrentUser(null);
  }, []);

  useEffect(() => {
    let isMounted = true;

    async function hydrateUser() {
      if (!getStoredAccessToken()) {
        setLoading(false);
        return;
      }

      try {
        const user = await verifyUser();
        if (isMounted) setCurrentUser(user);
      } catch {
        try {
          const user = await refreshSession();
          if (isMounted) setCurrentUser(user);
        } catch {
          clearTokens();
          if (isMounted) setCurrentUser(null);
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    hydrateUser();

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    const handleUnauthorized = () => {
      clearTokens();
      setCurrentUser(null);
    };

    window.addEventListener('desteor:unauthorized', handleUnauthorized);
    return () => {
      window.removeEventListener('desteor:unauthorized', handleUnauthorized);
    };
  }, []);

  const login = useCallback(async (credentials) => {
    const user = await loginUser(credentials);
    setCurrentUser(user);
    return user;
  }, []);

  const register = useCallback(async (payload) => {
    const user = await registerUser(payload);
    setCurrentUser(user);
    return user;
  }, []);

  const value = useMemo(
    () => ({
      currentUser,
      isAuthenticated: Boolean(currentUser),
      loading,
      login,
      logout,
      register,
    }),
    [currentUser, loading, login, logout, register]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
