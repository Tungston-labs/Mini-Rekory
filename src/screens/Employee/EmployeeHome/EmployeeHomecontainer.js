// import React, { useEffect, useState, useRef } from "react";
// import { Animated, Easing } from "react-native";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import EmployeeHome from "./EmployeeHome";
// import useAttendance from "../../../hooks/employee/useAttendance";
// import useEmployeeProfile from "../../../hooks/employee/useEmployeeProfile";



// const EmployeeHomeContainer = () => {
//   const [time, setTime] = useState(new Date());
//   const [refreshing, setRefreshing] = useState(false);
//   const [name, setName] = useState("");
//   const [profilePic, setProfilePic] = useState(null);

//   const rotationValue = useRef(new Animated.Value(0)).current;

//   const { handlePunchIn, handlePunchOut, refreshSession } = useAttendance();
//   const { profile, refetch } = useEmployeeProfile();

//   const isPunchedIn = profile?.current_session_status === "active";

//   // Load user info from AsyncStorage
//   useEffect(() => {
//     const loadUser = async () => {
//       const userData = await AsyncStorage.getItem("user");
//       if (userData) {
//         const user = JSON.parse(userData);
//         setName(user.name);
//         setProfilePic(user.profile_pic);
//       }
//     };
//     loadUser();
//   }, []);

//   // Update clock every second
//   useEffect(() => {
//     const interval = setInterval(() => setTime(new Date()), 1000);
//     return () => clearInterval(interval);
//   }, []);

//   // Animated rotation
//   useEffect(() => {
//     Animated.loop(
//       Animated.timing(rotationValue, {
//         toValue: 1,
//         duration: 4000,
//         easing: Easing.linear,
//         useNativeDriver: true,
//       })
//     ).start();
//   }, [rotationValue]);

//   // Handle punch in/out
//   const handleCheck = async () => {
//     try {
//       console.log("STEP 1: Button clicked");

//       if (isPunchedIn) {
//         await handlePunchOut();
//       } else {
//         await handlePunchIn();
//       }

//       await refreshSession();
//       await refetch();
//     } catch (error) {
//       console.log("❌ Punch error:", error);
//     }
//   };

//   // Refresh handler
//   const onRefresh = async () => {
//     setRefreshing(true);
//     await refreshSession();
//     await refetch();
//     setRefreshing(false);
//   };

//   // Map attendance data from profile
//   const punchInTime = profile?.today_attendance?.first_punch_in || null;
//   const punchOutTime = profile?.today_attendance?.last_punch_out || null;

//   // Calculate total hours if missing
//   let todayHours = profile?.today_attendance?.total_work_hours;
//   if (!todayHours && punchInTime) {
//     const inTime = new Date(punchInTime);
//     const outTime = punchOutTime ? new Date(punchOutTime) : new Date();
//     const diffMs = outTime - inTime;
//     const diffHrs = Math.floor(diffMs / (1000 * 60 * 60));
//     const diffMins = Math.floor((diffMs / (1000 * 60)) % 60);
//     todayHours = `${diffHrs}h ${diffMins}m`;
//   }

//   return (
//     <EmployeeHome
//       name={name}
//       profilePic={profilePic}
//       greeting="Mark Your Attendance"
//       time={time.toLocaleTimeString()}
//       date={time.toDateString()}
//       rotateInterpolate={rotationValue.interpolate({
//         inputRange: [0, 1],
//         outputRange: ["0deg", "360deg"],
//       })}
//       onCheckIn={handleCheck}
//       checkedIn={isPunchedIn}
//       todayHours={todayHours}
//       punchInTime={punchInTime}
//       punchOutTime={punchOutTime}
//       refreshing={refreshing}
//       onRefresh={onRefresh}
//     />
//   );
// };

// export default EmployeeHomeContainer;

// import React, { useEffect, useState } from "react";
// import { View, Button, Text, StyleSheet, PermissionsAndroid, Platform } from "react-native";

// import { initLocationTracking, startTracking, stopTracking, destroyTracking, sendImmediateLocation } from "../../../services/EmployeeService/backgroundLocationService";
// export default function HomeScreen({ navigation }) {
//   const [tracking, setTracking] = useState(false);
//   const requestLocationPermission = async () => {

//     if (Platform.OS === "android") {

//       try {

//         const granted = await PermissionsAndroid.requestMultiple([
//           PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
//           PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
//           PermissionsAndroid.PERMISSIONS.ACCESS_BACKGROUND_LOCATION,
//         ]);

//         if (
//           granted["android.permission.ACCESS_FINE_LOCATION"] === "granted"
//         ) {

//           console.log("✅ Location permission granted");

//           initLocationTracking();
//           sendImmediateLocation();

//         } else {

//           console.log("❌ Location permission denied");
//         }

//       } catch (err) {
//         console.warn(err);
//       }

//     }
//   };

//   useEffect(() => {

//     requestLocationPermission();

//   }, []);



//   const toggleTracking = async () => {

//     if (tracking) {

//       await stopTracking();
//       console.log("🛑 Tracking stopped");

//     } else {

