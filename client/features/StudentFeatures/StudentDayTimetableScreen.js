import React from "react";
import { ScrollView, ScrollScrollView } from "react-native";
import EventTimetableScreen from "./EventTimetableScreen";
import StudentSubjectTimetableScreen from "./StudentSubjectTimetableScreen";

export function SundayScreen() {
  return (
    <ScrollView>
      <EventTimetableScreen dayIndex={0} />
      <StudentSubjectTimetableScreen dayIndex={0} />
    </ScrollView>
  );
}

export function MondayScreen() {
  return (
    <ScrollView>
      <EventTimetableScreen dayIndex={1} />
      <StudentSubjectTimetableScreen dayIndex={1} />
    </ScrollView>
  );
}

export function TuesdayScreen() {
  return (
    <ScrollView>
      <EventTimetableScreen dayIndex={2} />
      <StudentSubjectTimetableScreen dayIndex={2} />
    </ScrollView>
  );
}

export function WednesdayScreen() {
  return (
    <ScrollView>
      <EventTimetableScreen dayIndex={3} />
      <StudentSubjectTimetableScreen dayIndex={3} />
    </ScrollView>
  );
}

export function ThursdayScreen() {
  return (
    <ScrollView>
      <EventTimetableScreen dayIndex={4} />
      <StudentSubjectTimetableScreen dayIndex={4} />
    </ScrollView>
  );
}

export function FridayScreen() {
  return (
    <ScrollView>
      <EventTimetableScreen dayIndex={5} />
      <StudentSubjectTimetableScreen dayIndex={5} />
    </ScrollView>
  );
}

export function SaturdayScreen() {
  return (
    <ScrollView>
      <EventTimetableScreen dayIndex={6} />
      <StudentSubjectTimetableScreen dayIndex={6} />
    </ScrollView>
  );
}
//----------------------------------------------------------------------
// import React from "react";
// import StudentSubjectTimetableScreen from "./StudentSubjectTimetableScreen";

// export function SundayScreen() {
//   return <StudentSubjectTimetableScreen dayIndex={0} />;
// }

// export function MondayScreen() {
//   return <StudentSubjectTimetableScreen dayIndex={1} />;
// }

// export function TuesdayScreen() {
//   return <StudentSubjectTimetableScreen dayIndex={2} />;
// }

// export function WednesdayScreen() {
//   return <StudentSubjectTimetableScreen dayIndex={3} />;
// }

// export function ThursdayScreen() {
//   return <StudentSubjectTimetableScreen dayIndex={4} />;
// }

// export function FridayScreen() {
//   return <StudentSubjectTimetableScreen dayIndex={5} />;
// }

// export function SaturdayScreen() {
//   return <StudentSubjectTimetableScreen dayIndex={6} />;
// }
//----------------------------------------------------------------
// import React from "react";
// import { ScrollView, Text } from "react-native";
// import EventTimetableScreen from "./EventTimetableScreen";
// import StudentSubjectTimetableScreen from "./StudentSubjectTimetableScreen";

// export function SundayScreen() {
//   return <EventTimetableScreen dayIndex={0} />;
// }

// export function MondayScreen() {
//   return <EventTimetableScreen dayIndex={1} />;
// }

// export function TuesdayScreen() {
//   return <EventTimetableScreen dayIndex={2} />;
// }

// export function WednesdayScreen() {
//   return <EventTimetableScreen dayIndex={3} />;
// }

// export function ThursdayScreen() {
//   return <EventTimetableScreen dayIndex={4} />;
// }

// export function FridayScreen() {
//   return <EventTimetableScreen dayIndex={5} />;
// }

// export function SaturdayScreen() {
//   return <EventTimetableScreen dayIndex={6} />;
// }
//----------------------------------------------------------------------
// import React from "react";
// import { ScrollView, Text } from "react-native";

// export function SundayScreen() {
//   return (
//     <ScrollView>
//       <Text>Sunday</Text>
//     </ScrollView>
//   );
// }

// export function MondayScreen() {
//   return (
//     <ScrollView>
//       <Text>Monday</Text>
//     </ScrollView>
//   );
// }

// export function TuesdayScreen() {
//   return (
//     <ScrollView>
//       <Text>Tuesday</Text>
//     </ScrollView>
//   );
// }

// export function WednesdayScreen() {
//   return (
//     <ScrollView>
//       <Text>Wednesday</Text>
//     </ScrollView>
//   );
// }

// export function ThursdayScreen() {
//   return (
//     <ScrollView>
//       <Text>Thursday</Text>
//     </ScrollView>
//   );
// }

// export function FridayScreen() {
//   return (
//     <ScrollView>
//       <Text>Friday</Text>
//     </ScrollView>
//   );
// }

// export function SaturdayScreen() {
//   return (
//     <ScrollView>
//       <Text>Saturday</Text>
//     </ScrollView>
//   );
// }
