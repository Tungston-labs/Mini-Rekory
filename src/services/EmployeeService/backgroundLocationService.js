import BackgroundFetch from "react-native-background-fetch";
import Geolocation from "react-native-geolocation-service";
import ReactNativeForegroundService from "@supersami/rn-foreground-service";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { locationUpdateApi } from "./attendanceService";
import { getPlaceName } from "./locationService";

let trackingActive = false;
let backgroundFetchConfigured = false;
let startPromise = null;
let stopPromise = null;

const FOREGROUND_SERVICE_ID = 144;
const LOCATION_TASK_ID = "attendance-location-update-task";
const LOCATION_SEND_INTERVAL_MS = 10 * 60 * 1000; // 10 minutes (min spacing between API sends)
const FOREGROUND_TICK_INTERVAL_MS = 60 * 1000; // 1 minute tick to reduce scheduler/Doze drift
const DEBUG_ATTENDANCE_LOGS = true;
const TRACKING_ACTIVE_KEY = "attendance_tracking_active_v1";
const BACKGROUND_FETCH_MIN_INTERVAL_MINUTES = 20;
const LAST_ATTEMPT_KEY = "attendance_last_location_attempt_at_v1";
const LAST_SUCCESS_KEY = "attendance_last_location_success_at_v1";
const LAST_TICK_KEY = "attendance_last_foreground_tick_at_v1";
const LAST_ERROR_KEY = "attendance_last_location_error_v1";
const LAST_LOCATION_KEY = "attendance_last_location_v1";

// ============================
// FOREGROUND SERVICE
// ============================

const setTrackingActive = async (active) => {
  trackingActive = active;
  await AsyncStorage.setItem(
    TRACKING_ACTIVE_KEY,
    active ? "true" : "false"
  );
};

const isTrackingActive = async () => {
  if (trackingActive) return true;
  try {
    const v = await AsyncStorage.getItem(TRACKING_ACTIVE_KEY);
    return v === "true";
  } catch {
    return false;
  }
};

const ensureForegroundServiceStarted = async () => {
  if (ReactNativeForegroundService.is_running()) return;

  await ReactNativeForegroundService.start({
    id: FOREGROUND_SERVICE_ID,
    title: "Attendance Tracking",
    message: "Tracking your location...",
    ServiceType: "location",
  });
};

const stopForegroundService = async () => {
  await ReactNativeForegroundService.stop();
};

// ============================
// GET LOCATION
// ============================

const getLocation = () => {
  // Some Android OEMs/Doze modes can cause getCurrentPosition to hang even
  // if `timeout` is provided; wrap it to guarantee resolution.
  const locationPromise = new Promise((resolve, reject) => {
    Geolocation.getCurrentPosition(
      resolve,
      reject,
      {
        enableHighAccuracy: true,
        timeout: 30000,
        // Prefer somewhat fresh fixes; under Doze a strict 0 can cause long waits.
        maximumAge: 15000,
        forceRequestLocation: true,
      }
    );
  });

  const hardTimeoutMs = 35000;
  const timeoutPromise = new Promise((_, reject) => {
    setTimeout(() => reject(new Error("getCurrentPosition hard timeout")), hardTimeoutMs);
  });

  return Promise.race([locationPromise, timeoutPromise]);
};

// ============================
// SEND LOCATION
// ============================

