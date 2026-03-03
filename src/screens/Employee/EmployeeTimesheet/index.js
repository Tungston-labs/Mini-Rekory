import React from "react";
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

const data = [
    { id: "1", date: "27", day: "Tue", checkIn: "09:30 AM", checkOut: "06:30 PM", total: "08:00 hrs", status: "present" },
    { id: "2", date: "26", day: "Mon", checkIn: "09:30 AM", checkOut: "06:30 PM", total: "08:00 hrs", status: "present" },
    { id: "3", date: "25", day: "Sun", checkIn: "00:00", checkOut: "00:00", total: "00:00", status: "absent" },
];

const EmployeeTimesheet = () => {
    const { modalVisible,
        selectedItem,
        openModal,
        closeModal,
        refreshing,
        onRefresh, } =
        useEmployeeTimesheet();

    const renderItem = ({ item }) => {
        const isAbsent = item.status === "absent";

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
                            <Text style={styles.timeText}>{item.total}</Text>
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
                    <Text style={styles.hello}>Hello Arjun!</Text>
                    <Text style={styles.subText}>
                        Good Morning Mark Your Attendance
                    </Text>
                </View>

                <Image
                    source={{ uri: "https://i.pravatar.cc/150?img=12" }}
                    style={styles.profileImage}
                />
            </View>

            <View style={styles.header}>
                <Text style={styles.title}>Time Sheet</Text>

                <TouchableOpacity style={styles.monthButton}>
                    <Text style={styles.monthText}>📅 This Month</Text>
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

            <PunchInOutModal
                visible={modalVisible}
                onClose={closeModal}
                item={selectedItem}
            />
        </SafeAreaView>
    );
};

export default EmployeeTimesheet;