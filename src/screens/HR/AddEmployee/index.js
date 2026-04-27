// src/screens/AddEmployee/AddEmployeeScreen.js
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
  Image,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { User as UserIcon } from "phosphor-react-native"; // keep your icon import
import { Picker } from "@react-native-picker/picker";
import DateTimePicker from "@react-native-community/datetimepicker";
import { launchImageLibrary } from "react-native-image-picker";
import styles from "./style";
import { useCreateEmployee } from "../../../hooks/hr/useEmployees";
import { useDepartments } from "../../../hooks/hr/useDepartments";
import CustomDropdown from "../../../components/CustomDropdown/CustomDropdown";
const AddEmployeeScreen = () => {
  const navigation = useNavigation();
  const { handleCreateEmployee, loading } = useCreateEmployee();
  const { data, isLoading } = useDepartments();
  const [showDOBPicker, setShowDOBPicker] = useState(false);
  const [showJoiningPicker, setShowJoiningPicker] = useState(false);

  const [imageUri, setImageUri] = useState(null);
  const departments =
    data?.pages?.flatMap((page) => page.results || []) || [];
  const [form, setForm] = useState({
    fullName: "",
    jobTitle: "",
    department: "",
    contactNumber: "",
    email: "",
    dob: "",
    address: "",
    joiningDate: "",
    gender: "",
    employmentType: "",
    role: "",
  });

  const handleChange = (field, value) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const pickImage = async () => {
    launchImageLibrary(
      {
        mediaType: "photo",
        quality: 0.8,
      },
      (response) => {
        if (response.didCancel) return;
        if (response.errorCode) {
          console.log("ImagePicker Error: ", response.errorMessage);
          Alert.alert("Image error", response.errorMessage || "Failed to pick image");
          return;
        }
        const asset = response.assets && response.assets[0];
        if (asset && asset.uri) {
          setImageUri(asset.uri);
        }
      }
    );
  };

  const handleSave = async () => {
    // Basic validation
    if (!form.fullName?.trim()) {
      Alert.alert("Validation", "Please enter Full Name");
      return;
    }
    if (!form.email?.trim()) {
      Alert.alert("Validation", "Please enter Email");
      return;
    }

    const payload = {
      email: form.email,
      role: form.role || "employee",
      name: form.fullName,
      phone: form.contactNumber,
      date_of_birth: form.dob,
      gender: form.gender,
      address: form.address,
      joining_date: form.joiningDate,
      department: form.department || 2,
      job_title: form.jobTitle,
      employment_type: form.employmentType,
      profilepic: imageUri,
    };

    try {
      const res = await handleCreateEmployee(payload);
      if (res?.status === "success") {
        Alert.alert("Success", res.message || "Employee created");
        navigation.goBack();
      } else {
        Alert.alert("Error", res?.message || "Failed to create employee");
      }
    } catch (err) {
      console.log("Create employee error:", err);
      Alert.alert("Error", "Something went wrong while creating employee");
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backArrow}>‹</Text>
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Add New Employee</Text>

        <View style={{ width: 24 }} />
      </View>

      <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
        <View style={styles.avatarWrapper}>
          <View style={styles.avatar}>
            {imageUri ? (
              <Image source={{ uri: imageUri }} style={{ width: 80, height: 80, borderRadius: 40 }} />
            ) : (
              <UserIcon size={28} color="#643a3a" />
            )}
          </View>

          <TouchableOpacity style={styles.cameraButton} onPress={pickImage}>
            <Text style={styles.cameraIcon}>＋</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.avatarLabel}>Employee Photo</Text>

        <View style={styles.form}>
          <Text style={styles.label}>Full Name</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter Full Name"
            value={form.fullName}
            onChangeText={(text) => handleChange("fullName", text)}
          />

          <Text style={styles.label}>Job Title</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter Job Title"
            value={form.jobTitle}
            onChangeText={(text) => handleChange("jobTitle", text)}
          />

          <Text style={styles.label}>Department</Text>

          <View style={styles.dropdown}>
            {isLoading ? (
              <ActivityIndicator size="small" />
            ) : (
            <CustomDropdown
    placeholder="Select Department"
    value={form.department}
    onChange={(value) => handleChange("department", value)}
    options={departments.map((dept) => ({ label: dept.name, value: dept.id }))}
/>
            )}
          </View>
          <Text style={styles.label}>Contact Number</Text>
          <TextInput
            style={styles.input}
            keyboardType="phone-pad"
            placeholder="Enter Contact Number"
            value={form.contactNumber}
            onChangeText={(text) => handleChange("contactNumber", text)}
          />

          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            keyboardType="email-address"
            placeholder="Enter Email"
            value={form.email}
            onChangeText={(text) => handleChange("email", text)}
            autoCapitalize="none"
          />

          <Text style={styles.label}>Date of Birth</Text>
          <TouchableOpacity style={styles.input} onPress={() => setShowDOBPicker(true)}>
            <Text>{form.dob ? form.dob : "Select Date of Birth"}</Text>
          </TouchableOpacity>

          {showDOBPicker && (
            <DateTimePicker
              value={form.dob ? new Date(form.dob) : new Date()}
              mode="date"
              display="default"
              onChange={(event, selectedDate) => {
                setShowDOBPicker(false);
                if (selectedDate) handleChange("dob", selectedDate.toISOString().split("T")[0]);
              }}
            />
          )}

          <Text style={styles.label}>Address</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter Address"
            multiline
            value={form.address}
            onChangeText={(text) => handleChange("address", text)}
          />

          <Text style={styles.label}>Joining Date</Text>
          <TouchableOpacity style={styles.input} onPress={() => setShowJoiningPicker(true)}>
            <Text>{form.joiningDate ? form.joiningDate : "Select Joining Date"}</Text>
          </TouchableOpacity>

          {showJoiningPicker && (
            <DateTimePicker
              value={form.joiningDate ? new Date(form.joiningDate) : new Date()}
              mode="date"
              display="default"
              onChange={(event, selectedDate) => {
                setShowJoiningPicker(false);
                if (selectedDate) handleChange("joiningDate", selectedDate.toISOString().split("T")[0]);
              }}
            />
          )}

          <Text style={styles.label}>Gender</Text>
          <View style={styles.dropdown}>
            <CustomDropdown
    placeholder="Select Gender"
    value={form.gender}
    onChange={(value) => handleChange("gender", value)}
    options={[
        { label: "Male", value: "male" },
        { label: "Female", value: "female" },
        { label: "Other", value: "other" },
    ]}
/>
          </View>

          <Text style={styles.label}>Employment Type</Text>
          <View style={styles.dropdown}>
            <CustomDropdown
    placeholder="Select Employment Type"
    value={form.employmentType}
    onChange={(value) => handleChange("employmentType", value)}
    options={[
        { label: "Full Time", value: "full_time" },
        { label: "Part Time", value: "part_time" },
        { label: "Contract", value: "contract" },
    ]}
/>
          </View>

          <Text style={styles.label}>Role</Text>
          <View style={styles.dropdown}>
           <CustomDropdown
    placeholder="Select Role"
    value={form.role}
    onChange={(value) => handleChange("role", value)}
    options={[
        // { label: "Admin", value: "admin" },
        // { label: "Manager", value: "manager" },
        { label: "Employee", value: "employee" },
    ]}
/>
          </View>
        </View>

        <TouchableOpacity
          style={[styles.saveButton, loading && { opacity: 0.7 }]}
          onPress={handleSave}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.saveButtonText}>Save Employee</Text>
          )}
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default AddEmployeeScreen;