import Geolocation from "react-native-geolocation-service";
import ReactNativeForegroundService from "@supersami/rn-foreground-service";
import { locationUpdateApi } from "./attendanceService";
import { getPlaceName } from "./locationService";

let watchId = null;
let isSending = false;
let isServiceRunning = false;

export const startLocationTracking = async () => {
  try {
    console.log("Starting location tracking...");

    if (!isServiceRunning) {
      await ReactNativeForegroundService.start({
        id: 144,
        title: "Attendance Tracking",
        message: "Tracking your live location",
        ServiceType: "location",
        channelId: "foreground_service_channel",
      });

      isServiceRunning = true;
    }

    if (watchId !== null) return;

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
        } finally {
          isSending = false;
        }
      },
      (error) => console.log("Watch error:", error),
      {
        enableHighAccuracy: true,
        interval: 120000,
        fastestInterval: 120000,
      }
    );
  } catch (error) {
    console.log("Tracking start error:", error);
  }
};

export const stopLocationTracking = async () => {
  try {
    if (watchId !== null) {
      Geolocation.clearWatch(watchId);
      watchId = null;
    }

    if (isServiceRunning) {
      await ReactNativeForegroundService.stopAll();
      isServiceRunning = false;
    }
  } catch (error) {
    console.log("Stop tracking error:", error);
  }
};