import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Modal,
  Pressable,
} from "react-native";
import styles from "./style";

const DepartmentModal = ({ visible, onClose, onCreate, loading }) => {
  const [name, setName] = useState("");
  const [code, setCode] = useState("");

  useEffect(() => {
    if (!visible) {
      setName("");
      setCode("");
    }
  }, [visible]);

  const handleCreate = () => {
    if (!name.trim() || !code.trim()) return;

    onCreate({
      name: name.trim(),
      code: code.trim().toUpperCase(),
    });
  };

  const isValid = name.trim() && code.trim();

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      statusBarTranslucent
    >
   
       <View style={{ flex: 1, justifyContent: "flex-end" }}>
      <Pressable style={styles.overlay} onPress={onClose} />

      <View style={styles.sheet}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Create New Department</Text>
        </View>

        <View style={styles.content}>
          <Text style={styles.label}>Department Name*</Text>
          <TextInput
            placeholder="Enter Department Name"
            placeholderTextColor="#BDBDBD"
            value={name}
            onChangeText={setName}
            style={styles.input}
          />

          <Text style={styles.label}>Department Code*</Text>
          <TextInput
            placeholder="Ex: DEV, HR, FIN"
            placeholderTextColor="#BDBDBD"
            value={code}
            onChangeText={setCode}
            autoCapitalize="characters"
            style={styles.input}
          />

          <View style={styles.actions}>
            <TouchableOpacity
              style={[
                styles.createBtn,
                (!isValid || loading) && { opacity: 0.6 },
              ]}
              onPress={handleCreate}
              disabled={!isValid || loading}
            >
              <Text style={styles.createText}>
                {loading ? "Creating..." : "Create"}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.cancelBtn}
              onPress={onClose}
              disabled={loading}
            >
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      </View>
    </Modal>
  );
};

export default DepartmentModal;
