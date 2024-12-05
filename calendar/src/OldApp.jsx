import FullCalendar from "@fullcalendar/react";
import { v4 as uuidv4 } from "uuid";

// Plugins
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import bootstrap5Plugin from "@fullcalendar/bootstrap5";

import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { useEffect, useState } from "react";
import CalendarProvider, { useCalendar } from "./Provider";

function App() {
  return (
    <CalendarProvider>
      <Calendar />
    </CalendarProvider>
  );
}

function Calendar() {
  const { events, updateEvent, clearTemporaryEvents } = useCalendar();

  const [modalPayload, setModalPayload] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  /**
   * Update the event inside the provider when it is dropped after drag
   * @param {*} eventDropInfo
   */
  function onEventDrop(eventDropInfo) {
    updateEvent(eventDropInfo.event);
  }

  /**
   * Update the event inside the provider when it is dropped after resizing
   * @param {*} eventResizeInfo
   */
  function onEventResize(eventResizeInfo) {
    updateEvent(eventResizeInfo.event);
  }

  function onSelect(selectionInfo) {
    setModalVisible(true);
    setModalPayload(selectionInfo);
  }

  /**
   * Make sure the temporary events are deleted when modal is close
   */
  useEffect(() => {
    if (!modalVisible) {
      clearTemporaryEvents();
    }
  }, [modalVisible]);

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
              googleSyncButton: {
                icon: "google",
                hint: "Sync with google calendar",
                click: () => {
                  if (confirm("Want to sync with google ? ")) {
                    alert("Syncing with google");
                  }
                },
              },
            }}
            headerToolbar={{
              start: "today prev,next googleSyncButton",
              center: "title",
              end: "dayGridMonth,timeGridWeek,timeGridDay",
            }}
            events={events}
            height="90vh"
          />
        </div>
      </div>
      {modalVisible && (
        <Modal eventInfo={modalPayload} close={() => setModalVisible(false)} />
      )}
    </>
  );
}

import { IoMdClose } from "react-icons/io";
import { IoResize } from "react-icons/io5";

const Modal = ({ eventInfo, close }) => {
  const { addTemporaryEvent, updateTemporaryEvent } = useCalendar();

  const [eventId, setEventId] = useState(uuidv4());
  const [event, setEvent] = useState({
    start: eventInfo.startStr,
    end: eventInfo.endStr,
    id: eventId,
    title: "(senza titolo)",
  });

  useEffect(() => {
    if (eventInfo) {
      addTemporaryEvent(event);
    }
  }, [eventInfo]);

  function onAddClick() {
    updateTemporaryEvent(eventId, { isTemp: false });
    close();
  }

  function onCloseClick() {
    close();
  }

  function onTitleChange(e) {
    updateTemporaryEvent(eventId, { title: e.target.value });
  }

  useEffect(() => {
    window.addEventListener("keydown", (keyEvent) => {
      if (keyEvent.key === "Escape") {
        close();
      }
    });
  }, []);

  return (
    <div className="fixed top-0 w-screen h-screen z-10 flex items-center justify-center">
      <div className="w-96 h-96 z-10 bg-white rounded-lg shadow-full p-2">
        <div className="flex flex-col gap-8 items-center">
          <div className="w-full flex gap-2 justify-between">
            <button>
              <IoResize />
            </button>
            <button onClick={onCloseClick}>
              <IoMdClose />
            </button>
          </div>
          <input
            className="border border-black rounded-lg p-2"
            type="text"
            placeholder="event name"
            onChange={onTitleChange}
          />
          <button
            className="py-2 px-4 border border-black rounded-lg w-fit"
            onClick={onAddClick}
          >
            Add Event
          </button>
        </div>
      </div>
    </div>
  );
};
export default App;
