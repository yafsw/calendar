import moment from "moment";

export default function getFullDateText(date: string) {
  const dateText = moment(date).format("dddd, D MMMM YYYY - HH:mm");

  return dateText;
}
