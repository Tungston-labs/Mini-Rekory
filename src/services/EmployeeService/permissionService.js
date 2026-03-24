import { PermissionsAndroid, Platform } from "react-native";

export const requestForegroundLocationPermission = async () => {
  try {
    if (Platform.OS !== "android") return true;

    if (Platform.Version >= 33) {
      const notifGranted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS);
      if (notifGranted !== PermissionsAndroid.RESULTS.GRANTED) {
        console.log("⚠️ Notification permission denied, foreground service might fail");
      }
    }

    console.log("➡️ Requesting permission");

    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
    );

    return granted === PermissionsAndroid.RESULTS.GRANTED;
  } catch (error) {
    console.log("❌ Foreground permission error:", error);
    return false;
  }
};

export const requestBackgroundLocationPermission = async () => {
  try {
    if (Platform.OS !== "android") return true;

    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_BACKGROUND_LOCATION
    );

    return granted === PermissionsAndroid.RESULTS.GRANTED;
  } catch (error) {
    console.log("❌ Background permission error:", error);
    return false;
  }
};