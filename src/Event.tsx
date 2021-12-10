import React from "react";
import { EventWithPosition } from "./EventsGroup";

type EventProps = EventWithPosition;

export default class Event extends React.Component<EventProps> {
  componentDidMount() {}

  render() {
    const { from, to, title, descr, position } = this.props;
    const style: React.HTMLAttributes<HTMLDivElement>["style"] = {
      ...position,
      position: "absolute",
      backgroundColor: this.getRandomColor(),
      boxSizing: "border-box",
      padding: 5,
      overflow: "hidden",
    };
    return (
      <div
        className="event"
        style={style}
        title={`${from.toLocaleString(
          "RU-ru",
          this.localeDate
        )} - ${to.toLocaleString("RU-ru", this.localeDate)}`}
      >
        {title}
        <p style={{ filter: "invert(100%)", color: style.backgroundColor }}>
          {descr}
        </p>
      </div>
    );
  }

  localeDate: Intl.DateTimeFormatOptions = {
    hour: "2-digit",
    minute: "2-digit",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  };

  getRandomColor() {
    var letters = "0123456789ABCDEF";
    var color = "#";
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }
}
