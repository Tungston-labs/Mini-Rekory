import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { useEmployees } from "../../../hooks/useEmployees";
import EmployeesScreenUI from "./EmployeesScreenUI";

const EmployeesScreen = () => {
  const navigation = useNavigation();

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [showFilter, setShowFilter] = useState(false);

  const {
    data: employees = [],
    isLoading,
    isError,
  } = useEmployees(search, filter);

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
      onAddEmployee={() => navigation.navigate("AddEmployee")}
      onEmployeePress={(emp) =>
        navigation.navigate("EmployeeDetails", { employee: emp })
      }
    />
  );
};

export default EmployeesScreen;
