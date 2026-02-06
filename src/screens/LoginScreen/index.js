// import React, { useState } from "react";
// import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
// import { useAuth } from "../../context/AuthContext";

// const LoginScreen = () => {
//   const { setUserRole, setUsername } = useAuth();
//   const [usernameInput, setUsernameInput] = useState("");
//   const [password, setPassword] = useState("");

//   const handleLogin = () => {
//     if (!usernameInput || !password) {
//       Alert.alert("Validation Error", "Username and password are required");
//       return;
//     }


//     let role = null;
//     if (usernameInput.toLowerCase() === "hr" && password === "1234") role = "HR";
//     else if (usernameInput.toLowerCase() === "employee" && password === "1234") role = "EMPLOYEE";

//     if (!role) {
//       Alert.alert("Login Failed", "Invalid username or password");
//       return;
//     }

//     setUserRole(role);
//     setUsername(usernameInput);
//     Alert.alert("Success", `Logged in as ${role}`);
//   };

//   return (
//     <View style={{ flex: 1, justifyContent: "center", alignItems: "center", padding: 20 }}>
//       <TextInput
//         placeholder="Username"
//         value={usernameInput}
//         onChangeText={setUsernameInput}
//         style={{
//           width: "100%",
//           borderWidth: 1,
//           borderColor: "#ccc",
//           borderRadius: 8,
//           padding: 12,
//           marginBottom: 12,
//         }}
//       />

//       <TextInput
//         placeholder="Password"
//         value={password}
//         onChangeText={setPassword}
//         secureTextEntry
//         style={{
//           width: "100%",
//           borderWidth: 1,
//           borderColor: "#ccc",
//           borderRadius: 8,
//           padding: 12,
//           marginBottom: 20,
//         }}
//       />

//       <TouchableOpacity
//         onPress={handleLogin}
//         style={{
//           width: "100%",
//           backgroundColor: "#C61217",
//           padding: 15,
//           borderRadius: 8,
//           alignItems: "center",
//         }}
//       >
//         <Text style={{ color: "#fff", fontSize: 16 }}>Login</Text>
//       </TouchableOpacity>
//     </View>
//   );
// };

// export default LoginScreen;



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
const LoginScreen = () => {
  const [secure, setSecure] = useState(true);
   const { setUserRole, setUsername } = useAuth();
  const [usernameInput, setUsernameInput] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    if (!usernameInput || !password) {
      Alert.alert("Validation Error", "Username and password are required");
      return;
    }


    let role = null;
    if (usernameInput.toLowerCase() === "hr" && password === "1234") role = "HR";
    else if (usernameInput.toLowerCase() === "employee" && password === "1234") role = "EMPLOYEE";

    if (!role) {
      Alert.alert("Login Failed", "Invalid username or password");
      return;
    }

    setUserRole(role);
    setUsername(usernameInput);
    Alert.alert("Success", `Logged in as ${role}`);
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
          <Text style={styles.label}>User Name</Text>
          <TextInput
            placeholder="Enter user name"
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
            <TouchableOpacity>
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
