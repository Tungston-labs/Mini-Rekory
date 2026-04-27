import React, { useState } from "react";
import {
    View,
    Text,
    TouchableOpacity,
    Modal,
    FlatList,
    StyleSheet,
    Pressable,
} from "react-native";

const CustomDropdown = ({ options = [], value, onChange, placeholder = "Select" }) => {
    const [visible, setVisible] = useState(false);

    const selectedLabel = options.find((opt) => opt.value === value)?.label || "";

    return (
        <>
            <TouchableOpacity
                style={styles.input}
                onPress={() => setVisible(true)}
                activeOpacity={0.8}
            >
                <Text style={{ fontSize: 14, color: value ? "#000" : "#A0A0A0" }}>
                    {selectedLabel || placeholder}
                </Text>
                <Text style={styles.arrow}>▾</Text>
            </TouchableOpacity>

            <Modal visible={visible} transparent animationType="fade">
                {/* ✅ Outer Pressable closes modal on backdrop tap */}
                <Pressable style={styles.overlay} onPress={() => setVisible(false)}>
                    {/* ✅ Inner Pressable stops tap from bubbling to overlay */}
                    <Pressable onPress={(e) => e.stopPropagation()}>
                        <View style={styles.modal}>
                            <FlatList
                                data={options}
                                keyExtractor={(item) => String(item.value)}
                                renderItem={({ item }) => (
                                    <TouchableOpacity
                                        style={[
                                            styles.option,
                                            item.value === value && styles.selectedOption,
                                        ]}
                                        onPress={() => {
                                            onChange(item.value);
                                            setVisible(false);
                                        }}
                                    >
                                        <Text
                                            style={[
                                                styles.optionText,
                                                item.value === value && styles.selectedOptionText,
                                            ]}
                                        >
                                            {item.label}
                                        </Text>
                                    </TouchableOpacity>
                                )}
                            />
                        </View>
                    </Pressable>
                </Pressable>
            </Modal>
        </>
    );
};

const styles = StyleSheet.create({
    input: {
        height: 48,
        borderWidth: 1,
        borderColor: "#E0E0E0",
        borderRadius: 8,
        paddingHorizontal: 14,
        fontSize: 14,
        color: "#000",
        backgroundColor: "#FFF",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    arrow: {
        fontSize: 14,
        color: "#666",
    },
    overlay: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.3)",
        justifyContent: "center",        // ✅ centers modal vertically
        paddingHorizontal: 24,
    },
    modal: {
        backgroundColor: "#FFF",
        borderRadius: 12,
        paddingVertical: 8,
        maxHeight: 300,
    },
    option: {
        paddingVertical: 14,
        paddingHorizontal: 16,
        borderBottomWidth: 1,
        borderBottomColor: "#F0F0F0",
    },
    selectedOption: {
        backgroundColor: "#F5F5F5",
    },
    optionText: {
        fontSize: 14,
        color: "#000",
    },
    selectedOptionText: {
        fontWeight: "600",
        color: "#000",
    },
});

export default CustomDropdown;