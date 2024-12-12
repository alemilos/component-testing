import React from "react";
import { v4 as uuidv4 } from "uuid";

// Icons
import { GoClock } from "react-icons/go";
import { FaRegCalendar } from "react-icons/fa";

// Components
import HourSelector from "../../../ui/input/HourSelector";
import EventInThePast from "../../shared/events/EventInThePast";
import SubmitButton from "../../../ui/button/SubmitButton";

// Hooks
import { usePopup } from "../../../ui/popup/PopupProvider";
import { eventTypes, useCalendar } from "../../../../Provider";
import { utils } from "../../../../utils";

const AddEvent = ({ selectionInfo }) => {
  const { calendarStore, calendarDispatch, addEventService } = useCalendar();
  const { closePopup } = usePopup();

  const { start, end } = selectionInfo;

  // 1. Check start event is in the future
  if (!(start > Date.now()))
    return (
      <EventInThePast text="Slots in the past are not allowed to be blocked" />
    );

  async function onSaveClick() {
    const event = {
      id: uuidv4(),
      start,
      end,
      title: "Blocked",
      type: eventTypes.BLOCKING,
    };

    // send to backend
    const res = await addEventService(event);
    console.log("res: ", res);

    console.error("TODO: Updated values are not used to change date");
    // Add to UI
    calendarDispatch({
      type: "ADD_EVENT",
      payload: event,
    });

    closePopup();
  }

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
              utils.monthsShort[start.getMonth()]
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
          <SubmitButton
            onClick={onSaveClick}
            text="Save"
            loading={calendarStore.loading}
          />
        </div>
      </div>
    </div>
  );
};

export default AddEvent;
