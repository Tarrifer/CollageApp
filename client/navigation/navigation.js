import React from "react";

import { createStackNavigator } from "@react-navigation/stack";
import { CommonActions } from "@react-navigation/native";
import { View, Text, TouchableOpacity, Image } from "react-native";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
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
import CalenderScreen from "../features/CalenderScreen";
// import StudentDayTimetableScreen from "../features/StudentFeatures/StudentDayTimetableScreen";
import EventTimetableScreen from "../features/StudentFeatures/EventTimetableScreen";
import StudentSubjectTimetableScreen from "../features/StudentFeatures/StudentSubjectTimetableScreen";
import TeacherAttendanceScreen from "../features/TeacherFeatures/TeacherAttendanceScreen";
import TeacherNoticeScreen from "../features/TeacherFeatures/TeacherNoticeScreen";
import TeacherTimetableScreen from "../features/TeacherFeatures/TeacherTimetableScreen";
import TeacherReportScreen from "../features/TeacherFeatures/TeacherReportScreen";
import AdminAttendanceScreen from "../features/AdminFeatures/AdminAttendanceScreen";
import AdminNoticeScreen from "../features/AdminFeatures/AdminNoticeScreen";
import AdminReportScreen from "../features/AdminFeatures/AdminReportScreen";
import AdminTimetableScreen from "../features/AdminFeatures/AdminTimetableScreen";
import SearchStudentAttendance from "../features/TeacherFeatures/SearchStudentAttendance";
import TeacherAttendanceViewScreen from "../features/TeacherFeatures/TeacherAttendanceViewScreen";
import TeacherAttendanceTakingScreen from "../features/TeacherFeatures/TeacherAttendanceTakingScreen";
import TeacherAttendenceFilterScreen from "../features/TeacherFeatures/TeacherAttendenceFilterScreen";
import TAttendanceScreen from "../features/TeacherFeatures/TAttendanceScreen";
import TeacherSubjectTimetableScreen from "../features/TeacherFeatures/TeacherSubjectTimetableScreen";
import PendingPage from "../pages/General/PendingPage";
import AdminAssignedView from "../features/AdminFeatures/AdminAssignedView";
import AdminAssignSubject from "../features/AdminFeatures/AdminAssignSubject";
import AdminTimetableCreate from "../features/AdminFeatures/AdminTimetableCreate1";
import AdminTimetableView from "../features/AdminFeatures/AdminTimetableView";
import TimetableSlot from "../features/AdminFeatures/TimetableSlot";
import AdminAssignScreen from "../features/AdminFeatures/AdminAssignScreen";
import AdminCustomScrollView from "../features/AdminFeatures/AdminCustomScrollView ";
const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const CustomDrawerContent = (props) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { profilePic, userName, userEmail } = useSelector(
    (state) => state.auth
  );
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
        <View style={{ alignItems: "center", paddingTop: 20 }}>
          <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
            <Image
              source={{
                uri:
                  profilePic ||
                  "https://ps.w.org/user-avatar-reloaded/assets/icon-256x256.png?rev=2540745.jpg",
              }}
              style={{ width: 120, height: 120, borderRadius: 60 }}
            />
          </TouchableOpacity>
          <Text style={{ marginTop: 10, fontSize: 18 }}>{userName}</Text>
          <Text style={{ fontSize: 16, color: "#888" }}>{userEmail}</Text>
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
  const { userType } = useSelector((state) => state.auth);
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
        options={{ title: "Master Reports", headerShown: true }}
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
      {/* <Stack.Screen
        name="StudentDayTimetable"
        component={StudentDayTimetableScreen}
        options={{ title: "Student Day Timetable", headerShown: true }}
      /> */}
      <Stack.Screen
        name="EventTimetable"
        component={EventTimetableScreen}
        options={{ title: "Event Timetable", headerShown: true }}
      />
      <Stack.Screen
        name="StudentSubjectTimetable"
        component={StudentSubjectTimetableScreen}
        options={{ title: "Student Subject", headerShown: true }}
      />
      <Stack.Screen
        name="TeacherAttendance"
        component={TeacherAttendanceScreen}
        options={{ title: "Teacher Attendance", headerShown: true }}
      />
      <Stack.Screen
        name="TAttendance"
        component={TAttendanceScreen}
        options={{ title: "Teacher Attendance Taking", headerShown: true }}
      />
      <Stack.Screen
        name="SearchStudent"
        component={SearchStudentAttendance}
        options={{ title: "SearchStudent", headerShown: true }}
      />
      <Stack.Screen
        name="TeacherAttendanceView"
        component={TeacherAttendanceViewScreen}
        options={{ title: "Teacher Attendance View", headerShown: true }}
      />
      <Stack.Screen
        name="TeacherAttendanceTaking"
        component={TeacherAttendanceTakingScreen}
        options={{ title: "Teacher Attendance Taking", headerShown: true }}
      />
      <Stack.Screen
        name="TeacherAttendenceFilter"
        component={TeacherAttendenceFilterScreen}
        options={{ title: "Teacher Attendance Filter", headerShown: true }}
      />
      <Stack.Screen
        name="TeacherNotice"
        component={TeacherNoticeScreen}
        options={{ title: "Teacher Notice", headerShown: true }}
      />
      <Stack.Screen
        name="TeacherReport"
        component={TeacherReportScreen}
        options={{ title: "Teacher Report", headerShown: true }}
      />
      <Stack.Screen
        name="TeacherTimetable"
        component={TeacherTimetableScreen}
        options={{ title: "Teacher Timetable", headerShown: true }}
      />
      <Stack.Screen
        name="TeacherSubjectTimetable"
        component={TeacherSubjectTimetableScreen}
        options={{ title: "Teacher Timetable", headerShown: true }}
      />
      <Stack.Screen
        name="AdminAttendance"
        component={AdminAttendanceScreen}
        options={{ title: "Admin Attendance", headerShown: true }}
      />
      <Stack.Screen
        name="AdminNotice"
        component={AdminNoticeScreen}
        options={{ title: "Admin Notice", headerShown: true }}
      />
      <Stack.Screen
        name="AdminReport"
        component={AdminReportScreen}
        options={{ title: "Admin Report", headerShown: true }}
      />
      <Stack.Screen
        name="AdminAssignedView"
        component={AdminAssignedView}
        options={{ title: "Admin Timetable", headerShown: true }}
      />
      <Stack.Screen
        name="AdminAttendanceScreen"
        component={AdminAttendanceScreen}
        options={{ title: "Admin Timetable", headerShown: true }}
      />
      <Stack.Screen
        name="AdminAssignSubject"
        component={AdminAssignSubject}
        options={{ title: "Admin Timetable", headerShown: true }}
      />
      <Stack.Screen
        name="AdminAssign"
        component={AdminAssignScreen}
        options={{ title: "Admin Assign", headerShown: true }}
      />
      <Stack.Screen
        name="AdminTimetableCreate"
        component={AdminTimetableCreate}
        options={{ title: "Admin Timetable", headerShown: true }}
      />
      <Stack.Screen
        name="AdminTimetable"
        component={AdminTimetableScreen}
        options={{ title: "Admin Timetable", headerShown: true }}
      />
      <Stack.Screen
        name="AdminTimetableView"
        component={AdminTimetableView}
        options={{ title: "Admin Timetable", headerShown: true }}
      />
      <Stack.Screen
        name="TimetableSlot"
        component={TimetableSlot}
        options={{ title: "Admin Timetable", headerShown: true }}
      />
      <Stack.Screen
        name="CustomScrollView"
        component={AdminCustomScrollView}
        options={{ title: "Admin Timetable Scroll View", headerShown: true }}
      />
      <Stack.Screen
        name="Pending"
        component={PendingPage}
        options={{ title: "Pending...", headerShown: true }}
      />
    </Stack.Navigator>
  );
};
