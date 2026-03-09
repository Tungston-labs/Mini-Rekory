import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { useAuth } from "../context/AuthContext";
import AppNavigator from "./AppNavigator";
import EmployeeNavigator from "./EmployeeNavigator";
import AuthNavigator from "./AuthNavigator";
import TrackScreen from "../screens/TrackScreen";

const RootNavigator = () => {

  const { userRole, loading } = useAuth();
  console.log("USER ROLE:", userRole);
  console.log("LOADING:", loading);
  if (loading) {
    return <TrackScreen />;
  }

  return (
    <NavigationContainer>
      {!userRole && <AuthNavigator />}
      {userRole === "company" && <AppNavigator />}
      {userRole === "employee" && <EmployeeNavigator />}
    </NavigationContainer>
  );
};

export default RootNavigator;