import React, { useState } from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import TeacherAttendanceTakingScreen from "./TeacherAttendanceTakingScreen";
import TeacherAttendenceFilterScreen from "./TeacherAttendenceFilterScreen";
import { ScrollView } from "react-native-gesture-handler";
import StudentAttendanceData from "../../database/StudentAttendance.json";

const Tab = createMaterialTopTabNavigator();

const TAttendanceScreen = () => {
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [allStudents, setAllStudents] = useState(StudentAttendanceData);

  const handleFetchStudents = ({ semester, department, subject }) => {
    const filteredData = StudentAttendanceData.filter(
      (student) =>
        student.semester === semester &&
        student.departmentName === department &&
        student.subjectName === subject
    );
    setFilteredStudents(filteredData);
  };

  const handleSubmitAttendance = (attendanceData) => {
    console.log("Attendance data submitted:", attendanceData);
  };
  const [filterOptions, setFilterOptions] = useState({
    semester: "",
    department: "",
    subject: "",
    studentName: "",
  });

  const handleFilter = (selectedFilter) => {
    setFilterOptions(selectedFilter);
  };
  return (
    <ScrollView>
      <TeacherAttendenceFilterScreen onFetchStudents={handleFetchStudents} />
      <TeacherAttendanceTakingScreen
        filteredStudents={filteredStudents}
        onSubmitAttendance={handleSubmitAttendance}
      />
    </ScrollView>
  );
};

export default TAttendanceScreen;
