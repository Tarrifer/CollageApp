// StackNavigator.js

import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import LoginPage from "../pages/General/LoginPage";
import SignupPage from "../pages/General/SignupPage";
import OTPVerificationPage from "../pages/General/OTPVerificationPage";
import StudentHomePage from "../pages/Student/StudentHomePage";
import TeacherHomePage from "../pages/Teacher/TeacherHomePage";
import AdminHomePage from "../pages/Admin/AdminHomePage";
import MasterAdminHomePage from "../pages/MasterAdmin/MasterAdminHomePage";
import HomeNavigator from "./HomeNavigator";

const StackNavigator = () => {
  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Login"
          component={LoginPage}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Register"
          component={SignupPage}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="OTPVerification"
          component={OTPVerificationPage}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="StudentHome"
          component={StudentHomePage}
          options={{ title: "Student Home", headerShown: true }}
        />
        <Stack.Screen
          name="TeacherHome"
          component={TeacherHomePage}
          options={{ title: "Teacher Home", headerShown: true }}
        />
        <Stack.Screen
          name="AdminHome"
          component={AdminHomePage}
          options={{ title: "Admin Home", headerShown: true }}
        />
        <Stack.Screen
          name="MasterAdminHome"
          component={MasterAdminHomePage}
          options={{ title: "Master Admin Home", headerShown: true }}
        />
        <Stack.Screen
          name="Home"
          component={HomeNavigator}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default StackNavigator;

// import React from "react";
// import { createNativeStackNavigator } from "@react-navigation/native-stack";
// import { NavigationContainer } from "@react-navigation/native";
// import LoginPage from "../pages/General/LoginPage";
// import SignupPage from "../pages/General/SignupPage";
// import OTPVerificationPage from "../pages/General/OTPVerificationPage";
// import StudentHomePage from "../pages/Student/StudentHomePage";
// import TeacherHomePage from "../pages/Teacher/TeacherHomePage";
// import AdminHomePage from "../pages/Admin/AdminHomePage";
// import MasterAdminHomePage from "../pages/MasterAdmin/MasterAdminHomePage";
// import HomeNavigator from "./HomeNavigator";
// const StackNavigator = () => {
//   const Stack = createNativeStackNavigator();

//   return (
//     <NavigationContainer>
//       <Stack.Navigator>
//         <Stack.Screen
//           name="Login"
//           component={LoginPage}
//           options={{ headerShown: false }}
//         />
//         <Stack.Screen
//           name="Register"
//           component={SignupPage}
//           options={{ headerShown: false }}
//         />
//         <Stack.Screen
//           name="OTPVerification"
//           component={OTPVerificationPage}
//           options={{ headerShown: false }}
//         />
//         <Stack.Screen
//           name="StudentHome"
//           component={StudentHomePage}
//           options={{ title: "Student Home", headerShown: false }}
//         />
//         <Stack.Screen
//           name="TeacherHome"
//           component={TeacherHomePage}
//           options={{ title: "Teacher Home", headerShown: false }}
//         />
//         <Stack.Screen
//           name="AdminHome"
//           component={AdminHomePage}
//           options={{ title: "Admin Home", headerShown: false }}
//         />
//         <Stack.Screen
//           name="MasterAdminHome"
//           component={MasterAdminHomePage}
//           options={{ title: "Master Admin Home", headerShown: false }}
//         />
//         <Stack.Screen
//           name="Home"
//           component={HomeNavigator}
//           options={{ headerShown: false }}
//         />
//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// };

// export default StackNavigator;
