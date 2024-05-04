import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import {
  StyleSheet,
  View,
  ScrollView,
  Text,
  TouchableOpacity,
} from "react-native";

const Tab = createMaterialTopTabNavigator();

const ApprovalCard = ({
  name,
  school,
  department,
  year,
  status,
  onApprove,
  onView,
  onReject,
}) => {
  return (
    <TouchableOpacity style={styles.card}>
      <Text style={styles.cardText}>Name: {name}</Text>
      <Text style={styles.cardText}>School: {school}</Text>
      <Text style={styles.cardText}>Department: {department}</Text>
      <Text style={styles.cardText}>Year of Admission: {year}</Text>
      <Text style={styles.cardStatus}>Status: {status}</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={onApprove}>
          <Text style={styles.buttonText}>Approve</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={onView}>
          <Text style={styles.buttonText}>View</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={onReject}>
          <Text style={styles.buttonText}>Reject</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

const StudentApprovalScreen = () => {
  // Dummy data for student approval
  const [students, setStudents] = React.useState([
    {
      id: 1,
      name: "John Doe",
      school: "School of Engineering",
      department: "Computer Science",
      year: "2023",
      status: "Pending",
    },
    {
      id: 2,
      name: "Jane Smith",
      school: "School of Medicine",
      department: "Biochemistry",
      year: "2022",
      status: "Approved",
    },
    {
      id: 3,
      name: "Alice Johnson",
      school: "School of Business",
      department: "Finance",
      year: "2024",
      status: "Rejected",
    },
    // Add more student data as needed
  ]);

  const handleApprove = (id) => {
    // Handle approve action
    console.log(`Approved student with ID: ${id}`);
  };

  const handleView = (id) => {
    // Handle view action
    console.log(`View student with ID: ${id}`);
  };

  const handleReject = (id) => {
    // Handle reject action
    console.log(`Rejected student with ID: ${id}`);
    setStudents(students.filter((student) => student.id !== id));
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {students.map((student) => (
        <ApprovalCard
          key={student.id}
          name={student.name}
          school={student.school}
          department={student.department}
          year={student.year}
          status={student.status}
          onApprove={() => handleApprove(student.id)}
          onView={() => handleView(student.id)}
          onReject={() => handleReject(student.id)}
        />
      ))}
    </ScrollView>
  );
};

const TeacherApprovalScreen = () => {
  // Dummy data for teacher approval
  const [teachers, setTeachers] = React.useState([
    {
      id: 1,
      name: "John Doe",
      department: "Mathematics",
      status: "Pending",
    },
    {
      id: 2,
      name: "Jane Smith",
      department: "Physics",
      status: "Approved",
    },
    {
      id: 3,
      name: "Alice Johnson",
      department: "Chemistry",
      status: "Rejected",
    },
    // Add more teacher data as needed
  ]);

  const handleApprove = (id) => {
    // Handle approve action
    console.log(`Approved teacher with ID: ${id}`);
  };

  const handleView = (id) => {
    // Handle view action
    console.log(`View teacher with ID: ${id}`);
  };

  const handleReject = (id) => {
    // Handle reject action
    console.log(`Rejected teacher with ID: ${id}`);
    setTeachers(teachers.filter((teacher) => teacher.id !== id));
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {teachers.map((teacher) => (
        <ApprovalCard
          key={teacher.id}
          name={teacher.name}
          department={teacher.department}
          status={teacher.status}
          onApprove={() => handleApprove(teacher.id)}
          onView={() => handleView(teacher.id)}
          onReject={() => handleReject(teacher.id)}
        />
      ))}
    </ScrollView>
  );
};

const AdminApprovalScreen = () => {
  // Dummy data for admin approval
  const [admins, setAdmins] = React.useState([
    {
      id: 1,
      name: "John Doe",
      status: "Pending",
    },
    {
      id: 2,
      name: "Jane Smith",
      status: "Approved",
    },
    {
      id: 3,
      name: "Alice Johnson",
      status: "Rejected",
    },
    // Add more admin data as needed
  ]);

  const handleApprove = (id) => {
    // Handle approve action
    console.log(`Approved admin with ID: ${id}`);
  };

  const handleView = (id) => {
    // Handle view action
    console.log(`View admin with ID: ${id}`);
  };

  const handleReject = (id) => {
    // Handle reject action
    console.log(`Rejected admin with ID: ${id}`);
    setAdmins(admins.filter((admin) => admin.id !== id));
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {admins.map((admin) => (
        <ApprovalCard
          key={admin.id}
          name={admin.name}
          status={admin.status}
          onApprove={() => handleApprove(admin.id)}
          onView={() => handleView(admin.id)}
          onReject={() => handleReject(admin.id)}
        />
      ))}
    </ScrollView>
  );
};

const RegistrationApprovalTabs = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Student" component={StudentApprovalScreen} />
      <Tab.Screen name="Teacher" component={TeacherApprovalScreen} />
      <Tab.Screen name="Admin" component={AdminApprovalScreen} />
    </Tab.Navigator>
  );
};

const MAdminRegistrationApproval = () => {
  return <RegistrationApprovalTabs />;
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    marginBottom: 10,
    elevation: 3,
  },
  cardText: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  cardStatus: {
    fontSize: 16,
    color: "#007FFF",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  button: {
    backgroundColor: "#6490E8",
    padding: 10,
    borderRadius: 5,
    flex: 1,
    marginHorizontal: 5,
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
  },
});

export default MAdminRegistrationApproval;
