import React from "react";
import { View, Text } from "react-native";
import styles from "../../screens/HR/ProfileScreen/style";

const InfoCard = ({ title, children }) => {
  return (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>{title}</Text>
      {children}
    </View>
  );
};

export default InfoCard;
