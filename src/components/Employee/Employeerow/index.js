import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { MapPin ,CaretRight,User } from "phosphor-react-native";
import styles from "./style";

const EmployeeRow = ({ name, location, status ,onPress ,profile_pic, first_punch_in}) => {
const active = status === true;

  return (
    <TouchableOpacity style={styles.row} onPress={onPress}>
 {profile_pic ? (
  <Image
    source={{ uri: profile_pic }}
    style={styles.avatar}
  />
) : (
  <View style={styles.avatarFallback}>
    <User size={28} color="#555" />
  </View>
)}

      <View style={styles.info}>
        <Text style={styles.name}>{name}</Text>

        <View style={styles.location}>
          <MapPin size={18} color="#E53935" />
          <Text style={styles.locationText}> {location || "Offline"}</Text>
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
  <Text style={styles.time}>{first_punch_in || "---"}</Text>
  <CaretRight size={20}  weight="bold" />
</View>
</View>
    </TouchableOpacity>
  );
};

export default EmployeeRow;
