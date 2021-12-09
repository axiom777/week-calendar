import React from "react";
import { GroupEvent } from "./interfaces";

type EventsGropProps = {
  group: GroupEvent;
  weekRef: React.RefObject<HTMLDivElement>;
};

class EventsGrop extends React.Component<EventsGropProps> {
  render() {
    const { group } = this.props;
    const [from, to] = group.dates;

    const positions = this.groupPosition();
    if (!positions) {
      console.error("Can`t find positions`");
      return null;
    }

    const { top, left, width, height } = positions;

    const styles: React.HTMLAttributes<HTMLDivElement>["style"] = {
      position: "absolute",
      top,
      left,
      width,
      height,
      backgroundColor: this.getRandomColor(),
    };

    //console.log(JSON.stringify(this.props.group, null, 2));
    const locale: Intl.DateTimeFormatOptions = {
      hour: "2-digit",
      minute: "2-digit",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    };

    return (
      <div style={styles}>
        {from.toLocaleString("RU-ru", locale)}
        <br/>
        {to.toLocaleString("RU-ru", locale)}
      </div>
    );
  }

  private groupPosition(): {
    top: number;
    left: number;
    height: number;
    width: number;
  } | void {
    const { group, weekRef } = this.props;
    const [from, to] = group.dates;
    const weekElement = weekRef.current;
    if (weekElement === null) return;

    // normalizing periods
    const newFrom = new Date(from);
    const newTo = new Date(to);

    if (from.getMinutes() < 30) {
      newFrom.setMinutes(0);
    } else {
      newFrom.setMinutes(30);
    }

    if (to.getMinutes() > 0 && to.getMinutes() < 30) {
      newTo.setMinutes(30);
    } else if (to.getMinutes() > 30) {
      newTo.setMinutes(30);
      newTo.setHours(newTo.getHours() + 1);
    }

    const startDOMElement = weekElement.querySelector(
      `div[data-from="${newFrom.toISOString()}"]`
    );

    const endDOMElement = weekElement.querySelector(
      `div[data-to="${newTo.toISOString()}"]`
    );
    const isElementsExists =
      startDOMElement instanceof HTMLElement &&
      endDOMElement instanceof HTMLElement;
    if (!isElementsExists) return;

    const top = startDOMElement.offsetTop;
    const left = startDOMElement.offsetLeft;
    const height =
      endDOMElement.offsetTop - top + endDOMElement.clientHeight + 2;
    const width = startDOMElement.clientWidth + 2; //2px for border
    return { top, left, height, width };
  }

  getRandomColor() {
    var letters = "0123456789ABCDEF";
    var color = "#";
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }
}

export default EventsGrop;
