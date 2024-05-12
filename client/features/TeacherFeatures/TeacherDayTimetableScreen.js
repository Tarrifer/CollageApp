import React from "react";
import { ScrollView, ScrollScrollView } from "react-native";
import EventTimetableScreen from "../StudentFeatures/EventTimetableScreen";
import TeacherSubjectTimetableScreen from "./TeacherSubjectTimetableScreen";

export function SundayScreen() {
  return (
    <ScrollView>
      <EventTimetableScreen dayIndex={0} />
      <TeacherSubjectTimetableScreen dayIndex={0} />
    </ScrollView>
  );
}

export function MondayScreen() {
  return (
    <ScrollView>
      <EventTimetableScreen dayIndex={1} />
      <TeacherSubjectTimetableScreen dayIndex={1} />
    </ScrollView>
  );
}

export function TuesdayScreen() {
  return (
    <ScrollView>
      <EventTimetableScreen dayIndex={2} />
      <TeacherSubjectTimetableScreen dayIndex={2} />
    </ScrollView>
  );
}

export function WednesdayScreen() {
  return (
    <ScrollView>
      <EventTimetableScreen dayIndex={3} />
      <TeacherSubjectTimetableScreen dayIndex={3} />
    </ScrollView>
  );
}

export function ThursdayScreen() {
  return (
    <ScrollView>
      <EventTimetableScreen dayIndex={4} />
      <TeacherSubjectTimetableScreen dayIndex={4} />
    </ScrollView>
  );
}

export function FridayScreen() {
  return (
    <ScrollView>
      <EventTimetableScreen dayIndex={5} />
      <TeacherSubjectTimetableScreen dayIndex={5} />
    </ScrollView>
  );
}

export function SaturdayScreen() {
  return (
    <ScrollView>
      <EventTimetableScreen dayIndex={6} />
      <TeacherSubjectTimetableScreen dayIndex={6} />
    </ScrollView>
  );
}
