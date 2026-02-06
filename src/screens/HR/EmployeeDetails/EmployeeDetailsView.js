import React, { useState } from "react";
import { View, Text, TouchableOpacity, Image, ScrollView, Platform ,RefreshControl} from "react-native";
import { CaretLeft, PhoneCall, CalendarDots, MapPin } from "phosphor-react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import styles from "./style";
import DateTimePicker from "@react-native-community/datetimepicker";

const EmployeeDetailsView = ({ employee, locations = [], onBack , onRefresh , refreshing}) => {
  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);

  const onChangeDate = (event, selectedDate) => {
    setShowPicker(Platform.OS === "ios"); 
    if (selectedDate) setDate(selectedDate);
  };

  if (!employee) return null;

  return (
    <SafeAreaView style={{ flex: 1 }} edges={["top"]}>
      <View style={styles.container}>
        {/* Profile Card */}
        <View style={styles.profileCard}>
          <TouchableOpacity onPress={onBack} style={styles.backBtn}>
            <CaretLeft size={24} />
          </TouchableOpacity>

          <View style={styles.userRow}>
            <Image
              source={{ uri: employee.photo || "https://i.pravatar.cc/150?u=" + employee.name }}
              style={styles.avatar}
            />
            <View style={styles.profileInfo}>
              <Text style={styles.name}>{employee.name}</Text>
              <InfoRow label="Job Title" value={employee.jobTitle} />
              <InfoRow label="Department" value={employee.department} />
              <InfoRow label="Email" value={employee.email} />
            </View>
          </View>

          <TouchableOpacity style={styles.callBtn}>
            <PhoneCall size={18} color="#fff" />
          </TouchableOpacity>
        </View>

        {/* Location Card */}
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
                  {date.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                </Text>
              </TouchableOpacity>
            </View>

            {showPicker && (
              <DateTimePicker
                value={date}
                mode="date"
                display={Platform.OS === "ios" ? "inline" : "default"}
                onChange={onChangeDate}
                maximumDate={new Date()}
              />
            )}
          </View>

          {locations.length === 0 ? (
            <View style={styles.noLocationWrapper}>
              <MapPin size={32} color="#B0B0B0" />
              <Text style={styles.noLocationText}>No location data available</Text>
            </View>
          ) : (
            <ScrollView showsVerticalScrollIndicator={false} 
            contentContainerStyle={{ paddingBottom: 40 }}
              refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
              }
            >
              {locations.map((item, index) => (
                <View key={index} style={styles.locationRow}>
                  <View style={styles.timeline}>
                    <View style={[styles.dot, item.current && styles.activeDot]}>
                      <MapPin size={20} color={item.current ? "#2ECC71" : "#000"} />
                    </View>
                    {index !== locations.length - 1 && <View style={styles.dashedLine} />}
                  </View>

                  <View style={styles.locationInfo}>
                    <Text style={styles.place}>{item.place}</Text>
                    <Text style={styles.time}>{item.time}</Text>
                    {item.current && (
                      <View style={styles.currentBadge}>
                        <Text style={styles.currentText}>CURRENT</Text>
                      </View>
                    )}
                  </View>
                </View>
              ))}
            </ScrollView>
          )}
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
