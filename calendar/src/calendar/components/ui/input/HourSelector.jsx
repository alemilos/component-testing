import React from "react";

function formatTime(date) {
  if (!date || !(date instanceof Date)) return null;

  let hour = date.getHours();
  let min = date.getMinutes();

  if (hour < 10) hour = "0" + hour;
  if (min < 10) min = "0" + min;

  return `${hour}:${min}`;
}

const HourSelector = ({ date, onChange }) => {
  const times = [
    "00:00",
    "00:30",
    "01:00",
    "01:30",
    "02:00",
    "02:30",
    "03:00",
    "03:30",
    "04:00",
    "04:30",
    "05:00",
    "05:30",
    "06:00",
    "06:30",
    "07:00",
    "07:30",
    "08:00",
    "08:30",
    "09:00",
    "09:30",
    "10:00",
    "10:30",
    "11:00",
    "11:30",
    "12:00",
    "12:30",
    "13:00",
    "13:30",
    "14:00",
    "14:30",
    "15:00",
    "15:30",
    "16:00",
    "16:30",
    "17:00",
    "17:30",
    "18:00",
    "18:30",
    "19:00",
    "19:30",
    "20:00",
    "20:30",
    "21:00",
    "21:30",
    "22:00",
    "22:30",
    "23:00",
    "23:30",
  ];

  const time = formatTime(date);

  return (
    <select className="bg-white border p-3 rounded-[12px] cursor-pointer">
      <option value={time ? time : "default"}>{time ? time : ""}</option>
      {times.map((time, index) => (
        <option key={index} value={time}>
          {time}
        </option>
      ))}
    </select>
  );
};

export default HourSelector;
