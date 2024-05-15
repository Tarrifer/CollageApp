import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import AdminAssignSubject from "./AdminAssignSubject";
import AdminAssignedView from "./AdminAssignedView";
// import teacherData from "../../database/Batch.json";
const Tab = createMaterialTopTabNavigator();

function AdminAssignScreen() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarLabelStyle: styles.tabLabel,
        tabBarStyle: styles.tab,
      }}
    >
      <Tab.Screen
        name="AdminAssignSubject"
        // teachers={teacherData}
        component={AdminAssignSubject}
        options={{
          tabBarLabel: "Assign Subjects",
        }}
      />
      <Tab.Screen
        name="AdminAssignedView"
        component={AdminAssignedView}
        options={{
          tabBarLabel: "Assign View",
        }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  tab: {
    backgroundColor: "gold",
  },
  tabButton: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  tabText: {
    color: "#000000",
    fontWeight: "bold",
  },
});

export default AdminAssignScreen;
