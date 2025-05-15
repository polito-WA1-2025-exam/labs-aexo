// src/context/AuthContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import API from '../API';

const AuthContext = createContext({
  user: null,
  login: async () => {},
  logout: async () => {},
});

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  // optional: on mount, try to rehydrate from a session cookie/token
  useEffect(() => {
    (async () => {
      try {
        const me = await API.getCurrentUser();
        setUser(me);
      } catch {
        setUser(null);
      }
    })();
  }, []);

  const login = async ({ username, password }) => {
    const loggedInUser = await API.logIn({ username, password });
    setUser(loggedInUser);
    return loggedInUser;
  };

  const logout = async () => {
    await API.logOut();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// custom hook for consuming the auth context
export function useAuth() {
  return useContext(AuthContext);
}
