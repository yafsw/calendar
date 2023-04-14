import { memo, useEffect, useMemo, useState } from "react";
import { Box, Card, Grid, useDisclosure } from "@chakra-ui/react";

import EventInformation from "./EventInformation";
import EventModal from "./EventModal";
import DateTitle from "./DateTitle";
import useStore from "@/store";

interface DayInformationProps {
  index: number;
  date: string;
}

function DayInformation({ index, date }: DayInformationProps) {
  const getEventList = useStore((state) => state.getEventList);
  const eventList = useStore((state) => state.eventList);

  const [show, setShow] = useState(false);

  const events = useMemo(() => {
    const events = eventList && getEventList ? getEventList(date) : [];

    return events;
  }, [date, getEventList, eventList]);

  useEffect(() => {
    setShow(true);
  }, []);

  const { isOpen, onOpen, onClose } = useDisclosure();

  return !show ? null : (
    <>
      <Card
        borderLeft={(index % 7 !== 0 && "none") || ""}
        position="relative"
        variant="outline"
        borderRadius="0"
        borderTop="none"
        cursor="pointer"
        h="136px"
      >
        <Box
          onClick={onOpen}
          position="absolute"
          bgColor="white"
          w="100%"
          h="100%"
        />
        <DateTitle date={date} onClick={onOpen} />
        <Grid templateRows={`repeat(${events.length}, 1fr)`} h="100%">
          {events.map((item, index) => (
            <EventInformation
              {...{ ...item, index }}
              noOfLines={5 - events.length}
              key={index}
            />
          ))}
        </Grid>
      </Card>
      <EventModal {...{ isOpen, onClose, date }} />
    </>
  );
}

export default memo(DayInformation);
