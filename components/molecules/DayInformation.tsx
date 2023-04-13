import { Card, Grid, Tag, Text } from "@chakra-ui/react";
import { randomColor } from "@/utils/constants";
import { memo, useMemo } from "react";
import DateTitle from "./DateTitle";
import useStore from "@/store";

interface DayInformationProps {
  index: number;
  date: string;
}

function DayInformation({ index, date }: DayInformationProps) {
  const getEventList = useStore((state) => state.getEventList);

  const eventList = useMemo(() => {
    const events = getEventList ? getEventList(date) : [];

    return events;
  }, [date, getEventList]);

  return (
    <Card
      borderLeft={(index % 7 !== 0 && "none") || ""}
      position="relative"
      variant="outline"
      borderRadius="0"
      borderTop="none"
      h="136px"
    >
      <DateTitle date={date} />
      <Grid templateRows={`repeat(${eventList.length}, 1fr)`} h="100%">
        {eventList.map(({ name }, index) => (
          <Tag
            key={index}
            colorScheme={randomColor[index]}
            borderRadius="0"
            display="block"
            size="md"
            p="6px"
          >
            <Text noOfLines={5 - eventList.length}>{name}</Text>
          </Tag>
        ))}
      </Grid>
    </Card>
  );
}

export default memo(DayInformation);
