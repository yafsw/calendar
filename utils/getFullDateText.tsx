import { dateTextFormat } from "./constants";

import moment from "moment";

export default function getFullDateText(date: string) {
  const dateText = moment(date).format(dateTextFormat);

  return dateText;
}
