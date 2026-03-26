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
        const accessToken = await AsyncStorage.getItem("accessToken");
        const refreshToken = await AsyncStorage.getItem("refreshToken");

        console.log("ACCESS:", accessToken);
        console.log("REFRESH:", refreshToken);

        if (role && accessToken && refreshToken) {
          setUserRole(role);
          setUsername(email);
        } else {
          // ✅ Clean invalid data
          await AsyncStorage.multiRemove([
            "accessToken",
            "refreshToken",
            "userRole",
            "userEmail",
          ]);
        }
      } catch (error) {
        console.log("Auth restore error:", error);
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, []);

  const login = async (role, email, accessToken, refreshToken) => {
    setUserRole(role);
    setUsername(email);

    await AsyncStorage.multiSet([
      ["userRole", role],
      ["userEmail", email],
      ["accessToken", accessToken],
      ["refreshToken", refreshToken],
    ]);
  };

  const logout = async () => {
    setUserRole(null);
    setUsername("");

    await AsyncStorage.multiRemove([
      "accessToken",
      "refreshToken",
      "userRole",
      "userEmail",
    ]);
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