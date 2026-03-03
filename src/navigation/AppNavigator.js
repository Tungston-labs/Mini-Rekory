import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { HouseSimple, UserList, UsersFour, Gear } from "phosphor-react-native";
import { View } from "react-native";
import EmployeesStack from "./EmployeesStack";
import HomeScreen from "../screens/HR/Home";
import ProfileScreen from "../screens/HR/ProfileScreen"
import DepartmentStack from "./DepartmentStack";

const Tab = createBottomTabNavigator();

const AppNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          height: 60,
          backgroundColor: "#fff",
          borderTopWidth: 0,
          elevation: 5,
          justifyContent: "center",
          alignItems: "center",
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center", marginTop: "20" }}>
              <HouseSimple size={26} color={focused ? "#E53935" : "#000"} />
            </View>
          ),
        }}
      />

      <Tab.Screen
        name="Users"
        component={EmployeesStack}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center", marginTop: "20" }}>
              <UserList size={26} color={focused ? "#E53935" : "#000"} />
            </View>
          ),
        }}
      />

      <Tab.Screen
        name="Groups"
        component={DepartmentStack}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center", marginTop: "20" }}>
              <UsersFour size={26} color={focused ? "#E53935" : "#000"} />
            </View>
          ),
        }}
      />

      <Tab.Screen
        name="Settings"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ focused }) => (
                   <View style={{ flex: 1, justifyContent: "center", alignItems: "center", marginTop: "20" }}>
            <Gear size={26} color={focused ? "#E53935" : "#000"} />
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default AppNavigator;
