import React from "react";
import { AuthProvider } from "./src/context/AuthContext";
import RootNavigator from "./src/navigation/RootNavigator";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { NavigationContainer } from "@react-navigation/native";
// import { navigationRef } from "./NavigationService";
const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        {/* <NavigationContainer ref={navigationRef}> */}
          <RootNavigator />
        {/* </NavigationContainer> */}
      </AuthProvider>
    </QueryClientProvider>
  );
}
