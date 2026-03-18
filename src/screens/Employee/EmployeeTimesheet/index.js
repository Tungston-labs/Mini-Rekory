import React, { useState } from "react";
import {
    View,
    Text,
    FlatList,
    Image,
    TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import styles from "./style";
import PunchInOutModal from "../../../components/Modal/PunchInOutModal";
import useEmployeeTimesheet from "./EmployeeTimesheetContainer";
import EmployeeSkeleton from "../../../components/EmployeeSkeleton";
import MonthPicker, {
  ACTION_DATE_SET,
  ACTION_DISMISSED,
} from "react-native-month-year-picker";
import { User } from "phosphor-react-native";
const EmployeeTimesheet = () => {
    const [showPicker, setShowPicker] = useState(false);
    const {
        data,
        loading,
        error,
        modalVisible,
        selectedItem,
        openModal,
        closeModal,
        refreshing,
        onRefresh,
        year,
        month,
        changeMonth,
          name,
  profilePic,
  getGreeting
    } = useEmployeeTimesheet();

    const renderItem = ({ item }) => {
        const isAbsent = item.status === "absent";

      if (loading) {
  return (
    <SafeAreaView style={styles.container}>
      {[1,2,3,4,5].map((item) => (
        <EmployeeSkeleton key={item} />
      ))}
    </SafeAreaView>
  );
}

if (error) {
  return (
    <SafeAreaView style={styles.container}>
      <Text>Failed to load attendance</Text>
    </SafeAreaView>
  );
}
        return (
            <TouchableOpacity
                onPress={() => openModal(item)}
                disabled={isAbsent}
            >
                <View style={styles.card}>
                    <View
                        style={[
                            styles.dateBox,
                            { backgroundColor: isAbsent ? "#C61217" : "#03B30F" },
                        ]}
                    >
                        <Text style={styles.dateText}>{item.date}</Text>
                        <Text style={styles.dayText}>{item.day}</Text>
                    </View>

                    <View style={styles.timeContainer}>
                        <View style={styles.timeBlock}>
                            <Text style={styles.timeText}>{item.checkIn}</Text>
                            <Text style={styles.label}>Check In</Text>
                        </View>

                        <View style={styles.timeBlock}>
                            <Text style={styles.timeText}>{item.checkOut}</Text>
                            <Text style={styles.label}>Check Out</Text>
                        </View>

                        <View style={styles.timeBlock}>
                            <Text style={styles.timeText}>{item.total} hrs</Text>
                            <Text style={styles.label}>Total Hours</Text>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        );
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.topSection}>
                <View>
                   <Text style={styles.hello}>Hello {name || "Employee"}!</Text>
             <Text style={styles.subText}>{getGreeting()}</Text>
                </View>

              {profilePic ? (
  <Image
    source={{ uri: profilePic }}
    style={styles.profileImage}
  />
) : (
  <View style={styles.profileIcon}>
    <User size={30} color="#777" weight="fill" />
  </View>
)}
            </View>

            <View style={styles.header}>
                <Text style={styles.title}>Time Sheet</Text>

                <TouchableOpacity
                    style={styles.monthButton}
                    onPress={() => setShowPicker(true)}
                >
                    <Text style={styles.monthText}>
                        📅 {new Date(year, month - 1).toLocaleString("default", {
                            month: "long",
                            year: "numeric",
                        })}
                    </Text>
                </TouchableOpacity>
            </View>

            <FlatList
                data={data}
                keyExtractor={(item) => item.id}
                renderItem={renderItem}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 100 }}
                refreshing={refreshing}
                onRefresh={onRefresh}
            />

           {showPicker && (
  <MonthPicker
    onChange={(event, newDate) => {
      switch (event) {
        case ACTION_DATE_SET:
          changeMonth(newDate);
          break;
        case ACTION_DISMISSED:
        default:
          break;
      }
      setShowPicker(false);
    }}
    value={new Date(year, month - 1)}
    minimumDate={new Date(2020, 0)} 
    maximumDate={new Date()}        
  />
)}
            <PunchInOutModal
                visible={modalVisible}
                onClose={closeModal}
                item={selectedItem}
            />
        </SafeAreaView>
    );
};

export default EmployeeTimesheet;