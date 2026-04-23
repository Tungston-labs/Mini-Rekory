import React, { useState,useEffect } from "react";
import HomeScreenUI from "./HomeScreen";
import { useDashboardSummary } from "../../../hooks/hr/useDashboardSummary";
import { useLiveEmployees } from "../../../hooks/hr/useTodayLiveEmployees";

import AsyncStorage from "@react-native-async-storage/async-storage";
const HomeScreen = () => {
  const { data, isLoading, isError, refetch, error, isFetching } =
    useDashboardSummary();

  console.log("Dashboard Data:", data);
  console.log("Dashboard Error:", error);

  const [search, setSearch] = useState("");

  const { data: liveEmployees } = useLiveEmployees({search,page :1,page_size: 10});

  console.log({ liveEmployees })
const [name, setName] = useState("");
const [profilePic, setProfilePic] = useState(null);

useEffect(() => {
  const loadUser = async () => {
    const storedUser = await AsyncStorage.getItem("user");

    if (storedUser) {
      const user = JSON.parse(storedUser);

      setName(user.name);
      setProfilePic(user.profile_pic);
    }
  };

  loadUser();
}, []);
  const employees =
  liveEmployees?.results?.map((emp) => ({
    id: emp.id,
    name: emp.name,
    location: emp.is_active_now
      ? emp.current_location?.place?.split(",")[0]
      : "OffLine",
    time: "Live",
    status: emp.is_active_now ? "active" : "inactive",
        profile_pic: emp.profile_pic,
  })) || [];

  console.log("LIVE EMPLOYEES API:", liveEmployees);
  console.log("FULL API RESPONSE:", liveEmployees);

  console.log("RESULTS:", liveEmployees?.results);

  console.log("MAPPED EMPLOYEES:", employees);
  const totalEmployees = data?.total_employees ?? 0;
  const activeEmployees = data?.active_now ?? 0;
  const absentToday = data?.absent_today ?? 0;

    const getGreeting = () => {
    const hour = new Date().getHours();

    if (hour < 12) {
      return "Good Morning ";
    } else if (hour < 17) {
      return "Good Afternoon";
    } else {
      return "Good Evening";
    }
  };
  return (
    <HomeScreenUI
     name={name}
      profilePic={profilePic}
      greeting={getGreeting()}
      search={search}
      setSearch={setSearch}
      employees={employees}
      totalEmployees={totalEmployees}
      activeEmployees={activeEmployees}
      absentToday={absentToday}
      isLoading={isLoading}
      isError={isError}
      isFetching={isFetching}
      onRefresh={refetch}
    />
  );
};

export default HomeScreen;