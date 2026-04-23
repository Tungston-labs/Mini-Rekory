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

    console.log("➡️ Punch In: Getting location");

    const pos = await getLocation();
    console.log("📍 FULL POSITION:", pos);

    const { latitude, longitude } = pos.coords;
    const lat = Number(latitude.toFixed(6));
    const lng = Number(longitude.toFixed(6));

    // const place = await getPlaceName(lat, lng).catch(() => "Unknown");

    const res = await punchInApi({ lat, lng,  });

    console.log("✅ PunchIn API success");

    if (res?.punch_in_time) setPunchInTime(res.punch_in_time);

    // ✅ Start tracking
    await startLocationTracking();

    setIsPunchedIn(true);

  } catch (error) {
    console.log("❌ Punch in error:", error);
    throw error;
  }
};

  // ---------------- Punch Out ----------------
 const handlePunchOut = async () => {
  let punchOutRes = null;
  let errorToThrow = null;

  try {
    console.log("➡️ Punch Out: Getting location");

    const pos = await getLocation();
    const { latitude, longitude } = pos.coords;

    const lat = Number(latitude.toFixed(6));
    const lng = Number(longitude.toFixed(6));
    // const place = await getPlaceName(lat, lng).catch(() => "Unknown");

    punchOutRes = await punchOutApi({ lat, lng, });
    console.log("✅ PunchOut API success");
  } catch (error) {
    console.log("❌ Punch Out Error (will still stop tracking):", error);
    errorToThrow = error;
  } finally {
    await stopLocationTracking();
    setIsPunchedIn(false);
    if (punchOutRes?.punch_in_time) setPunchInTime(punchOutRes.punch_in_time);
    if (punchOutRes?.punch_out_time) setPunchOutTime(punchOutRes.punch_out_time);
    if (punchOutRes?.today_total_hours) setTodayHours(punchOutRes.today_total_hours);
  }

  if (errorToThrow) throw errorToThrow;
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