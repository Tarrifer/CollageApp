import React, { useState } from "react";
import { ScrollView } from "react-native";
import TeacherAttendanceTakingScreen from "./TeacherAttendanceTakingScreenNew";
import TeacherAttendanceFilterScreen from "./TeacherAttendenceFilterScreenNew"; // Typo corrected: "TeacherAttendanceFilterScreen"
import studentsData from "../../database/StudentAttendance.json";

const TAttendanceScreen = () => {
  const [filteredStudents, setFilteredStudents] = useState(studentsData);

  const applyFilter = (selectedFilter) => {
    // Filter the students based on the selected filter
    const filteredStudents = studentsData.filter((student) => {
      if (
        !selectedFilter.semester &&
        !selectedFilter.department &&
        !selectedFilter.subject &&
        !selectedFilter.studentName
      ) {
        return true;
      }
      if (
        selectedFilter.semester &&
        student.semester !== selectedFilter.semester
      ) {
        return false;
      }
      if (
        selectedFilter.department &&
        student.departmentName !== selectedFilter.department
      ) {
        return false;
      }
      if (
        selectedFilter.subject &&
        student.subjectName !== selectedFilter.subject
      ) {
        return false;
      }
      if (
        selectedFilter.studentName &&
        student.studentName !== selectedFilter.studentName
      ) {
        return false;
      }
      return true;
    });

    setFilteredStudents(filteredStudents);
  };

  return (
    <ScrollView>
      <TeacherAttendanceFilterScreen applyFilter={applyFilter} />
      <TeacherAttendanceTakingScreen
        filteredStudents={filteredStudents}
        students={studentsData}
        applyFilter={applyFilter}
      />
    </ScrollView>
  );
};

export default TAttendanceScreen;
