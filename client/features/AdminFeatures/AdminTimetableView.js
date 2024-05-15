import { StyleSheet, Text, View } from "react-native";
import React from "react";

const AdminTimetableView = () => {
  return (
    <View>
      <Text>AdminTimetableView</Text>
    </View>
  );
};

export default AdminTimetableView;

const styles = StyleSheet.create({});
// import React, { useState, useEffect } from "react";
// import {
//   View,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   ScrollView,
//   StyleSheet,
// } from "react-native";
// import { TabView, TabBar } from "react-native-tab-view";
// import moment from "moment";
// // import axios from "axios";

// // import TimetableCard from "./TimetableCard";

// const AdminTimetableView = () => {
//   const [schoolName, setSchoolName] = useState("");
//   const [departmentName, setDepartmentName] = useState("");
//   const [semester, setSemester] = useState("");
//   const [events, setEvents] = useState([]);
//   const [timetable, setTimetable] = useState([]);
//   const [teachers, setTeachers] = useState([]);
//   const [index, setIndex] = useState(0);

//   // useEffect(() => {
//   //   const fetchEvents = async () => {
//   //     try {
//   //       const response = await axios.get(
//   //         "https://your-api-url/calendar/events"
//   //       );
//   //       setEvents(response.data);
//   //     } catch (error) {
//   //       console.error(error);
//   //     }
//   //   };

//   //   const fetchTimetable = async () => {
//   //     try {
//   //       const response = await axios.get(
//   //         "https://your-api-url/timetable"
//   //       );
//   //       setTimetable(response.data);
//   //     } catch (error) {
//   //       console.error(error);
//   //     }
//   //   };

//   //   const fetchTeachers = async () => {
//   //     try {
//   //       const response = await axios.get(
//   //         "https://your-api-url/teachers"
//   //       );
//   //       setTeachers(response.data);
//   //     } catch (error) {
//   //       console.error(error);
//   //     }
//   //   };

//   //   fetchEvents();
//   //   fetchTimetable();
//   //   fetchTeachers();
//   // }, []);

//   const handleFilter = () => {
//     const filteredEvents = events.filter(
//       (event) =>
//         event.title.includes(schoolName) &&
//         event.description.includes(departmentName) &&
//         event.description.includes(semester)
//     );

//     const filteredTimetable = timetable.filter(
//       (timetable) =>
//         timetable.department === departmentName &&
//         timetable.semester === semester
//     );

//     setEvents(filteredEvents);
//     setTimetable(filteredTimetable);
//   };

//   const routes = [
//     { key: "monday", title: "Monday" },
//     { key: "tuesday", title: "Tuesday" },
//     { key: "wednesday", title: "Wednesday" },
//     { key: "thursday", title: "Thursday" },
//     { key: "friday", title: "Friday" },
//   ];

//   const renderTabBar = (props) => (
//     <TabBar
//       {...props}
//       scrollEnabled={false}
//       style={{ backgroundColor: "#fff" }}
//       indicatorStyle={{ backgroundColor: "#007bff" }}
//       tabStyle={{ width: 100 }}
//       labelStyle={{ textAlign: "center" }}
//     />
//   );

//   const renderTabView = ({ navigationState }) => {
//     const dayEvents = events.filter(
//       (event) =>
//         moment(event.startTime).format("dddd") === moment().format("dddd")
//     );

//     const dayTimetable = timetable.filter(
//       (timetable) =>
//         moment(timetable.startTime).format("dddd") === moment().format("dddd")
//     );

//     const dayTeachers = teachers.filter(
//       (teacher) =>
//         moment(teacher.timetable.startTime).format("dddd") ===
//         moment().format("dddd")
//     );

//     return (
//       <View style={styles.container}>
//         <View style={styles.eventNotification}>
//           {dayEvents.length > 0 &&
//             dayEvents.map((event) => (
//               <View key={event.id}>
//                 <Text style={styles.eventName}>{event.title}</Text>
//                 {event.isHoliday ? (
//                   <Text style={styles.eventDescription}>
//                     Institution is closed
//                   </Text>
//                 ) : (
//                   <Text style={styles.eventDescription}>
//                     Regular classes will be held
//                   </Text>
//                 )}
//               </View>
//             ))}
//         </View>
//         <ScrollView style={styles.timetableContainer}>
//           {/* Here, you should map through `dayTimetable` and render `TimetableCard` components */}
//         </ScrollView>
//       </View>
//     );
//   };

