import { RiArrowLeftSLine, RiArrowRightSLine } from "react-icons/ri";
import { ButtonGroup, IconButton } from "@chakra-ui/react";
import useStore from "@/store";

export default function MonthSetter() {
  const setPrevMonth = useStore((state) => state.setPrevMonth);
  const setNextMonth = useStore((state) => state.setNextMonth);

  return (
    <ButtonGroup>
      <IconButton
        onClick={setPrevMonth}
        aria-label="previous-month"
        variant="ghost"
      >
        <RiArrowLeftSLine />
      </IconButton>
      <IconButton
        onClick={setNextMonth}
        aria-label="next-month"
        variant="ghost"
      >
        <RiArrowRightSLine />
      </IconButton>
    </ButtonGroup>
  );
}
