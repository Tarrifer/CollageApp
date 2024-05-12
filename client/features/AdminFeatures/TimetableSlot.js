import React from "react";

const TimetableSlot = ({ slot }) => {
  const { subject, start, end } = slot;

  const getSlotClass = () => {
    if (subject === null || subject === "Lunch Break") {
      return "blank-space";
    }

    return "";
  };

  return (
    <div className={`timetable-slot ${getSlotClass()}`} style={{ gridArea: `${start} / ${end}` }}>
      {subject && subject.name}
    </div>
  );
};

export default TimetableSlot;