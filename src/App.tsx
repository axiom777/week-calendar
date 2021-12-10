import "./App.css";
import { prepareCalndar } from "./handlers";
import { AppState, GroupEvent } from "./interfaces";
import Cell from "./Cell";
import React from "react";
import { mockEvents } from "./mockEvents";
import EventsGroup from "./EventsGroup";

export default class App extends React.Component<{}, AppState> {
  public weekRef = React.createRef<HTMLDivElement>();

  constructor(props: AppState) {
    super(props);
    this.state = {
      calendar: prepareCalndar(),
      mounted: false,
    };
  }
  componentDidMount() {
    this.setState({ mounted: true });
  }

  render() {
    const { calendar } = this.state;
    return (
      <div className="App">
        <div className="weekCalendar" ref={this.weekRef}>
          {calendar.map((day, i) => (
            <div key={`${i}Day`} className="day">
              {day.map((time, index) => (
                <Cell key={`${index}+cell`} {...time} />
              ))}
            </div>
          ))}
          {this.state.mounted &&
            this.groupEvents().map((group, index) => (
              <EventsGroup key={index} group={group} weekRef={this.weekRef} />
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
    const lnip: GroupEvent[] = [];

    // searching for longest not intersected continues periods
    for (let event of events) {
      const { from, to } = event;
      const isFirst = lnip.length === 0;
      if (isFirst) lnip.push({ dates: [from, to], events: [event] });
      if (!isFirst) {
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
    }

    return lnip;
  }
}
