import { createContext, useContext, useReducer, useState } from "react";

const CalendarContext = createContext();

/**
 * Reducer for the calendar
 * @param {*} state
 * @param {*} action
 */
function reducer(state, action) {}

const initialStore = {
  events: [],
};

/**
 * Store or Provider for the calendar.
 * @param {*} param0
 * @returns
 */
const CalendarProvider = ({ children }) => {
  const { services } = useBackend();

  const [store, dispatch] = useReducer(reducer, initialStore);

  return (
    <CalendarContext.Provider value={{}}>{children}</CalendarContext.Provider>
  );
};

export default CalendarProvider;

export function useCalendar() {
  const context = useContext(CalendarContext);
  if (!context)
    throw new Error("useCalendar must be used within CalendarProvider");
  return context;
}
