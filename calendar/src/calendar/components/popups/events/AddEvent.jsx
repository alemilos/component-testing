import React, { useEffect, useState } from "react";

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
import ErrorInfo from "../../info/ErrorInfo";
import InvalidEventEdit from "./InvalidEventEdit";

const AddEvent = ({ event }) => {
  let { start, end } = event;

  const {
    user,
    configurations,
    calendarStore,
    calendarDispatch,
    addEventService,
    addRecurrentEventService,
  } = useCalendar();

  const { closePopup } = usePopup();

  // Errors
  const [errorMessage, setErrorMessage] = useState(null);

  // Recurrence
  const [recurrenceType, setRecurrenceType] = useState(null);
  const [recurrenceDurationWeeks, setRecurrenceDurationWeeks] = useState(12); // default 3 months (4 * 3 weeks)

  // Times
  const [startTime, setStartTime] = useState(utils.formatHoursMinutes(start));
  const [endTime, setEndTime] = useState(utils.formatHoursMinutes(end));

  // Check start event is in the future
  if (!(start > Date.now())) return <EventInThePast />;

  async function onSaveClick() {
    if (user === "coachee") {
      let duration = utils.hoursMinutesFormatToMinutes(
        utils.calcDuration(startTime, endTime)
      );

      // 1. check the event duration is valid based on the coach configurations
      if (!configurations.sessionLengths.includes(duration)) {
        setErrorMessage("Sessions cannot be this long");
        return;
      }

      // 2. check if the event can be adjusted better for the coachee
    }

    // Make sure the error message is cleared
    setErrorMessage(null);

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
    const date = start;

    const res = await addEventService({ timeRange, date });

    if (res.ok) {
      calendarDispatch({
        type: "ADD_EVENT",
        payload: res.event,
      });
    }
  }

  /**
   * Handle adding a recurrent event
   */
  async function addRecurrentEvent() {
    const timeRange = { start: startTime, end: endTime };
    const date = start;

    // TODO: make sure the event is only added after the available date
    const res = await addRecurrentEventService({
      recurrenceType,
      recurrenceDurationWeeks,
      timeRange,
      date,
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

  function onRecurrenceDurationChange(weeks) {
    console.log(weeks);
    setRecurrenceDurationWeeks(weeks);
  }

  //////////////////
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
        {/* <div className="flex gap-4 items-center">
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
              "Every available day",
              "Every week",
              "Every month",
            ]}
          />

          <RecurrenceDurationManager
            recurrenceType={recurrenceType}
            onChange={onRecurrenceDurationChange}
          />
        </div> */}
        <ErrorInfo message={errorMessage} />
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

const RecurrenceDurationManager = ({ recurrenceType, onChange }) => {
  if (!recurrenceType || recurrenceType === "not-recurrent") return null;

  let options, displayOptions;
  if (recurrenceType === "every-month") {
    options = ["months", "years"];
    displayOptions = ["Months", "Years"];
  } else {
    options = ["weeks", "months", "years"];
    displayOptions = ["Weeks", "Months", "Years"];
  }

  const [inputValue, setInputValue] = useState("");
  const [timeUnit, setTimeUnit] = useState("weeks");

  /**
   * update the weeks count on the onChange callback when the input value changes
   * @param {*} e
   */
  function handleChange(e) {
    setInputValue(e.target.value);
    const weeks = utils.weeksCount(e.target.value, timeUnit);
    onChange(weeks);
  }

  /**
   * update the weeks count on the onChange callback when time unit changes
   * @param {*} e
   */
  function handleTimeUnitChange(e) {
    setTimeUnit(e.target.value);
    const weeks = utils.weeksCount(inputValue, e.target.value);
    onChange(weeks);
  }

  return (
    <div className="flex items-center gap-3 ">
      <p className="w-full text-nowrap">for </p>
      <input
        onChange={handleChange}
        type="number"
        min={0}
        className="border w-20 rounded-lg px-2 outline-none"
      />
      <CSelector
        options={options}
        optionsDisplay={displayOptions}
        onChange={handleTimeUnitChange}
      />
    </div>
  );
};

export default AddEvent;
