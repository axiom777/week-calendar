import { CalendarEvent } from "./mockEvents";

export type Hour = {
  timeForm: Date;
  timeTo: Date;
  calendrEvents?: CalendarEvent;
};
export type Day = Hour[];

export const config = {
  startDate: new Date("2021-12-06T00:00:00"),
  endDate: new Date("2021-12-12T23:59:59"),
  cellMinuteRange: 30,
  cellHeightPx: 25,
};

export type AppState = {
  calendar: Day[];
  mounted: boolean;
};

export type GroupEvent = { dates: [Date, Date]; events: CalendarEvent[] };
