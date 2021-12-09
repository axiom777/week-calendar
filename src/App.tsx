import "./App.css";
import { prepareCalndar } from "./handlers";
import { AppState } from "./interfaces";
import Cell from "./Cell";
import React from "react";

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
}
