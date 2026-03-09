import { useState, useRef, useEffect } from "react";
import Geolocation from "react-native-geolocation-service";
import { PermissionsAndroid, Platform, Alert } from "react-native";
import {
  punchIn,
  punchOut,
  updateLocation,
  getTodaySession,
} from "../../services/EmployeeService/attendanceService";

const useAttendance = () => {
  const [isPunchedIn, setIsPunchedIn] = useState(false);
  const [sessionId, setSessionId] = useState(null);
  const [todayHours, setTodayHours] = useState(null);
  const [punchInTime, setPunchInTime] = useState(null);
  const [punchOutTime, setPunchOutTime] = useState(null);

  const locationInterval = useRef(null);
  const sessionIdRef = useRef(sessionId);

  useEffect(() => {
    sessionIdRef.current = sessionId;
  }, [sessionId]);

  const requestLocationPermission = async () => {
    if (Platform.OS !== "android") return true;

    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: "Location Permission",
        message: "This app needs access to your location for attendance",
        buttonPositive: "OK",
      }
    );
    return granted === PermissionsAndroid.RESULTS.GRANTED;
  };

  const getLocation = async () => {
    const hasPermission = await requestLocationPermission();
    if (!hasPermission) throw new Error("Location permission denied");

    return new Promise((resolve, reject) => {
      Geolocation.getCurrentPosition(
        async (position) => {
          const lat = Number(position.coords.latitude.toFixed(6));
          const lng = Number(position.coords.longitude.toFixed(6));
          const accuracy = Number(position.coords.accuracy.toFixed(1));

          try {
            const response = await fetch(
              `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`,
              {
                headers: {
                  "User-Agent": "MiniRekoryApp/1.0 (rekory2@gmail.com)",
                  "Accept-Language": "en",
                },
              }
            );

            const data = await response.json();
            const place_name = data.display_name || "Unknown Location";

            resolve({ lat, lng, place_name, accuracy });
          } catch {
            resolve({ lat, lng, place_name: "Unknown Location", accuracy });
          }
        },
        (error) => reject(error),
        { enableHighAccuracy: true, timeout: 20000, maximumAge: 10000 }
      );
    });
  };

const isTracking = useRef(false);

  const startLocationTracking = () => {
    stopLocationTracking();

    locationInterval.current = setInterval(async () => {
    if (isTracking.current || !sessionIdRef.current) return;
 try {
isTracking.current = true;

        const coords = await getLocation();
        await updateLocation({ ...coords, session_id: sessionIdRef.current });
      } finally {
       isTracking.current = false;
      }
    }, 5 * 60 * 1000);
  };

  const stopLocationTracking = () => {
    if (locationInterval.current) {
      clearInterval(locationInterval.current);
      locationInterval.current = null;
    }
  };

  // Initialize today's session on app load
  useEffect(() => {
    const init = async () => {
      try {
        const res = await getTodaySession();
        if (res.success && res.data.active_session) {
          const session = res.data.active_session;
          setIsPunchedIn(true);
          setSessionId(session.session_id);
          setPunchInTime(session.punch_in_time); // persistent first punch-in
          setPunchOutTime(session.punch_out_time || null); // can update on punch-out
          setTodayHours(session.today_total_hours || null); // can update on punch-out
          startLocationTracking();
        }
      } catch (err) {
        console.log("Check session error:", err);
      }
    };
    init();
  }, []);

  // Punch In
  const handlePunchIn = async () => {
    if (isPunchedIn) {
      Alert.alert("Already Punched In", "You have an active session today.");
      return;
    }

    try {
      const coords = await getLocation();
      const res = await punchIn(coords);

      if (res.success) {
        setSessionId(res.data.session_id);
        sessionIdRef.current = res.data.session_id;
        setIsPunchedIn(true);

        // Set first punch-in ONLY if null
        if (!punchInTime) setPunchInTime(res.data.punch_in_time);

        // Reset punch-out and total hours for new session
        setPunchOutTime(null);
        setTodayHours(null);

        await updateLocation({ ...coords, session_id: res.data.session_id });
        startLocationTracking();
      }
    } catch (error) {
      Alert.alert("Punch In Failed", error?.response?.data?.message || error.message);
    }
  };

  // Punch Out
  const handlePunchOut = async () => {
    if (!isPunchedIn || !sessionId) {
      Alert.alert("Cannot Punch Out", "No active session found.");
      return;
    }

    try {
      const coords = await getLocation();
const res = await punchOut({
  lat: coords.lat,
  lng: coords.lng,
  place_name: coords.place_name,
  session_id: sessionIdRef.current,
});
      console.log("Session ID:", sessionIdRef.current);
      if (res.success) {
        setIsPunchedIn(false);
        setPunchOutTime(res.data.punch_out_time); // update on checkout
        setTodayHours(res.data.today_total_hours); // update on checkout
        setSessionId(null);
        stopLocationTracking();
      }
    } catch (error) {
      Alert.alert("Punch Out Failed", error?.response?.data?.message || error.message);
    }
  };
  const refreshSession = async () => {
    try {
      const res = await getTodaySession();

      if (res.success && res.data.active_session) {
        const session = res.data.active_session;

        setIsPunchedIn(true);
        setSessionId(session.session_id);
        sessionIdRef.current = session.session_id;

        setPunchInTime(session.punch_in_time);
        setPunchOutTime(session.punch_out_time || null);
        setTodayHours(session.today_total_hours || null);

        startLocationTracking();
      } else {
        setIsPunchedIn(false);
        setSessionId(null);
        setPunchOutTime(null);
        setTodayHours(null);
        stopLocationTracking();
      }
    } catch (err) {
      console.log("Refresh session error:", err);
    }
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