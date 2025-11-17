import { createContext, useState } from "react";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [auth, setAuth] = useState({
    id: localStorage.getItem("id") || null,
    role: localStorage.getItem("role") || null,
    isLoggedIn: localStorage.getItem("id") !== null
  });

  const login = (id, role) => {
    localStorage.setItem("id", id);
    localStorage.setItem("role", role);

    setAuth({
      id,
      role,
      isLoggedIn: true
    });
  };

  const logout = () => {
    localStorage.removeItem("id");
    localStorage.removeItem("role");

    setAuth({
      id: null,
      role: null,
      isLoggedIn: false
    });
  };

  return (
    <AuthContext.Provider value={{ auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
