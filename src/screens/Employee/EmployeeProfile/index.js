import React, { useEffect, useState } from "react";
import { View, Text, Image, TouchableOpacity, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import styles from "./style";
import InfoCard from "../../../components/Profile";
import EmployeeSkeleton from "../../../components/EmployeeSkeleton";
import { SignOutIcon } from "phosphor-react-native";
import { RefreshControl } from "react-native";
import { useAuth } from "../../../context/AuthContext";
import  useEmployeeProfile  from "../../../hooks/employee/useEmployeeProfile";

const EmployeeProfile = () => {
const { logout } = useAuth();
  const { profile, loading, error, refetch } = useEmployeeProfile();
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = () => {
    setRefreshing(true);
    refetch().finally(() => setRefreshing(false));
  };

  if (loading) {
    return (
      <SafeAreaView style={{ flex: 1, padding: 16 }}>
        {[...Array(6)].map((_, i) => (
          <EmployeeSkeleton key={i} />
        ))}
      </SafeAreaView>
    );
  }

  if (error || !profile) {
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
            source={{ uri: profile.profile_pic }}
            style={styles.profileImage}
          />
          <Text style={styles.name}>{profile.name}</Text>
          <Text style={styles.role}>{profile.job_title}</Text>
        </View>

        <InfoCard title="Work Information">
          <View style={styles.infoRow}>
            <Text style={styles.label}>Full Name</Text>
             <Text style={styles.colon}>:</Text>
            <Text style={styles.value}>{profile.name || "--------"
              }</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.label}>Job Title</Text>
             <Text style={styles.colon}>:</Text>
            <Text style={styles.value}>{profile.job_title  || "--------"}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.label}>Department</Text>
             <Text style={styles.colon}>:</Text>
            <Text style={styles.value}>{profile.department || "--------"}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.label}>Email</Text>
             <Text style={styles.colon}>:</Text>
            <Text style={styles.value}>{profile.email}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.label}>Phone</Text>
             <Text style={styles.colon}>:</Text>
            <Text style={styles.value}>{profile.phone}</Text>
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
  onPress={logout}
>
  <SignOutIcon size={20} color="#C61217" />
  <Text style={styles.logoutText}>Log Out</Text>
</TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default EmployeeProfile;
