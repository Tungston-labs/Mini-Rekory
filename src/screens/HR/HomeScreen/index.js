import React, { useState } from "react";
import HomeScreenUI from "./HomeScreen";
import { useDashboardSummary } from "../../../hooks/hr/useDashboardSummary";
import { useLiveEmployees } from "../../../hooks/hr/useTodayLiveEmployees";

const HomeScreen = () => {
  const { data, isLoading, isError, refetch, error, isFetching } =
    useDashboardSummary();

  console.log("Dashboard Data:", data);
  console.log("Dashboard Error:", error);

  const [search, setSearch] = useState("");

  const { data: liveEmployees } = useLiveEmployees({search,page :1,page_size: 10});

  console.log({ liveEmployees })

  const employees =
  liveEmployees?.results?.map((emp) => ({
    id: emp.id,
    name: emp.name,
    location: emp.is_active_now
      ? emp.current_location?.place?.split(",")[0]
      : "OffLine",
    time: "Live",
    status: emp.is_active_now ? "active" : "inactive",
  })) || [];

  console.log("LIVE EMPLOYEES API:", liveEmployees);
  console.log("FULL API RESPONSE:", liveEmployees);

  console.log("RESULTS:", liveEmployees?.results);

  console.log("MAPPED EMPLOYEES:", employees);
  const totalEmployees = data?.total_employees ?? 0;
  const activeEmployees = data?.active_now ?? 0;
  const absentToday = data?.absent_today ?? 0;

  return (
    <HomeScreenUI
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