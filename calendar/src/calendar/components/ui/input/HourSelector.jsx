import React from "react";
import { utils } from "../../../utils";

const HourSelector = ({ defaultTime, onChange }) => {
  const availableTimes = utils.hourSlots;

  return (
    <select
      value={defaultTime}
      onChange={onChange}
      className="bg-white border p-3 rounded-[12px] cursor-pointer"
      data-size="5"
    >
      {availableTimes.map((time, index) => (
        <option key={index} value={time}>
          {time}
        </option>
      ))}
    </select>
  );
};

export default HourSelector;