//       await startTracking();
//       console.log("🚀 Tracking started");

//     }

//     setTracking(!tracking);
//   };



//   return (
//     <View style={styles.container}>

//       <Text style={styles.title}>Location Tracking</Text>

//       <View style={styles.buttonContainer}>
//         <Button
//           title={tracking ? "STOP TRACKING" : "START TRACKING"}
//           onPress={toggleTracking}
//         />
//       </View>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     padding: 24,
//     backgroundColor: "#fff",
//   },
//   title: {
//     fontSize: 20,
//     marginBottom: 30,
//     fontWeight: "bold",
//   },
//   buttonContainer: {
//     width: "100%",
//     marginBottom: 16,

//   },
// });


// import React, { useEffect, useState, useRef } from "react";
// import { Animated, Easing,PermissionsAndroid, Platform  } from "react-native";
// import EmployeeHome from "./EmployeeHome";
// import { initLocationTracking, startTracking, stopTracking, destroyTracking, sendImmediateLocation } from "../../../services/EmployeeService/backgroundLocationService";
// import { punchInApi, punchOutApi } from "../../../services/EmployeeService/attendanceService";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// const EmployeeHomecontainer = () => {
//   const [time, setTime] = useState(new Date());
//   const [hasPermission, setHasPermission] = useState(false);
//   const rotationValue = useRef(new Animated.Value(0)).current;
//   const [tracking, setTracking] = useState(false);
//   useEffect(() => {
//     const interval = setInterval(() => setTime(new Date()), 1000);
//     return () => clearInterval(interval);
//   }, []);

//   useEffect(() => {
//     Animated.loop(
//       Animated.timing(rotationValue, {
//         toValue: 1,
//         duration: 4000,
//         easing: Easing.linear,
//         useNativeDriver: true,
//       })
//     ).start();
//   }, []);

//   const rotateInterpolate = rotationValue.interpolate({
//     inputRange: [0, 1],
//     outputRange: ["0deg", "360deg"],
//   });

//   const formatTime = () => {
//     return time
//       .toLocaleTimeString("en-US", {
//         hour: "2-digit",
//         minute: "2-digit",
//         second: "2-digit",
//         hour12: true,
//       })
//       .toUpperCase();
//   };

//   const formatDate = () => {
//     const options = { month: "short", day: "2-digit", year: "numeric" };
//     const datePart = time.toLocaleDateString("en-US", options);
//     const weekday = time.toLocaleDateString("en-US", { weekday: "long" });
//     return `${datePart} - ${weekday}`;
//   };


// import React, { useEffect, useState, useRef } from "react";
// import { Animated, Easing } from "react-native";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import EmployeeHome from "./EmployeeHome";
// import useAttendance from "../../../hooks/employee/useAttendance";
// import useEmployeeProfile from "../../../hooks/employee/useEmployeeProfile";



// const EmployeeHomeContainer = () => {
//   const [time, setTime] = useState(new Date());
//   const [refreshing, setRefreshing] = useState(false);
//   const [name, setName] = useState("");
//   const [profilePic, setProfilePic] = useState(null);

//   const rotationValue = useRef(new Animated.Value(0)).current;

//   const { handlePunchIn, handlePunchOut, refreshSession } = useAttendance();
//   const { profile, refetch } = useEmployeeProfile();

//   const isPunchedIn = profile?.current_session_status === "active";

//   // Load user info from AsyncStorage
//   useEffect(() => {
//     const loadUser = async () => {
//       const userData = await AsyncStorage.getItem("user");
//       if (userData) {
//         const user = JSON.parse(userData);
//         setName(user.name);
//         setProfilePic(user.profile_pic);
//       }
//     };
//     loadUser();
//   }, []);

//   // Update clock every second
//   useEffect(() => {
//     const interval = setInterval(() => setTime(new Date()), 1000);
//     return () => clearInterval(interval);
//   }, []);

//   // Animated rotation
//   useEffect(() => {
//     Animated.loop(
//       Animated.timing(rotationValue, {
//         toValue: 1,
//         duration: 4000,
//         easing: Easing.linear,
//         useNativeDriver: true,
//       })
//     ).start();
//   }, [rotationValue]);

//   // Handle punch in/out
//   const handleCheck = async () => {
//     try {
//       console.log("STEP 1: Button clicked");

//       if (isPunchedIn) {
//         await handlePunchOut();
//       } else {
//         await handlePunchIn();
//       }

//       await refreshSession();
//       await refetch();
//     } catch (error) {
//       console.log("❌ Punch error:", error);
//     }
//   };

//   // Refresh handler
//   const onRefresh = async () => {
//     setRefreshing(true);
//     await refreshSession();
//     await refetch();
//     setRefreshing(false);
//   };

//   // Map attendance data from profile
//   const punchInTime = profile?.today_attendance?.first_punch_in || null;
//   const punchOutTime = profile?.today_attendance?.last_punch_out || null;

