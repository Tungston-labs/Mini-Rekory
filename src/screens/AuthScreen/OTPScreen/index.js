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
  Image
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import styles from "./style";
import { useForgotPassword } from "../../../hooks/auth/useForgotPassword";

const OTPScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { email } = route.params;
  const { verifyOtpCode, loading } = useForgotPassword();
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const inputsRef = useRef([]);

  const handleChange = (text, index) => {
    if (/^\d*$/.test(text)) {
      const newOtp = [...otp];
      newOtp[index] = text;
      setOtp(newOtp);

      if (text && index < 5) {
        inputsRef.current[index + 1]?.focus();
      }

      if (!text && index > 0) {
        inputsRef.current[index - 1]?.focus();
      }
    }
  };

  const handleSubmit = async () => {
    const otpCode = otp.join("");

    if (otpCode.length < 6) {
      Alert.alert("Validation Error", "Please enter the 6-digit OTP");
      return;
    }

    try {
      const res = await verifyOtpCode(email, otpCode);
      const resetToken = res.reset_token;
      Alert.alert("Success", "OTP verified successfully");
      navigation.navigate("ResetPassword", {
        resetToken,
      });
    } catch (error) {
      console.log("OTP Verification Error:", error);

      Alert.alert(
        "Error",
        error?.message || "Invalid or expired OTP"
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
          <Image
            source={require("../../../../assets/images/rekory.png")}
            style={styles.logo}
            resizeMode="contain"
          />
          <Text style={styles.title}>Enter OTP</Text>

          <Text style={styles.subtitle}>
            Enter the 6-digit code sent to your email.
          </Text>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginVertical: 20,
            }}
          >
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

          <TouchableOpacity
            onPress={handleSubmit}
            style={styles.button}
            disabled={loading}
          >
            <Text style={styles.buttonText}>
              {loading ? "Verifying..." : "Verify OTP"}
            </Text>
          </TouchableOpacity>

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