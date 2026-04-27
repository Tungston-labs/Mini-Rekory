import React from "react";
import { View } from "react-native";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Toast from "react-native-toast-message";
import { AuthProvider } from "./src/context/AuthContext";
import RootNavigator from "./src/navigation/RootNavigator";

const queryClient = new QueryClient();

export default function App() {
  return (
    <View style={{ flex: 1, backgroundColor: "#A40A0B" }}>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <RootNavigator />
          <Toast />
        </AuthProvider>
      </QueryClientProvider>
    </View>
  );
}