import React, { createContext, useContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

  const [userRole, setUserRole] = useState(null);
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(true);

  const isLoggedIn = !!userRole;


  useEffect(() => {
    const loadUser = async () => {
      try {
        const role = await AsyncStorage.getItem("userRole");
        const email = await AsyncStorage.getItem("userEmail");

        if (role) {
          setUserRole(role);
          setUsername(email);
        }
      } catch (error) {
        console.log("Auth restore error:", error);
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, []);


  const login = async (role, email) => {
    setUserRole(role);
    setUsername(email);

    await AsyncStorage.setItem("userRole", role);
    await AsyncStorage.setItem("userEmail", email);
  };
  
  const logout = async () => {
    setUserRole(null);
    setUsername("");

    await AsyncStorage.removeItem("accessToken");
    await AsyncStorage.removeItem("refreshToken");
    await AsyncStorage.removeItem("userRole");
    await AsyncStorage.removeItem("userEmail");
  };

  return (
    <AuthContext.Provider
      value={{
        userRole,
        username,
        isLoggedIn,
        login,
        logout,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);