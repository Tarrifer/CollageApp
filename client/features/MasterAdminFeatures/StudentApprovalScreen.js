import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import {
  StyleSheet,
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
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
  onDelete,
}) => {
  const getStatusColor = (status) => {
    switch (status) {
      case "Pending":
        return "#007FFF"; // Blue color for pending status
      case "Approved":
        return "green"; // Green color for approved status
      case "Rejected":
        return "red"; // Red color for rejected status
      default:
        return "#000"; // Default black color
    }
  };
  const navigation = useNavigation();
  return (
    <TouchableOpacity style={styles.card}>
      <Text style={styles.cardText}>Name: {name}</Text>
      <Text style={styles.cardText}>School: {school}</Text>
      <Text style={styles.cardText}>Department: {department}</Text>
      <Text style={styles.cardText}>Year of Admission: {year}</Text>
      <Text
        style={[
          styles.cardStatus,
          { color: getStatusColor(status) }, // Set text color based on status
        ]}
      >
        Status: {status}
      </Text>
      <View style={styles.buttonContainer}>
        {status === "Pending" && (
          <>
            <TouchableOpacity
              style={[styles.button, { backgroundColor: "green" }]}
              onPress={() => {
                Alert.alert(
                  "Confirm Approval",
                  "Are you sure you want to approve?",
                  [
                    {
                      text: "No",
                      style: "cancel",
                    },
                    {
                      text: "Yes",
                      onPress: onApprove,
                    },
                  ]
                );
              }}
            >
              <Text style={styles.buttonText}>Approve</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, { backgroundColor: "#6490E8" }]}
              onPress={onView}
            >
              <Text
                onPress={() => {
                  onView();
                  navigation.navigate("CandidateDetailsViewScreen", {
                    name,
                    school,
                    department,
                    year,
                    status,
                  });
                }}
                style={styles.buttonText}
              >
                View
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, { backgroundColor: "red" }]}
              onPress={() => {
                Alert.alert(
                  "Confirm Approval",
                  "Are you sure you want to reject?",
                  [
                    {
                      text: "No",
                      style: "cancel",
                    },
                    {
                      text: "Yes",
                      onPress: onReject,
                    },
                  ]
                );
              }}
            >
              <Text style={styles.buttonText}>Reject</Text>
            </TouchableOpacity>
          </>
        )}
        {(status === "Approved" || status === "Rejected") && (
          <>
            <TouchableOpacity
              style={[styles.button, { backgroundColor: "#6490E8" }]}
              onPress={onView}
            >
              <Text
                onPress={() => {
                  onView();
                  navigation.navigate("CandidateDetailsViewScreen", {
                    name,
                    school,
                    department,
                    year,
                    status,
                  });
                }}
                style={styles.buttonText}
              >
                View
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, { backgroundColor: "red" }]}
              onPress={onDelete}
            >
              <Text style={styles.buttonText}>Delete</Text>
            </TouchableOpacity>
          </>
        )}
      </View>
    </TouchableOpacity>
  );
};

const PendingApproval = () => {
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
      status: "Pending",
    },
    {
      id: 3,
      name: "Alice Johnson",
      school: "School of Business",
      department: "Finance",
      year: "2024",
      status: "Pending",
    },
    // Add more student data as needed
  ]);

  const handleApprove = (id) => {
    // Handle approve action
    console.log(`Approved student with ID: ${id}`);
    setStudents(students.filter((student) => student.id !== id));
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

const AcceptedApproval = () => {
  // Dummy data for teacher approval
  const [teachers, setTeachers] = React.useState([
    {
      id: 1,
      name: "John Doe",
      department: "Mathematics",
      status: "Approved",
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
      status: "Approved",
    },
    // Add more teacher data as needed
  ]);

  const handleView = (id) => {
    // Handle view action
    console.log(`View teacher with ID: ${id}`);
  };

  const handleDelete = (id) => {
    // Handle delete action
    console.log(`Deleted teacher with ID: ${id}`);
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
          onView={() => handleView(teacher.id)}
          onDelete={() => handleDelete(teacher.id)}
        />
      ))}
    </ScrollView>
  );
};

const RejectedApproval = () => {
  // Dummy data for admin approval
  const [admins, setAdmins] = React.useState([
    {
      id: 1,
      name: "John Doe",
      status: "Rejected",
    },
    {
      id: 2,
      name: "Jane Smith",
      status: "Rejected",
    },
    {
      id: 3,
      name: "Alice Johnson",
      status: "Rejected",
    },
    // Add more admin data as needed
  ]);

  const handleView = (id) => {
    // Handle view action
    console.log(`View admin with ID: ${id}`);
  };

  const handleDelete = (id) => {
    // Handle delete action
    console.log(`Deleted admin with ID: ${id}`);
    setAdmins(admins.filter((admin) => admin.id !== id));
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {admins.map((admin) => (
        <ApprovalCard
          key={admin.id}
          name={admin.name}
          status={admin.status}
          onView={() => handleView(admin.id)}
          onDelete={() => handleDelete(admin.id)}
        />
      ))}
    </ScrollView>
  );
};

const RegistrationApprovalTabs = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Pending" component={PendingApproval} />
      <Tab.Screen name="Accepted" component={AcceptedApproval} />
      <Tab.Screen name="Rejected" component={RejectedApproval} />
    </Tab.Navigator>
  );
};

const StudentApprovalScreen = () => {
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
    marginBottom: 5,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  button: {
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

export default StudentApprovalScreen;
