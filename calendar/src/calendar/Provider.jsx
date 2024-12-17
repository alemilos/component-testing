import { createContext, useContext, useEffect, useReducer } from "react";
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

    case "LOADING_START":
      return {
        ...state,
        loading: true,
      };
    case "LOADING_END":
      return {
        ...state,
        loading: false,
      };

    case "ADD_EVENT":
      if (!action.payload?.type)
        throw new Error("Event Type must be specified");

      return {
        ...state,
        events: [...state.events, action.payload],
      };

    case "ADD_REC_EVENT":
      break;

    case "EDIT_EVENT":
      if (!action.payload?.event) throw new Error("Event must be provided");

      return {
        ...state,
        events: state.events.map((event) => {
          // When event matches the id
          if (event.id === action.payload.event.id) {
            console.log("----------------------------");
            console.log(event);
            console.log(action.payload.event);
            console.log("----------------------------");
            return {
              ...event,
              start: action.payload.event.start,
              end: action.payload.event.end,
            };
          }

          return event;
        }),
      };

    case "EDIT_REC_EVENT":
      break;

    case "DEL_EVENT":
      if (!action.payload?.event) throw new Error("Event must be provided");

      return {
        ...state,
        events: state.events.filter(
          (event) => event.id !== action.payload.event.id
        ),
      };

    case "DEL_REC_EVENT":
      if (!action.payload.type)
        throw new Error("Recurrency type must be provided");

      if (action.payload.type === "all") {
        return {
          ...state,
          events: [...state.events].filter(
            // filter with same group id (all)
            (event) => event.groupId === action.payload.groupId
          ),
        };
      } else if (action.payload.type === "this-and-following") {
        // TODO: elimino gli eventi a partire dalla data dell'evento selezionato
        // Ricreo un evento ricorrente con le stesse proprietà dell'altro con end limit la data dell'evento selezionato.

        return {
          ...state,
          events: [...state.events].filter(
            (event) => event.groupId === action.payload.groupId && false
          ),
        };
      } else throw new Error("Invalid recurrency type");

      break;

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
  console.log(store);

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
    dispatch({ type: "LOADING_START" });
    await services.google();
    dispatch({ type: "LOADING_END" });
  }

  async function syncWithAppleService() {
    dispatch({ type: "LOADING_START" });
    await services.apple();
    dispatch({ type: "LOADING_END" });
  }

  async function addEventService(event) {
    dispatch({ type: "LOADING_START" });
    await services.post(event);
    dispatch({ type: "LOADING_END" });
  }

  async function editEventService(event) {
    dispatch({ type: "LOADING_START" });
    await services.post(event);
    dispatch({ type: "LOADING_END" });
  }

  async function deleteEventService(event) {
    dispatch({ type: "LOADING_START" });
    await services.post(event);
    dispatch({ type: "LOADING_END" });
  }

  return (
    <CalendarContext.Provider
      value={{
        user,
        // Reducer state
        calendarStore: store,
        calendarDispatch: dispatch,
        // Services
        syncWithGoogleService,
        syncWithAppleService,
        addEventService,
        editEventService,
        deleteEventService,
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
