import { chain, toNumber } from "lodash";

import moment from "moment";

export default function getMonthCalendar(currentDate: string, totalDays = 28) {
  const listOfWeeks = [];

  const month = toNumber(moment(currentDate).format("MM")) - 1;
  const year = toNumber(moment(currentDate).format("YYYY"));

  const yearMonth = [year, month];

  const startDate = moment(yearMonth).clone().startOf("month").startOf("week");
  const endDate = moment(yearMonth).clone().endOf("month");

  const day = startDate.clone().subtract(1, "day");

  while (day.isBefore(endDate, "day")) {
    listOfWeeks.push(
      Array(7)
        .fill(0)
        .map(() => day.add(1, "day").clone().toISOString())
    );
  }

  const listOfDays = chain(listOfWeeks)
    .flatten()
    .filter((_item, index) => index < totalDays)
    .value();

  return listOfDays;
}
