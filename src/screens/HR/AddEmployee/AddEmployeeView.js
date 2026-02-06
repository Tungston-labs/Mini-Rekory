import React from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";
import styles from "./style";
import { User, ImageSquare, CaretLeft } from "phosphor-react-native";

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
  handleSaveEmployee,
  isFormValid,
  isPending,
  onBack,
}) => {
  return (
    <View style={{ flex: 1 }}>
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack}>
          <CaretLeft size={20} color="#000" weight="bold" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Add New Employee</Text>
        <View style={{ width: 24 }} />
      </View>

      <View style={styles.container}>

        <View style={styles.avatarWrapper}>
          <View style={styles.avatar}>
            <User size={50} color="#000" />
          </View>
          <TouchableOpacity style={styles.cameraButton}>
            <ImageSquare size={16} color="#FFF" />
          </TouchableOpacity>
        </View>
        <Text style={styles.avatarLabel}>Employee Photo</Text>

        {/* Form */}
        <View style={styles.form}>
          <Text style={styles.label}>Full Name *</Text>
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

          <Text style={styles.label}>Department *</Text>
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

          <Text style={styles.label}>Email *</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter Email"
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
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
      </View>
    </View>
  );
};

export default AddEmployeeView;
