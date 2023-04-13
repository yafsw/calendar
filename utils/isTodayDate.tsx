import moment from "moment";

export default function isTodayDate(itemDate: string) {
  const itemDay = moment(itemDate).format("MM-D");
  const currentDay = moment().format("MM-D");

  const isToday = itemDay === currentDay;

  return isToday;
}
