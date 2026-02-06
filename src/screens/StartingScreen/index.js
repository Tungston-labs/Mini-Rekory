import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import styles from "./style";
import { ArrowRight } from "phosphor-react-native";

const StartScreen = ({ navigation }) => {

    return (
        <View style={styles.container}>
            <View style={styles.content}>
                <Image
                    source={require("../../../assets/images/start.png")}
                    style={styles.image}
                    resizeMode="contain"
                />

                <Text style={styles.title}>
                    Automatically track {"\n"}
                    employee locations & {"\n"}
                    improve team visibility.
                </Text>

                <Text style={styles.description}>
                    Automatically updated locations{"\n"}
                    ensure accurate tracking without{"\n"}
                    manual check-ins.
                </Text>


                <View style={styles.dots}>
                    <View style={styles.dot} />
                    <View style={styles.activeDot} />
                </View>
                        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("Login")}
        >
          <Text style={styles.buttonText}>Get Started</Text>
          <ArrowRight size={20} color="#FFF" weight="bold" />
        </TouchableOpacity>


            </View>
        </View>
    );
};

export default StartScreen;
