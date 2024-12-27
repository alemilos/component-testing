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

    return { data: await api.post(event), event };
  },
};
