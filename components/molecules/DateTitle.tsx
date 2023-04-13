import {
  defaultWhiteColor,
  outMonthTextColor,
  inMonthTextColor,
  todayDate,
  defaultColor,
} from "@/utils/constants";
import { Heading } from "@chakra-ui/react";
import { useMemo } from "react";
import isCurrentMonth from "@/utils/isCurrentMonth";
import isTodayDate from "@/utils/isTodayDate";
import useStore from "@/store";
import moment from "moment";

interface DateTitleProps {
  date: string;
}

export default function DateTitle({ date }: DateTitleProps) {
  const currentDate = useStore((state) => state.currentDate) || todayDate;

  const color = useMemo(() => {
    const monthTextColor = isCurrentMonth(date, currentDate)
      ? inMonthTextColor
      : outMonthTextColor;

    const dayTextColor = isTodayDate(date) ? defaultWhiteColor : monthTextColor;

    return dayTextColor;
  }, [currentDate, date]);

  const bgColor = useMemo(() => {
    const dayBgColor = isTodayDate(date) ? defaultColor : defaultWhiteColor;

    return dayBgColor;
  }, [date]);

  return (
    <Heading
      {...{ color, bgColor }}
      borderEndStartRadius="md"
      position="absolute"
      fontSize="md"
      right="0"
      w="36px"
      h="36px"
      top="0"
      p="2"
    >
      {moment(date).format("D")}
    </Heading>
  );
}