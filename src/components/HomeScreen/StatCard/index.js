import React from "react";
import { View, Text } from "react-native";
import { Users, Crosshair } from "phosphor-react-native";
import styles from "./style";

const StatCard = ({ title, value, sub, type }) => {
  const isDanger = type === "danger";

  const Icon = isDanger ? Crosshair : Users;

  return (
    <View style={[styles.card, isDanger && styles.danger]}>
      <View style={styles.iconWrap}>
        <Icon
          size={22}
          color={isDanger ? "#FFF" : "#000"}
          weight="regular"
        />
      </View>
      <Text style={[styles.title, isDanger && styles.white]}>
        {title}
      </Text>

      <Text style={[styles.value, isDanger && styles.white]}>
        {value}
      </Text>

      <Text style={[styles.sub, isDanger && styles.white]}>
        {sub}
      </Text>
    </View>
  );
};

export default StatCard;
