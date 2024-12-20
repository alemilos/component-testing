import React, { useState } from "react";
import { usePopup } from "../../ui/popup/PopupProvider";
import { useCalendar } from "../../../Provider";
import SubmitButton from "../../ui/button/SubmitButton";
import { FaRegCalendar } from "react-icons/fa";
import { utils } from "../../../utils";
import { CiWarning } from "react-icons/ci";
import CSelector from "../../ui/input/CSelector";

const ClickedEvent = ({ event }) => {
  console.log(event._instance.range.start);
  const { start, end } = event;

  const { user, calendarStore, calendarDispatch, deleteEventService } =
    useCalendar();
  const { closePopup } = usePopup();

  const [deleteType, setDeleteType] = useState(null);

  function onCancelClick() {
    closePopup();
  }

  async function deleteOne() {
    console.log("DELETING");
    const res = await deleteEventService(event);

    // Todo: dispatch when res
    if (event.extendedProps?.isRecurrent) {
      calendarDispatch({
        type: "DEL_REC_EVENT",
        payload: { event, type: "this-event" },
      });
    } else {
      calendarDispatch({ type: "DEL_EVENT", payload: { event } });
    }
  }

  async function deleteAll() {
    const res = await deleteEventService(event);
    // Todo: dispatch when res
    calendarDispatch({
      type: "DEL_REC_EVENT",
      payload: { event, type: deleteType },
    });
  }

  async function deleteThisAndFollowing() {
    const res = await deleteEventService(event);
    // Todo: dispatch when res
    calendarDispatch({
      type: "DEL_REC_EVENT",
      payload: { event, type: deleteType },
    });
  }

  async function onConfirmClick() {
    if (!deleteType || deleteType === "this-event") await deleteOne();
    else if (deleteType === "this-and-following")
      await deleteThisAndFollowing();
    else if (deleteType === "all") await deleteAll();
    closePopup();
  }

  function onDeleteTypeChange(e) {
    setDeleteType(e.target.value);
  }

  // Text management
  let titleText;
  if (user === "coach") {
    titleText = "Are you sure you want to unblock this timeslot?";
  } else if (user === "coachee") {
    titleText = "Are you sure you want to delete your booking?";
  }

  return (
    <div className="bg-white rounded-lg py-2 pb-4 px-[36px] w-[580px] max-h-[500px] overflow-scroll text-lg flex flex-col gap-3">
      {/* Header */}
      <div className="p-3 font-bold flex border-b">
        <p className="text-[24px] text-left">{titleText}</p>
      </div>
      {/* Content */}
      <div className="flex flex-col gap-2">
        <div className="flex flex-col gap-3">
          <div className="flex gap-2 items-center">
            <FaRegCalendar className="text-xl text-[#979797]" />
            <p className="text-[#979797]">{`${start.getDate()} ${
              utils.monthsShort[start.getMonth()]
            } ${start.getFullYear()} (${utils.formatHoursMinutes(
              start
            )} - ${utils.formatHoursMinutes(end)})`}</p>
          </div>

          {/*  {event?.extendedProps?.isRecurrent && (
            <DeleteRecurrentEvent onDeleteTypeChange={onDeleteTypeChange} />
          )} */}
        </div>

        <div className="w-full flex gap-3 items-center justify-end mt-4">
          <button
            onClick={onCancelClick}
            className="py-2 w-20 border rounded-[12px] border-[#313638]"
          >
            Cancel
          </button>
          <SubmitButton
            onClick={onConfirmClick}
            text="Confirm"
            loading={calendarStore.loading}
          />
        </div>
      </div>
    </div>
  );
};

export default ClickedEvent;

const DeleteRecurrentEvent = ({ onDeleteTypeChange }) => {
  return (
    <div className="flex flex-col gap-3">
      <div className="bg-[#1acb97]/[.1] rounded-lg flex gap-2 p-2 items-center text-[#1acb97]">
        <CiWarning className="text-xl " />
        <p>This is a recurrent event, select the event to delete</p>
      </div>

      <CSelector
        width={200}
        onChange={onDeleteTypeChange}
        options={["this-event", "this-and-following", "all"]}
        optionsDisplay={[
          "This event",
          "This and following",
          "All recurrencies",
        ]}
      />
    </div>
  );
};
