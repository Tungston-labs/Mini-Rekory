import React, { useState, useMemo } from "react";
import { View, Text, FlatList, TextInput, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MagnifyingGlass } from "phosphor-react-native";
import DepartmentModal from "../../../components/Modal/Department";
import EmployeeSkeleton from "../../../components/EmployeeSkeleton";
import styles from "./style";

const DepartmentItem = ({ name }) => {
  const initial = name ? name.charAt(0).toUpperCase() : "?";
  return (
    <View style={styles.row}>
      <View style={styles.avatar}>
        <Text style={styles.avatarText}>{initial}</Text>
      </View>
      <Text style={styles.departmentName}>{name || "Unknown"}</Text>
    </View>
  );
};

const DepartmentsScreenUI = ({
  departments,
  isLoading,
  isError,
  showModal,
  setShowModal,
  onAddDepartment,
  isAdding,
  refreshing,
  onRefresh,
  onEndReached,
  isFetchingNextPage,
}) => {
  const [searchText, setSearchText] = useState("");

  const filteredDepartments = useMemo(() => {
    return departments.filter((dep) =>
      dep.name.toLowerCase().includes(searchText.toLowerCase())
    );
  }, [departments, searchText]);

  if (isLoading) {
    return (
      <SafeAreaView style={{ flex: 1, padding: 16 }}>
        {[...Array(6)].map((_, i) => (
          <EmployeeSkeleton key={i} />
        ))}
      </SafeAreaView>
    );
  }

  if (isError) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <Text style={{ textAlign: "center", marginTop: 20 }}>
          Failed to load departments
        </Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>All Departments</Text>
      </View>

      <View style={styles.searchWrapper}>
        <MagnifyingGlass size={18} color="#9E9E9E" />
        <TextInput
          placeholder="Search Department Name"
          placeholderTextColor="#9E9E9E"
          style={styles.searchInput}
          value={searchText}
          onChangeText={setSearchText}
        />
      </View>
      <FlatList
        data={filteredDepartments}               // use filtered list
        keyExtractor={(item) => item.id?.toString()}
        renderItem={({ item }) => <DepartmentItem name={item.name} />}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        refreshing={refreshing}
        onRefresh={onRefresh}
        onEndReached={onEndReached}
        onEndReachedThreshold={0.5}
        ListFooterComponent={isFetchingNextPage ? <Text>Loading more ...</Text> : null}
      />
      <TouchableOpacity
        style={styles.fab}
        onPress={() => setShowModal(true)}
      >
        <Text style={styles.fabIcon}>＋</Text>
      </TouchableOpacity>

      <DepartmentModal
        visible={showModal}
        onClose={() => setShowModal(false)}
        onCreate={onAddDepartment}
        loading={isAdding}
      />
    </SafeAreaView>
  );
};

export default DepartmentsScreenUI;