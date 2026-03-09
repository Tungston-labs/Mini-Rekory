
import React from "react";
import {
  View,
  Text,
  ScrollView,
  TextInput,
  Image,
  RefreshControl,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MagnifyingGlass } from "phosphor-react-native";
import StatCard from "../../../components/HomeScreen/StatCard";
import EmployeeRow from "../../../components/HomeScreen/EmployeeRow";
import styles from "./style";

const HomeScreenUI = ({
  search,
  setSearch,
  employees = [],
  totalEmployees,
  activeEmployees,
    absentToday,
  isLoading,
  isError,
  isFetching,
  onRefresh,
}) => {
console.log("loded home")
  if (isLoading) {
    return (
      <SafeAreaView style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Loading Dashboard...</Text>
      </SafeAreaView>
    );
  }

  if (isError) {
    return (
      <SafeAreaView style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Failed to load dashboard</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#F6F7F8" }} edges={["top"]}>
      <View style={styles.container}>

        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Good Morning Meera!</Text>
            <Text style={styles.subText}>Welcome to REKORY</Text>
          </View>

          <Image
            source={{ uri: "https://i.pravatar.cc/100" }}
            style={styles.avatar}
          />
        </View>

        {/* Search */}
        <View style={styles.searchBox}>
          <MagnifyingGlass size={20} color="#999" />
          <TextInput
            placeholder="Search Employees Name"
            placeholderTextColor="#999"
            style={styles.searchInput}
            value={search}
            onChangeText={setSearch}
          />
        </View>

        {/* Stats */}
        <View style={styles.statRow}>
          <StatCard
            title="Total Employees"
            value={totalEmployees}
        sub={`${absentToday} employees on leave`}
            type="light"
          />

          <StatCard
            title="Active on Field"
            value={activeEmployees}
            sub="Real-time tracking"
            type="danger"
          />
        </View>

        {/* Section */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Today’s Real-Time Deployment</Text>
        </View>

        {/* Employee List */}
        <View style={{ flex: 1 }}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 20 }}
            refreshControl={
              <RefreshControl
                refreshing={isFetching} 
                onRefresh={onRefresh}  
              />
            }
          >
            <View style={styles.employeeList}>
              {employees?.map((emp) => (
                <EmployeeRow
                  key={emp.id}
                  name={emp.name}
                  location={emp.location}
                  time={emp.time}
                  status={emp.status}
                />
              ))}
            </View>
          </ScrollView>
        </View>

      </View>
    </SafeAreaView>
  );
};

export default HomeScreenUI;