//   return (
//     <View style={styles.container}>
//       <View style={styles.filterContainer}>
//         <TextInput
//           style={styles.input}
//           placeholder="School Name"
//           value={schoolName}
//           onChangeText={setSchoolName}
//         />
//         <TextInput
//           style={styles.input}
//           placeholder="Department Name"
//           value={departmentName}
//           onChangeText={setDepartmentName}
//         />
//         <TextInput
//           style={styles.input}
//           placeholder="Semester"
//           value={semester}
//           onChangeText={setSemester}
//         />
//         <TouchableOpacity style={styles.button} onPress={handleFilter}>
//           <Text style={styles.buttonText}>Filter</Text>
//         </TouchableOpacity>
//       </View>
//       <TabView
//         navigationState={{ index, routes }}
//         renderScene={renderTabView}
//         renderTabBar={renderTabBar}
//         onIndexChange={setIndex}
//       />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//   },
//   filterContainer: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     paddingHorizontal: 16,
//     paddingVertical: 8,
//   },
//   input: {
//     width: "30%",
//     height: 40,
//     borderColor: "#ccc",
//     borderWidth: 1,
//     borderRadius: 4,
//     paddingHorizontal: 8,
//   },
//   button: {
//     backgroundColor: "#007bff",
//     paddingVertical: 8,
//     paddingHorizontal: 16,
//     borderRadius: 4,
//   },
//   buttonText: {
//     color: "#fff",
//     fontWeight: "bold",
//   },
//   eventNotification: {
//     padding: 16,
//     backgroundColor: "#f5f5f5",
//   },
//   eventName: {
//     fontSize: 16,
//     fontWeight: "bold",
//   },
//   eventDescription: {
//     fontSize: 14,
//     color: "#666",
//   },
//   timetableContainer: {
//     flex: 1,
//     padding: 16,
//   },
// });

// export default AdminTimetableView;

// // import React, { useState, useEffect } from "react";
// // import {
// //   View,
// //   Text,
// //   TextInput,
// //   TouchableOpacity,
// //   ScrollView,
// //   StyleSheet,
// //   Alert,
// // } from "react-native";
// // import { TabView, TabBar } from "react-native-tab-view";
// // import { CalendarList, CalendarEvent } from "react-native-calendars";
// // import moment from "moment";
// // // import axios from "axios";

// // // import TimetableCard from "./TimetableCard";

// // const AdminTimetableView = () => {
// //   const [schoolName, setSchoolName] = useState("");
// //   const [departmentName, setDepartmentName] = useState("");
// //   const [semester, setSemester] = useState("");
// //   const [events, setEvents] = useState([]);
// //   const [timetable, setTimetable] = useState([]);
// //   const [teachers, setTeachers] = useState([]);
// //   const [index, setIndex] = useState(0);
// //   //   useEffect(() => {
// //   //     const fetchEvents = async () => {
// //   //       try {
// //   //         const response = await axios.get(
// //   //           "https://your-api-url/calendar/events"
// //   //         );
// //   //         setEvents(response.data);
// //   //       } catch (error) {
// //   //         console.error(error);
// //   //       }
// //   //     };

// //   //     const fetchTimetable = async () => {
// //   //       try {
// //   //         const response = await axios.get(
// //   //           "https://your-api-url/timetable"
// //   //         );
// //   //         setTimetable(response.data);
// //   //       } catch (error) {
// //   //         console.error(error);
// //   //       }
// //   //     };

// //   //     const fetchTeachers = async () => {
// //   //       try {
// //   //         const response = await axios.get(
// //   //           "https://your-api-url/teachers"
// //   //         );
// //   //         setTeachers(response.data);
// //   //       } catch (error) {
// //   //         console.error(error);
// //   //       }

// //   //     fetchEvents();
// //   //     fetchTimetable();
// //   //     fetchTeachers();
// //   //   }, [],);

// //   const handleFilter = () => {
// //     const filteredEvents = events.filter(
// //       (event) =>
// //         event.title.includes(schoolName) &&
// //         event.description.includes(departmentName) &&
// //         event.description.includes(semester)
// //     );

// //     const filteredTimetable = timetable.filter(
// //       (timetable) =>
// //         timetable.department === departmentName &&
// //         timetable.semester === semester
// //     );

// //     setEvents(filteredEvents);
// //     setTimetable(filteredTimetable);
// //   };
// //   const routes = [
// //     { key: "monday", title: "Monday" },
// //     { key: "tuesday", title: "Tuesday" },
// //     { key: "wednesday", title: "Wednesday" },
// //     { key: "thursday", title: "Thursday" },
// //     { key: "friday", title: "Friday" },
// //   ];

