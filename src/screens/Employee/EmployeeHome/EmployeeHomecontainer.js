import React, { useEffect, useState, useRef } from "react";
import { Animated, Easing } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import EmployeeHome from "./EmployeeHome";
import useAttendance from "../../../hooks/employee/useAttendance";
import useEmployeeProfile from "../../../hooks/employee/useEmployeeProfile";



const EmployeeHomeContainer = () => {
  const [time, setTime] = useState(new Date());
  const [refreshing, setRefreshing] = useState(false);
  const [name, setName] = useState("");
  const [profilePic, setProfilePic] = useState(null);

  const rotationValue = useRef(new Animated.Value(0)).current;

  const { handlePunchIn, handlePunchOut, refreshSession } = useAttendance();
  const { profile, refetch } = useEmployeeProfile();

  const isPunchedIn = profile?.current_session_status === "active";

  // Load user info from AsyncStorage
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

  // Update clock every second
  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  // Animated rotation
  useEffect(() => {
    Animated.loop(
      Animated.timing(rotationValue, {
        toValue: 1,
        duration: 4000,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start();
  }, [rotationValue]);

  // Handle punch in/out
  const handleCheck = async () => {
    try {
      console.log("STEP 1: Button clicked");

      if (isPunchedIn) {
        await handlePunchOut();
      } else {
        await handlePunchIn();
      }

      await refreshSession();
      await refetch();
    } catch (error) {
      console.log("❌ Punch error:", error);
    }
  };

  // Refresh handler
  const onRefresh = async () => {
    setRefreshing(true);
    await refreshSession();
    await refetch();
    setRefreshing(false);
  };

  // Map attendance data from profile
  const punchInTime = profile?.today_attendance?.first_punch_in || null;
  const punchOutTime = profile?.today_attendance?.last_punch_out || null;

  // Calculate total hours if missing
  let todayHours = profile?.today_attendance?.total_work_hours;
  if (!todayHours && punchInTime) {
    const inTime = new Date(punchInTime);
    const outTime = punchOutTime ? new Date(punchOutTime) : new Date();
    const diffMs = outTime - inTime;
    const diffHrs = Math.floor(diffMs / (1000 * 60 * 60));
    const diffMins = Math.floor((diffMs / (1000 * 60)) % 60);
    todayHours = `${diffHrs}h ${diffMins}m`;
  }

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