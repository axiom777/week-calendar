export type CalendarEvent = {
  from: Date;
  to: Date;
  title: string;
  descr: string;
};

export const mockEvents: CalendarEvent[] = [
  {
    from: new Date("2021-12-06T11:10:00Z"),
    to: new Date("2021-12-06T12:10:00Z"),
    title: "Event 0",
    descr:
      "Event DescriptionEvent DescriptionEvent DescriptionEvent DescriptionEvent Description"
  },
  {
    from: new Date("2021-12-06T11:11:00Z"),
    to: new Date("2021-12-06T12:30:00Z"),
    title: "Event 1",
    descr:
      "Event DescriptionEvent DescriptionEvent DescriptionEvent DescriptionEvent Description"
  },
  {
    from: new Date("2021-12-06T12:00:00Z"),
    to: new Date("2021-12-06T15:10:00Z"),
    title: "Event 2",
    descr:
      "Event DescriptionEvent DescriptionEvent DescriptionEvent DescriptionEvent Description"
  },
  {
    from: new Date("2021-12-06T15:00:00Z"),
    to: new Date("2021-12-06T17:30:00Z"),
    title: "Event 3",
    descr:
      "Event DescriptionEvent DescriptionEvent DescriptionEvent DescriptionEvent Description"
  },
  {
    from: new Date("2021-12-06T18:20:00Z"),
    to: new Date("2021-12-06T19:00:00Z"),
    title: "Event 4",
    descr:
      "Event DescriptionEvent DescriptionEvent DescriptionEvent DescriptionEvent Description"
  },
  {
    from: new Date("2021-12-07T12:30:00Z"),
    to: new Date("2021-12-07T15:30:00Z"),
    title: "Event 5",
    descr:
      "Event DescriptionEvent DescriptionEvent DescriptionEvent DescriptionEvent Description"
  },
  {
    from: new Date("2021-12-09T02:30:00Z"),
    to: new Date("2021-12-09T15:30:00Z"),
    title: "Event 6",
    descr:
      "Event DescriptionEvent DescriptionEvent DescriptionEvent DescriptionEvent Description"
  }
];

