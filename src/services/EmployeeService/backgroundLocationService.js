import Geolocation from "react-native-geolocation-service";
import ReactNativeForegroundService from "@supersami/rn-foreground-service";
import {
  requestForegroundLocationPermission,
  requestBackgroundLocationPermission,
} from "./permissionService";
import { locationUpdateApi } from "./attendanceService";
import { getPlaceName } from "./locationService";

let watchId = null;
let isSending = false;

const formatCoordinate = (value) => Number(value.toFixed(6));

export const startLocationTracking = async () => {
  try {
    console.log("Starting location tracking...");

    const isRunning = await ReactNativeForegroundService.isRunning();

    if (!isRunning) {
      await ReactNativeForegroundService.start({
        id: 144,
        title: "Attendance Tracking",
        message: "Tracking your live location",
        icon: "ic_launcher",
        ServiceType: "location",
      });
    }

    if (watchId !== null) {
      console.log("Watcher already running");
      return;
    }

    watchId = Geolocation.watchPosition(
      async (position) => {
        if (isSending) return;
        isSending = true;

        try {
          const { latitude, longitude, accuracy } = position.coords;

          const lat = Number(latitude.toFixed(6));
          const lng = Number(longitude.toFixed(6));

          console.log("Live Location:", lat, lng);

          const place = await getPlaceName(lat, lng);

          await locationUpdateApi({
            lat,
            lng,
            place_name: place,
            accuracy,
          });
        } catch (err) {
          console.log("Location update error:", err);
        } finally {
          isSending = false;
        }
      },
      (error) => console.log("Watch error:", error),
      {
        enableHighAccuracy: true,
        distanceFilter: 20,
        interval: 60000,
        fastestInterval: 30000,
      }
    );
  } catch (error) {
    console.log("Tracking start error:", error);
  }
};

export const stopLocationTracking = async () => {
  try {
    console.log("Stopping location tracking...");

    if (watchId !== null) {
      Geolocation.clearWatch(watchId);
      watchId = null;
    }

    const isRunning = await ReactNativeForegroundService.isRunning();
    if (isRunning) {
      await ReactNativeForegroundService.stopAll();
    }

    console.log("Tracking stopped");
  } catch (error) {
    console.log("Stop tracking error:", error);
  }
};