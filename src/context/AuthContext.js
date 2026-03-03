import React, { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userRole, setUserRole] = useState(null); // HR / EMPLOYEE
  const [username, setUsername] = useState(""); // store logged-in username (optional)

  // Derived state: user is logged in if userRole exists
  const isLoggedIn = !!userRole;

  const login = (role, name) => {
    setUserRole(role);
    setUsername(name);
  };

  const logout = () => {
    setUserRole(null);
    setUsername("");
    // Optional: clear AsyncStorage tokens here if used
  };

  return (
    <AuthContext.Provider
      value={{
        userRole,
        setUserRole,
        username,
        setUsername,
        isLoggedIn,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);