import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { StyleSheet, Text, View, ScrollView } from "react-native";

const Tab = createMaterialTopTabNavigator();

const ReportCard = ({ title }) => {
  return (
    <View style={styles.reportCard}>
      <Text style={styles.reportTitle}>{title}</Text>
    </View>
  );
};

const StudentReportsScreen = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <ReportCard title="Student General Report" />
      <ReportCard title="Student Collage Report" />
      <ReportCard title="Student Department Report" />
      <ReportCard title="Student Subject Report" />
      <ReportCard title="Student TimeTable Report" />
      <ReportCard title="Student Attendance Report" />
      <ReportCard title="Student Calendar Report" />
      <ReportCard title="Student Technical Report" />
      <ReportCard title="Student Non-Technical Report" />
    </ScrollView>
  );
};

const TeacherReportsScreen = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <ReportCard title="Teacher General Report" />
      <ReportCard title="Teacher Collage Report" />
      <ReportCard title="Teacher Department Report" />
      <ReportCard title="Teacher Subject Report" />
      <ReportCard title="Teacher TimeTable Report" />
      <ReportCard title="Teacher Attendance Report" />
      <ReportCard title="Teacher Calendar Report" />
      <ReportCard title="Teacher Technical Report" />
      <ReportCard title="Teacher Non-Technical Report" />
    </ScrollView>
  );
};

const AdminReportsScreen = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <ReportCard title="Admin General Report" />
      <ReportCard title="Admin Collage Report" />
      <ReportCard title="Admin Department Report" />
      <ReportCard title="Admin Subject Report" />
      <ReportCard title="Admin TimeTable Report" />
      <ReportCard title="Admin Attendance Report" />
      <ReportCard title="Admin Calendar Report" />
      <ReportCard title="Admin Technical Report" />
      <ReportCard title="Admin Non-Technical Report" />
    </ScrollView>
  );
};

const MAdminReports = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarLabelStyle: { fontSize: 14, fontWeight: "bold" },
        tabBarIndicatorStyle: { backgroundColor: "white" },
        tabBarStyle: { backgroundColor: "#007FFF" },
      }}
    >
      <Tab.Screen name="Student" component={StudentReportsScreen} />
      <Tab.Screen name="Teacher" component={TeacherReportsScreen} />
      <Tab.Screen name="Admin" component={AdminReportsScreen} />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  reportCard: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    marginBottom: 10,
    elevation: 3,
  },
  reportTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default MAdminReports;

//----------------------------------------------------------------------------------------
// import React from "react";
// import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
// import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from "react-native";

// const Tab = createMaterialTopTabNavigator();

// const ReportCard = ({ title, onPress }) => {
//   return (
//     <TouchableOpacity onPress={onPress} style={styles.reportCard}>
//       <Text style={styles.reportTitle}>{title}</Text>
//     </TouchableOpacity>
//   );
// };

// const StudentReportsScreen = ({ navigation }) => {
//   const handlePress = (title) => {
//     // Navigate to a different page based on the report title
//     navigation.navigate("ReportDetails", { title });
//   };

//   return (
//     <ScrollView contentContainerStyle={styles.container}>
//       <ReportCard title="Student General Report" onPress={() => handlePress("Student General Report")} />
//       <ReportCard title="Student Collage Report" onPress={() => handlePress("Student Collage Report")} />
//       <ReportCard title="Student Department Report" onPress={() => handlePress("Student Department Report")} />
//       <ReportCard title="Student Subject Report" onPress={() => handlePress("Student Subject Report")} />
//       <ReportCard title="Student TimeTable Report" onPress={() => handlePress("Student TimeTable Report")} />
//       <ReportCard title="Student Attendance Report" onPress={() => handlePress("Student Attendance Report")} />
//       <ReportCard title="Student Calendar Report" onPress={() => handlePress("Student Calendar Report")} />
//       <ReportCard title="Student Technical Report" onPress={() => handlePress("Student Technical Report")} />
//       <ReportCard title="Student Non-Technical Report" onPress={() => handlePress("Student Non-Technical Report")} />
//     </ScrollView>
//   );
// };

// const TeacherReportsScreen = ({ navigation }) => {
//   const handlePress = (title) => {
//     // Navigate to a different page based on the report title
//     navigation.navigate("ReportDetails", { title });
//   };

//   return (
//     <ScrollView contentContainerStyle={styles.container}>
//       <ReportCard title="Teacher General Report" onPress={() => handlePress("Teacher General Report")} />
//       <ReportCard title="Teacher Collage Report" onPress={() => handlePress("Teacher Collage Report")} />
//       <ReportCard title="Teacher Department Report" onPress={() => handlePress("Teacher Department Report")} />
//       <ReportCard title="Teacher Subject Report" onPress={() => handlePress("Teacher Subject Report")} />
//       <ReportCard title="Teacher TimeTable Report" onPress={() => handlePress("Teacher TimeTable Report")} />
//       <ReportCard title="Teacher Attendance Report" onPress={() => handlePress("Teacher Attendance Report")} />
//       <ReportCard title="Teacher Calendar Report" onPress={() => handlePress("Teacher Calendar Report")} />
//       <ReportCard title="Teacher Technical Report" onPress={() => handlePress("Teacher Technical Report")} />
//       <ReportCard title="Teacher Non-Technical Report" onPress={() => handlePress("Teacher Non-Technical Report")} />
//     </ScrollView>
//   );
// };

// const AdminReportsScreen = ({ navigation }) => {
//   const handlePress = (title) => {
//     // Navigate to a different page based on the report title
//     navigation.navigate("ReportDetails", { title });
//   };

//   return (
//     <ScrollView contentContainerStyle={styles.container}>
//       <ReportCard title="Admin General Report" onPress={() => handlePress("Admin General Report")} />
//       <ReportCard title="Admin Collage Report" onPress={() => handlePress("Admin Collage Report")} />
//       <ReportCard title="Admin Department Report" onPress={() => handlePress("Admin Department Report")} />
//       <ReportCard title="Admin Subject Report" onPress={() => handlePress("Admin Subject Report")} />
//       <ReportCard title="Admin TimeTable Report" onPress={() => handlePress("Admin TimeTable Report")} />
//       <ReportCard title="Admin Attendance Report" onPress={() => handlePress("Admin Attendance Report")} />
//       <ReportCard title="Admin Calendar Report" onPress={() => handlePress("Admin Calendar Report")} />
//       <ReportCard title="Admin Technical Report" onPress={() => handlePress("Admin Technical Report")} />
//       <ReportCard title="Admin Non-Technical Report" onPress={() => handlePress("Admin Non-Technical Report")} />
//     </ScrollView>
//   );
// };

// const MAdminReports = () => {
//   return (
//     <Tab.Navigator
//       screenOptions={{
//         tabBarLabelStyle: { fontSize: 14, fontWeight: "bold" },
//         tabBarIndicatorStyle: { backgroundColor: "white" },
//         tabBarStyle: { backgroundColor: "#007FFF" },
//       }}
//     >
//       <Tab.Screen name="Student" component={StudentReportsScreen} />
//       <Tab.Screen name="Teacher" component={TeacherReportsScreen} />
//       <Tab.Screen name="Admin" component={AdminReportsScreen} />
//     </Tab.Navigator>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     padding: 20,
//   },
//   reportCard: {
//     backgroundColor: "#fff",
//     borderRadius: 10,
//     padding: 20,
//     marginBottom: 10,
//     elevation: 3,
//   },
//   reportTitle: {
//     fontSize: 18,
//     fontWeight: "bold",
//   },
// });

// export default MAdminReports;
