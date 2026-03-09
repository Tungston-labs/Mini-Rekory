import React, { useState, useCallback } from "react";
import { useNavigation } from "@react-navigation/native";
import { useDepartments, useAddDepartment } from "../../../hooks/hr/useDepartments";
import DepartmentsScreenUI from "./DepartmentsScreenUI";
import Toast from 'react-native-toast-message';

const DepartmentsScreen = () => {
  const navigation = useNavigation();
  const [showModal, setShowModal] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const {
    data,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch, 
  } = useDepartments();

const { mutate: addDepartment, isLoading: isAdding } = useAddDepartment();

const handleAddDepartment = (payload) => {
  addDepartment(payload, {
    onSuccess: () => {
      setShowModal(false);

      Toast.show({
        type: 'success',
        text1: `${payload.name} added successfully`,
        position: 'top',      
        visibilityTime: 2000,
        topOffset: 50,         
        props: { style: { right: 10 } }, 
      });
    },
    onError: (error) => {
      Toast.show({
        type: 'error',
        text1: `Failed to add ${payload.name}`,
        position: 'top',
        visibilityTime: 2000,
        topOffset: 50,
      });
    }
  });
};

const departments = data ? data.pages.flatMap(page => page.results) : [];

 const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  }, [refetch]);

  const loadMore = () => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  };

  return (
    <DepartmentsScreenUI
      departments={departments}
      isLoading={isLoading}
      isError={isError}
      showModal={showModal}
      setShowModal={setShowModal}
      onAddDepartment={handleAddDepartment}
      isAdding={isAdding}
      refreshing={refreshing}   
      onRefresh={onRefresh}   
      onEndReached={loadMore}
      isFetchingNextPage={isFetchingNextPage}     
    />
  );
};

export default DepartmentsScreen;