// //   // const renderTabBar = ({ scrollX }) => (
// //   //   <TabBar
// //   //     scrollEnabled={false}
// //   //     style={{ backgroundColor: "#fff" }}
// //   //     indicatorStyle={{ backgroundColor: "#007bff" }}
// //   //     tabStyle={{ width: 100 }}
// //   //     labelStyle={{ textAlign: "center" }}
// //   //     scrollX={scrollX}
// //   //   >
// //   //     <TabBar.Tab label="Monday" />
// //   //     <TabBar.Tab label="Tuesday" />
// //   //     <TabBar.Tab label="Wednesday" />
// //   //     <TabBar.Tab label="Thursday" />
// //   //     <TabBar.Tab label="Friday" />
// //   //   </TabBar>
// //   // );
// //   const renderTabBar = ({ navigationState }) => (
// //     <TabBar
// //       scrollEnabled={false}
// //       style={{ backgroundColor: "#fff" }}
// //       indicatorStyle={{ backgroundColor: "#007bff" }}
// //       tabStyle={{ width: 100 }}
// //       labelStyle={{ textAlign: "center" }}
// //       navigationState={navigationState} // Pass navigationState
// //     >
// //       {navigationState.routes.map((route, index) => (
// //         <TabBar.Tab key={index} label={route.title} />
// //       ))}
// //     </TabBar>
// //   );
// //   const renderTabView = ({ navigationState }) => {
// //     const { index } = navigationState;

// //     const dayEvents = events.filter(
// //       (event) =>
// //         moment(event.startTime).format("dddd") === moment().format("dddd")
// //     );

// //     const dayTimetable = timetable.filter(
// //       (timetable) =>
// //         moment(timetable.startTime).format("dddd") === moment().format("dddd")
// //     );

// //     const dayTeachers = teachers.filter(
// //       (teacher) =>
// //         moment(teacher.timetable.startTime).format("dddd") ===
// //         moment().format("dddd")
// //     );

// //     return (
// //       <View style={styles.container}>
// //         <View style={styles.eventNotification}>
// //           {dayEvents.length > 0 &&
// //             dayEvents.map((event) => (
// //               <View key={event.id}>
// //                 <Text style={styles.eventName}>{event.title}</Text>
// //                 {event.isHoliday ? (
// //                   <Text style={styles.eventDescription}>
// //                     Institution is closed
// //                   </Text>
// //                 ) : (
// //                   <Text style={styles.eventDescription}>
// //                     Regular classes will be held
// //                   </Text>
// //                 )}
// //               </View>
// //             ))}
// //         </View>
// //         <ScrollView style={styles.timetableContainer}>
// //           {dayTimetable.map((timetable, index) => (
// //             <TimetableCard
// //               key={timetable.id}
// //               duration={timetable.duration}
// //               subjectName={timetable.subjectName}
// //               teacherName={
// //                 dayTeachers.find(
// //                   (teacher) =>
// //                     teacher.timetable.subjectName === timetable.subjectName &&
// //                     teacher.timetable.startTime === timetable.startTime
// //                 )?.teacherName
// //               }
// //             />
// //           ))}
// //         </ScrollView>
// //       </View>
// //     );
// //   };

// //   return (
// //     <View style={styles.container}>
// //       <View style={styles.filterContainer}>
// //         <TextInput
// //           style={styles.input}
// //           placeholder="School Name"
// //           value={schoolName}
// //           onChangeText={setSchoolName}
// //         />
// //         <TextInput
// //           style={styles.input}
// //           placeholder="Department Name"
// //           value={departmentName}
// //           onChangeText={setDepartmentName}
// //         />
// //         <TextInput
// //           style={styles.input}
// //           placeholder="Semester"
// //           value={semester}
// //           onChangeText={setSemester}
// //         />
// //         <TouchableOpacity style={styles.button} onPress={handleFilter}>
// //           <Text style={styles.buttonText}>Filter</Text>
// //         </TouchableOpacity>
// //       </View>
// //       <TabView
// //         navigationState={{ index, routes }}
// //         renderScene={renderTabView}
// //         renderTabBar={renderTabBar}
// //         onIndexChange={setIndex}
// //       />
// //     </View>
// //   );
// // };

// // const styles = StyleSheet.create({
// //   container: {
// //     flex: 1,
// //     backgroundColor: "#fff",
// //   },
// //   filterContainer: {
// //     flexDirection: "row",
// //     justifyContent: "space-between",
// //     paddingHorizontal: 16,
// //     paddingVertical: 8,
// //   },
// //   input: {
// //     width: "30%",
// //     height: 40,
// //     borderColor: "#ccc",
// //     borderWidth: 1,
// //     borderRadius: 4,
// //     paddingHorizontal: 8,
// //   },
// //   button: {
// //     backgroundColor: "#007bff",
// //     paddingVertical: 8,
// //     paddingHorizontal: 16,
// //     borderRadius: 4,
// //   },
// //   buttonText: {
// //     color: "#fff",
// //     fontWeight: "bold",
// //   },
// //   eventNotification: {
// //     padding: 16,
// //     backgroundColor: "#f5f5f5",
// //   },
// //   eventName: {
// //     fontSize: 16,
// //     fontWeight: "bold",
// //   },
// //   eventDescription: {
// //     fontSize: 14,
// //     color: "#666",
// //   },
// //   timetableContainer: {
// //     flex: 1,
// //     padding: 16,
// //   },
// // });

// // export default AdminTimetableView;
