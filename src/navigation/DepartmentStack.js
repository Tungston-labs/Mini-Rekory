import { createNativeStackNavigator } from "@react-navigation/native-stack";
import DepartmentModal from "../components/Modal/Department";
import DepartmentsScreen from "../screens/HR/Department"

const Stack = createNativeStackNavigator();

const DepartmentStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Departments" 
      component={DepartmentsScreen} />
      <Stack.Screen
        name="AddDepartment"
        component={DepartmentModal}
        options={{
          presentation: "modal",
          
        }}
      />
    </Stack.Navigator>
  );
}

export default DepartmentStack;
