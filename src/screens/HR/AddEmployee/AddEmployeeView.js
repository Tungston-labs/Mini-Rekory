import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Keyboard,
  TouchableWithoutFeedback,
  RefreshControl
} from "react-native";
import { Image } from "react-native";
import { launchImageLibrary } from "react-native-image-picker";
import styles from "./style";
import { User, Plus, CaretLeft } from "phosphor-react-native";
import DateTimePicker from "@react-native-community/datetimepicker";

const AddEmployeeView = ({
  name,
  jobTitle,
  department,
  phone,
  email,
  setName,
  setJobTitle,
  setDepartment,
  setPhone,
  setEmail,
  address,
gender,
dob,
joiningDate,
employmentType,
roles,
setAddress,
setGender,
setDob,
setJoiningDate,
setEmploymentType,
setRoles,
  handleSaveEmployee,
  isFormValid,
  isPending,
  refreshing,
  onRefresh,
  onBack,
}) => {

  const [image, setImage] = useState(null);
  const pickImage = () => {
    launchImageLibrary(
      {
        mediaType: "photo",
        quality: 0.7,
      },
      (response) => {
        if (response.didCancel) return;

        if (response.errorCode) {
          console.log(response.errorMessage);
          return;
        }

        if (response.assets?.length > 0) {
          setImage(response.assets[0].uri);
        }
      }
    );
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={{ flex: 1 }}>
        <View style={styles.header}>
          {/* <TouchableOpacity onPress={onBack}>
            <CaretLeft size={20} color="#000" weight="bold" />
          </TouchableOpacity> */}
          <Text style={styles.headerTitle}>Add New Employee</Text>
          <View style={{ width: 24 }} />
        </View>

        <ScrollView
          style={styles.container}
          contentContainerStyle={{ paddingBottom: 24 }}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
            />
          }
        >
          <View style={styles.avatarWrapper}>
            <View style={styles.avatar}>
              {image ? (
                <Image
                  source={{ uri: image }}
                  style={{ width: 120, height: 120, borderRadius: 60 }}
                />
              ) : (
                <User size={50} color="#000" />
              )}
            </View>


            <TouchableOpacity style={styles.cameraButton} onPress={pickImage}>

              <Plus size={16} color="#FFF" />
            </TouchableOpacity>
          </View>

          <Text style={styles.avatarLabel}>Employee Photo</Text>

          <View style={styles.form}>
            <Text style={styles.label}>Full Name </Text>
            <TextInput
              style={styles.input}
              placeholder="Enter Full Name"
              value={name}
              onChangeText={setName}
            />

            <Text style={styles.label}>Job Title</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter Job Title"
              value={jobTitle}
              onChangeText={setJobTitle}
            />

            <Text style={styles.label}>Department </Text>
            <TextInput
              style={styles.input}
              placeholder="Enter Department"
              value={department}
              onChangeText={setDepartment}
            />

            <Text style={styles.label}>Contact Number</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter Contact Number"
              keyboardType="phone-pad"
              value={phone}
              onChangeText={setPhone}
            />

            <Text style={styles.label}>Email</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter Email"
              keyboardType="email-address"
              value={email}
              onChangeText={setEmail}
            />

          <Text style={styles.label}>Address</Text>
<TextInput
  style={styles.input}
  placeholder="Enter Address"
  value={address}
  onChangeText={setAddress}
/>

            <Text style={styles.label}>Gender</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter Email"
              keyboardType="email-address"
              value={email}
              onChangeText={setEmail}
            />
   
<Text style={styles.label}>Date of Birth</Text>
<TextInput
  style={styles.input}
  placeholder="Enter Date of Birth"
  value={dob}
  onChangeText={setDob}
/>

<Text style={styles.label}>Joining Date</Text>

<DateTimePicker
  value={joiningDate ? new Date(joiningDate) : new Date()}
  mode="date"
  display="default"
  onChange={(event, selectedDate) => {
    if (selectedDate) {
      setJoiningDate(selectedDate.toISOString().split("T")[0]);
    }
  }}
/>

            <Text style={styles.label}>Employment Type</Text>
<TextInput
  style={styles.input}
  placeholder="Enter Employment Type"
  value={employmentType}
  onChangeText={setEmploymentType}
/>
            <Text style={styles.label}>Roles</Text>
<TextInput
  style={styles.input}
  placeholder="Enter Role"
  value={roles}
  onChangeText={setRoles}
/>
          </View>

          <TouchableOpacity
            style={[
              styles.saveButton,
              !isFormValid && { opacity: 0.5 },
            ]}
            onPress={handleSaveEmployee}
            disabled={!isFormValid || isPending}
          >
            <Text style={styles.saveButtonText}>
              {isPending ? "Saving..." : "Save Employee"}
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default AddEmployeeView;
