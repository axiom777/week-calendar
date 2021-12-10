import React from "react";
import { GroupEvent } from "./interfaces";
import Event from "./Event";

export type EventWithPosition = GroupEvent["events"][number] & {
  position: React.HTMLAttributes<HTMLDivElement>["style"];
};

type EventsGropProps = {
  group: GroupEvent;
  weekRef: React.RefObject<HTMLDivElement>;
};

class EventsGrop extends React.Component<EventsGropProps> {
  render() {
    const { events } = this.props.group;
    console.log(events)

    const preparedEvents = this.prepareEventsColumns(events);

    if (!preparedEvents) {
      return null;
    }

    return (
      <div>
        {preparedEvents.map((event) => (
          <Event {...event} />
        ))}
      </div>
    );
  }

  private prepareEventsColumns(
    events: GroupEvent["events"]
  ): EventWithPosition[] | null {
    const sortedByPeriodEvents = events.sort(
      (a, b) =>
        b.to.getTime() - b.from.getTime() - (a.to.getTime() - a.from.getTime())
    );

    const groupedEvents: GroupEvent["events"][] = [];

    // creating group columns
    for (let event of sortedByPeriodEvents) {
      const { from, to } = event;

      let isFoundSpace = false;

      if (groupedEvents.length === 0) {
        groupedEvents.push([event]);
        isFoundSpace = true;
      }

      for (let column of groupedEvents) {
        if (isFoundSpace) break;

        for (let i = 0; i < column.length; i++) {
          const eventInGroup = column[i];
          const { from: groupFrom, to: groupTo } = eventInGroup;

          const isFirst = i === 0;
          const isLast = i === column.length - 1;

          // can I insert before
          if (isFirst && to.getTime() <= groupFrom.getTime()) {
            column.unshift(event);
            isFoundSpace = true;
            break;
          }

          //  can I insert to end
          if (isLast && from.getTime() >= groupTo.getTime()) {
            column.push(event);
            isFoundSpace = true;
            break;
          }

          //  can I insert between prev and current
          if (!isFirst) {
            const { to: prevTo } = column[i - 1];
            if (
              from.getTime() >= prevTo.getTime() &&
              to.getTime() <= groupFrom.getTime()
            ) {
              isFoundSpace = true;
              column.splice(i, 0, event);
              break;
            }
          }
        }
      }
      if (!isFoundSpace) {
        groupedEvents.push([event]);
      }
    }

    // Add positions to Events
    const eventsWithPosition: EventWithPosition[] = [];
    const columnsTotal = groupedEvents.length;

    if (columnsTotal === 0) return null;

    groupedEvents.forEach((column, columnIndex) => {
      column.forEach((event) => {
        const { from, to } = event;
        const position = this.createPosition({
          from,
          to,
          columnsTotal,
          column: columnIndex,
        });
        if (!position) return;
        eventsWithPosition.push({ ...event, position });
      });
    });

    return eventsWithPosition;
  }

  private createPosition(data: {
    from: Date;
    to: Date;
    column: number;
    columnsTotal: number;
  }): {
    top: number;
    left: number;
    height: number;
    width: number;
  } | void {
    const { weekRef } = this.props;
    const { from, to, column, columnsTotal } = data;
    const weekElement = weekRef.current;
    if (weekElement === null) return;

    // normalizing periods
    const newFrom = new Date(from);
    const newTo = new Date(to);
    let topMinutsDiff = 0;
    let bottomMinutsDiff = 0;

    if (from.getMinutes() < 30) {
      topMinutsDiff = from.getMinutes();
      newFrom.setMinutes(0);
    } else {
      topMinutsDiff = from.getMinutes() - 30;
      newFrom.setMinutes(30);
    }

    if (to.getMinutes() > 0 && to.getMinutes() < 30) {
      bottomMinutsDiff = to.getMinutes();
      newTo.setMinutes(30);
    } else if (to.getMinutes() > 30) {
      bottomMinutsDiff = to.getMinutes() - 30;
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

    const cellHeight = endDOMElement.clientHeight;
    const minuteHeight = cellHeight / 30;

    const topOffsetInPx = topMinutsDiff * minuteHeight;
    const bottomOffsetInPx = bottomMinutsDiff * minuteHeight;

    const cellTopOffset = startDOMElement.offsetTop;
    const cellBottomOffset = endDOMElement.offsetTop + cellHeight;

    const widthElement = startDOMElement.clientWidth;
    const width = widthElement / columnsTotal;
    const top = cellTopOffset + topOffsetInPx + 1; //1px for border
    const left = startDOMElement.offsetLeft + width * column + 1; //1px for border
    const height =
      cellBottomOffset - cellTopOffset - topOffsetInPx - bottomOffsetInPx;
    return { top, left, height, width: width };
  }
}

export default EventsGrop;