const sendLocation = async ({ source = "unknown" } = {}) => {
  try {
    const activeBefore = await isTrackingActive();
    if (!activeBefore) {
      console.log(`⏭️ sendLocation skipped (inactive): ${source}`);
      return false;
    }

    if (source === "foreground") {
      await AsyncStorage.setItem(LAST_TICK_KEY, Date.now().toString());

      // Only send to API once every ~10 minutes.
      const lastAttemptAt = await AsyncStorage.getItem(LAST_ATTEMPT_KEY);
      const lastAttemptMs = lastAttemptAt ? Number(lastAttemptAt) : null;
      const nowMs = Date.now();
      if (lastAttemptMs && nowMs - lastAttemptMs < LOCATION_SEND_INTERVAL_MS) {
        console.log("⏭️ sendLocation suppressed (min interval not reached)");
        return false;
      }
    }

    await AsyncStorage.setItem(LAST_ATTEMPT_KEY, Date.now().toString());
    console.log(`📡 sendLocation start: ${source}`);
    const position = await getLocation();
    if (DEBUG_ATTENDANCE_LOGS) {
      console.log("📍 getLocation response:", position);
    }

    // Avoid sending if user has punched out while geolocation was in-flight.
    const activeAfter = await isTrackingActive();
    if (!activeAfter) {
      console.log(`⏭️ sendLocation aborted (became inactive): ${source}`);
      return false;
    }

    const { latitude, longitude, accuracy } = position.coords;

    const lat = Number(latitude.toFixed(6));
    const lng = Number(longitude.toFixed(6));

    let place = "Unknown";
    try {
      place = await getPlaceName(lat, lng);
    } catch (error) {
      console.log("❌ Failed reverse geocode:", error);
    }
    if (DEBUG_ATTENDANCE_LOGS) {
      console.log("📍 place_name result:", place);
    }

    const apiRes = await locationUpdateApi({
      lat,
      lng,
      place_name: place,
      accuracy,
    });
    if (DEBUG_ATTENDANCE_LOGS) {
      console.log("🌐 locationUpdateApi response:", apiRes);
    }

    await AsyncStorage.setItem(LAST_SUCCESS_KEY, Date.now().toString());
    await AsyncStorage.setItem(
      LAST_LOCATION_KEY,
      JSON.stringify({ lat, lng, place_name: place })
    );
    console.log(`✅ Location sent (${source}):`, { lat, lng });
    return true;

  } catch (error) {
    const status = error?.response?.status ?? null;
    const message = error?.message ?? String(error);
    await AsyncStorage.setItem(
      LAST_ERROR_KEY,
      JSON.stringify({ at: Date.now(), status, message })
    );
    console.log("❌ Location error:", error);
    return false;
  }
};

// ============================
// 🔥 FOREGROUND LOOP (10 MIN)
// ============================

const startForegroundLoop = async () => {
  // Register the JS task before starting the service.
  // This avoids cases where the task isn't picked up by the running JS context.
  try {
    if (ReactNativeForegroundService.is_task_running(LOCATION_TASK_ID)) {
      ReactNativeForegroundService.remove_task(LOCATION_TASK_ID);
    }
  } catch (e) {
    // ignore
  }

  console.log("➕ Registering foreground location task (10 min loop)");

  ReactNativeForegroundService.add_task(
    async () => {
      console.log("📍 Foreground service tick");
      await sendLocation({ source: "foreground" });
    },
    {
      delay: FOREGROUND_TICK_INTERVAL_MS,
      onLoop: true,
      taskId: LOCATION_TASK_ID,
      onError: (e) => console.log("❌ Foreground task error:", e),
    }
  );

  await ensureForegroundServiceStarted();

  // Run immediately after punch-in.
  await sendLocation({ source: "foreground_start" });
};

const stopForegroundLoop = async () => {
  try {
    if (ReactNativeForegroundService.is_task_running(LOCATION_TASK_ID)) {
      ReactNativeForegroundService.remove_task(LOCATION_TASK_ID);
    }
  } catch (e) {
    console.log("⚠️ remove_task failed:", e);
  }

  try {
    await stopForegroundService();
  } catch (e) {
    console.log("⚠️ stopForegroundService failed:", e);
  }

  try {
    ReactNativeForegroundService.remove_all_tasks();
  } catch {
    // ignore
  }
};

// ============================
// 🔥 BACKGROUND FETCH (FALLBACK)
// ============================

