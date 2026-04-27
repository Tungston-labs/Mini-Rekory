import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import LoginScreen from "../screens/LoginScreen";
import StartingScreen from "../screens/StartingScreen";
import ForgetScreen from "../screens/AuthScreen/ForgetScreen";
import OTPScreen from "../screens/AuthScreen/OTPScreen";
import ResetPasswordScreen from "../screens/AuthScreen/ResetPasswordScreen";

const Stack = createNativeStackNavigator();

const AuthNavigator = ({ setShowTracking }) => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      
      {/* ✅ FIRST SCREEN */}
      <Stack.Screen name="Starting">
        {(props) => (
          <StartingScreen {...props} setShowTracking={setShowTracking} />
        )}
      </Stack.Screen>

      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Forget" component={ForgetScreen} />
      <Stack.Screen name="VerifyOtp" component={OTPScreen} />
      <Stack.Screen name="ResetPassword" component={ResetPasswordScreen} />
    </Stack.Navigator>
  );
};

export default AuthNavigator;