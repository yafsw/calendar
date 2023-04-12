import { useDisclosure, Button } from "@chakra-ui/react";
import { RiAddLine } from "react-icons/ri";
import ModalEvent from "./ModalEvent";

export default function AddEvent() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Button leftIcon={<RiAddLine />} onClick={onOpen}>
        Add Event
      </Button>
      <ModalEvent isOpen={isOpen} onClose={onClose} />
    </>
  );
}
