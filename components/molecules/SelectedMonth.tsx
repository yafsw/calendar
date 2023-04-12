import { Heading } from "@chakra-ui/react";
import { useMemo } from "react";
import useStore from "@/store";
import moment from "moment";

export default function SelectedMonth() {
  const currentDate = useStore((state) => state.currentDate);

  const currentMonth = useMemo(() => {
    const monthText = moment(currentDate).format("MMMM YYYY");

    return monthText;
  }, [currentDate]);

  return <Heading fontWeight="medium">{currentMonth}</Heading>;
}
