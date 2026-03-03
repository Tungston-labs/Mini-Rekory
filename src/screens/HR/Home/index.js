import React from "react";
import {
  View,
  Text,
  ScrollView,
  TextInput,
  Image,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MagnifyingGlass } from "phosphor-react-native";
import StatCard from "../../../components/HomeScreen/StatCard"
import EmployeeRow from "../../../components/HomeScreen/EmployeeRow/index";
import styles from "./style";

const HomeScreen = () => {
  return (
    <SafeAreaView style={{ flex: 1 ,backgroundColor: "#F6F7F8"  }} edges={["top"]}>
    <View style={styles.container}>
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
        <View style={styles.searchBox}>
          <MagnifyingGlass size={20} color="#999" />
          <TextInput
            placeholder="Search Employees Name"
            placeholderTextColor="#999"
            style={styles.searchInput}
          />
        </View>
        <View style={styles.statRow}>
          <StatCard
            title="Total Employees"
            value="60"
            sub="05 employees on leave"
            type="light"
          />
          <StatCard
            title="Active on Field"
            value="55"
            sub="Real-time tracking"
            type="danger"
          />
        </View>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Today’s Real-Time Deployment</Text>
        </View>
        <View style={{ flex: 1 }}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 20 }}
          >
        <View style={styles.employeeList}>
          <EmployeeRow
            name="Arjun S"
            location="MG Road, Kochi"
            time="09:18 AM"
            status="active"
          />
          <EmployeeRow
            name="Suresh Kumar"
            location="Vyttila Hub"
            time="09:18 AM"
            status="active"
          />
          <EmployeeRow
            name="Neha Sharma"
            location="Not Punch In"
            time="00:00"
            status="inactive"
          />
          <EmployeeRow
            name="Neha Sharma"
            location="Not Punch In"
            time="00:00"
            status="inactive"
          />
          <EmployeeRow
            name="Neha Sharma"
            location="Not Punch In"
            time="00:00"
            status="inactive"
          />
          <EmployeeRow
            name="Neha Sharma"
            location="Not Punch In"
            time="00:00"
            status="inactive"
          />
          <EmployeeRow
            name="Neha Sharma"
            location="Not Punch In"
            time="00:00"
            status="inactive"
          />
          <EmployeeRow
            name="Neha Sharma"
            location="Not Punch In"
            time="00:00"
            status="inactive"
          />
          <EmployeeRow
            name="Neha Sharma"
            location="Not Punch In"
            time="00:00"
            status="inactive"
          />
        </View>
      </ScrollView>
      </View></View>
    </SafeAreaView>
  );
};

export default HomeScreen;
