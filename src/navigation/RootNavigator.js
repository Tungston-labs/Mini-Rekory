// src/navigation/RootNavigator.js
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { useAuth } from "../context/AuthContext";
import AppNavigator from "./AppNavigator"
import EmployeeNavigator from "./EmployeeNavigator";
import AuthNavigator from "./AuthNavigator"

const RootNavigator = () => {
  const { userRole } = useAuth();

  return (
    <NavigationContainer>
      {!userRole && <AuthNavigator />}
      {userRole === "HR" && <AppNavigator />}
      {userRole === "EMPLOYEE" && <EmployeeNavigator />}
    </NavigationContainer>
  );
};

export default RootNavigator;
