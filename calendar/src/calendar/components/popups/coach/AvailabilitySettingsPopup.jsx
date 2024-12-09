import React, { useState } from "react";

// Components
import DateSelector from "../../ui/input/DateSelector";
import HourSelector from "../../ui/input/HourSelector";

// Icons
import { RiDeleteBinLine } from "react-icons/ri";

const TABS = ["Individual Availability", "Recurring Availability"];

const AvailabilitySettingsPopup = () => {
  const [tab, setTab] = useState(TABS[0]);

  return (
    <div className="bg-white rounded-lg py-2 px-4 min-w-[600px] max-h-[500px] overflow-scroll ">
      {/* Header */}
      <div className="p-3 font-bold flex border-b">
        <p className="text-[34px] text-left">Availability Settings</p>
      </div>
      {/* Content */}
      <TabSelector tab={tab} setTab={setTab} />
      <div className="p-4">
        {tab === TABS[0] && <IndividualAvailability />}
        {tab === TABS[1] && <RecurringAvailability />}
      </div>
    </div>
  );
};

export default AvailabilitySettingsPopup;

const TabSelector = ({ tab, setTab }) => {
  return (
    <div className="flex w-full gap-4 pt-4 justify-around">
      {TABS.map((_, index) => (
        <div
          onClick={() => setTab(TABS[index])}
          key={index}
          className={`cursor-pointer border-b w-full ${
            tab === TABS[index]
              ? "text-[#313638] border-[#313638]"
              : "border-white"
          }`}
        >
          <p className="pb-3 text-center">{TABS[index]}</p>
        </div>
      ))}
    </div>
  );
};

const IndividualAvailability = () => {
  return (
    <div className="flex flex-col gap-4">
      <p>Please submit your availability below</p>

      <div className="w-full flex gap-2 ">
        <DateSelector />
        <HourSelector />
        <HourSelector />
      </div>
    </div>
  );
};

const RecurringAvailability = () => {
  const days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  return (
    <div className="flex flex-col gap-4 ">
      <p>Please submit your availability below</p>

      <div className="flex flex-col gap-4">
        {days.map((day, index) => (
          <div key={index} className="grid h-12 gap-4 grid-cols-5">
            <p>{day}</p>
            <HourSelector />
            <HourSelector />
            <RiDeleteBinLine className="text-xl self-center" />
          </div>
        ))}
      </div>
    </div>
  );
};
