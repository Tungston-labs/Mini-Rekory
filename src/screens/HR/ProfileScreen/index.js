import React, { useEffect, useState } from "react";
import { View, Text, Image, TouchableOpacity, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import styles from "./style";
import InfoCard from "../../../components/Profile";
import EmployeeSkeleton from "../../../components/EmployeeSkeleton";
import { RefreshControl } from "react-native";
import { useAuth } from "../../../context/AuthContext";
const ProfileScreen = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
const [refreshing, setRefreshing] = useState(false);
const { logout } = useAuth();
 const handleLogout = async () => {
  await logout();
};
const onRefresh = () => {
  setRefreshing(true);
  setIsLoading(true);

  setTimeout(() => {
    setIsLoading(false);
    setRefreshing(false);
  }, 1500);
};

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
      setIsError(false); 
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <SafeAreaView style={{ flex: 1, padding: 16 }}>
        {[...Array(6)].map((_, i) => (
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
        <Text>Failed to load profile</Text>
      </SafeAreaView>
    );
  }

  return (
      <SafeAreaView style={{ flex: 1, backgroundColor: "#F6F7F8" }}>
   <ScrollView
          contentContainerStyle={styles.container}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          >
      <View style={styles.header} />

      <View style={styles.profileWrapper}>
        <Image
          source={{ uri: "https://i.pravatar.cc/300" }}
          style={styles.profileImage}
        />
        <Text style={styles.name}>Arjun S</Text>
        <Text style={styles.role}>UIUX Designer</Text>
      </View>

      <InfoCard title="Work Information">
        <View style={styles.infoRow}>
          <Text style={styles.label}>Full Name</Text>
          <Text style={styles.value}>Arjun S</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.label}>Job Title</Text>
          <Text style={styles.value}>UIUX Designer</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.label}>Department</Text>
          <Text style={styles.value}>Design</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.label}>Email</Text>
          <Text style={styles.value}>arjuns@gmail.com</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.label}>Phone</Text>
          <Text style={styles.value}>9521322200</Text>
        </View>
      </InfoCard>

      <TouchableOpacity style={styles.TermsButton}>
        <Text style={styles.PolicyText}>Terms & Conditions</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.PolicyButton}>
        <Text style={styles.PolicyText}>Privacy Policy</Text>
      </TouchableOpacity>
<TouchableOpacity
  style={styles.logoutButton}
  onPress={handleLogout}
>
  <Text style={styles.logoutText}>Log Out</Text>
</TouchableOpacity>
    </ScrollView>
    </SafeAreaView>
  );
};

export default ProfileScreen;
