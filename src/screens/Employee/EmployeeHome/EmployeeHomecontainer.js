import React, { useEffect, useState, useRef } from "react";
import { Animated, Easing, PermissionsAndroid, Platform } from "react-native";
import EmployeeHome from "./EmployeeHome";
import { initLocationTracking, startTracking, stopTracking, destroyTracking, sendImmediateLocation } from "../../../services/EmployeeService/trackingService";
import { punchInApi, punchOutApi } from "../../../services/EmployeeService/attendanceService";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getLocation } from "../../../services/EmployeeService/trackingService";
import { getPlaceName } from "../../../services/EmployeeService/locationService";
import useEmployeeProfile from "../../../hooks/employee/useEmployeeProfile";

const EmployeeHomecontainer = () => {
  const [time, setTime] = useState(new Date());
  const [profilePic, setProfilePic] = useState(null);
  const [name, setName] = useState("");
  const [hasPermission, setHasPermission] = useState(false);
  const rotationValue = useRef(new Animated.Value(0)).current;
  const [tracking, setTracking] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const { profile, refetch } = useEmployeeProfile();
  const isPunchedIn = profile?.current_session_status === "active";
  console.log("Session Status:", profile?.current_session_status);
  console.log("isPunchedIn:", isPunchedIn);
  const punchInTime = profile?.today_attendance?.first_punch_in || null;
  const punchOutTime = profile?.today_attendance?.last_punch_out || null;
  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const loadUser = async () => {
      const userData = await AsyncStorage.getItem("user");
      if (userData) {
        const user = JSON.parse(userData);
        setName(user.name);
        setProfilePic(user.profile_pic);
      }
    };
    loadUser();
  }, []);

  useEffect(() => {
    Animated.loop(
      Animated.timing(rotationValue, {
        toValue: 1,
        duration: 4000,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start();
  }, []);

  const rotateInterpolate = rotationValue.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  const formatTime = () => {
    return time
      .toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
      })
      .toUpperCase();
  };


  const formatDate = () => {
    const options = { month: "short", day: "2-digit", year: "numeric" };
    const datePart = time.toLocaleDateString("en-US", options);
    const weekday = time.toLocaleDateString("en-US", { weekday: "long" });
    return `${datePart} - ${weekday}`;
  };


  const handleCheckIn = async () => {
    try {
      const granted = await requestLocationPermission();
      if (!granted) {
        console.log("❌ No permission");
        return;
      }
      const locationData = await getFormattedLocation();
      if (isPunchedIn) {
        await stopTracking();
        await punchOutApi(locationData);

        console.log("🛑 Checked Out");
      } else {
     const res = await punchInApi(locationData);
console.log("🧾 PunchIn Response:", res);


const sessionId = res?.data?.session_id;
if (!sessionId) {
  console.log("❌ No sessionId from API");
  return;
}
await AsyncStorage.setItem("sessionId", String(sessionId));
await startTracking(); 

console.log("🚀 Checked In");
      }


      await refetch();

    } catch (err) {
      const message = err?.response?.data?.message;

      if (message === "You are already punched in") {
        console.log("⚠️ Syncing with server...");
        await refetch(); 
        return;
      }

      console.log("❌ Error:", err?.response?.data || err.message);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    try {
      await refetch(); 
    } catch (error) {
      console.log("❌ Refresh error:", error);
    }
    setRefreshing(false);
  };

  const checkPermission = async () => {
    if (Platform.OS === "android") {
      return await PermissionsAndroid.check(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
      );
    }
    return true;
  };

  let todayHours = profile?.today_attendance?.total_work_hours;
  if (!todayHours && punchInTime) {
    const inTime = new Date(punchInTime);
    const outTime = punchOutTime ? new Date(punchOutTime) : new Date();
    const diffMs = outTime - inTime;
    const diffHrs = Math.floor(diffMs / (1000 * 60 * 60));
    const diffMins = Math.floor((diffMs / (1000 * 60)) % 60);
    todayHours = `${diffHrs}h ${diffMins}m`;
  }

  const getFormattedLocation = async () => {
    const position = await getLocation();

    const lat = Number(position.coords.latitude.toFixed(6));
    const lng = Number(position.coords.longitude.toFixed(6));
    // const place_name = await getPlaceName(lat, lng);

    return { lat, lng, };
  };

  const requestLocationPermission = async () => {
    if (Platform.OS !== "android") return true;

    try {
      const result = await PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
      ]);

      const fine = result["android.permission.ACCESS_FINE_LOCATION"];
      const coarse = result["android.permission.ACCESS_COARSE_LOCATION"];

      if (fine === "granted" && coarse === "granted") {
        setHasPermission(true);
        initLocationTracking();

        if (Platform.Version >= 29) {
          await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_BACKGROUND_LOCATION
          );
        }

        return true; 
      } else {
        setHasPermission(false);
        return false; 
      }
    } catch (err) {
      console.warn("Permission error:", err);
      return false; 
    }
  };
  useEffect(() => {
    requestLocationPermission();
  }, []);


  return (
    <EmployeeHome
      time={formatTime()}
      date={formatDate()}
      rotateInterpolate={rotateInterpolate}
      onCheckIn={handleCheckIn}
      checkedIn={isPunchedIn}
      profilePic={profilePic}
      punchInTime={punchInTime}
      punchOutTime={punchOutTime}
      greeting="Mark Your Attendance"
      name={name}
      refreshing={refreshing}
      onRefresh={onRefresh}
      //       time={time.toLocaleTimeString()}
      todayHours={todayHours}

    />
  );
};

export default EmployeeHomecontainer;


