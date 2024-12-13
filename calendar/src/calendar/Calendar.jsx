import { useRef } from "react";

// Providers
import CalendarProvider, { useCalendar } from "./Provider";
import PopupProvider, { usePopup } from "./components/ui/popup/PopupProvider";

/* ############################ FULL CALENDAR ##################### */
import FullCalendar from "@fullcalendar/react";

// Plugins
import dayGridPlugin from "@fullcalendar/daygrid";
import rrulePlugin from "@fullcalendar/rrule";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import bootstrap5Plugin from "@fullcalendar/bootstrap5";

// Bootstrap styles
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-icons/font/bootstrap-icons.css"; // needs additional webpack config!
/* ############################ FULL CALENDAR ##################### */

import "./index.css";

// Popups (coach)

import { default as AddEventPopup } from "./components/popups/events/AddEvent";
import { default as ClickedEventPopup } from "./components/popups/events/ClickedEvent";

import CalendarHeader from "./components/header/CalendarHeader";

const CalendarConsumer = () => {
  const { user, calendarStore, calendarDispatch } = useCalendar();
  const { openPopup } = usePopup();
  const calendarRef = useRef();
  console.log(calendarStore);

  /* 
    #################################################
     Setup differencies between coach and coachee view 
    #################################################
  */

  let headerToolbar = {};
  if (user === "coach") {
    headerToolbar.start =
      "today prev,next title dayGridMonth,timeGridWeek,timeGridDay connectCalendars";
  } else if (user === "coachee") {
    headerToolbar.start =
      "today prev,next title dayGridMonth,timeGridWeek,timeGridDay";
  }

  /* 
    #################################################
      Setup calendar callbacks
    #################################################
  */

  function onEventDrop() {}
  function onEventResize() {}

  function onSelect(selectionInfo) {
    openPopup(AddEventPopup, { props: { selectionInfo } });
  }

  function onEventClick(eventClickInfo) {
    openPopup(ClickedEventPopup, { props: { eventClickInfo } });
  }

  return (
    <div id="calendar-main">
      <div className="w-screen h-screen bg-[#1f1f1f] p-8">
        <div className="bg-white rounded-lg p-2">
          <CalendarHeader calendarRef={calendarRef} />
          <FullCalendar
            ref={calendarRef}
            plugins={[
              rrulePlugin,
              dayGridPlugin,
              timeGridPlugin,
              interactionPlugin,
              bootstrap5Plugin,
            ]}
            editable={true}
            eventDrop={onEventDrop}
            eventResize={onEventResize}
            eventClick={onEventClick}
            initialView="dayGridMonth"
            themeSystem="bootstrap5"
            select={onSelect}
            selectable={true}
            headerToolbar={false}
            events={calendarStore.events}
            eventTimeFormat={{
              hour: "2-digit",
              minute: "2-digit",
              // remove hour12 to get 11:30 AM - 4:30 PM format
              hour12: false,
            }}
            height="90vh"
          />
        </div>
      </div>
    </div>
  );
};

const Calendar = ({ user }) => {
  return (
    <CalendarProvider user={user}>
      <PopupProvider>
        <CalendarConsumer />
      </PopupProvider>
    </CalendarProvider>
  );
};

export default Calendar;
