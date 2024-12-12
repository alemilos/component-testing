import React, { useEffect, useState } from "react";
import { useCalendar } from "../../Provider";

// Icons
import { FaAngleLeft } from "react-icons/fa6";
import { FaAngleRight } from "react-icons/fa6";

import { utils } from "../../utils";
import { usePopup } from "../ui/popup/PopupProvider";
import ConnectCalendarPopup from "../popups/coach/ConnectCalendarPopup";

function getMonthFromDate(date) {
  return utils.monthsLong[date.getMonth()];
}

const CalendarHeader = ({ calendarRef }) => {
  const { user } = useCalendar();
  const { openPopup } = usePopup();

  const [title, setTitle] = useState("");

  function updateTitle() {
    const date =
      calendarRef.current.getApi().currentDataManager.data.currentDate;
    const month = getMonthFromDate(date);
    setTitle(month);
  }

  useEffect(() => {
    if (calendarRef.current?.getApi()) {
      updateTitle();
    }
  }, [calendarRef]);

  const nextHandle = () => {
    calendarRef.current.getApi().next();
    updateTitle();
  };
  const prevHandle = () => {
    calendarRef.current.getApi().prev();
    updateTitle();
  };
  const todayHandle = () => {
    calendarRef.current.getApi().today();
    updateTitle();
  };
  const dayHandle = () => {
    calendarRef.current.getApi().changeView("timeGridDay");
    updateTitle();
  };
  const weekHandle = () => {
    calendarRef.current.getApi().changeView("timeGridWeek");
    updateTitle();
  };
  const monthHandle = () => {
    calendarRef.current.getApi().changeView("dayGridMonth");
    updateTitle();
  };

  function onSelectChange(e) {
    if (e.target.value === "month") {
      monthHandle();
    } else if (e.target.value === "week") {
      weekHandle();
    } else if (e.target.value === "day") {
      dayHandle();
    }
  }

  function onConnectCalendarsClick() {
    openPopup(ConnectCalendarPopup);
  }

  /*******************
   * User check
   *******************/
  const isCoach = user === "coach";

  return (
    <div className="w-full h-16 flex items-center gap-16 text-md px-2">
      <div className="flex gap-3 items-center h-8">
        <button className="btn btn-primary" onClick={todayHandle}>
          Today
        </button>
        <div className="flex">
          <button
            className="btn btn-primary fc-prev-button h-9"
            onClick={prevHandle}
          >
            <FaAngleLeft />
          </button>
          <button
            className="btn btn-primary fc-next-button h-9"
            onClick={nextHandle}
          >
            <FaAngleRight />
          </button>
        </div>
        <p className="font-700 text-md w-20 ">{title}</p>
      </div>
      <div className="flex items-center gap-3">
        <select
          className="h-9 rounded-[12px] border border-[red] px-2 outline-none focus:bg-[#313638] focus:text-white text-sm cursor-pointer"
          name=""
          id="weekMonthDay-select"
          onChange={onSelectChange}
        >
          <option value="month">Month</option>
          <option value="week">Week</option>
          <option value="day">Day</option>
        </select>
        {isCoach && (
          <button className="btn btn-primary" onClick={onConnectCalendarsClick}>
            Connect a calendar
          </button>
        )}
      </div>
    </div>
  );
};

export default CalendarHeader;
