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
import styles from "./style";
import { useAuth } from "../../context/AuthContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import api from "../../services/api";
import { useNavigation } from "@react-navigation/native";

const LoginScreen = () => {
  const navigation = useNavigation();
  const [secure, setSecure] = useState(true);
  const [usernameInput, setUsernameInput] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();

const handleLogin = async () => {
  if (!usernameInput || !password) {
    Alert.alert("Validation Error", "Username and password are required");
    return;
  }

  try {
    const res = await api.post("/auth/login/", {
      email: usernameInput,
      password: password,
    });

    const user = res.data.user;

    // ✅ Save user (optional)
    await AsyncStorage.setItem("user", JSON.stringify(user));

    console.log("USER SAVED:", user);

    // ✅ IMPORTANT: pass tokens to login
    await login(
      user.role,
      user.email,
      res.data.access,
      res.data.refresh
    );

    Alert.alert("Success", `Welcome ${user.name}`);

  } catch (error) {
    console.log("LOGIN ERROR:", error.response?.data || error.message);
    Alert.alert("Login Failed", "Invalid email or password");
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
          <Text style={styles.title}>Welcome Back!</Text>
          <Text style={styles.subtitle}>
            Sign in to continue tracking your{"\n"}
            workforce effortlessly
          </Text>

          {/* Logo */}
          <Image
            source={require("../../../assets/images/rekory.png")}
            style={styles.logo}
            resizeMode="contain"
          />

          {/* Username */}
          <Text style={styles.label}>Email</Text>
          <TextInput
            placeholder="Enter Email Id"
            placeholderTextColor="#A0A0A0"
            style={styles.input}
            value={usernameInput}
            onChangeText={setUsernameInput}
          />

          {/* Password */}
          <Text style={styles.label}>Password</Text>
          <View style={styles.passwordWrapper}>
            <TextInput
              placeholder="Enter your password"
              placeholderTextColor="#A0A0A0"
              secureTextEntry={secure}
              style={styles.passwordInput}
              value={password}
              onChangeText={setPassword}
            />
            <TouchableOpacity onPress={() => setSecure(!secure)}>
              {secure ? (
                <EyeSlash size={20} color="#999" />
              ) : (
                <Eye size={20} color="#999" />
              )}
            </TouchableOpacity>
          </View>

          {/* Options */}
          <View style={styles.options}>
            <View style={styles.remember}>
              <View style={styles.checkbox} />
              <Text style={styles.rememberText}>Keep me signed in</Text>
            </View>
            <TouchableOpacity onPress={() => navigation.navigate("Forget")}>
              <Text style={styles.forgot}>Forgot password</Text>
            </TouchableOpacity>
          </View>

          {/* Login Button */}
          <TouchableOpacity
            onPress={handleLogin}
            style={styles.button}>
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;
