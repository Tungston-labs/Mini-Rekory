import { useState } from "react";

const useEmployeeTimesheet = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [refreshing, setRefreshing] = useState(false);

  const openModal = (item) => {
    if (item.status !== "absent") {
      setSelectedItem(item);
      setModalVisible(true);
    }
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 1500);
  };

  return {
    modalVisible,
    selectedItem,
    openModal,
    closeModal,
    refreshing,
    onRefresh,
  };
};

export default useEmployeeTimesheet; 