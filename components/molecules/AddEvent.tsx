import { useDisclosure, Button } from "@chakra-ui/react";
import { todayDate } from "@/utils/constants";
import { RiAddLine } from "react-icons/ri";

import getCurrentDateTime from "@/utils/getCurrentDateTime";
import EventModal from "./EventModal";
import useStore from "@/store";

export default function AddEvent() {
  const currentDate = useStore((state) => state.currentDate) || todayDate;

  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Button leftIcon={<RiAddLine />} onClick={onOpen}>
        Add Event
      </Button>
      <EventModal
        {...{ isOpen, onClose }}
        date={getCurrentDateTime(currentDate)}
      />
    </>
  );
}
