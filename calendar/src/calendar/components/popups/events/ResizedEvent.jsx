import React from "react";
import { useCalendar } from "../../../Provider";
import SubmitButton from "../../ui/button/SubmitButton";
import { usePopup } from "../../ui/popup/PopupProvider";

const ResizedEvent = ({ eventResizeInfo }) => {
  console.log(eventResizeInfo);
  const { revert, event } = eventResizeInfo;
  const { user, calendarStore, calendarDispatch, editEventService } =
    useCalendar();
  const { closePopup } = usePopup();

  function onCancelClick() {
    revert();
    closePopup();
  }
  async function onConfirmClick() {
    const res = await editEventService(event);

    // TODO: on res ok dispatch
    calendarDispatch({ type: "EDIT_EVENT", payload: { event } });
    closePopup();
  }

  // Text Management
  let titleText;
  if (user === "coach") {
    titleText = "Are you sure you want to change your blocking time?";
  } else if (user === "coachee") {
    titleText = "Are you sure you want to change your booking time?";
  }
  return (
    <div className="bg-white rounded-lg py-2 pb-4 px-[36px] w-[580px] max-h-[500px] overflow-scroll text-lg">
      {/* Header */}
      <div className="p-3 font-bold flex border-b">
        <p className="text-[24px] text-left">{titleText}</p>
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
  );
};

export default ResizedEvent;
