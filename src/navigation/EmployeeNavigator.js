// // EmployeeNavigator.js
// import React from "react";
// import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
// import { HouseSimple, UserList, Gear } from "phosphor-react-native";
// import EmployeeHome from "../screens/EmployeeHome";
// import EmployeeProfile from "../screens/EmployeeProfile";
// import EmployeeSettings from "../screens/EmployeeSettings";

// const Tab = createBottomTabNavigator();

// const EmployeeNavigator = () => {
//   return (
//     <Tab.Navigator
//       screenOptions={{
//         headerShown: false,
//         tabBarShowLabel: false,
//         tabBarStyle: {
//           height: 90,
//           backgroundColor: "#fff",
//           borderTopWidth: 0,
//           elevation: 5,
//         },
//       }}
//     >
//       <Tab.Screen
//         name="EmployeeHome"
//         component={EmployeeHome}
//         options={{
//           tabBarIcon: ({ focused }) => (
//             <HouseSimple
//               size={26}
//               weight={focused ? "regular" : "regular"}
//               color={focused ? "#E53935" : "#000"}
//             />
//           ),
//         }}
//       />
//       <Tab.Screen
//         name="Tasks"
//         component={EmployeeProfile} 
//         options={{
//           tabBarIcon: ({ focused }) => (
//             <UserList
//               size={26}
//               weight={focused ? "regular" : "regular"}
//               color={focused ? "#E53935" : "#000"}
//             />
//           ),
//         }}
//       />
//       <Tab.Screen
//         name="Settings"
//         component={EmployeeSettings}
//         options={{
//           tabBarIcon: ({ focused }) => (
//             <Gear
//               size={26}
//               weight={focused ? "regular" : "regular"}
//               color={focused ? "#E53935" : "#000"}
//             />
//           ),
//         }}
//       />
//     </Tab.Navigator>
//   );
// };

// export default EmployeeNavigator;
