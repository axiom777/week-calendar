export type CalendarEvent = {
  from: Date;
  to: Date;
  title: string;
  descr: string;
};

export const mockEvents: CalendarEvent[] = [
  {
    from: new Date("2021-12-06T12:00:00"),
    to: new Date("2021-12-06T12:30:00"),
    title: "Event 1",
    descr:
      "Event DescriptionEvent DescriptionEvent DescriptionEvent DescriptionEvent Description"
  },
  {
    from: new Date("2021-12-06T12:00:00"),
    to: new Date("2021-12-06T15:00:00"),
    title: "Event 2",
    descr:
      "Event DescriptionEvent DescriptionEvent DescriptionEvent DescriptionEvent Description"
  },
  {
    from: new Date("2021-12-06T15:00:00"),
    to: new Date("2021-12-06T17:30:00"),
    title: "Event 3",
    descr:
      "Event DescriptionEvent DescriptionEvent DescriptionEvent DescriptionEvent Description"
  },
  {
    from: new Date("2021-12-06T12:30:00"),
    to: new Date("2021-12-06T15:30:00"),
    title: "Event 4",
    descr:
      "Event DescriptionEvent DescriptionEvent DescriptionEvent DescriptionEvent Description"
  }
];

