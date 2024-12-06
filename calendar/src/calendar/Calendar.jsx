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
import { useEffect } from "react";
/* ############################ FULL CALENDAR ##################### */

// Popups
import CustomizeEventPopup from "./components/popups/CustomizeEvent";

const CalendarConsumer = () => {
  const { dispatch } = useCalendar();
  const { openPopup } = usePopup();

  useEffect(() => {
    openPopup(CustomizeEventPopup);
  }, []);

  const events = [];

  function onEventDrop() {}
  function onEventResize() {}
  function onSelect() {}

  return (
    <>
      <div className="w-screen h-screen bg-[#1f1f1f] p-8">
        <div
          // onContextMenu={(e) => {
          //   e.preventDefault();
          // }}
          className="bg-white rounded-lg p-2"
        >
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
                hint: "Sync with google calendar",
                click: () => {
                  if (confirm("Want to sync with google ? ")) {
                    alert("Syncing with google");
                  }
                },
              },

              setAvailability: {
                text: "Set my availability",
              },
            }}
            headerToolbar={{
              start:
                "today prev,next title dayGridMonth,timeGridWeek,timeGridDay connectCalendars setAvailability",
              end: "",
            }}
            events={events}
            height="90vh"
          />
        </div>
      </div>
    </>
  );
};

const Calendar = () => {
  return (
    <CalendarProvider>
      <PopupProvider>
        <CalendarConsumer />
      </PopupProvider>
    </CalendarProvider>
  );
};

export default Calendar;
