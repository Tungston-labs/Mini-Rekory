import React, { useState, useCallback } from "react";
import { useNavigation } from "@react-navigation/native";
import { useDepartments, useAddDepartment } from "../../../hooks/useDepartments";
import DepartmentsScreenUI from "./DepartmentsScreenUI";

const DepartmentsScreen = () => {
  const navigation = useNavigation();
  const [showModal, setShowModal] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const {
    data: departments = [],
    isLoading,
    isError,
    refetch, 
  } = useDepartments();

  const { mutate: addDepartment, isPending } = useAddDepartment();

const handleAddDepartment = (payload) => {
  addDepartment(payload, {
    onSuccess: async () => {
      setShowModal(false);
      await refetch(); 
    },
  });
};
  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  }, [refetch]);

  return (
    <DepartmentsScreenUI
      departments={departments}
      isLoading={isLoading}
      isError={isError}
      showModal={showModal}
      setShowModal={setShowModal}
      onAddDepartment={handleAddDepartment}
      isAdding={isPending}
      refreshing={refreshing}   
      onRefresh={onRefresh}        
    />
  );
};

export default DepartmentsScreen;
