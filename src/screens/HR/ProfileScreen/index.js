import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  RefreshControl,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import styles from "./style";

import InfoCard from "../../../components/Profile";
import EmployeeSkeleton from "../../../components/EmployeeSkeleton";

import { useAuth } from "../../../context/AuthContext";
import { getCompanyProfile } from "../../../services/HrServices/profileService";

const ProfileScreen = () => {
  const [refreshing, setRefreshing] = useState(false);
  const [profile, setProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  const { logout } = useAuth();

  // ✅ FETCH API
  const fetchProfile = async () => {
    try {
      setIsError(false);
      const data = await getCompanyProfile();
      setProfile(data);
    } catch (error) {
      console.log("PROFILE ERROR:", error);
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  // ✅ INITIAL LOAD
  useEffect(() => {
    fetchProfile();
  }, []);

  // ✅ REFRESH
  const onRefresh = async () => {
    setRefreshing(true);
    await fetchProfile();
    setRefreshing(false);
  };

  const handleLogout = async () => {
    await logout();
  };

  const company = profile || {};

  // ✅ LOADING UI
  if (isLoading) {
    return (
      <SafeAreaView style={{ flex: 1, padding: 16 }}>
        {[...Array(6)].map((_, i) => (
          <EmployeeSkeleton key={i} />
        ))}
      </SafeAreaView>
    );
  }

  // ✅ ERROR UI
  if (isError) {
    return (
      <SafeAreaView
        style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
      >
        <Text>Failed to load profile</Text>

        <TouchableOpacity
          onPress={fetchProfile}
          style={{
            marginTop: 10,
            padding: 10,
            backgroundColor: "#2B7CD6",
            borderRadius: 8,
          }}
        >
          <Text style={{ color: "#fff" }}>Retry</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }
const logoUrl = company?.logo
  ? company.logo
  : "https://via.placeholder.com/150";

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#F6F7F8" }}>
      <ScrollView
        contentContainerStyle={styles.container}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        }
      >
        <View style={styles.header} />

        {/* Profile */}
        <View style={styles.profileWrapper}>
          <Image source={{ uri: logoUrl }} 
          style={styles.profileImage} />
          <Text style={styles.name}>
            {company.company_name || "N/A"}
          </Text>
          <Text style={styles.role}>Company</Text>
        </View>

        {/* Info */}
        <InfoCard title="Company Information">
          <View style={styles.infoRow}>
            <Text style={styles.label}>Company Name</Text>
            <Text style={styles.value}>
              {company.company_name || "N/A"}
            </Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.label}>Email</Text>
            <Text style={styles.value}>
              {company.email || "N/A"}
            </Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.label}>Phone</Text>
            <Text style={styles.value}>
              {company.contact_number || "N/A"}
            </Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.label}>Registration Date</Text>
            <Text style={styles.value}>
              {company.registration_date || "N/A"}
            </Text>
          </View>
        </InfoCard>

        {/* Buttons */}
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