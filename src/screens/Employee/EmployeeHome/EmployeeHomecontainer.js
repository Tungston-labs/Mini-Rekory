import React, { useEffect, useState, useRef } from "react";
import { Animated, Easing } from "react-native";
import EmployeeHome from "./EmployeeHome";

const EmployeeHomecontainer = () => {
  const [time, setTime] = useState(new Date());
   const [checkedIn, setCheckedIn] = useState(false); 
  const rotationValue = useRef(new Animated.Value(0)).current;

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

 const handleCheckIn = () => {
    setCheckedIn(prev => !prev); 
    console.log(checkedIn ? "Checked Out" : "Checked In");
  };

  return (
    <EmployeeHome
      time={formatTime()}
      date={formatDate()}
      rotateInterpolate={rotateInterpolate}
      onCheckIn={handleCheckIn}
      checkedIn={checkedIn}
    />
  );
};

export default EmployeeHomecontainer;