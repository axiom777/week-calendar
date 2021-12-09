import { config, Hour, Day } from "./interfaces";

export function prepareCalndar(): Day[] {
  const diffTime = config.endDate.getTime() - config.startDate.getTime();
  const dayCount = Math.ceil(diffTime / (3600 * 24 * 1000));

  const result: Day[] = [];

  let start = new Date(config.startDate);
  for (let i = 0; i < dayCount; i++) {
    const day: Hour[] = [];
    const endOfDay = new Date(start.getTime() + 86400000 - 1);

    while (start.getTime() < endOfDay.getTime()) {
      const timeForm = new Date(start);
      start = new Date(start.getTime() + config.cellMinuteRange * 60000);
      const timeTo = new Date(start);
      day.push({ timeForm, timeTo });
    }
    result.push(day);
  }
  return result;
}
