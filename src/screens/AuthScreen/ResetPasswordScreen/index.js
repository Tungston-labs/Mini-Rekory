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
import { Eye, EyeSlash } from "phosphor-react-native";
import styles from "./styles";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useForgotPassword } from "../../../hooks/auth/useForgotPassword";

const ResetPasswordScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();

  const { resetToken } = route.params;

  const [secure, setSecure] = useState(true);
  const [secureConfirm, setSecureConfirm] = useState(true);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const { changePassword, loading } = useForgotPassword();

  const handleResetPassword = async () => {
    if (!newPassword || !confirmPassword) {
      Alert.alert("Validation Error", "All fields are required");
      return;
    }

    if (newPassword !== confirmPassword) {
      Alert.alert("Validation Error", "Passwords do not match");
      return;
    }

    try {
      await changePassword(resetToken, newPassword);

      Alert.alert("Success", "Password reset successfully");

      navigation.navigate("Login");

    } catch (error) {
      console.log("RESET PASSWORD ERROR:", error);

      Alert.alert(
        "Error",
        error?.message || "Failed to reset password"
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

          {/* Header */}
          <Text style={styles.title}>Reset Password</Text>
          <Text style={styles.subtitle}>
            Enter your new password to continue
          </Text>

          {/* Logo */}
          <Image
            source={require("../../../../assets/images/rekory.png")}
            style={styles.logo}
            resizeMode="contain"
          />

          {/* New Password */}
          <Text style={styles.label}>New Password</Text>
          <View style={styles.passwordWrapper}>
            <TextInput
              placeholder="Enter new password"
              placeholderTextColor="#A0A0A0"
              secureTextEntry={secure}
              style={styles.passwordInput}
              value={newPassword}
              onChangeText={setNewPassword}
            />
            <TouchableOpacity onPress={() => setSecure(!secure)}>
              {secure ? (
                <EyeSlash size={20} color="#999" />
              ) : (
                <Eye size={20} color="#999" />
              )}
            </TouchableOpacity>
          </View>

          {/* Confirm Password */}
          <Text style={styles.label}>Confirm Password</Text>
          <View style={styles.passwordWrapper}>
            <TextInput
              placeholder="Confirm password"
              placeholderTextColor="#A0A0A0"
              secureTextEntry={secureConfirm}
              style={styles.passwordInput}
              value={confirmPassword}
              onChangeText={setConfirmPassword}
            />
            <TouchableOpacity onPress={() => setSecureConfirm(!secureConfirm)}>
              {secureConfirm ? (
                <EyeSlash size={20} color="#999" />
              ) : (
                <Eye size={20} color="#999" />
              )}
            </TouchableOpacity>
          </View>

          {/* Reset Button */}
          <TouchableOpacity
            onPress={handleResetPassword}
            style={styles.button}
            disabled={loading}
          >
            <Text style={styles.buttonText}>
              {loading ? "Resetting..." : "Reset Password"}
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

export default ResetPasswordScreen;