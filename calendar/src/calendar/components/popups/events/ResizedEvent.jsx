import React, { useEffect } from "react";
import { useCalendar } from "../../../Provider";
import SubmitButton from "../../ui/button/SubmitButton";
import { usePopup } from "../../ui/popup/PopupProvider";
import { utils } from "../../../utils";
import InvalidEventEdit from "./InvalidEventEdit";

const ResizedEvent = ({ eventResizeInfo }) => {
  const { revert, event } = eventResizeInfo;
  const {
    user,
    configurations,
    calendarStore,
    calendarDispatch,
    editEventService,
  } = useCalendar();
  const { openPopup, closePopup } = usePopup();

  useEffect(() => {
    if (user === "coachee") {
      let duration = utils.calcDuration(
        utils.formatHoursMinutes(event.start),
        utils.formatHoursMinutes(event.end)
      );

      duration = utils.hoursMinutesFormatToMinutes(duration);

      if (!configurations.sessionLengths.includes(duration)) {
        openPopup(InvalidEventEdit, {
          props: { type: "resize" },
          onClose: () => revert(),
        });
      }
    }
  }, []);

  function onCancelClick() {
    revert();
    closePopup();
  }

  async function onConfirmClick() {
    const res = await editEventService(event);

    if (res.ok) {
      calendarDispatch({ type: "EDIT_EVENT", payload: { event } });
    } else revert();

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
