import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { jwtDecode } from 'jwt-decode';

const AuthContext = createContext(null);

function readUserFromToken(token) {
  if (!token) {
    return null;
  }

  try {
    const decoded = jwtDecode(token);
    return {
      id: decoded.id,
      email: decoded.email
    };
  } catch (error) {
    return null;
  }
}

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem('tm_token') || '');
  const [user, setUser] = useState(() => readUserFromToken(localStorage.getItem('tm_token') || ''));

  useEffect(() => {
    if (token) {
      localStorage.setItem('tm_token', token);
      setUser(readUserFromToken(token));
    } else {
      localStorage.removeItem('tm_token');
      setUser(null);
    }
  }, [token]);

  const login = (nextToken) => {
    setToken(nextToken);
  };

  const logout = () => {
    setToken('');
    setUser(null);
  };

  const value = useMemo(
    () => ({
      user,
      token,
      login,
      logout,
      isAuthenticated: Boolean(token && user)
    }),
    [token, user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }

  return context;
}

export default AuthContext;
