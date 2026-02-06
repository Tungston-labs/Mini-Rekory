import React, { useRef } from "react";
import {
  ImageBackground,
  Image,
  View,
  Text,
  TouchableOpacity,
  Animated,
} from "react-native";
import styles from "./style";
import { MapPin } from "phosphor-react-native";
import { ArrowRight } from "phosphor-react-native";
import { useEffect } from "react";
const TrackScreen = ({ navigation }) => {
  const leftPinAnim = useRef(new Animated.Value(0)).current;
const rightPinAnim = useRef(new Animated.Value(0)).current;

useEffect(() => {
  const jump = (anim) =>
    Animated.loop(
      Animated.sequence([
        Animated.timing(anim, {
          toValue: -8,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(anim, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true,
        }),
      ])
    ).start();

  jump(leftPinAnim);
  jump(rightPinAnim);
}, []);
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const handleNext = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.95,
      mass: 1,
      stiffness: 7.2,
      damping: 6,
      useNativeDriver: true,
    }).start(() => {
      scaleAnim.setValue(1);
  navigation.navigate("StartingScreen");

    });
  };

  return (
    <ImageBackground
      source={require("../../../assets/images/trackbg.png")}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.content}>
   
     <View style={styles.trackWrapper}>

  <Animated.View
    style={[
      styles.pinLeft,
      { transform: [{ translateY: leftPinAnim }] },
    ]}
  >
    <MapPin size={50} color="#C61217" weight="fill" />
  </Animated.View>


  <Image
    source={require("../../../assets/images/track.png")}
    style={styles.topImage}
    resizeMode="contain"
  />

  <Animated.View
    style={[
      styles.pinRight,
      { transform: [{ translateY: rightPinAnim }] },
    ]}
  >
    <MapPin size={50} color="#C61217" weight="fill" />
  </Animated.View>
</View>

        <Text style={styles.title}>
          Track Your Team in{"\n"}Real-Time
        </Text>
        <Text style={styles.description}>
          Automatically updated locations{"\n"}
          ensure accurate tracking without{"\n"}
          manual check-ins.
        </Text>
        <View style={styles.dots}>
          <View style={styles.activeDot} />
          <View style={styles.dot} />
        </View>
      </View>
      <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
       
<TouchableOpacity style={styles.button} onPress={handleNext}>
  <Text style={styles.buttonText}>Next</Text>
  <ArrowRight size={20} color="#FFF" weight="bold" />
</TouchableOpacity>
      </Animated.View>
    </ImageBackground>
  );
};

export default TrackScreen;