const initBackgroundFetch = async () => {
  if (backgroundFetchConfigured) return;
  backgroundFetchConfigured = true;

  await BackgroundFetch.configure(
    {
      minimumFetchInterval: BACKGROUND_FETCH_MIN_INTERVAL_MINUTES,
      stopOnTerminate: false,
      startOnBoot: true,
      enableHeadless: true,
      forceAlarmManager: true,
    },
    async (taskId) => {
      try {
        const active = await isTrackingActive();
        if (!active) return;

        // Foreground service is the main mechanism; only send when it is not running.
        if (ReactNativeForegroundService.is_running()) return;

        await sendLocation({ source: "backgroundfetch" });
      } catch (err) {
        console.log("❌ BackgroundFetch task error:", err);
      } finally {
        BackgroundFetch.finish(taskId);
      }
    },
    (error) => {
      console.log("❌ BackgroundFetch error:", error);
    }
  );
};

// ============================
// HEADLESS (KILLED STATE)
// ============================

export const backgroundFetchHeadlessTask = async (event) => {
  const taskId = event.taskId;

  try {
    const active = await isTrackingActive();
    if (!active) return;

    if (ReactNativeForegroundService.is_running()) return;

    console.log("🔥 Headless running:", taskId);
    await sendLocation({ source: "headless" });
  } catch (e) {
    console.log("❌ Headless error:", e);
  } finally {
    BackgroundFetch.finish(taskId);
  }
};

// ============================
// PUBLIC START / STOP
// ============================

export const startLocationTracking = async () => {
  if (trackingActive) return;
  if (startPromise) return startPromise;

  startPromise = (async () => {
    await setTrackingActive(true);
    try {
      await startForegroundLoop();

      // If the user punched out mid-start, don't start background-fetch.
      const activeNow = await isTrackingActive();
      if (!activeNow) return;

      await initBackgroundFetch();
      await BackgroundFetch.start();
      console.log("✅ Hybrid tracking started");
    } catch (e) {
      await setTrackingActive(false);
      throw e;
    }
  })().finally(() => {
    startPromise = null;
  });

  return startPromise;
};

export const stopLocationTracking = async () => {
  if (stopPromise) return stopPromise;

  stopPromise = (async () => {
    // Always clear persisted flag, even if JS state was lost.
    await setTrackingActive(false);

    await stopForegroundLoop();

    try {
      await BackgroundFetch.stop();
    } catch (e) {
      console.log("⚠️ BackgroundFetch.stop failed:", e);
    }

    console.log("🛑 Tracking stopped");
  })().finally(() => {
    stopPromise = null;
  });

  return stopPromise;
};

export const sendImmediateLocation = async () => {
  await sendLocation({ source: "manual" });
};

// Called on app start to resume tracking if the user was already punched in
// before the app was restarted.
export const resumeLocationTrackingIfNeeded = async () => {
  try {
    const active = await AsyncStorage.getItem(TRACKING_ACTIVE_KEY);
    if (active === "true") {
      await startLocationTracking();
    }
  } catch (e) {
    console.log("⚠️ resumeLocationTrackingIfNeeded failed:", e);
  }
};

export const getLastTrackingMarkers = async () => {
  try {
    const [attemptAt, successAt, lastError, lastLocation] = await Promise.all([
      AsyncStorage.getItem(LAST_ATTEMPT_KEY),
      AsyncStorage.getItem(LAST_SUCCESS_KEY),
      AsyncStorage.getItem(LAST_ERROR_KEY),
      AsyncStorage.getItem(LAST_LOCATION_KEY),
    ]);

    return {
      attemptAt: attemptAt ? Number(attemptAt) : null,
      successAt: successAt ? Number(successAt) : null,
      lastError: lastError ? JSON.parse(lastError) : null,
      lastLocation: lastLocation ? JSON.parse(lastLocation) : null,
    };
  } catch (e) {
    return { attemptAt: null, successAt: null, lastError: null, lastLocation: null };
  }
};