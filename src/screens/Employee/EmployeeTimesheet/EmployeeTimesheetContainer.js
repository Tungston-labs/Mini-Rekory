import { useState, useMemo,useEffect } from "react";
import useEmployeeAttendance from "../../../hooks/employee/useEmployeeAttendance";
import AsyncStorage from "@react-native-async-storage/async-storage";

const useEmployeeTimesheet = () => {
  const today = new Date();


 const [month, setMonth] = useState(today.getMonth() + 1);
  const [year, setYear] = useState(today.getFullYear());
  const { attendance, loading, error, refetch } =
    useEmployeeAttendance(month, year);

  const [modalVisible, setModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const [name, setName] = useState("");
  const [profilePic, setProfilePic] = useState(null);

  useEffect(() => {
  const loadUser = async () => {
    try {
      const userData = await AsyncStorage.getItem("user");

      if (userData) {
        const user = JSON.parse(userData);

        setName(user.name);
        setProfilePic(user.profile_pic);
      }
    } catch (error) {
      console.log("USER LOAD ERROR:", error);
    }
  };

  loadUser();
}, []);
 const changeMonth = (date) => {
    setMonth(date.getMonth() + 1);
    setYear(date.getFullYear());
  };
const formattedData = useMemo(() => {
  const today = new Date();
  const isCurrentMonth =
    month === today.getMonth() + 1 && year === today.getFullYear();

  const lastDay = isCurrentMonth
    ? today.getDate() 
    : new Date(year, month, 0).getDate(); 

  const attendanceMap = {};

  attendance.forEach((item) => {
    attendanceMap[item.date] = item;
  });

  const fullMonthData = [];

  for (let day = 1; day <= lastDay; day++) {
    const formattedDate = `${year}-${String(month).padStart(2, "0")}-${String(
      day
    ).padStart(2, "0")}`;

    const apiItem = attendanceMap[formattedDate];
    const dateObj = new Date(formattedDate);

    if (apiItem) {
      fullMonthData.push({
        id: day.toString(),
        date: day.toString(),
        day: dateObj.toLocaleDateString("en-US", { weekday: "short" }),

        checkIn: apiItem.first_punch_in
          ? new Date(apiItem.first_punch_in).toLocaleTimeString("en-IN", {
              hour: "2-digit",
              minute: "2-digit",
              hour12: true,
            })
          : "--",

        checkOut: apiItem.last_punch_out
          ? new Date(apiItem.last_punch_out).toLocaleTimeString("en-IN", {
              hour: "2-digit",
              minute: "2-digit",
              hour12: true,
            })
          : "--",

        total: apiItem.total_hours || "--",
        status: "present",
        raw: apiItem,
      });
    } else {
      fullMonthData.push({
        id: day.toString(),
        date: day.toString(),
        day: dateObj.toLocaleDateString("en-US", { weekday: "short" }),
        checkIn: "--",
        checkOut: "--",
        total: "--",
        status: "absent",
        raw: null,
      });
    }
  }

  return fullMonthData.reverse(); 
}, [attendance, month, year]);

  const openModal = (item) => {
    if (item.status !== "absent") {
      setSelectedItem(item);
      setModalVisible(true);
    }
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };

  const getGreeting = () => {
    const hour = new Date().getHours();

    if (hour < 12) {
      return "Good Morning, Mark Your Attendance";
    } else if (hour < 17) {
      return "Good Afternoon, Mark Your Attendance";
    } else {
      return "Good Evening, Mark Your Attendance";
    }
  };
  return {
    data: formattedData,
    loading,
    error,
    modalVisible,
    selectedItem,
    openModal,
    closeModal,
    refreshing,
    onRefresh,
    changeMonth,
    month,
    year,
      name,
  profilePic,
  getGreeting
  };
};

export default useEmployeeTimesheet;