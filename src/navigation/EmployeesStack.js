import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import EmployeesScreen from "../screens/HR/EmployeeList";
import EmployeeDetailsScreen from "../screens/HR/EmployeeDetails";
import AddEmployeeScreen from "../screens/HR/AddEmployee";

const Stack = createNativeStackNavigator();

const EmployeesStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="EmployeesList"
        component={EmployeesScreen}
      />
      <Stack.Screen
        name="EmployeeDetails"
        component={EmployeeDetailsScreen}
      />
       <Stack.Screen name="AddEmployee" component={AddEmployeeScreen} />
    </Stack.Navigator>

  );
};

export default EmployeesStack;