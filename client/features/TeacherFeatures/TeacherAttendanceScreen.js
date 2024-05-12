import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import TeacherAttendanceViewScreen from "./TeacherAttendanceViewScreen";
import TeacherAttendanceTakingScreen from "./TeacherAttendanceTakingScreen";

const Tab = createMaterialTopTabNavigator();

const TeacherAttendanceScreen = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="View" component={TeacherAttendanceViewScreen} />
      <Tab.Screen name="Taking" component={TeacherAttendanceTakingScreen} />
    </Tab.Navigator>
  );
};

export default TeacherAttendanceScreen;
