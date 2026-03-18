import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import styles from "./styles";
import { useForgotPassword } from "../../../hooks/auth/useForgotPassword";

const ForgetScreen = () => {
  const navigation = useNavigation();
  const { sendOtp, loading } = useForgotPassword();
  const [email, setEmail] = useState("");

  const handlePasswordReset = async () => {
    if (!email) {
      Alert.alert("Validation Error", "Please enter your email");
      return;
    }

    try {
      const res = await sendOtp(email);

      Alert.alert("Success", res.message);

      navigation.navigate("VerifyOtp", { email });

    } catch (error) {
      console.log("Forgot Password Error:", error);

      Alert.alert(
        "Error",
        error?.message || "Something went wrong"
      );
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.container}>
          <Text style={styles.title}>Forgot Password</Text>

          <Text style={styles.subtitle}>
            Enter your registered email to receive OTP.
          </Text>

          <Image
            source={require("../../../../assets/images/rekory.png")}
            style={styles.logo}
            resizeMode="contain"
          />

          <Text style={styles.label}>Email</Text>

          <TextInput
            placeholder="Enter your email"
            placeholderTextColor="#A0A0A0"
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <TouchableOpacity
            onPress={handlePasswordReset}
            style={styles.button}
            disabled={loading}
          >
            <Text style={styles.buttonText}>
              {loading ? "Sending..." : "Send OTP"}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.navigate("Login")}
            style={{ marginTop: 10, marginBottom: 20 }}
          >
            <Text style={{ color: "#C61217", textAlign: "center" }}>
              Back to Login
            </Text>
          </TouchableOpacity>

        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default ForgetScreen;