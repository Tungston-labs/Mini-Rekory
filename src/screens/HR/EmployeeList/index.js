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

  // Debounce search
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 500);

    return () => clearTimeout(timer);
  }, [search]);

  const {
    data,
    isLoading,
    isError,
    refetch,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useLiveEmployees(debouncedSearch, filter);

  const employees =
    data?.pages
      ?.flatMap((page) => page?.employees || [])
      ?.filter((item) => item && item.id) || [];

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  }, [refetch]);

  const loadMore = useCallback(() => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [hasNextPage, isFetchingNextPage]);

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
      loadMore={loadMore}
      isFetchingNextPage={isFetchingNextPage}
      onAddEmployee={() => navigation.navigate("AddEmployee")}
      onEmployeePress={(emp) =>
        navigation.navigate("EmployeeDetails", { employee: emp })
      }
    />
  );
};

export default EmployeesScreen;