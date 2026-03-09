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
import api from "../../services/api"; 

const ForgetScreen = () => {
  const navigation = useNavigation(); // <--- Add this
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handlePasswordReset = async () => {
    if (!email) {
      Alert.alert("Validation Error", "Please enter your email");
      return;
    }

    setLoading(true);
    try {
      await api.post("/auth/password-reset/", { email });
      Alert.alert(
        "Success",
        "If this email exists, a password reset link has been sent."
      );
      setEmail("");
    } catch (error) {
      console.log("Password Reset Error:", error.response?.data || error.message);
      Alert.alert("Error", "Something went wrong. Please try again.");
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
          <Text style={styles.title}>Forgot Password</Text>
          <Text style={styles.subtitle}>
            Enter your registered email to receive a password reset link.
          </Text>

          {/* Logo */}
          <Image
            source={require("../../../assets/images/rekory.png")}
            style={styles.logo}
            resizeMode="contain"
          />

          {/* Email Input */}
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

          {/* Back to Login */}
        

          {/* Submit Button */}
          <TouchableOpacity
            onPress={handlePasswordReset}
            style={styles.button}
            disabled={loading}
          >
            <Text style={styles.buttonText}>
              {loading ? "Sending..." : "Send Reset Link"}
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