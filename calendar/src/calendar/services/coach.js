import { v4 as uuidv4 } from "uuid";
import { utils } from "../utils";
import { eventTypes } from "../Provider";
import { api } from "../api";

export const coachServices = {
  addEvent: async function (data) {
    const { date, timeRange } = data;
    const event = {
      id: uuidv4(),
      start: utils.changeDateTime(date, timeRange.start),
      end: utils.changeDateTime(date, timeRange.end),
      title: "Blocked",
      type: eventTypes.BLOCKING,
    };

    return { data: await api.post(event), event };
  },

  addRecurrentEvent: async function (data) {
    const { recurrenceType, recurrenceDurationWeeks, timeRange, date } = data;

    const event = {
      id: uuidv4(),
      title: "Blocked",
      groupId: uuidv4(),
      startTime: timeRange.start,
      endTime: timeRange.end,
      duration: utils.calcDuration(timeRange.start, timeRange.end),

      // extended props
      isRecurrent: true,
      type: eventTypes.BLOCKING,
    };

    // Set recurrence on the calendar
    let daysOfWeek; // for weekly recurrence
    if (recurrenceType === "all-working-day") {
      daysOfWeek = [1, 2, 3, 4, 5];
      event.daysOfWeek = daysOfWeek;
    } else if (recurrenceType === "every-week") {
      daysOfWeek = [dateRange.start.getDay()]; // the same day of the week
      event.daysOfWeek = daysOfWeek;
    } else if (recurrenceType === "every-month") {
      // TODO
      event.rrule = {
        freq: "monthly",
        dtstart: utils.formatYearMonthDay(date),
      };
    }

    return { data: await api.post(event), event };
  },

  deleteEvent: async function (data) {
    return { data: await api.post("TEST"), event };
  },
};
