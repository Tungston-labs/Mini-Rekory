import React, { useState, useEffect } from "react";
import { NavigationContainer,DefaultTheme } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useAuth } from "../context/AuthContext";

import AppNavigator from "./AppNavigator";
import EmployeeNavigator from "./EmployeeNavigator";
import AuthNavigator from "./AuthNavigator";

import SplashScreen from "../screens/SplashScreen";
import TrackScreen from "../screens/TrackScreen";

const RootNavigator = () => {
  const { userRole } = useAuth();

  // ✅ ALWAYS declare hooks at top (no conditions)
  const [showSplash, setShowSplash] = useState(true);
  const [showTrack, setShowTrack] = useState(false);
  const [showAuth, setShowAuth] = useState(false);

  const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: "#fff",
  },
};

  // ✅ safe async init
  useEffect(() => {
    const init = async () => {
      const hasSeenIntro = await AsyncStorage.getItem("hasSeenIntro");

      if (userRole) {
        setShowSplash(true);
        return;
      }

      if (!hasSeenIntro) {
        setShowTrack(true);
        setShowAuth(true);
      } else {
        setShowAuth(true);
      }
    };

    init();
  }, [userRole]);

  // ✅ splash timer (ALWAYS safe hook)
  useEffect(() => {
    if (showSplash) {
      const timer = setTimeout(() => {
        setShowSplash(false);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [showSplash]);

  // ================= UI FLOW =================

  if (showSplash) {
    return <SplashScreen />;
  }

  if (showTrack && !userRole) {
    return <TrackScreen onNext={() => setShowTrack(false)} />;
  }

  return (
    <NavigationContainer theme={MyTheme}>
      {!userRole && showAuth && <AuthNavigator />}
      {userRole === "company" && <AppNavigator />}
      {userRole === "employee" && <EmployeeNavigator />}
    </NavigationContainer>
  );
};

export default RootNavigator;