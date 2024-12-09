import React, { useState } from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

const DateSelector = ({ onChange }) => {
  function handleChange() {
    if (onChange) onChange();
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        sx={{
          "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
            { border: "1px solid #313638" }, // at focused state
        }}
        slotProps={{
          // Edit the style when calendar is opened
          day: {
            sx: {
              ['&[data-mui-date="true"] .Mui-selected']: {
                // Reset the background color of the selected date
                backgroundColor: "blue",
              },
              ":not(.Mui-selected)": {
                backgroundColor: "#fff",
                borderColor: "#313638",
              },
              "&.MuiPickersDay-root.Mui-selected": {
                color: "#fff",
                backgroundColor: "#313638",
                borderColor: "#313638",
                ":hover": {
                  color: "#fff",
                  backgroundColor: "#313638",
                  borderColor: "#313638",
                },
              },
              ":hover": {
                color: "#fff",
                backgroundColor: "#313638",
                borderColor: "#313638",
              },
            },
          },
        }}
        label="Date selection"
        onChange={handleChange}
      />
    </LocalizationProvider>
  );
};

export default DateSelector;
