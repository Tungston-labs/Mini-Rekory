import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { MapPin, CaretRight } from "phosphor-react-native";
import styles from "./style";

const EmployeeRow = ({ name, location, time, status, showDivider = true }) => {
  const active = status === "active";

  return (
    <>
    
      <TouchableOpacity style={styles.row}>
        <Image
          source={{ uri: "https://i.pravatar.cc/150" }}
          style={styles.avatar}
        />

        <View style={styles.info}>
          <Text style={styles.name}>{name}</Text>
          <View style={styles.location}>
            <MapPin size={16} color="#C61217" />
            <Text style={styles.locText}>{location}</Text>
          </View>
        </View>

        <View style={styles.right}>
          <View
            style={[
              styles.dot,
              { backgroundColor: active ? "#00C50D" : "#C61217" },
            ]}
          />

          <View style={styles.timeRow}>
            <Text style={styles.time}>{time}</Text>
            <CaretRight size={20} weight="bold"  />
          </View>
        </View>
      </TouchableOpacity>

      {showDivider && <View style={styles.divider} />}
    </>
  );
};


export default EmployeeRow;
