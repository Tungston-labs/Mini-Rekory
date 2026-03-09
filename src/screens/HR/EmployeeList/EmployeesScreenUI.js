import React from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MagnifyingGlass, Sliders } from "phosphor-react-native";
import EmployeeRow from "../../../components/Employee/Employeerow";
import EmployeeSkeleton from "../../../components/EmployeeSkeleton";
import styles from "./style";
import { RefreshControl } from "react-native";

const EmployeesScreenUI = ({
  employees,
  isLoading,
  isError,
  search,
  setSearch,
  refreshing,
  onRefresh,
  filter,
  setFilter,
  showFilter,
  setShowFilter,
  onAddEmployee,
  onEmployeePress,
}) => {
  if (isLoading) {
    return (
      <SafeAreaView style={{ flex: 1, padding: 16 }}>
        {[...Array(9)].map((_, i) => (
          <EmployeeSkeleton key={i} />
        ))}
      </SafeAreaView>
    );
  }

  if (isError) {
    return (
      <SafeAreaView
        style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
      >
        <Text>Failed to load employees</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#F6F7F8" }} edges={["top"]}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>All Employees</Text>
        </View>

        <View style={styles.searchRow}>
          <View style={styles.searchBox}>
            <MagnifyingGlass size={18} color="#9E9E9E" />
            <TextInput
              placeholder="Search employees"
              placeholderTextColor="#9E9E9E"
              value={search}
              onChangeText={setSearch}
              style={styles.searchInput}
            />
          </View>

          <TouchableOpacity
            style={styles.filterBtn}
            onPress={() => setShowFilter(!showFilter)}
          >
            <Sliders size={18} color="#000" />
          </TouchableOpacity>
        </View>

        {showFilter && (
          <View style={styles.dropdown}>
            {["all", "active", "inactive"].map((item) => (
              <TouchableOpacity
                key={item}
                style={styles.dropdownItem}
                onPress={() => {
                  setFilter(item);
                  setShowFilter(false);
                }}
              >
                <Text
                  style={[
                    styles.dropdownText,
                    filter === item && styles.dropdownActive,
                  ]}
                >
                  {item.charAt(0).toUpperCase() + item.slice(1)}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        )}

        <ScrollView
          contentContainerStyle={styles.list}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
            />
          }
        >
          <View style={styles.listContainerFullWidth}>
            {employees.map((emp, index) => (
              <React.Fragment key={emp.id || index}>
                <EmployeeRow
                  name={emp.name}
                    location={emp.location?.split(",")[0]}  
                  status={emp.status}
                  onPress={() => {
                     console.log("Clicked employee:", emp);
                     onEmployeePress(emp)}}
                />
                {index !== employees.length - 1 && <View style={styles.hr} />}
              </React.Fragment>
            ))}
          </View>
        </ScrollView>


        <TouchableOpacity style={styles.fab} onPress={onAddEmployee}>
          <Text style={styles.fabIcon}>＋</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default EmployeesScreenUI;
