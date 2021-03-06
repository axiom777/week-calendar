import React from "react";
import { config, Hour } from "./interfaces";

type CellProps = Hour;
class Cell extends React.Component<CellProps> {
  render() {
    // eslint-disable-next-line
    const { timeForm, timeTo, calendrEvents } = this.props;
    const fromStr = timeForm.toLocaleString("RU-ru", {
      hour: "2-digit",
      minute: "2-digit",
    });
    const toStr = timeTo.toLocaleString("RU-ru", {
      hour: "2-digit",
      minute: "2-digit",
    });
    const hoursString = `${fromStr} - ${toStr}`;

    const attrs = {
      "data-from": new Date(timeForm).toISOString(),
      "data-to": new Date(timeTo).toISOString(),
    };

    return (
      <div
        style={{ height: `${config.cellHeightPx}px` }}
        className="time"
        title={hoursString}
        {...attrs}
      ></div>
    );
  }
}

export default Cell;
