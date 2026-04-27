import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  Platform,
  RefreshControl,
} from "react-native";
import { CaretLeft, PhoneCall, CalendarDots, MapPin, User } from "phosphor-react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import styles from "./style";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Linking } from "react-native";
const EmployeeDetailsView = ({
  employee,
  locations = [],
  onBack,
  onRefresh,
  refreshing,
  selectedDate,
  setSelectedDate,
}) => {
  const [showPicker, setShowPicker] = useState(false);

  // handle date selection from the picker
  const onChangeDate = (event, selected) => {
    // On Android, `selected` is undefined when user cancels
    setShowPicker(Platform.OS === "ios"); // keep picker open only on iOS if inline
    if (selected) {
      setSelectedDate(selected);
    }
  };

  if (!employee) return null;

  // fallback if parent didn't pass a date
  const displayDate = selectedDate || new Date();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#F6F7F8" }} edges={["top"]}>
      <View style={styles.container}>
        <View style={styles.profileCard}>

          {/* Top Row */}
          <View style={styles.topRow}>

            <TouchableOpacity onPress={onBack} style={styles.backBtn}>
              <CaretLeft size={24} />
            </TouchableOpacity>

            {employee.photo ? (
              <Image
                source={{ uri: employee.photo }}
                style={styles.avatar}
              />
            ) : (
              <View style={styles.avatarFallback}>
                <User size={32} color="#999" />
              </View>
            )}

            <View style={{ flex: 1 }} />

            <TouchableOpacity
              style={styles.callBtn}
              onPress={() => {
                if (employee.phone) {
                  Linking.openURL(`tel:${employee.phone}`);
                }
              }}
            >
              <PhoneCall size={18} color="#fff" />
            </TouchableOpacity>

          </View>

          {/* Details Section */}
          <View style={styles.profileInfo}>
            <Text style={styles.name}>{employee.name}</Text>

            <InfoRow label="Job Title" value={employee.jobTitle} />
            <InfoRow label="Department" value={employee.department} />
            <InfoRow label="Email" value={employee.email} />
          </View>

        </View>

        <View style={styles.locationCard}>
          <View style={styles.locationHeader}>
            <Text style={styles.sectionTitle}>Recent Locations</Text>
            <View style={styles.dateRow}>
              <TouchableOpacity
                style={{ flexDirection: "row", alignItems: "center", gap: 6 }}
                onPress={() => setShowPicker(true)}
              >
                <CalendarDots size={20} color="#E53935" />
                <Text style={styles.dateText}>
                  {displayDate.toLocaleDateString("en-IN", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
                </Text>
              </TouchableOpacity>
            </View>

            {showPicker && (
              <DateTimePicker
                value={displayDate}
                mode="date"
                display={Platform.OS === "ios" ? "inline" : "default"}
                onChange={onChangeDate}
                maximumDate={new Date()}
              />
            )}
          </View>

          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ flexGrow: 1, paddingBottom: 40 }}
            refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
          >
            {locations.length === 0 ? (
              <View style={styles.noLocationWrapper}>
                <MapPin size={32} color="#B0B0B0" />
                <Text style={styles.noLocationText}>No location data available</Text>
              </View>
            ) : (
              locations.map((item, index) => (
                <View key={index} style={styles.locationRow}>
                  <View style={styles.timeline}>
                    <View style={[styles.dot, item.current && styles.activeDot]}>
                      <MapPin size={20} color={item.current ? "#2ECC71" : "#000"} />
                    </View>

                    {index !== locations.length - 1 && <View style={styles.dashedLine} />}
                  </View>

                  <View style={styles.locationInfo}>
                    <Text style={styles.place}>{item.place || "Unknown location"}</Text>
                    <Text style={styles.time}>{item.time}</Text>

                    {item.current && (
                      <View style={styles.currentBadge}>
                        <Text style={styles.currentText}>CURRENT</Text>
                      </View>
                    )}
                  </View>
                </View>
              ))
            )}
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
};

const InfoRow = ({ label, value }) => (
  <View style={styles.infoRow}>
    <Text style={styles.label}>{label}</Text>
    <Text style={styles.colon}>:</Text>
    <Text style={styles.value}>{value || "N/A"}</Text>
  </View>
);

export default EmployeeDetailsView;