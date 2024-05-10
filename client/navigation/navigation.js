import React from "react";

import { createStackNavigator } from "@react-navigation/stack";
// import { NavigationContainer } from "@react-navigation/native";
import { CommonActions } from "@react-navigation/native";
import { View, Text, TouchableOpacity, Image } from "react-native";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerContent,
} from "@react-navigation/drawer";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../context/actions/authActions";
import LoginPage from "../pages/General/LoginPage";
import SignupPage from "../pages/General/SignupPage";
import OTPVerificationPage from "../pages/General/OTPVerificationPage";
import StudentHomePage from "../pages/Student/StudentHomePage";
import TeacherHomePage from "../pages/Teacher/TeacherHomePage";
import AdminHomePage from "../pages/Admin/AdminHomePage";
import MasterAdminHomePage from "../pages/MasterAdmin/MasterAdminHomePage";
import ForgotPasswordPage from "../pages/General/ForgotPasswordPage";
import NotificationScreen from "../components/NotificationScreen";
import GeneralNotificationScreen from "../components/GeneralNotificationScreen";
import TechnicalNotificationScreen from "../components/TechnicalNotificationScreen";
import NonTechnicalNotificationScreen from "../components/NonTechnicalNotificationScreen";
import MAdminDataBaseCreation from "../features/MasterAdminFeatures/MAdminDataBaseCreation";
import MAdminCalendarCreation from "../features/MasterAdminFeatures/MAdminCalendarCreation";
import MAdminERPLink from "../features/MasterAdminFeatures/MAdminERPLink";
import MAdminMonitoring from "../features/MasterAdminFeatures/MAdminMonitoring";
import MAdminOnlineLibrary from "../features/MasterAdminFeatures/MAdminOnlineLibrary";
import MAdminRegistrationApproval from "../features/MasterAdminFeatures/MAdminRegistrationApproval";
import MAdminReports from "../features/MasterAdminFeatures/MAdminReports";
import MACustomization from "../features/MasterAdminFeatures/MACustomization";
import MAdminCreationScreen from "../features/MasterAdminFeatures/MAdminCreationScreen";
import MAdminViewScreen from "../features/MasterAdminFeatures/MAdminViewScreen";
import SearchUser from "../components/SearchUser";
import StudentApprovalScreen from "../features/MasterAdminFeatures/StudentApprovalScreen";
import TeacherApprovalScreen from "../features/MasterAdminFeatures/TeacherApprovalScreen";
import AdminApprovalScreenM from "../features/MasterAdminFeatures/AdminApprovalScreenM";
import CandidateDetailsViewScreen from "../features/MasterAdminFeatures/CandidateDetailsViewScreen";
import StudentAttendanceScreen from "../features/StudentFeatures/StudentAttendanceScreen";
import StudentERPScreen from "../features/StudentFeatures/StudentERPScreen";
import StudentTimetableScreen from "../features/StudentFeatures/StudentTimetableScreen";
import StudentReportScreen from "../features/StudentFeatures/StudentReportScreen";
import OnlineLibraryScreen from "../features/OnlineLibraryScreen";
import SettingsScreen from "../screens/SettingsScreen";
import ProfileScreen from "../screens/ProfileScreen";
import FeedbackScreen from "../screens/FeedbackScreen";
// import CalenderScreen from "../features/CalenderScreen";
import CalenderScreen from "../features/CalenderScreen";
const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const CustomDrawerContent = (props) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { profile } = useSelector((state) => state.auth);
  const { profilePic } = props;

  const handleLogout = () => {
    dispatch(logout());
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: "Login" }],
      })
    );
  };
  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView {...props}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            padding: 20,
            backgroundColor: "#f6f6f6",
            marginBottom: 20,
          }}
        >
          <View>
            {/* <Text>{profile.fullname}</Text>
            <Text>{profile.email}</Text> */}
            <Text>Rahul Das</Text>
            <Text>rahuldasnew2002@gmail.com</Text>
          </View>
          <Image
            source={{
              uri:
                profilePic ||
                "https://ps.w.org/user-avatar-reloaded/assets/icon-256x256.png?rev=2540745.jpg", // Use profilePic here
            }}
            style={{ width: 60, height: 60, borderRadius: 30 }}
          />
        </View>
        <DrawerItemList {...props} />
      </DrawerContentScrollView>
      <TouchableOpacity
        style={{
          position: "absolute",
          right: 0,
          left: 0,
          bottom: 50,
          backgroundColor: "#f6f6f6",
          padding: 20,
        }}
        onPress={handleLogout}
      >
        <Text>Log Out</Text>
      </TouchableOpacity>
    </View>
  );
};

