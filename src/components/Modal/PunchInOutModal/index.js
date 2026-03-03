import React, { useEffect, useRef } from "react";
import { View, Text, Modal, TouchableOpacity, Animated, StyleSheet, TouchableWithoutFeedback } from "react-native";

const PunchInOutModal = ({ visible, onClose, item }) => {
  const slideAnim = useRef(new Animated.Value(-300)).current;

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
  }, [visible, slideAnim]);

  if (!item) return null;

  return (
    <Modal visible={visible} transparent animationType="none" onRequestClose={onClose}>
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.modalContainer}>
          <Animated.View
            style={[
              styles.modalContent,
              { transform: [{ translateY: slideAnim }] },
            ]}
          >
            <View style={styles.punchDetails}>
              <View style={styles.dateContainer}>
                <Text style={styles.dateText}>{item.date}</Text>
                <Text style={styles.dayText}>{item.day}</Text>
              </View>

              <View style={styles.detailsContainer}>
                <View style={styles.punchInContainer}>
                  <Text style={styles.punchIn}>Check In:</Text>
                  <Text style={styles.punchInValue}>{item.checkIn}</Text>
                </View>
                <View style={styles.punchOutContainer}>
                  <Text style={styles.punchOut}>Check Out:</Text>
                  <Text style={styles.punchOutValue}>{item.checkOut}</Text>
                </View>
              </View>
            </View>
          </Animated.View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.3)", 
    paddingTop: 50, 
  },
  modalContent: {
    width: "80%",
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    elevation: 10, 
  },
  punchDetails: {
    marginBottom: 20,
  },
  dateContainer: {
    backgroundColor: "#03B30F", 
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    alignItems: "center",
  },
  dateText: {
    fontSize: 32,
    color: "white",
  },
  dayText: {
    color: "white",
    fontSize: 14,
  },
  detailsContainer: {
    flexDirection: "row", 
    justifyContent: "space-between", 
    paddingVertical: 5,
  },
  punchInContainer: {
    flexDirection: "column", 
    justifyContent: "flex-start",
    marginBottom: 10,
  },
  punchIn: {
    fontSize: 16,
    fontWeight: "500",
    color: "#333",
  },
  punchInValue: {
    fontSize: 15,
    color: "#000",
  },
  punchOutContainer: {
    flexDirection: "column", 
    justifyContent: "flex-start",
    marginBottom: 10,
  },
  punchOut: {
    fontSize: 16,
    fontWeight: "500",
    color: "#333",
  },
  punchOutValue: {
    fontSize: 15,
    color: "#000",
  },
});

export default PunchInOutModal;