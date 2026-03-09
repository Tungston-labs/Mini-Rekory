import React, { useState, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import styles from "./style"; 
import api from "../../services/api";

const OTPScreen = () => {
  const navigation = useNavigation();
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const inputsRef = useRef([]);
  const [loading, setLoading] = useState(false);

  // Handle OTP input changes
  const handleChange = (text, index) => {
    if (/^\d*$/.test(text)) {
      const newOtp = [...otp];
      newOtp[index] = text;
      setOtp(newOtp);

      // Move to next input
      if (text && index < 5) {
        inputsRef.current[index + 1].focus();
      }

      // Move to previous input if cleared
      if (!text && index > 0) {
        inputsRef.current[index - 1].focus();
      }
    }
  };

  const handleSubmit = async () => {
    const otpCode = otp.join("");
    if (otpCode.length < 6) {
      Alert.alert("Validation Error", "Please enter the 6-digit OTP");
      return;
    }

    setLoading(true);
    try {
      const res = await api.post("/auth/verify-otp/", { otp: otpCode });
      Alert.alert("Success", "OTP verified successfully");
      // Navigate to login or reset password screen
      navigation.navigate("Login");
    } catch (error) {
      console.log("OTP Verification Error:", error.response?.data || error.message);
      Alert.alert("Error", "Invalid OTP. Please try again.");
    } finally {
      setLoading(false);
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
          <Text style={styles.title}>Enter OTP</Text>
          <Text style={styles.subtitle}>
            Enter the 6-digit code sent to your registered email/phone.
          </Text>

          <View style={{ flexDirection: "row", justifyContent: "space-between", marginVertical: 20 }}>
            {otp.map((digit, index) => (
              <TextInput
                key={index}
                ref={(ref) => (inputsRef.current[index] = ref)}
                value={digit}
                onChangeText={(text) => handleChange(text, index)}
                keyboardType="number-pad"
                maxLength={1}
                style={{
                  borderBottomWidth: 2,
                  borderColor: "#C61217",
                  width: 40,
                  height: 50,
                  textAlign: "center",
                  fontSize: 20,
                }}
              />
            ))}
          </View>

          {/* Submit Button */}
          <TouchableOpacity
            onPress={handleSubmit}
            style={styles.button}
            disabled={loading}
          >
            <Text style={styles.buttonText}>
              {loading ? "Verifying..." : "Verify OTP"}
            </Text>
          </TouchableOpacity>

          {/* Back to Login */}
          <TouchableOpacity
            onPress={() => navigation.navigate("Login")}
            style={{ marginTop: 15 }}
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

export default OTPScreen;