export const MainDrawerNavigator = () => {
  const { userType, profilePic } = useSelector((state) => state.auth);
  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: false,
        headerStyle: {
          backgroundColor: "transparent",
          elevation: 0,
          shadowOpacity: 0,
        },
        headerTitle: "",
      }}
      drawerContent={(props) => <CustomDrawerContent {...props} />}
    >
      {/* <Drawer.Screen name="Home" component={HomeStackNavigator} /> */}
      {/* <Drawer.Screen name="Home" component={getHomeScreen(userType)} /> */}
      <Drawer.Screen
        name="Home"
        component={
          userType === "Student"
            ? StudentHomePage
            : userType === "Teacher"
            ? TeacherHomePage
            : userType === "Admin"
            ? AdminHomePage
            : MasterAdminHomePage
        }
      />
      <Drawer.Screen
        component={ProfileScreen}
        name="Profile"
        options={{ title: "Profile", headerShown: true }}
      />
      <Drawer.Screen
        component={FeedbackScreen}
        name="Feedback"
        options={{ title: "Feedback", headerShown: true }}
      />
      <Drawer.Screen
        component={SettingsScreen}
        name="Settings"
        options={{ title: "Settings", headerShown: true }}
      />
    </Drawer.Navigator>
  );
};

export const AuthStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Login" component={LoginPage} />
      <Stack.Screen name="OTPVerification" component={OTPVerificationPage} />
      <Stack.Screen name="Register" component={SignupPage} />
      <Stack.Screen name="ForgotPassword" component={ForgotPasswordPage} />
      <Stack.Screen name="MainDrawer" component={MainDrawerNavigator} />

      <Stack.Screen
        name="Notification"
        component={NotificationScreen}
        options={{ title: "Notification", headerShown: true }}
      />
      <Stack.Screen
        name="GeneralNotification"
        component={GeneralNotificationScreen}
        options={{ title: "General Notification", headerShown: false }}
      />
      <Stack.Screen
        name="TechnicalNotification"
        component={TechnicalNotificationScreen}
        options={{ title: "Technical Notification", headerShown: false }}
      />
      <Stack.Screen
        name="NonTechnicalNotification"
        component={NonTechnicalNotificationScreen}
        options={{
          title: "Non-Technical Notification",
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="DataBaseCreation"
        component={MAdminDataBaseCreation}
        options={{ title: "Database Creation", headerShown: false }}
      />
      <Stack.Screen
        name="CalendarCreation"
        component={MAdminCalendarCreation}
        options={{ title: "Calendar Creation", headerShown: false }}
      />
      <Stack.Screen
        name="ERPLink"
        component={MAdminERPLink}
        options={{ title: "ERP Link", headerShown: false }}
      />
      <Stack.Screen
        name="Monitoring"
        component={MAdminMonitoring}
        options={{ title: "Monitoring", headerShown: false }}
      />
      <Stack.Screen
        name="MasterOnlineLibrary"
        component={MAdminOnlineLibrary}
        options={{ title: "Online Library", headerShown: false }}
      />
      <Stack.Screen
        name="RegistrationApproval"
        component={MAdminRegistrationApproval}
        options={{ title: "Registration Approval", headerShown: true }}
      />
      <Stack.Screen
        name="StudentApproval"
        component={StudentApprovalScreen}
        options={{ title: "Student Approval Screen", headerShown: true }}
      />
      <Stack.Screen
        name="TeacherApproval"
        component={TeacherApprovalScreen}
        options={{ title: "Teacher Approval Screen", headerShown: true }}
      />
      <Stack.Screen
        name="AdminApproval"
        component={AdminApprovalScreenM}
        options={{ title: "Admin Approval Screen", headerShown: true }}
      />
      <Stack.Screen
        name="MasterReports"
        component={MAdminReports}
        options={{ title: "Master Reports", headerShown: false }}
      />
      <Stack.Screen
        name="Customization"
        component={MACustomization}
        options={{ title: "Customization", headerShown: true }}
      />
      <Stack.Screen
        name="CreationScreen"
        component={MAdminCreationScreen}
        options={{ title: "Creation Screen", headerShown: false }}
      />
      <Stack.Screen
        name="ViewScreen"
        component={MAdminViewScreen}
        options={{ title: "View Screen", headerShown: false }}
      />
      <Stack.Screen
        name="CandidateDetailsViewScreen"
        component={CandidateDetailsViewScreen}
        options={{ title: "View Screen", headerShown: false }}
      />

      <Stack.Screen
        name="Search"
        component={SearchUser}
        options={{ title: "Search", headerShown: true }}
      />
      <Stack.Screen
        name="StudentAttendance"
        component={StudentAttendanceScreen}
        options={{ title: "Student Attendance", headerShown: true }}
      />
      <Stack.Screen
        name="Calender"
        component={CalenderScreen}
        options={{ title: "Calender", headerShown: true }}
      />
      <Stack.Screen
        name="StudentERP"
        component={StudentERPScreen}
        options={{ title: "Student ERP", headerShown: true }}
      />
      <Stack.Screen
        name="OnlineLibrary"
        component={OnlineLibraryScreen}
        options={{ title: "Online Library", headerShown: true }}
      />
      <Stack.Screen
        name="StudentReport"
        component={StudentReportScreen}
        options={{ title: "Student Report", headerShown: true }}
      />
      <Stack.Screen
        name="StudentTimetable"
        component={StudentTimetableScreen}
        options={{ title: "Student Timetable", headerShown: true }}
      />
    </Stack.Navigator>
  );
};
