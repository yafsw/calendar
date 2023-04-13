import getMonthCalendar from "@/utils/getMonthCalendar";
import DayInformation from "./DayInformation";
import useStore from "@/store";

export default function MonthCalendar() {
  const currentDate = useStore((state) => state.currentDate) || "";

  return (
    <>
      {getMonthCalendar(currentDate).map((item, index) => (
        <DayInformation key={index} index={index} date={item} />
      ))}
    </>
  );
}