//   // Calculate total hours if missing
//   let todayHours = profile?.today_attendance?.total_work_hours;
//   if (!todayHours && punchInTime) {
//     const inTime = new Date(punchInTime);
//     const outTime = punchOutTime ? new Date(punchOutTime) : new Date();
//     const diffMs = outTime - inTime;
//     const diffHrs = Math.floor(diffMs / (1000 * 60 * 60));
//     const diffMins = Math.floor((diffMs / (1000 * 60)) % 60);
//     todayHours = `${diffHrs}h ${diffMins}m`;
//   }

//   return (
//     <EmployeeHome
//       name={name}
//       profilePic={profilePic}
//       greeting="Mark Your Attendance"
//       time={time.toLocaleTimeString()}
//       date={time.toDateString()}
//       rotateInterpolate={rotationValue.interpolate({
//         inputRange: [0, 1],
//         outputRange: ["0deg", "360deg"],
//       })}
//       onCheckIn={handleCheck}
//       checkedIn={isPunchedIn}
//       todayHours={todayHours}
//       punchInTime={punchInTime}
//       punchOutTime={punchOutTime}
//       refreshing={refreshing}
//       onRefresh={onRefresh}
//     />
//   );
// };

// export default EmployeeHomeContainer;

// import React, { useEffect, useState } from "react";
// import { View, Button, Text, StyleSheet, PermissionsAndroid, Platform, TouchableOpacity } from "react-native";

// import { initLocationTracking, startTracking, stopTracking, destroyTracking, sendImmediateLocation } from "../../../services/EmployeeService/backgroundLocationService";
// export default function HomeScreen({ navigation }) {
//   const [tracking, setTracking] = useState(false);
//   const requestLocationPermission = async () => {

//     if (Platform.OS === "android") {

//       try {

//         const granted = await PermissionsAndroid.requestMultiple([
//           PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
//           PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
//           PermissionsAndroid.PERMISSIONS.ACCESS_BACKGROUND_LOCATION,
//         ]);
//         if (
//           granted["android.permission.ACCESS_FINE_LOCATION"] === "granted" &&
//           granted["android.permission.ACCESS_BACKGROUND_LOCATION"] === "granted"
//         ) {

//           console.log("✅ Location permission granted");

//           initLocationTracking();
//           sendImmediateLocation();

//         } else {

//           console.log("❌ Location permission denied");
//         }

//       } catch (err) {
//         console.warn(err);
//       }

//     }
//   };

//   useEffect(() => {

//     requestLocationPermission();

//   }, []);



//   const toggleTracking = async () => {

//     if (tracking) {

//       await stopTracking();
//       console.log("🛑 Tracking stopped");

//     } else {

//       await startTracking();
//       console.log("🚀 Tracking started");

//     }

//     setTracking(!tracking);
//   };



//   return (
//     <View style={styles.container}>

//       <Text style={styles.title}> Tracking Location </Text>

//       <TouchableOpacity
//         style={[
//           styles.button,
//           tracking ? styles.stopButton : styles.startButton,
//         ]}
//         onPress={toggleTracking}
//       >
//         <Text style={styles.buttonText}>
//           {tracking ? "CHECK OUT" : "CHECK IN"}
//         </Text>
//       </TouchableOpacity>

//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     padding: 24,
//     backgroundColor: "#fff",
//   },
//   title: {
//     fontSize: 20,
//     marginBottom: 30,
//     fontWeight: "bold",
//   },

//   button: {
//     width: "80%",
//     paddingVertical: 15,
//     borderRadius: 30,
//     alignItems: "center",


//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 4 },
//     shadowOpacity: 0.3,
//     shadowRadius: 5,

//     elevation: 6,
//   },

//   startButton: {
//     backgroundColor: "#28a745",
//   },

//   stopButton: {
//     backgroundColor: "#dc3545",
//   },

//   buttonText: {
//     color: "#fff",
//     fontSize: 16,
//     fontWeight: "bold",
//     letterSpacing: 1,
//   },
// });


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
        // 🔴 CHECK OUT
        await stopTracking();
        await punchOutApi(locationData);

        console.log("🛑 Checked Out");
      } else {
        // 🟢 CHECK IN
     const res = await punchInApi(locationData);
console.log("🧾 PunchIn Response:", res);

// ✅ FIXED PATH
const sessionId = res?.data?.session_id;

if (!sessionId) {
  console.log("❌ No sessionId from API");
  return;
}

// ✅ Store properly
await AsyncStorage.setItem("sessionId", String(sessionId));

// ✅ Pass correctly
await startTracking(); 

console.log("🚀 Checked In");
      }

      // ✅ IMPORTANT: refresh profile after action
      await refetch();

    } catch (err) {
      const message = err?.response?.data?.message;

      if (message === "You are already punched in") {
        console.log("⚠️ Syncing with server...");
        await refetch(); // ✅ fix mismatch
        return;
      }

      console.log("❌ Error:", err?.response?.data || err.message);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    try {
      await refetch(); // ✅ only this is needed
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

        return true; // ✅ ADD THIS
      } else {
        setHasPermission(false);
        return false; // ❌ ADD THIS
      }
    } catch (err) {
      console.warn("Permission error:", err);
      return false; // ❌ ADD THIS
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


