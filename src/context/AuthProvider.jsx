// @ts-nocheck
import React, { createContext, useState } from "react";
import jwtDecode from "jwt-decode";
import { close } from "../socket";

export const AuthContext = createContext({
  isAuthenticated: false,
  user: null,
  login: (loggedUser) => {},
  logout: () => {},
});

export default function AuthProvider({ children }) {
  let guestUser = null;
  const token = localStorage.getItem("token");
  if (token) {
    const decodedToken = jwtDecode(token);
    const expiresAt = new Date(decodedToken.exp * 1000);

    if (new Date() > expiresAt) {
      localStorage.removeItem("token");
    } else {
      guestUser = decodedToken;
    }
  }
  const [isAuthenticated, setIsAuthenticated] = useState(guestUser !== null);

  const [user, setUser] = useState(guestUser);

  const login = (loggedUser) => {
    localStorage.setItem("token", loggedUser.token);
    setUser(loggedUser);
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    setIsAuthenticated(false);
    close();
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
