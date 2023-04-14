import { Tag, Text, useDisclosure } from "@chakra-ui/react";
import { randomColor } from "@/utils/constants";
import { memo } from "react";
import EventModal from "./EventModal";

interface EventInformationProps {
  events: { email: string }[];
  noOfLines: number;
  index: number;
  name: string;
  time: string;
}

function EventInformation({ noOfLines, ...props }: EventInformationProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Tag
        onClick={onOpen}
        colorScheme={randomColor[props.index]}
        borderRadius="0"
        cursor="pointer"
        display="block"
        zIndex="9"
        size="md"
        p="6px"
      >
        <Text as="span" {...{ noOfLines }}>
          {props.name}
        </Text>
      </Tag>
      <EventModal {...{ isOpen, onClose }} date={props.time} data={props} />
    </>
  );
}

export default memo(EventInformation);
