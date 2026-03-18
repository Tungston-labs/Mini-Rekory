import { useState } from "react";
import Geolocation from "react-native-geolocation-service";
import { useIsFocused } from "@react-navigation/native";
import {
  punchInApi,
  punchOutApi,
} from "../../services/EmployeeService/attendanceService";
import {
  startLocationTracking,
  stopLocationTracking,
} from "../../services/EmployeeService/backgroundLocationService";
import {
  requestForegroundLocationPermission,
  requestBackgroundLocationPermission,
} from "../../services/EmployeeService/permissionService";
import { getPlaceName } from "../../services/EmployeeService/locationService";

const useAttendance = () => {
  const [isPunchedIn, setIsPunchedIn] = useState(false);
  const [todayHours, setTodayHours] = useState(null);
  const [punchInTime, setPunchInTime] = useState(null);
  const [punchOutTime, setPunchOutTime] = useState(null);

  const isFocused = useIsFocused();

  // ---------------- Robust Location ----------------
const getLocation = () =>
  new Promise((resolve, reject) => {
    console.log("⚡ Getting quick location...");

    Geolocation.getCurrentPosition(
      resolve,
      reject,
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 0 }
    );
  });

  // ---------------- Punch In ----------------
const handlePunchIn = async () => {
  try {
    if (!isFocused) return;

    console.log("➡️ Requesting foreground permission");
    const granted = await requestForegroundLocationPermission();
    if (!granted) {
      console.log("❌ Permission denied");
      return;
    }

    console.log("➡️ Punch In: Getting location");
    const pos = await getLocation(); 
    console.log("📍 FULL POSITION:", pos);

  } catch (error) {
    console.log("❌ Punch in error:", error);
  }
};

  // ---------------- Punch Out ----------------
  const handlePunchOut = async () => {
    try {
      console.log("➡️ Punch Out: Getting location");
      const pos = await getLocation();

      const { latitude, longitude } = pos.coords;
      const lat = Number(latitude.toFixed(6));
      const lng = Number(longitude.toFixed(6));
      const place = await getPlaceName(lat, lng).catch(() => "Unknown");

      const res = await punchOutApi({ lat, lng, place_name: place });
      console.log("✅ PunchOut API success");

      setIsPunchedIn(false);
      setPunchOutTime(res.punch_out_time);
      setTodayHours(res.today_total_hours);

      await stopLocationTracking();

    } catch (error) {
      console.log("❌ Punch Out Error:", error);
    }
  };

  // ---------------- Refresh Session ----------------
  const refreshSession = async () => {
    console.log("🔄 Refreshing session...");
  };

  return {
    isPunchedIn,
    todayHours,
    punchInTime,
    punchOutTime,
    handlePunchIn,
    handlePunchOut,
    refreshSession,
  };
};

export default useAttendance;