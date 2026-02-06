import React, { useState } from "react";
import { Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useAddEmployee } from "../../../hooks/useEmployees";
import AddEmployeeView from "./AddEmployeeView";
import { SafeAreaView } from "react-native-safe-area-context";
const AddEmployeeContainer = () => {
  const navigation = useNavigation();
  const [name, setName] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [department, setDepartment] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");

  const isFormValid = name && email && department;

  const { mutate, isPending } = useAddEmployee();

  const handleSaveEmployee = () => {
    if (!isFormValid) {
      Alert.alert(
        "Validation Error",
        "Name, Email, and Department are required"
      );
      return;
    }

    mutate(
      { name, jobTitle, department, phone, email },
      {
        onSuccess: () => {
          Alert.alert("Success", "Employee added successfully");
          navigation.goBack();
        },
        onError: () => {
          Alert.alert("Error", "Failed to add employee");
        },
      }
    );
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <AddEmployeeView
        name={name}
        jobTitle={jobTitle}
        department={department}
        phone={phone}
        email={email}
        setName={setName}
        setJobTitle={setJobTitle}
        setDepartment={setDepartment}
        setPhone={setPhone}
        setEmail={setEmail}
        handleSaveEmployee={handleSaveEmployee}
        isFormValid={isFormValid}
        isPending={isPending}
        onBack={() => navigation.goBack()}
      />
    </SafeAreaView>
  );
};

export default AddEmployeeContainer;
