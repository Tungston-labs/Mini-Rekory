import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import TrackScreen from "../screens/TrackScreen";
import LoginScreen from "../screens/LoginScreen";
import StartingScreen from "../screens/StartingScreen"
const Stack = createNativeStackNavigator();

const AuthNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}
      detachInactiveScreens={true}>
      <Stack.Screen name="Splash" component={TrackScreen} />
       <Stack.Screen name="StartingScreen" component={StartingScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
    </Stack.Navigator>
  );
};

export default AuthNavigator;
