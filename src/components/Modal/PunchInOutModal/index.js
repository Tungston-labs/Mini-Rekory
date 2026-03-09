import React, { useEffect, useRef } from "react";
import {
  View,
  Text,
  Modal,
  TouchableWithoutFeedback,
  Animated,
  StyleSheet,
  ScrollView
} from "react-native";
import styles from "./styles";
import useEmployeeDayAttendance from "../../../hooks/employee/useEmployeeDayAttendance";

const PunchInOutModal = ({ visible, onClose, item }) => {
  const slideAnim = useRef(new Animated.Value(-300)).current;

  const { sessions, loading } = useEmployeeDayAttendance(
    visible && item ? item.raw?.date : null
  );

  useEffect(() => {
    if (visible) {
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(slideAnim, {
        toValue: -300,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [visible]);

  if (!item) return null;

  return (
   <Modal visible={visible} transparent animationType="none">
  <View style={styles.overlay}>

    {/* OUTSIDE TOUCH AREA */}
    <TouchableWithoutFeedback onPress={onClose}>
      <View style={StyleSheet.absoluteFillObject} />
    </TouchableWithoutFeedback>

    <Animated.View
      style={[
        styles.modalContainer,
        { transform: [{ translateY: slideAnim }] },
      ]}
    >
      <View style={styles.card}>

        <View style={styles.dateBox}>
          <Text style={styles.dateNumber}>{item.date}</Text>
          <Text style={styles.dayLabel}>{item.day}</Text>
        </View>

        <ScrollView
          style={styles.timeSection}
          contentContainerStyle={{ paddingBottom: 10 }}
          showsVerticalScrollIndicator={true}
        >
          <View style={styles.headerRow}>
            <Text style={styles.headerText}>Punch In</Text>
            <Text style={styles.headerText}>Punch Out</Text>
          </View>

          {loading ? (
            <Text style={styles.messageText}>
              Loading sessions...
            </Text>
          ) : sessions.length === 0 ? (
            <Text style={styles.messageText}>
              No sessions available
            </Text>
          ) : (
            sessions.map((session) => (
              <View
                key={session.session_id}
                style={styles.timeRow}
              >
                <Text style={styles.timeValue}>
                  {session.punchInFormatted}
                </Text>
                <Text style={styles.timeValue}>
                  {session.punchOutFormatted || "--"}
                </Text>
              </View>
            ))
          )}
        </ScrollView>

      </View>
    </Animated.View>

  </View>
</Modal>
  );
};

export default PunchInOutModal;

