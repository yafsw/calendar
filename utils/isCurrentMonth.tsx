import moment from "moment";

export default function isCurrentMonth(itemDate: string, currentDate: string) {
  const curentMonth = moment(currentDate).format("MM");
  const itemMonth = moment(itemDate).format("MM");

  const isCurrent = curentMonth === itemMonth;

  return isCurrent;
}
