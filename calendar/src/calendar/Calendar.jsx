// Providers
import CalendarProvider, { useCalendar } from "./Provider";
import PopupProvider, { usePopup } from "./components/ui/popup/PopupProvider";

/* ############################ FULL CALENDAR ##################### */
import FullCalendar from "@fullcalendar/react";

// Plugins
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import bootstrap5Plugin from "@fullcalendar/bootstrap5";

// Bootstrap styles
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-icons/font/bootstrap-icons.css"; // needs additional webpack config!
/* ############################ FULL CALENDAR ##################### */

import "./index.css";

// Popups
import ConnectCalendarPopup from "./components/popups/coach/ConnectCalendarPopup";
import { default as AddCoachEvent } from "./components/popups/coach/events/AddEvent";
import { default as AddCoacheeEvent } from "./components/popups/coachee/events/AddEvent";

const CalendarConsumer = () => {
  const { user, calendarStore, dispatch } = useCalendar();
  const { openPopup } = usePopup();

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
    if (user === "coach") {
      openPopup(AddCoachEvent, { props: { selectionInfo } });
    } else if (user === "coachee") {
      openPopup(AddCoacheeEvent, { props: { selectionInfo } });
    }
  }

  /**
   #################################
   Calendar Button Click Handlers
   #################################
   */

  function onConnectCalendarsClick() {
    openPopup(ConnectCalendarPopup);
  }
  return (
    <div id="calendar-main">
      <div className="w-screen h-screen bg-[#1f1f1f] p-8">
        <div className="bg-white rounded-lg p-2">
          <FullCalendar
            plugins={[
              dayGridPlugin,
              timeGridPlugin,
              interactionPlugin,
              bootstrap5Plugin,
            ]}
            editable={true}
            eventDrop={onEventDrop}
            eventResize={onEventResize}
            initialView="dayGridMonth"
            themeSystem="bootstrap5"
            select={onSelect}
            selectable={true}
            customButtons={{
              connectCalendars: {
                text: "Connect a calendar",
                hint: "Sync with google or apple calendars",
                click: onConnectCalendarsClick,
              },
            }}
            headerToolbar={{
              start: headerToolbar.start,
              end: "",
            }}
            events={[]}
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
