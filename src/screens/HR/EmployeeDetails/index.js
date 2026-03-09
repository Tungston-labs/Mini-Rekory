import React, { useState, useCallback } from "react";
import { Text } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import EmployeeSkeleton from "../../../components/EmployeeSkeleton";
import EmployeeDetailsView from "./EmployeeDetailsView";
import {
  useEmployeeDetails,
  useEmployeeLocations,
} from "../../../hooks/hr/useEmployees";

const EmployeeDetailsContainer = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const employee = route.params?.employee;
  const employeeId = employee?.id;
  const today = new Date().toISOString().split("T")[0];
  const [refreshing, setRefreshing] = useState(false);
 const [selectedDate, setSelectedDate] = useState(new Date());
  const {
    data: emp,
    isLoading: isEmployeeLoading,
    isError: isEmployeeError,
    refetch: refetchEmployee,
  } = useEmployeeDetails(employeeId);

  const {
    data: locations = [],
    isLoading: isLocationsLoading,
    refetch: refetchLocations,
  } = useEmployeeLocations(employeeId, 
     selectedDate.toISOString().split("T")[0]);

      const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await Promise.all([refetchEmployee(), refetchLocations()]);
    setRefreshing(false);
  }, [refetchEmployee, refetchLocations]);

  if (!employee) {
    return (
      <SafeAreaView
        style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
      >
        <Text>No employee data</Text>
      </SafeAreaView>
    );
  }

  // const onRefresh = useCallback(async () => {
  //   setRefreshing(true);
  //   await Promise.all([refetchEmployee(), refetchLocations()]);
  //   setRefreshing(false);
  // }, [refetchEmployee, refetchLocations]);

  if (isEmployeeLoading || isLocationsLoading) {
    return (
      <SafeAreaView style={{ flex: 1, padding: 16 }}>
        {[...Array(6)].map((_, i) => (
          <EmployeeSkeleton key={i} />
        ))}
      </SafeAreaView>
    );
  }

  if (isEmployeeError || !emp) {
    return (
      <SafeAreaView
        style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
      >
        <Text>Failed to load employee</Text>
      </SafeAreaView>
    );
  }

  return (
    <EmployeeDetailsView
      employee={emp}
      locations={locations}
      onBack={() => navigation.goBack()}
      onRefresh={onRefresh}
      refreshing={refreshing}
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
    />
  );
};

export default EmployeeDetailsContainer;