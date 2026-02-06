import React, { useEffect, useRef } from "react";
import { View, Animated } from "react-native";
import styles from "./style";

const EmployeeSkeleton = () => {
  const opacity = useRef(new Animated.Value(0.4)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 0.4,
          duration: 800,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  return (
    <View style={styles.card}>
      <Animated.View style={[styles.avatar, { opacity }]} />

      <View style={styles.textContainer}>
        <Animated.View style={[styles.lineShort, { opacity }]} />
        <Animated.View style={[styles.lineLong, { opacity }]} />
      </View>
    </View>
  );
};

export default EmployeeSkeleton;
