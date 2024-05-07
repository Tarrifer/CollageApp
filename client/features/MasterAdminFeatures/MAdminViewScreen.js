import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  TextInput,
  StyleSheet,
  Alert,
  TouchableOpacity,
} from "react-native";

const MAdminMAdminViewScreen = () => {
  const initialCourseType = "UG";
  const initialSchool = "School 1";
  const initialDepartment = "Department 1";
  const initialSemesterCount = 3;
  const initialSemestersData = [
    {
      semesterNumber: 1,
      subjects: [
        {
          name: "Subject 1",
          code: "S001",
          credits: "3",
          type: "Core",
        },
        {
          name: "Subject 2",
          code: "S002",
          credits: "4",
          type: "Elective",
        },
      ],
    },
    {
      semesterNumber: 2,
      subjects: [
        {
          name: "Subject 3",
          code: "S003",
          credits: "3",
          type: "Core",
        },
        {
          name: "Subject 4",
          code: "S004",
          credits: "4",
          type: "Elective",
        },
      ],
    },
    {
      semesterNumber: 3,
      subjects: [
        {
          name: "Subject 5",
          code: "S005",
          credits: "3",
          type: "Core",
        },
        {
          name: "Subject 6",
          code: "S006",
          credits: "4",
          type: "Elective",
        },
      ],
    },
  ];

  const [cards, setCards] = useState([]);
  const [filter, setFilter] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [semesters, setSemesters] = useState([]);
  const [initialSemesters, setInitialSemesters] = useState([]);
  const [courseType, setLocalCourseType] = useState(initialCourseType);
  const [school, setLocalSchool] = useState(initialSchool);
  const [department, setLocalDepartment] = useState(initialDepartment);
  const [semesterCount, setLocalSemesterCount] = useState(initialSemesterCount);

  const handleDeleteCard = (id) => {
    Alert.alert("Delete Card", "Are you sure you want to delete this card?", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Delete",
        onPress: () => {
          setCards(cards.filter((card) => card.id !== id));
        },
      },
    ]);
  };

  const handleDeleteSubject = (semesterIndex, subjectIndex) => {
    const updatedSemesters = [...semesters];
    updatedSemesters[semesterIndex].subjects.splice(subjectIndex, 1);
    setSemesters(updatedSemesters);
  };

  const handleDeleteSemester = (semesterIndex) => {
    const updatedSemesters = [...semesters];
    updatedSemesters.splice(semesterIndex, 1);
    setSemesters(updatedSemesters);
  };

  const handleAddSubject = (semesterIndex) => {
    const updatedSemesters = [...semesters];
    updatedSemesters[semesterIndex].subjects.push({
      name: "",
      code: "",
      credits: "",
      type: "",
    });
    setSemesters(updatedSemesters);
  };

  const handleAddSemester = () => {
    const newSemester = {
      semesterNumber: semesters.length + 1,
      subjects: [{ name: "", code: "", credits: "", type: "" }],
    };
    setSemesters([...semesters, newSemester]);
  };

  useEffect(() => {
    setCards([
      {
        id: 1,
        courseType: initialCourseType,
        school: initialSchool,
        department: initialDepartment,
        semesterCount: initialSemesterCount,
        semesters: initialSemestersData,
      },
    ]);
    setSemesters(initialSemestersData);
    setInitialSemesters(initialSemestersData);
  }, []);
  const handleEdit = () => {
    setIsEditing(true);

    setInitialSemesters([...semesters]);
  };
  const handleSave = () => {
    setIsEditing(false);

    setCards((prevCards) =>
      prevCards.map((card) => {
        if (card.id === 1) {
          return {
            ...card,
            courseType,
            school,
            department,
            semesterCount,
            semesters,
          };
        }
        return card;
      })
    );
  };

  const handleFilter = () => {
    // Filter cards based on school or department
    if (!filter.trim()) {
      setSemesters(initialSemesters);
      return;
    }
    const filteredSemesters = initialSemesters.filter(
      (semester) =>
        semester.school.toLowerCase().includes(filter.toLowerCase()) ||
        semester.department.toLowerCase().includes(filter.toLowerCase())
    );
    setSemesters(filteredSemesters);
  };
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.filterContainer}>
        <TextInput
          style={styles.inputBox}
          placeholder="Filter by School/Department"
          value={filter}
          onChangeText={setFilter}
        />
        <TouchableOpacity onPress={handleFilter} style={styles.filterButton}>
          <Text style={{ color: "white", fontWeight: "bold" }}>Filter</Text>
        </TouchableOpacity>
      </View>
      {cards.map((card) => (
        <View key={`card-${card.id}`} style={styles.card}>
          <Text style={styles.cardHeading}>Course Type:</Text>
          <TextInput
            style={[styles.input, isEditing ? null : styles.disabledInput]}
            editable={isEditing}
            value={courseType}
            onChangeText={setLocalCourseType}
          />
          <Text style={styles.cardHeading}>School:</Text>
          <TextInput
            style={[styles.input, isEditing ? null : styles.disabledInput]}
            editable={isEditing}
            value={school}
            onChangeText={setLocalSchool}
          />
          <Text style={styles.cardHeading}>Department:</Text>
          <TextInput
            style={[styles.input, isEditing ? null : styles.disabledInput]}
            editable={isEditing}
            value={department}
            onChangeText={setLocalDepartment}
          />
          <Text style={styles.cardHeading}>Semester Count:</Text>
          <TextInput
            style={[styles.input, isEditing ? null : styles.disabledInput]}
            editable={isEditing}
            value={semesterCount.toString()}
            onChangeText={setLocalSemesterCount}
            keyboardType="numeric"
          />

          {semesters.map((semester, semesterIndex) => (
            <View
              key={`semester-${card.id}-${semesterIndex}`}
              style={styles.semesterContainer}
            >
              <Text style={styles.semesterHeading}>
                Semester {semester.semesterNumber}
              </Text>
              {semester.subjects.map((subject, subjectIndex) => (
                <View
                  key={`subject-${card.id}-${semesterIndex}-${subjectIndex}`}
                  style={styles.subjectContainer}
                >
                  <Text style={styles.subjectHeading}>
                    Subject {subjectIndex + 1}
                  </Text>
                  <TextInput
                    style={[
                      styles.input,
                      isEditing ? null : styles.disabledInput,
                    ]}
                    editable={isEditing}
                    value={subject.name}
                    onChangeText={(text) => {
                      const updatedSemesters = [...semesters];
                      updatedSemesters[semesterIndex].subjects[
                        subjectIndex
                      ].name = text;
                      setSemesters(updatedSemesters);
                    }}
                    placeholder="Subject Name"
                  />
                  {/* Add more input fields for subject details */}
                  <TextInput
                    style={[
                      styles.input,
                      isEditing ? null : styles.disabledInput,
                    ]}
                    editable={isEditing}
                    value={subject.code}
                    onChangeText={(text) => {
                      const updatedSemesters = [...semesters];
                      updatedSemesters[semesterIndex].subjects[
                        subjectIndex
                      ].code = text;
                      setSemesters(updatedSemesters);
                    }}
                    placeholder="Subject Code"
                  />
                  <TextInput
                    style={[
                      styles.input,
                      isEditing ? null : styles.disabledInput,
                    ]}
                    editable={isEditing}
                    value={subject.credits}
                    onChangeText={(text) => {
                      const updatedSemesters = [...semesters];
                      updatedSemesters[semesterIndex].subjects[
                        subjectIndex
                      ].credits = text;
                      setSemesters(updatedSemesters);
                    }}
                    placeholder="Subject Credits"
                  />
                  <TextInput
                    style={[
                      styles.input,
                      isEditing ? null : styles.disabledInput,
                    ]}
                    editable={isEditing}
                    value={subject.type}
                    onChangeText={(text) => {
                      const updatedSemesters = [...semesters];
                      updatedSemesters[semesterIndex].subjects[
                        subjectIndex
                      ].type = text;
                      setSemesters(updatedSemesters);
                    }}
                    placeholder="Subject Type"
                  />
                  {isEditing && (
                    <TouchableOpacity
                      style={styles.deleteButton}
                      onPress={() =>
                        handleDeleteSubject(semesterIndex, subjectIndex)
                      }
                    >
                      <Text>Delete Subject</Text>
                    </TouchableOpacity>
                  )}
                </View>
              ))}
              {isEditing && (
                <TouchableOpacity
                  style={styles.addButton}
                  onPress={() => handleAddSubject(semesterIndex)}
                >
                  <Text>Add Subject</Text>
                </TouchableOpacity>
              )}
              {isEditing && (
                <TouchableOpacity
                  style={styles.deleteSemesterButton}
                  onPress={() => handleDeleteSemester(semesterIndex)}
                >
                  <Text>Delete Semester</Text>
                </TouchableOpacity>
              )}
            </View>
          ))}

          {isEditing && (
            <TouchableOpacity
              style={styles.addButton}
              onPress={handleAddSemester}
            >
              <Text>Add Semester</Text>
            </TouchableOpacity>
          )}

          <View style={styles.buttonsContainer}>
            {!isEditing && (
              <TouchableOpacity style={styles.editButton} onPress={handleEdit}>
                <Text>Edit</Text>
              </TouchableOpacity>
            )}
            {isEditing && (
              <TouchableOpacity style={styles.editButton} onPress={handleSave}>
                <Text>Save</Text>
              </TouchableOpacity>
            )}

            <TouchableOpacity
              style={styles.deleteButton}
              onPress={() => handleDeleteCard(card.id)}
            >
              <Text>Delete</Text>
            </TouchableOpacity>
          </View>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "lightblue",
  },
  filterContainer: {
    flexDirection: "row",
    marginBottom: 10,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    paddingHorizontal: 10,
    marginRight: 10,
    backgroundColor: "#fff",
  },
  inputBox: {
    flex: 1,
    borderWidth: 1,
    padding: 10,
    borderColor: "#74D1EA",
    borderRadius: 5,
    paddingHorizontal: 10,

    backgroundColor: "#fff",
  },
  filterButton: {
    backgroundColor: "#6488ea",
    paddingHorizontal: 20,

    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 10,
  },

  card: {
    backgroundColor: "#4DC6E2",
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
  },
  cardHeading: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 8,
    marginBottom: 10,
    backgroundColor: "#fff",
  },
  semesterContainer: {
    marginBottom: 20,
  },
  semesterHeading: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },
  subjectContainer: {
    marginBottom: 10,
  },
  subjectHeading: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 5,
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 20,
  },
  editButton: {
    backgroundColor: "#50C878",
    padding: 10,
    borderRadius: 5,
    alignItems: "flex-start",
    justifyContent: "center",
    marginTop: 10,
    marginRight: 13,
    paddingHorizontal: 30,
  },
  addButton: {
    backgroundColor: "lightgray",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
  },
  deleteButton: {
    backgroundColor: "red",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
  },
  deleteSemesterButton: {
    backgroundColor: "red",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
  },

  undoButton: {
    backgroundColor: "orange",
    padding: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
    marginRight: 10,
  },
  disabledInput: {
    backgroundColor: "#f0f0f0",
  },
});
export default MAdminMAdminViewScreen;
