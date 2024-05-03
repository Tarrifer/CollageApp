import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import DrawerScreen from "../components/DrawerScreen";
import HomeScreen from "../screens/HomeScreen";
import FeedbackScreen from "../screens/FeedbackScreen";
import LogoutScreen from "../screens/LogoutScreen";
import ProfileScreen from "../screens/ProfileScreen";
import SettingsScreen from "../screens/SettingsScreen";
const Drawer = createDrawerNavigator();

const HomeNavigator = ({ userType }) => {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <DrawerScreen {...props} userType={userType} />}
    >
      <Drawer.Screen name="Home" component={HomeScreen} />
      <Drawer.Screen name="FeedbackS" component={FeedbackScreen} />
      <Drawer.Screen name="Logout" component={LogoutScreen} />
      <Drawer.Screen name="Profile" component={ProfileScreen} />
      <Drawer.Screen name="Settings" component={SettingsScreen} />
    </Drawer.Navigator>
  );
};

export default HomeNavigator;

//-----------------------------------------------------------------------------------------------
// import React from "react";
// import { createDrawerNavigator } from "@react-navigation/drawer";
// import DrawerScreen from "../components/DrawerScreen";
// import StudentHomePage from "../screens/StudentHomePage";

// const Drawer = createDrawerNavigator();

// const HomeNavigator = () => {
//   return (
//     <Drawer.Navigator drawerContent={DrawerScreen}>
//       <Drawer.Screen name="StudentHome" component={StudentHomePage} />
//     </Drawer.Navigator>
//   );
// };

// export default HomeNavigator;
//-------------------------------------------------------------------------------------------------
// import React from "react";
// import { createDrawerNavigator } from "@react-navigation/drawer";
// import DrawerScreen from "../components/DrawerScreen";
// import StudentHomeScreen from "../screens/StudentHomeScreen";
// import TeacherHomeScreen from "../screens/TeacherHomeScreen";
// import AdminHomeScreen from "../screens/AdminHomeScreen";
// import MasterAdminHomeScreen from "../screens/MasterAdminHomeScreen";

// const Drawer = createDrawerNavigator();

// const HomeNavigator = ({ userType }) => {
//   return (
//     <Drawer.Navigator
//       drawerContent={(props) => <DrawerScreen {...props} userType={userType} />}
//     >
//       <Drawer.Screen name="StudentHome" component={StudentHomeScreen} />
//       <Drawer.Screen name="TeacherHome" component={TeacherHomeScreen} />
//       <Drawer.Screen name="AdminHome" component={AdminHomeScreen} />
//       <Drawer.Screen name="MasterAdminHome" component={MasterAdminHomeScreen} />
//     </Drawer.Navigator>
//   );
// };

// export default HomeNavigator;
