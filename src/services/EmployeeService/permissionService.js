// import { PermissionsAndroid, Platform } from "react-native";

// /**
//  * Requests foreground location + notification permission (Android 13+)
//  */
// export const requestForegroundLocationPermission = async () => {
//   try {
//     if (Platform.OS !== "android") return true;

//     // Android 13+ notification permission
//     if (Platform.Version >= 33) {
//       const notifGranted = await PermissionsAndroid.request(
//         PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS
//       );

//       if (notifGranted !== PermissionsAndroid.RESULTS.GRANTED) {
//         console.log(
//           "⚠️ Notification permission denied, foreground service might not show"
//         );
//       }
//     }

//     // Request fine location for foreground tracking
//     const granted = await PermissionsAndroid.request(
//       PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
//       {
//         title: "Location Permission",
//         message:
//           "This app needs access to your location to track attendance in the background.",
//         buttonPositive: "OK",
//         buttonNegative: "Cancel",
//       }
//     );

//     if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
//       console.log("❌ Foreground location permission denied");
//     }

//     return granted === PermissionsAndroid.RESULTS.GRANTED;
//   } catch (error) {
//     console.log("❌ Foreground permission error:", error);
//     return false;
//   }
// };

// /**
//  * Requests background location permission
//  */
// export const requestBackgroundLocationPermission = async () => {
//   try {
//     if (Platform.OS !== "android") return true;

//     // Only request background location if Android 10+ (API 29+)
//     if (Platform.Version < 29) return true;

//     const granted = await PermissionsAndroid.request(
//       PermissionsAndroid.PERMISSIONS.ACCESS_BACKGROUND_LOCATION,
//       {
//         title: "Background Location Permission",
//         message:
//           "This app needs background location access to track your attendance when app is minimized.",
//         buttonPositive: "OK",
//         buttonNegative: "Cancel",
//       }
//     );

//     if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
//       console.log("❌ Background location permission denied");
//     }

//     return granted === PermissionsAndroid.RESULTS.GRANTED;
//   } catch (error) {
//     console.log("❌ Background permission error:", error);
//     return false;
//   }
// };


import { PermissionsAndroid } from "react-native";

export const ensurePermissionReady = async () => {
  const fine = await PermissionsAndroid.check(
    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
  );

  if (!fine) {
    throw new Error("Permission not active yet");
  }

  return true;
};

export const waitForLocationPermission = async (retries = 5) => {

  for (let i = 0; i < retries; i++) {

    const fine = await PermissionsAndroid.check(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
    );

    if (fine) return true;

    await new Promise(res => setTimeout(res, 1000)); // wait 1 sec
  }

  throw new Error("Permission not becoming active");
};