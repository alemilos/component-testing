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
    case "start_fetch":
      console.log("finished fetching");
      break;
  }
}

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
      dispatch({ type: "start_fetch", payload: events });
    }

    fetchEventsOnMount();

    return () => {};
  }, []);

  async function syncWithGoogle() {
    await services.google();
  }

  async function syncWithApple() {
    await services.apple();
  }

  return (
    <CalendarContext.Provider
      value={{ user, calendarStore: store, syncWithGoogle, syncWithApple }}
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
