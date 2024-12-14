import React from "react";

const CSelector = ({
  defaultValue,
  onChange,
  options = [],
  optionsDisplay = null,
  width = null,
}) => {
  return (
    <select
      value={defaultValue}
      onChange={onChange}
      style={{ width }}
      className="bg-white border p-3 rounded-[12px] cursor-pointer"
      data-size="5"
    >
      {options.map((option, index) => (
        <option key={index} value={option}>
          {optionsDisplay ? optionsDisplay[index] : option}
        </option>
      ))}
    </select>
  );
};

export default CSelector;
