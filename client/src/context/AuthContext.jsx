import { createContext, useContext, useState, useCallback } from 'react';
import { authAPI } from '../api';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const saved = sessionStorage.getItem('user');
    return saved ? JSON.parse(saved) : null;
  });

  const setAuthSession = useCallback((accessToken, userData) => {
    sessionStorage.setItem('accessToken', accessToken);
    sessionStorage.setItem('user', JSON.stringify(userData));
    setUser(userData);
  }, []);

  const login = useCallback(async (email, password) => {
    const { data } = await authAPI.login({ email, password });
    if (data.accessToken && data.user) {
      setAuthSession(data.accessToken, data.user);
    }
    return data;
  }, [setAuthSession]);

  const register = useCallback(async (name, email, password) => {
    const { data } = await authAPI.register({ name, email, password });
    return data;
  }, []);

  const verifyEmail = useCallback(async (email, otp) => {
    const { data } = await authAPI.verifyEmail({ email, otp });
    if (data.accessToken && data.user) {
      setAuthSession(data.accessToken, data.user);
    }
    return data;
  }, [setAuthSession]);

  const logout = useCallback(async () => {
    await authAPI.logout().catch(() => {});
    sessionStorage.clear();
    setUser(null);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        register,
        verifyEmail,
        logout,
        setAuthSession,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider');
  return ctx;
};
