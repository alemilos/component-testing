import React from "react";

// Components
import EventInThePast from "../../shared/events/EventInThePast";

// Hooks
import { useCalendar } from "../../../../Provider";
import { usePopup } from "../../../ui/popup/PopupProvider";

const AddEvent = ({ selectionInfo }) => {
  const {} = useCalendar();
  const { closePopup } = usePopup();

  const { start, end } = selectionInfo;

  // 1. Check start event is in the future
  if (!(start > Date.now()))
    return (
      <EventInThePast text="You cannot create an appointment in the past" />
    );

  return <div>AddEvent</div>;
};

export default AddEvent;
