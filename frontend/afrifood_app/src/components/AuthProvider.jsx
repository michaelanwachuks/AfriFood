import React, { useState, useEffect } from "react";
import { AuthContext } from "./AuthContext";

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // 🔐 Fetch current logged-in user
  const fetchUser = async () => {
    try {
      const res = await fetch("http://localhost:8080/api/auth/me", {
        credentials: "include", // 🔥 REQUIRED for cookies
      });

      if (res.ok) {
        const data = await res.json();
        setUser(data); // user email or object
      } else {
        setUser(null);
      }
    } catch (error) {
      console.error("Auth check failed:", error);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  // 🚀 Run once when app loads
  useEffect(() => {
    fetchUser();
  }, []);

  // 🔓 Logout function
  const logout = async () => {
    try {
      await fetch("http://localhost:8080/api/logout", {
        method: "POST",
        credentials: "include",
      });

      setUser(null);
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, setUser, loading, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;