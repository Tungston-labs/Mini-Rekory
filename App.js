import React, { useEffect } from "react";
import { AppState } from "react-native";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Toast from "react-native-toast-message";
import { AuthProvider } from "./src/context/AuthContext";
import RootNavigator from "./src/navigation/RootNavigator";
import {
  getLastTrackingMarkers,
  resumeLocationTrackingIfNeeded,
} from "./src/services/EmployeeService/backgroundLocationService";

const queryClient = new QueryClient();

export default function App() {
  useEffect(() => {
    // Best-effort resume after app restarts (e.g., process killed).
    resumeLocationTrackingIfNeeded();

    const logMarkers = () => {
      // Helpful debugging: verify whether the foreground loop has executed.
      // These markers persist even if JS console logs are not visible in background.
        console.log("📢 logMarkers called");
      getLastTrackingMarkers().then((m) => {
        console.log("🧭 Tracking markers:", m);
      });
    };

    // Log now (initial mount)
    logMarkers();

    // And whenever user returns app to foreground
    const subscription = AppState.addEventListener("change", (nextState) => {
      if (nextState === "active") {
        logMarkers();
      }
    });

    return () => subscription.remove();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <RootNavigator />
        <Toast />
      </AuthProvider>
    </QueryClientProvider>
  );
}