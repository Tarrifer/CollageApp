import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import AdminTimetableCreate from "./AdminTimetableCreate1";
import AdminTimetableView from "./AdminTimetableView";

const Tab = createMaterialTopTabNavigator();

function AdminTimetableScreen() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarLabelStyle: styles.tabLabel,
        tabBarStyle: styles.tab,
      }}
    >
      <Tab.Screen
        name="AdminTimetableCreate"
        component={AdminTimetableCreate}
        options={{
          tabBarLabel: "Create Timetable",
        }}
      />
      <Tab.Screen
        name="AdminTimetableView"
        component={AdminTimetableView}
        options={{
          tabBarLabel: "View Timetable",
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

export default AdminTimetableScreen;

// // AdminTimetable.js
// import React from "react";
// import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
// import AdminTimetableCreate from "./AdminTimetableCreate";
// import AdminTimetableView from "./AdminTimetableView";
// import AdminAssignSubject from "./AdminAssignSubject";
// import AdminAssignedView from "./AdminAssignedView";
// import { StyleSheet, Text, View } from "react-native";

// const Tab = createMaterialTopTabNavigator();

// const AdminTimetableScreen = () => {
//   return (
//     <Tab.Navigator
//       screenOptions={{
//         tabBarActiveTintColor: "blue",
//         tabBarInactiveTintColor: "gray",
//         tabBarLabelStyle: {
//           fontSize: 16,
//           fontWeight: "bold",
//         },
//         tabBarStyle: styles.tabBar,
//         tabBarIndicatorStyle: {
//           backgroundColor: "blue",
//         },
//       }}
//     >
//       <Tab.Screen name="Create" component={AdminTimetableCreate} />
//       <Tab.Screen name="View" component={AdminTimetableView} />
//       <Tab.Screen name="Assign" component={AdminAssignSubject} />
//       <Tab.Screen name="Assigned" component={AdminAssignedView} />
//     </Tab.Navigator>
//   );
// };

// const styles = StyleSheet.create({
//   tabBar: {
//     backgroundColor: "#f0f0f0",
//   },
// });

// export default AdminTimetableScreen;
