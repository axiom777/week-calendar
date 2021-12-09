import "./App.css";
import { prepareCalndar } from "./handlers";
import { AppState } from "./interfaces";
import Cell from "./Cell";
import React from "react";
import { CalendarEvent, mockEvents } from "./mockEvents";

export default class App extends React.Component<{}, AppState> {
  constructor(props: AppState) {
    super(props);
    this.state = {
      calendar: prepareCalndar(),
    };
  }

  render() {
    const { calendar } = this.state;
    return (
      <div className="App">
        <div className="weekCalendar">
          {calendar.map((day, i) => (
            <div key={`${i}Day`} className="day">
              {day.map((time, index) => (
                <Cell key={`${index}+cell`} {...time} />
              ))}
            </div>
          ))}
        </div>
      </div>
    );
  }

  groupEvents() {
    const events = mockEvents.sort(
      (a, b) => a.from.getTime() - b.from.getTime()
    );

    // longest not intersected periods
    const lnip: { dates: [Date, Date]; events: CalendarEvent[] }[] = [];

    // searching for longest not intersected continues periods
    for (let event of events) {
      const { from, to } = event;
      if (lnip.length === 0) lnip.push({ dates: [from, to], events: [event] });
      const currentLnip = lnip[lnip.length - 1];
      const toLnip = currentLnip.dates[1];

      if (from.getTime() < toLnip.getTime()) {
        currentLnip.dates[1] = new Date(
          Math.max(toLnip.getTime(), to.getTime())
        );
        currentLnip.events.push(event);
      } else {
        lnip.push({ dates: [from, to], events: [event] });
      }
    }

    console.log(JSON.stringify(lnip, null, 2));
    return lnip;
  }
}
