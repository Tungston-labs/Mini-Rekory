import React, { useState, useCallback, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import EmployeesScreenUI from "./EmployeesScreenUI";
import { useLiveEmployees } from "../../../hooks/hr/useLiveEmployees";

const EmployeesScreen = () => {
  const navigation = useNavigation();

  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [showFilter, setShowFilter] = useState(false);
  const [refreshing, setRefreshing] = useState(false);


  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 500);

    return () => clearTimeout(timer);
  }, [search]);

  const {
    data: employees = [],
    isLoading,
    isError,
    refetch,
  } = useLiveEmployees(debouncedSearch, filter);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  }, [refetch]);

  return (
    <EmployeesScreenUI
      employees={employees}
      isLoading={isLoading}
      isError={isError}
      search={search}
      setSearch={setSearch}
      filter={filter}
      setFilter={setFilter}
      showFilter={showFilter}
      setShowFilter={setShowFilter}
      refreshing={refreshing}
      onRefresh={onRefresh}
      onAddEmployee={() => navigation.navigate("AddEmployee")}
      onEmployeePress={(emp) =>
        navigation.navigate("EmployeeDetails", { employee: emp })
      }
    />
  );
};

export default EmployeesScreen;