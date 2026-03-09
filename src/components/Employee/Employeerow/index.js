import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { MapPin ,CaretRight } from "phosphor-react-native";
import styles from "./style";

const EmployeeRow = ({ name, location, status ,onPress }) => {
const active = status === "Active";

  return (
    <TouchableOpacity style={styles.row} onPress={onPress}>
      <Image
        source={{ uri: "https://i.pravatar.cc/150" }}
        style={styles.avatar}
      />

      <View style={styles.info}>
        <Text style={styles.name}>{name}</Text>

        <View style={styles.location}>
          <MapPin size={17} color="#E53935" />
          <Text style={styles.locationText}>{location}</Text>
        </View>
      </View>

      <View style={styles.right}>
  <View
    style={[
      styles.statusDot,
      { backgroundColor: active ? "#00C50D" : "#C61217" },
    ]}
  />
 <View style={styles.timeRow}>
  <Text style={styles.time}>09:18 AM</Text>
  <CaretRight size={20}  weight="bold" />
</View>
</View>
    </TouchableOpacity>
  );
};

export default EmployeeRow;
