import React, { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userRole, setUserRole] = useState(null); // HR / EMPLOYEE
  const [username, setUsername] = useState(""); // store logged-in username (optional)

  return (
    <AuthContext.Provider value={{ userRole, setUserRole, username, setUsername }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
