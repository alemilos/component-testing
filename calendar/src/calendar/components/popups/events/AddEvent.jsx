import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";

// Icons
import { GoClock } from "react-icons/go";
import { FaRegCalendar } from "react-icons/fa";

// Components
import EventInThePast from "./EventInThePast";
import SubmitButton from "../../ui/button/SubmitButton";
import CSelector from "../../ui/input/CSelector";

// Hooks
import { usePopup } from "../../ui/popup/PopupProvider";
import { useCalendar } from "../../../Provider";
import { utils } from "../../../utils";

const AddEvent = ({ event }) => {
  const { start, end } = event;

  const {
    user,
    calendarStore,
    calendarDispatch,
    addEventService,
    addRecurrentEventService,
  } = useCalendar();

  const { closePopup } = usePopup();

  const [recurrenceType, setRecurrenceType] = useState(null);
  const [startTime, setStartTime] = useState(utils.formatHoursMinutes(start));
  const [endTime, setEndTime] = useState(utils.formatHoursMinutes(end));

  // Check start event is in the future
  //
  if (!(start > Date.now())) return <EventInThePast />;

  async function onSaveClick() {
    // send to backend
    if (!recurrenceType || recurrenceType === "not-recurrent") {
      await addEvent();
    } else {
      await addRecurrentEvent();
    }

    closePopup();
  }

  /**
   * Handle adding a normal event
   */
  async function addEvent() {
    const timeRange = { start: startTime, end: endTime };
    const dateRange = { start: start, end: end };

    const res = await addEventService({ timeRange, dateRange });
    console.log("res: ", res);
    // Add to UI
    calendarDispatch({
      type: "ADD_EVENT",
      payload: res.event,
    });
  }

  /**
   * Handle adding a recurrent event
   */
  async function addRecurrentEvent() {
    const timeRange = { start: startTime, end: endTime };
    const dateRange = { start: start, end: end };

    // TODO: make sure the event is only added after the available date
    const res = await addRecurrentEventService({
      recurrenceType,
      timeRange,
      dateRange,
    });
    console.log("res: ", res);
    // Add to UI
    calendarDispatch({
      type: "ADD_EVENT",
      payload: res.event,
    });
  }

  function onRecurrenceChange(e) {
    setRecurrenceType(e.target.value);
  }

  function onStartTimeChange(e) {
    const start_time = e.target.value;
    setStartTime(start_time);

    if (start_time > endTime) {
      setEndTime(start_time);
    } else if (start_time === endTime) {
      console.warn("start time == end time, add offset to the end");
    }
  }

  function onEndTimeChange(e) {
    const end_time = e.target.value;
    setEndTime(e.target.value);

    if (end_time < startTime) {
      setStartTime(end_time);
    } else if (end_time === startTime) {
      console.warn("start time == end time, add offset to the start");
    }
  }

  // Text management
  let titleText, infoText;
  let eventTitle;
  if (user === "coach") {
    titleText = "Block this timeslot";
    infoText =
      "Coachees will not be able to schedule sessions with you during this time";
    eventTitle = "Blocked";
  } else if (user === "coachee") {
    titleText = "Create appointment";
    infoText = "Book an appointment with the coach";
    eventTitle = "Appointment";
  }

  return (
    <div className="bg-white rounded-lg py-2 pb-4 px-[36px] w-[580px] max-h-[500px] overflow-scroll text-lg">
      {/* Header */}
      <div className="p-3 font-bold flex border-b">
        <p className="text-[24px] text-left">{titleText}</p>
      </div>
      {/* Content */}
      <div className="flex flex-col gap-2">
        <p className="pt-3 text-lg text-[#979797] font-500">{infoText}</p>
        <div className="p-4 flex gap-2 items-center justify-around">
          <div className="flex gap-2 items-center">
            <FaRegCalendar className="text-xl text-[#979797]" />
            <p className="text-[#979797]">{`${start.getDate()} ${
              utils.monthsShort[start.getMonth()]
            } ${start.getFullYear()}`}</p>
          </div>
          <div className="flex gap-2 items-center">
            <GoClock className="text-xl text-[#979797]" />
            <CSelector
              options={utils.hourSlots}
              defaultValue={startTime}
              onChange={onStartTimeChange}
            />
            <p className="text-[#979797]">-</p>
            <CSelector
              defaultValue={endTime}
              onChange={onEndTimeChange}
              options={utils.hourSlots}
            />
          </div>
        </div>

        <CSelector
          width={200}
          onChange={onRecurrenceChange}
          options={[
            "not-recurrent",
            "all-working-day",
            "every-week",
            "every-month",
          ]}
          optionsDisplay={[
            "Not Recurrent",
            "Every working day",
            "Every week",
            "Every month",
          ]}
        />

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