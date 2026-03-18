import React, { useEffect, useState, useRef } from "react";
import { Animated, Easing } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import EmployeeHome from "./EmployeeHome";
import useAttendance from "../../../hooks/employee/useAttendance";
import useEmployeeProfile from "../../../hooks/employee/useEmployeeProfile";
import { startLocationTracking, stopLocationTracking } from "../../../services/EmployeeService/backgroundLocationService";
import {
  requestForegroundLocationPermission,
  requestBackgroundLocationPermission,
} from "../../../services/EmployeeService/permissionService";

const EmployeeHomeContainer = () => {
  const [time, setTime] = useState(new Date());
  const [refreshing, setRefreshing] = useState(false);
  const [name, setName] = useState("");
  const [profilePic, setProfilePic] = useState(null);

  const rotationValue = useRef(new Animated.Value(0)).current;

  const {
    todayHours,
    punchInTime,
    punchOutTime,
    handlePunchIn,
    handlePunchOut,
    refreshSession,
  } = useAttendance();

  const { profile, refetch } = useEmployeeProfile();

  const isPunchedIn = profile?.current_session_status === "active";

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
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
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

  
const handleCheck = async () => {
  try {
    console.log("STEP 1: Button clicked");

    if (isPunchedIn) {
      await handlePunchOut();
      // ensure stopLocationTracking is available and stop background tracking
      await stopLocationTracking();
    } else {
      console.log("STEP 2: Punch IN");

      const granted = await requestForegroundLocationPermission();

      if (!granted) {
        console.log("❌ Permission denied");
        return;
      }

      console.log("✅ Permission granted");

      await handlePunchIn();
      console.log("STEP 3: PunchIn API done");

      // Request background location permission on Android before starting persistent tracking
      try {
        const bgGranted = await requestBackgroundLocationPermission();
        if (!bgGranted) {
          console.log("⚠️ Background permission not granted — tracking may stop when app is backgrounded");
        }
      } catch (permErr) {
        console.log("Background permission check failed:", permErr);
      }

      await startLocationTracking();
      console.log("STEP 4: Tracking started");
    }

    await refreshSession();
    await refetch();

  } catch (error) {
    console.log("❌ Punch error:", error);
  }
};

  const onRefresh = async () => {
    setRefreshing(true);
    await refreshSession();
    await refetch();
    setRefreshing(false);
  };

  return (
    <EmployeeHome
      name={name}
      profilePic={profilePic}
      greeting="Mark Your Attendance"
      time={time.toLocaleTimeString()}
      date={time.toDateString()}
      rotateInterpolate={rotationValue.interpolate({
        inputRange: [0, 1],
        outputRange: ["0deg", "360deg"],
      })}
      onCheckIn={handleCheck}
      checkedIn={isPunchedIn}
      todayHours={todayHours}
      punchInTime={punchInTime}
      punchOutTime={punchOutTime}
      refreshing={refreshing}
      onRefresh={onRefresh}
    />
  );
};

export default EmployeeHomeContainer;