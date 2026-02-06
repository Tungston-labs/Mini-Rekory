import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { HouseSimple, UserList, UsersFour, Gear } from "phosphor-react-native";

import EmployeesStack from "./EmployeesStack";
import HomeScreen from "../screens/HR/Home";
import EmployeesScreen from "../screens/HR/EmployeeList";
import DepartmentStack from "./DepartmentStack";

const Tab = createBottomTabNavigator();

const AppNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          height: 50,
          backgroundColor: "#fff",
          borderTopWidth: 0,
          elevation: 5,
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <HouseSimple size={26} color={focused ? "#E53935" : "#000"} />
          ),
        }}
      />

      <Tab.Screen
        name="Users"
        component={EmployeesStack}
        options={{
          tabBarIcon: ({ focused }) => (
            <UserList size={26} color={focused ? "#E53935" : "#000"} />
          ),
        }}
      />

      <Tab.Screen
        name="Groups"
        component={DepartmentStack}
        options={{
          tabBarIcon: ({ focused }) => (
            <UsersFour size={26} color={focused ? "#E53935" : "#000"} />
          ),
        }}
      />

      <Tab.Screen
        name="Settings"
        component={EmployeesScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <Gear size={26} color={focused ? "#E53935" : "#000"} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default AppNavigator;
