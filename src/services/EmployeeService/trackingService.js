import BackgroundFetch from "react-native-background-fetch";
import Geolocation from "react-native-geolocation-service";
import ReactNativeForegroundService from "@supersami/rn-foreground-service";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { locationUpdateApi } from "./attendanceService";

// ===============================
// STATE
// ===============================
let trackingInterval = null;
let isRunning = false;

// ===============================
// FOREGROUND SERVICE
// ===============================
const startForegroundService = async () => {
  await ReactNativeForegroundService.start({
    id: 1001,
    title: "Location Tracking Active",
    message: "Sending your location...",
    icon: "ic_launcher",
    ServiceType: "location",
  });
};

const stopForegroundService = async () => {
  await ReactNativeForegroundService.stop();
};

// ===============================
// GET LOCATION
// ===============================
export const getLocation = () => {
  return new Promise((resolve, reject) => {
    Geolocation.getCurrentPosition(
      (position) => resolve(position),
      (error) => reject(error),
      {
        enableHighAccuracy: true,
        timeout: 15000,
        maximumAge: 5000,
        forceRequestLocation: true,
      }
    );
  });
};

// ===============================
// SEND LOCATION (API LAYER)
// ===============================
let lastSentTime = 0;

const sendLocationToServer = async (coords) => {
  try {
    const now = Date.now();

    // ✅ BLOCK if within 1 minute
    if (now - lastSentTime < 60000) {
      console.log("⏳ Skipping - sent recently");
      return;
    }

    const sessionId = await AsyncStorage.getItem("sessionId");

    if (!sessionId) {
      console.log("❌ No sessionId found");
      return;
    }

    const lat = Number(coords.latitude.toFixed(6));
    const lng = Number(coords.longitude.toFixed(6));

    const payload = {
      session_id: sessionId,
      lat,
      lng,
      // place_name: `Lat: ${lat}, Lng: ${lng}`,
    };

    console.log("📍 Sending payload:", payload);

    const res = await locationUpdateApi(payload);

    // ✅ update last sent time ONLY on success
    lastSentTime = now;

    console.log("📍 Location sent:", res);

  } catch (err) {
    console.log("❌ Location API error:", err?.response?.data || err.message);
  }
};

// ===============================
// START TRACKING (MAIN)
// ===============================
export const startTracking = async () => {
  if (isRunning) {
    console.log("⚠️ Tracking already running");
    return;
  }

  isRunning = true;

  await startForegroundService();

  trackingInterval = setInterval(async () => {
    try {
      console.log("📍 Fetching location...");

      const position = await getLocation();

      await sendLocationToServer(position.coords);
    } catch (err) {
      console.log("❌ Tracking error:", err);
    }
  }, 120000); 

  console.log("🚀 Tracking started");
};

// ===============================
// STOP TRACKING
// ===============================
export const stopTracking = async () => {
  isRunning = false;

  if (trackingInterval) {
    clearInterval(trackingInterval);
    trackingInterval = null;
  }

  await stopForegroundService();

  console.log("🛑 Tracking stopped");
};

// ===============================
// BACKGROUND FETCH (FALLBACK)
// ===============================
export const initLocationTracking = async () => {
  BackgroundFetch.configure(
    {
      minimumFetchInterval: 15,
      stopOnTerminate: false,
      startOnBoot: true,
      enableHeadless: true,
      forceAlarmManager: true,
    },

    async (taskId) => {
      console.log("🔥 BackgroundFetch triggered");

      try {
        const position = await getLocation();
        await sendLocationToServer(position.coords);
      } catch (err) {
        console.log("❌ BG error:", err);
      }

      BackgroundFetch.finish(taskId);
    },

    (error) => {
      console.log("❌ BackgroundFetch config error:", error);
    }
  );

  BackgroundFetch.start();

  console.log("✅ Background tracking initialized");
};

// ===============================
// IMMEDIATE LOCATION
// ===============================
export const sendImmediateLocation = async () => {
  try {
    const position = await getLocation();
    await sendLocationToServer(position.coords);

    console.log("✅ Immediate location sent");
  } catch (err) {
    console.log("❌ Immediate location error:", err);
  }
};