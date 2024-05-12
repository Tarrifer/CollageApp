import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

const AdminAssignedView = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [assignments, setAssignments] = useState([]);
  const [filteredAssignments, setFilteredAssignments] = useState([]);

  useEffect(() => {
    const fetchAssignments = async () => {
      try {
        const response = await axios.get("https://your-api-url/assignments");
        setAssignments(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchAssignments();
  }, []);

  const handleSearch = (query) => {
    setSearchQuery(query);
    const filteredAssignments = assignments.filter((assignment) => {
      const teacherName = assignment.teacher.name.toLowerCase();
      const department = assignment.teacher.departmentName.toLowerCase();
      const semester = assignment.semester.toLowerCase();
      const queryLowercase = query.toLowerCase();
      return (
        teacherName.includes(queryLowercase) ||
        department.includes(queryLowercase) ||
        semester.includes(queryLowercase)
      );
    });
    setFilteredAssignments(filteredAssignments);
  };

  const renderAssignment = ({ item }) => {
    const { teacher, semester, subject } = item;
    return (
      <View style={styles.assignmentCard}>
        <View style={styles.cardContainer}>
          <Text style={styles.cardTitle}>{teacher.name}</Text>
          <View style={styles.cardSubjects}>
            <Text style={styles.cardSubjectText}>
              {subject.name} ({subject.credits} credits)
            </Text>
          </View>
          <Text style={styles.cardSemester}>{semester}</Text>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="Search by teacher name, department, or semester"
        value={searchQuery}
        onChangeText={handleSearch}
      />
      <FlatList
        data={filteredAssignments.length > 0 ? filteredAssignments : assignments}
        renderItem={renderAssignment}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 16,
  },
  searchInput: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 4,
    paddingHorizontal: 8,
    marginBottom: 16,
  },
  assignmentCard: {
    marginBottom: 16,
  },
  cardContainer: {
    backgroundColor: "#f5f5f5",
    padding: 16,
    borderRadius: 4,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  cardSubjects: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  cardSubject: {
    backgroundColor: "#ddd",
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 4,
    marginRight: 8,
    marginBottom: 8,
  },
  cardSubjectText: {
    fontSize: 14,
    color: "#333",
  },
  cardSemester: {
    fontSize: 14,
    color: "#333",
    marginTop: 8,
  },
});

export default AdminAssignedView;