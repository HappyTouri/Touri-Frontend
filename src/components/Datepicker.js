import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";

export const Datepicker = ({ value, onChange, ReadOnly }) => {
  // Adjust the selected date to account for the timezone offset
  const adjustDateForTimezoneOffset = (date) => {
    const offsetInMinutes = date.getTimezoneOffset();
    const adjustedDate = new Date(date.getTime() + offsetInMinutes * 60000);
    return adjustedDate;
  };

  const [selectedDate, setSelectedDate] = useState(
    value ? adjustDateForTimezoneOffset(new Date(value)) : null
  );

  useEffect(() => {
    // Update selectedDate state when the value prop changes
    if (value) {
      setSelectedDate(adjustDateForTimezoneOffset(new Date(value)));
    }
  }, [value]);

  const handleDateChange = (date) => {
    // Adjust the date format and pass it to the parent component onChange callback
    const adjustedDate = adjustDateForTimezoneOffset(date);
    setSelectedDate(adjustedDate);
    onChange(adjustedDate.toISOString().split("T")[0]); // Only send the date part
  };

  return (
    <DatePicker
      readOnly={ReadOnly}
      className="form-control bd-t-0 bd-b-0 bd-r-0 bd-l-0"
      selected={selectedDate}
      onChange={handleDateChange}
      dateFormat="d MMMM yyyy"
    />
  );
};
