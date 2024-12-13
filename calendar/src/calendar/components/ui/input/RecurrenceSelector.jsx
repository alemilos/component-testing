import React from "react";

const RecurrenceSelector = ({ onChange }) => {
  const recurrencies = [
    "not-recurrent",
    "all-working-day",
    "every-week",
    "every-month",
  ];
  const recurrenciesDisplayName = [
    "Not Recurrent",
    "Every working day",
    "Every week",
    "Every month",
  ];

  return (
    <select
      onChange={onChange}
      className="bg-white border p-3 rounded-[12px] cursor-pointer w-48"
    >
      {recurrencies.map((recurrence, index) => {
        return (
          <option key={index} value={recurrence}>
            {recurrenciesDisplayName[index]}
          </option>
        );
      })}
    </select>
  );
};

export default RecurrenceSelector;
