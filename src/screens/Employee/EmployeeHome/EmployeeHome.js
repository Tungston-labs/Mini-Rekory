import React, { useState } from "react";
import { View, Text, TouchableOpacity, Animated, Image } from "react-native";
import Svg, { Defs, LinearGradient, Stop, Circle } from "react-native-svg";
import { Fingerprint, Clock, Timer, ClockUser } from "phosphor-react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import styles from "./style";

const EmployeeHome = ({
  time,
  date,
  rotateInterpolate,
  onCheckIn,
  checkedIn
}) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.hello}>Hello Arjun!</Text>
          <Text style={styles.subText}>
            Good Morning Mark Your Attendance
          </Text>
        </View>

        <Image
          source={{ uri: "https://i.pravatar.cc/150?img=12" }}
          style={styles.profile}
        />
      </View>
      <View style={styles.timeContainer}>
        <Text style={styles.timeText}>{time}</Text>
        <Text style={styles.dateText}>{date}</Text>
      </View>

      <View style={styles.circleWrapper}>
        <View style={styles.outerGlow} />

        <Animated.View
          style={{
            transform: [{ rotate: rotateInterpolate }],
          }}
        >
          <Svg height="280" width="280" viewBox="0 0 100 100">
            <Defs>
              <LinearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="0%">
                <Stop
                  offset="0%"
                  stopColor={checkedIn ? "#FE9425" : "#3AE180"}
                  stopOpacity="1"
                />
                <Stop
                  offset="100%"
                  stopColor={checkedIn ? "#FE9425" : "#3AE180"}
                  stopOpacity="0"
                />
              </LinearGradient>
            </Defs>

            <Circle
              cx="50"
              cy="50"
              r="40"
              stroke="url(#grad)"
              strokeWidth="6"
              fill="none"
              strokeLinecap="round"
              strokeDasharray="180 120"
            />
          </Svg>
        </Animated.View>

        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.innerCircle}
          onPress={onCheckIn}
        >
          <View
            style={[
              styles.greenRingInside,
              {
                borderColor: checkedIn ? "#FE9425" : "#4ADE80",
              },
            ]}
          >
            <Fingerprint
              size={50}
              color={checkedIn ? "#FE9425" : "#3AE180"}
              weight="regular"
            />

            <Text
              style={[
                styles.checkInText,
              ]}
            >
              {checkedIn ? "Check Out" : "Check In"}
            </Text>
          </View>
        </TouchableOpacity>
      </View>

      <View style={styles.statsContainer}>
        <View style={styles.statBox}>
          <Clock size={32} color="#C53030" />
          <Text style={styles.statDivider}>09:30 AM</Text>
          <Text style={styles.statLabel}>Check In</Text>
        </View>

        <View style={styles.statBox}>
          <Timer size={32} color="#C53030" />
          <Text style={styles.statDivider}>-----</Text>
          <Text style={styles.statLabel}>Check Out</Text>
        </View>

        <View style={styles.statBox}>
          <ClockUser size={32} color="#C53030" />
          <Text style={styles.statDivider}>-----</Text>
          <Text style={styles.statLabel}>Total Hours</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default EmployeeHome;