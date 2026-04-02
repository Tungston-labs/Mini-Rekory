import BackgroundFetch from "react-native-background-fetch";
import Geolocation from "react-native-geolocation-service";
import ReactNativeForegroundService from "@supersami/rn-foreground-service";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { locationUpdateApi } from "./attendanceService";
import { getPlaceName } from "./locationService";

// ========================================
// FOREGROUND SERVICE
// ========================================

const startForegroundService = async () => {
  console.log("🚀 Foreground Service Started");
  await ReactNativeForegroundService.start({
    id: 1001, title: "Location Tracking",
    message: "Fetching your location...",
    icon: "ic_launcher",
    ServiceType: "location",
  });
};

const stopForegroundService = async () => {
  console.log("🛑 Foreground Service Stopped");
  await ReactNativeForegroundService.stop();
};

// ❌ DO NOT STOP frequently (only when user stops tracking)

// ========================================
// GET LOCATION
// ========================================

export const getLocation = () => {
  return new Promise((resolve, reject) => {
    Geolocation.getCurrentPosition(
      position => resolve(position),
      error => reject(error),
      {
        enableHighAccuracy: true,
        timeout: 15000,
        maximumAge: 10000,
        forceRequestLocation: true,
      });
  });
};

// ========================================
// SEND LOCATION
// ========================================

const sendLocationToServer = async (coords) => {
  try {
    const lastTime = await AsyncStorage.getItem("lastLocationTime");
    const now = Date.now();

    if (lastTime && now - Number(lastTime) < 60 * 1000) {
      console.log("⏳ Skipped (within 1 min)");
      return;
    }

    const sessionId = await AsyncStorage.getItem("sessionId");

    const lat = coords.latitude.toFixed(6).toString();
    const lng = coords.longitude.toFixed(6).toString();

    const placeName = `Lat: ${lat}, Lng: ${lng}`;

    await locationUpdateApi({
      lat,
      lng,
      place_name: placeName,
      session_id: sessionId,
    });

    await AsyncStorage.setItem("lastLocationTime", now.toString());

    console.log("✅ Sent:", lat, lng, placeName);
  } catch (err) {
    console.log("❌ API ERROR:", err?.response?.data || err.message);
  }
};


// ======================================== 
// // IMMEDIATE LOCATION 
// // ======================================== 

export const sendImmediateLocation = async () => {
  try {
    const position = await getLocation();

    console.log("📍 Immediate location:", position.coords);

    await sendLocationToServer(position.coords);

  } catch (err) {
    console.log("❌ Immediate location error:", err);
  }
};
// ========================================
// START TRACKING
// ========================================

export const startTracking = async () => {
  console.log("🚀 Tracking STARTED");

  const isRunning = await ReactNativeForegroundService.is_running();
  console.log("service running:", isRunning);
  if (isRunning) {
    console.log("⚠️ Service already running");
    return;
  }

  await ReactNativeForegroundService.start({
    id: 1001,
    title: "Location Tracking",
    message: "Tracking your location...",
    icon: "ic_launcher",
    ServiceType: "location",
  });

  ReactNativeForegroundService.remove_task("location-task");

  ReactNativeForegroundService.add_task(
    async () => {
      console.log("⏱️ 15 MIN TASK TRIGGERED");

      try {
        const position = await getLocation();
        await sendLocationToServer(position.coords);
      } catch (err) {
        console.log("❌ Interval error:", err);
      }
    },
    {
      delay: 5 * 60 * 1000,
      onLoop: true,
      taskId: "location-task",
      onError: (e) => console.log("TASK ERROR:", e),
    }
  );

  // ✅ ONLY ONE immediate call here
  await sendImmediateLocation();

  // ✅ Start background fetch as backup
  // await BackgroundFetch.start();
};

// ========================================
// STOP TRACKING
// ========================================

export const stopTracking = async () => {
  console.log("🛑 Tracking STOPPED");

  ReactNativeForegroundService.remove_task("location-task");

  await ReactNativeForegroundService.stop();
  await BackgroundFetch.stop();
};


// ========================================
//  // DESTROY TRACKING // 
// ======================================== 

export const destroyTracking = async () => {
  await BackgroundFetch.stop();
};

// ========================================
// BACKGROUND FETCH
// ========================================

let isBgFetchInitialized = false;

export const initLocationTracking = async () => {
  if (isBgFetchInitialized) {
    console.log("⚠️ BackgroundFetch already initialized");
    return;
  }

  isBgFetchInitialized = true;

  try {
    const status = await BackgroundFetch.configure(
      {
        minimumFetchInterval: 15,
        stopOnTerminate: false,
        startOnBoot: true,
        enableHeadless: true,
        requiredNetworkType: BackgroundFetch.NETWORK_TYPE_ANY,
         forceAlarmManager: true,
      },
      async (taskId) => {
        console.log("🔥 Background fetch triggered");

        try {
          const sessionId = await AsyncStorage.getItem("sessionId");

          if (!sessionId) {
            console.log("❌ No session, skipping...");
            BackgroundFetch.finish(taskId);
            return;
          }

          const position = await getLocation();

          const lat = position.coords.latitude.toFixed(6).toString();
          const lng = position.coords.longitude.toFixed(6).toString();
          const placeName = lat && lng
            ? `Lat: ${lat}, Lng: ${lng}`
            : "Unknown Location";

          console.log("📦 BG PAYLOAD:", {
            lat,
            lng,
            place_name: placeName,
            session_id: sessionId,
          });

          await locationUpdateApi({
            lat,
            lng,
            place_name: placeName,
            session_id: sessionId,
          });

          console.log("✅ BG Sent:", lat, lng);

        } catch (e) {
          console.log("❌ BG error:", e);
        } finally {
          BackgroundFetch.finish(taskId);
        }
      },
      (error) => {
        console.log("❌ CONFIG ERROR:", error);
      }
    );

    await BackgroundFetch.start();

    console.log("✅ BackgroundFetch started:", status);

  } catch (e) {
    console.log("❌ INIT ERROR:", e);
  }
};
