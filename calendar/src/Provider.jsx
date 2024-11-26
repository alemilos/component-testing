import { createContext, useContext, useState } from "react";

const CalendarContext = createContext();

const CalendarProvider = ({ children }) => {
  const [events, setEvents] = useState([]);

  console.log(events);

  function syncWithGoogle() {}

  function addEvent(event) {
    setEvents((prev) => {
      return [...prev, { ...event, isTemp: false }];
    });
  }

  function updateEvent(updatedEvent) {
    console.log(updatedEvent);
    const eventId = updatedEvent.id;

    setEvents(
      events.map((event) =>
        event.id === eventId
          ? {
              ...event,
              start: updatedEvent.startStr,
              end: updatedEvent.endStr,
            }
          : event
      )
    );
  }

  function removeEvent() {}
  function editEvent() {}

  function addTemporaryEvent(event) {
    console.log(event);
    setEvents((prev) => {
      return [...prev, { ...event, isTemp: true }];
    });
  }

  function updateTemporaryEvent(eventId, payload) {
    setEvents(
      events.map((event) =>
        eventId === event.id && event.isTemp ? { ...event, ...payload } : event
      )
    );
  }

  function clearTemporaryEvents() {
    setEvents(events.filter((event) => !event.isTemp));
  }

  return (
    <CalendarContext.Provider
      value={{
        events,
        addEvent,
        updateEvent,
        addTemporaryEvent,
        updateTemporaryEvent,
        clearTemporaryEvents,
      }}
    >
      {children}
    </CalendarContext.Provider>
  );
};

export default CalendarProvider;

export function useCalendar() {
  const context = useContext(CalendarContext);
  if (!context)
    throw new Error("useCalendar must be used within CalendarProvider");
  return context;
}
