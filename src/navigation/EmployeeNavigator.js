import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { StyleSheet } from "react-native";
import { HouseSimple, CalendarDots, User } from "phosphor-react-native";

import EmployeeHome from "../screens/Employee/EmployeeHome/EmployeeHomecontainer";
import EmployeeProfile from "../screens/Employee/EmployeeTimesheet";
import EmployeeSettings from "../screens/Employee/EmployeeProfile";

const Tab = createBottomTabNavigator();

const EmployeeNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: styles.tabBar,
        tabBarItemStyle: styles.tabItem,
        tabBarIconStyle: {
          marginTop: 10,
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={EmployeeHome}
        options={{
          tabBarIcon: ({ focused }) => (
            <HouseSimple
              size={26} color={focused ? "#000" : "#fff"}
              weight="regular"

            />
          ),
        }}
      />

      <Tab.Screen
        name="Calendar"
        component={EmployeeProfile}
        options={{
          tabBarIcon: ({ focused }) => (
            <CalendarDots
              size={26} color={focused ? "#000" : "#fff"}
              weight="regular"

            />
          ),
        }}
      />

      <Tab.Screen
        name="Profile"
        component={EmployeeSettings}
        options={{
          tabBarIcon: ({ focused }) => (
            <User
              size={26} color={focused ? "#000" : "#fff"}
              weight="regular"
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default EmployeeNavigator;

const styles = StyleSheet.create({
  tabBar: {
    position: "absolute",
    bottom: 10,
    left: 20,
    right: 20,
    backgroundColor: "#C61217",
    borderRadius: 50,
    height: 60,
    borderTopWidth: 0,
    // elevation: 10,
    flexDirection: "row",
    justifyContent: "space-around",
    marginHorizontal: 15,
  },

  tabItem: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});