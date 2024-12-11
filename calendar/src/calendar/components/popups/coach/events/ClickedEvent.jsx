import React from "react";
import { usePopup } from "../../../ui/popup/PopupProvider";
import { useCalendar } from "../../../../Provider";

const ClickedEvent = ({ eventClickInfo }) => {
  const { dispatch, delEventService } = useCalendar();
  const { closePopup } = usePopup();
  const event = eventClickInfo.event;

  function onCancelClick() {
    closePopup();
  }

  async function onConfirmClick() {
    const eventId = event.id;

    const res = await delEventService(eventId);
    console.log(res);
    dispatch({ type: "DEL_EVENT", payload: eventId });

    closePopup();
  }

  return (
    <div className="bg-white rounded-lg py-2 pb-4 px-[36px] w-[580px] max-h-[500px] overflow-scroll text-lg">
      {/* Header */}
      <div className="p-3 font-bold flex border-b">
        <p className="text-[24px] text-left">
          Are you sure you want to unblock this timeslot ?
        </p>
      </div>
      {/* Content */}
      <div className="flex flex-col gap-2">
        {/* <div className="p-4 flex gap-2 items-center justify-around">
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
  </div> */}

        <div className="w-full flex gap-3 items-center justify-end mt-4">
          <button
            onClick={onCancelClick}
            className="py-2 w-20 border rounded-[12px] border-[#313638]"
          >
            Cancel
          </button>
          <button
            onClick={onConfirmClick}
            className="py-2 w-20 rounded-[12px] bg-[#1acb97] text-white"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default ClickedEvent;
