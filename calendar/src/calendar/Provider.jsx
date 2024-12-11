import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import { useBackend } from "./useBackend";

const CalendarContext = createContext();

/**
 * Reducer for the calendar
 * @param {*} state
 * @param {*} action
 */
function reducer(state, action) {
  switch (action.type) {
    case "INIT_FETCH":
      console.log("finished fetching");
      return state;

    case "ADD_EVENT":
      if (!action.payload?.type)
        throw new Error("Event Type must be specified");

      return {
        ...state,
        events: [...state.events, action.payload],
      };

    case "DEL_EVENT":
      console.log("removing event...");

      return {
        ...state,
        events: state.events.filter((event) => event.id !== action.payload),
      };

    default:
      throw new Error("invalid dispatch action.type");
  }
}

export const eventTypes = {
  BLOCKING: "block",
  APPOINTMENT: "appointment",
  AVAILABILITY: "availability",
};

const initialStore = {
  loading: false,
  events: [],
  availability: [],
};

/**
 * Store or Provider for the calendar.
 * @param {*} param0
 * @returns
 */
const CalendarProvider = ({ children, user }) => {
  if (!["coach", "coachee"].includes(user))
    throw new Error("user must be 'coach' or 'coachee'");

  const { services } = useBackend();

  const [store, dispatch] = useReducer(reducer, initialStore);

  // On component mount: Fetch events
  useEffect(() => {
    async function fetchEventsOnMount() {
      const events = await services.get();
      dispatch({ type: "INIT_FETCH", payload: events });
    }

    fetchEventsOnMount();

    return () => {};
  }, []);

  /**
 * #############################
    Public Functions (services)
 * #############################
 */

  async function syncWithGoogleService() {
    await services.google();
  }

  async function syncWithAppleService() {
    await services.apple();
  }

  async function addEventService(event) {
    await services.post(event);
  }

  async function delEventService(eventId) {
    await services.post(eventId);
  }

  return (
    <CalendarContext.Provider
      value={{
        user,
        // Reducer state
        calendarStore: store,
        dispatch,
        // Services
        syncWithGoogleService,
        syncWithAppleService,
        addEventService,
        delEventService,
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
