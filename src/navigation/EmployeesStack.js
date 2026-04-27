import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { useAuth } from "../context/AuthContext";

import AppNavigator from "./AppNavigator";
import EmployeeNavigator from "./EmployeeNavigator";
import AuthNavigator from "./AuthNavigator";

import SplashScreen from "../screens/SplashScreen";
import TrackScreen from "../screens/TrackScreen";

const RootNavigator = () => {
  const { userRole, loading } = useAuth();

  const [showSplash, setShowSplash] = useState(true);
  const [showTracking, setShowTracking] = useState(false);

  // ✅ Splash timer
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  // ✅ After StartingScreen triggers tracking
  useEffect(() => {
    if (showTracking) {
      const timer = setTimeout(() => {
        setShowTracking(false);
      }, 2000); // tracking screen time

      return () => clearTimeout(timer);
    }
  }, [showTracking]);

  // ✅ STEP 1: Splash
  if (showSplash) {
    return <SplashScreen />;
  }

  // ✅ STEP 3: TrackScreen (after button click)
  if (showTracking) {
    return <TrackScreen />;
  }

  // ✅ STEP 2: Navigation (StartingScreen is inside AuthNavigator)
  return (
    <NavigationContainer>
      {!userRole && <AuthNavigator setShowTracking={setShowTracking} />}
      {userRole === "company" && <AppNavigator />}
      {userRole === "employee" && <EmployeeNavigator />}
    </NavigationContainer>
  );
};

export default RootNavigator;