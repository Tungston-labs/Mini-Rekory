import React, { useEffect } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Toast from "react-native-toast-message";
import { AuthProvider } from "./src/context/AuthContext";
import RootNavigator from "./src/navigation/RootNavigator";
// import ReactNativeForegroundService from "@supersami/rn-foreground-service";

const queryClient = new QueryClient();

export default function App() {

  // useEffect(() => {
  //   ReactNativeForegroundService.register({
  //     id: 144,
  //     onStart: () => {
  //       console.log("Foreground service started");
  //     },
  //     onStop: () => {
  //       console.log("Foreground service stopped");
  //     },
  //   });
  // }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <RootNavigator />
        <Toast />
      </AuthProvider>
    </QueryClientProvider>
  );
}