import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { useDepartments, useAddDepartment } from "../../../hooks/useDepartments";
import DepartmentsScreenUI from "./DepartmentsScreenUI"

const DepartmentsScreen = () => {
  const navigation = useNavigation();
  const [showModal, setShowModal] = useState(false);

  const {
    data: departments = [],
    isLoading,
    isError,
  } = useDepartments();

  const { mutate: addDepartment, isPending } = useAddDepartment();

  const handleAddDepartment = (payload) => {
    addDepartment(payload, {
      onSuccess: () => setShowModal(false),
    });
  };

  return (
    <DepartmentsScreenUI
      departments={departments}
      isLoading={isLoading}
      isError={isError}
      showModal={showModal}
      setShowModal={setShowModal}
      onAddDepartment={handleAddDepartment}
      isAdding={isPending}
    />
  );
};

export default DepartmentsScreen;
