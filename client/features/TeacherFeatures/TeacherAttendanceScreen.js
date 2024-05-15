import React, { useState } from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import TeacherAttendanceViewScreen from "./TeacherAttendanceViewScreen";
// import TeacherAttendanceTakingScreen from "./TeacherAttendanceTakingScreen";
// import studentsData from "../../database/StudentAttendance.json";
import TAttendanceScreen from "./TAttendanceScreen";
const Tab = createMaterialTopTabNavigator();

const TeacherAttendanceScreen = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="View" component={TeacherAttendanceViewScreen} />
      {/* <Tab.Screen name="Taking" component={TAttendanceScreen} /> */}
    </Tab.Navigator>
  );
};

export default TeacherAttendanceScreen;

// import React, { useState } from "react";
// import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
// import TeacherAttendanceViewScreen from "./TeacherAttendanceViewScreen";
// import TeacherAttendanceTakingScreen from "./TeacherAttendanceTakingScreenNew";
// import studentsData from "../../database/StudentAttendance.json";
// import TAttendanceScreen from "./TAttendanceScreenNew";
// const Tab = createMaterialTopTabNavigator();

// const TeacherAttendanceScreen = () => {
//   const [filteredStudents, setFilteredStudents] = useState(studentsData);

//   const applyFilter = (selectedFilter) => {
//     // Filter the students based on the selected filter
//     const filteredStudents = studentsData.filter((student) => {
//       if (
//         !selectedFilter.semester &&
//         !selectedFilter.department &&
//         !selectedFilter.subject &&
//         !selectedFilter.studentName
//       ) {
//         return true;
//       }
//       if (
//         selectedFilter.semester &&
//         student.semester !== selectedFilter.semester
//       ) {
//         return false;
//       }
//       if (
//         selectedFilter.department &&
//         student.departmentName !== selectedFilter.department
//       ) {
//         return false;
//       }
//       if (
//         selectedFilter.subject &&
//         student.subjectName !== selectedFilter.subject
//       ) {
//         return false;
//       }
//       if (
//         selectedFilter.studentName &&
//         student.studentName !== selectedFilter.studentName
//       ) {
//         return false;
//       }
//       return true;
//     });

//     setFilteredStudents(filteredStudents);
//   };

//   return (
//     <Tab.Navigator>
//       <Tab.Screen name="View" component={TeacherAttendanceViewScreen} />
//       {/* <Tab.Screen name="Taking">
//         {() => (
//           <TeacherAttendanceTakingScreen
//             filteredStudents={filteredStudents}
//             students={studentsData}
//             applyFilter={applyFilter} // Make sure applyFilter is defined and passed correctly
//           />
//         )}
//       </Tab.Screen> */}
//       <Tab.Screen name="Taking" component={TAttendanceScreen} />
//     </Tab.Navigator>
//   );
// };

// export default TeacherAttendanceScreen;
