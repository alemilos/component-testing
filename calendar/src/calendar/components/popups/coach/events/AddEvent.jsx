import React from "react";
import { useCalendar } from "../../../../Provider";

// Icons
import { IoMdClose } from "react-icons/io";
import { PiWarningFill } from "react-icons/pi";
import { GoClock } from "react-icons/go";
import { FaRegCalendar } from "react-icons/fa";

// Components
import HourSelector from "../../../ui/input/HourSelector";
import { usePopup } from "../../../ui/popup/PopupProvider";

const AddEvent = ({ selectionInfo }) => {
  const {} = useCalendar();
  const { closePopup } = usePopup();

  const { start, end } = selectionInfo;

  // 1. Check start event is in the future
  if (!(start > Date.now())) return <EventInThePast />;

  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  function onSaveClick() {}

  function onStartHourChange() {}

  function onEndHourChange() {}

  return (
    <div className="bg-white rounded-lg py-2 pb-4 px-[36px] w-[580px] max-h-[500px] overflow-scroll text-lg">
      {/* Header */}
      <div className="p-3 font-bold flex border-b">
        <p className="text-[24px] text-left">Block this timeslot</p>
      </div>
      {/* Content */}
      <div className="flex flex-col gap-2">
        <p className="pt-3 text-lg text-[#979797] font-500">
          Coachees will not be able to schedule sessions with you during this
          time
        </p>
        <div className="p-4 flex gap-2 items-center justify-around">
          <div className="flex gap-2 items-center">
            <FaRegCalendar className="text-xl text-[#979797]" />
            <p className="text-[#979797]">{`${start.getDate()} ${
              months[start.getMonth()]
            } ${start.getFullYear()}`}</p>
          </div>
          <div className="flex gap-2 items-center">
            <GoClock className="text-xl text-[#979797]" />
            <HourSelector date={start} onChange={onStartHourChange} />
            <p className="text-[#979797]">-</p>
            <HourSelector date={end} onChange={onEndHourChange} />
          </div>
        </div>

        <div className="w-full flex gap-3 items-center justify-end mt-4">
          <button
            onClick={closePopup}
            className="py-2 w-20 border rounded-[12px] border-[#313638]"
          >
            Cancel
          </button>
          <button
            onClick={onSaveClick}
            className="py-2 w-20 rounded-[12px] bg-[#1acb97] text-white"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddEvent;

const EventInThePast = () => {
  const { closePopup } = usePopup();

  return (
    <div className="bg-white rounded-lg pl-6 pr-2 pt-2 pb-4 flex flex-col gap-2">
      <IoMdClose
        className="text-xl self-end cursor-pointer"
        onClick={closePopup}
      />
      <div className="flex gap-4 items-center justify-center pr-10">
        <PiWarningFill className="text-2xl " />
        <p className="w-72 font-bold">
          Slots in the past are not allowed to be blocked
        </p>
      </div>
    </div>
  );
};
