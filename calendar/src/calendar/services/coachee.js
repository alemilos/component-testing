import { eventTypes } from "../Provider";
import { api } from "../api";
import { v4 as uuidv4 } from "uuid";
import { utils } from "../utils";

export const coacheeServices = {
  addEvent: async function (data) {
    const { date, timeRange } = data;
    const event = {
      id: uuidv4(),
      start: utils.changeDateTime(date, timeRange.start),
      end: utils.changeDateTime(date, timeRange.end),
      title: "Appointment",
      type: eventTypes.APPOINTMENT,
    };

    const res = await api.post(event);
    if (res.ok) return { ok: true, data: res.data, event };
    return { ok: false, err: res.err, event };
  },

  deleteEvent: async function (data) {
    const { event } = data;

    const res = await api.post("Test delete");
    if (res.ok) return { ok: true, data: res.data, event };
    return { ok: false, err: res.err, event };
  },

  editEvent: async function (data) {
    const { event } = data;

    const res = await api.post("test edit");
    if (res.ok) return { ok: true, data: res.data, event };
    return { ok: false, err: res.err, event };
  },
};
