import { Flex, HStack } from "@chakra-ui/react";
import SelectedMonth from "../molecules/SelectedMonth";
import MonthSetter from "../molecules/MonthSetter";
import TodaySetter from "../molecules/TodaySetter";
import AddEvent from "../molecules/AddEvent";

export default function Header() {
  return (
    <Flex align="center" justify="space-between" as="header">
      <HStack spacing="4">
        <TodaySetter />
        <MonthSetter />
        <SelectedMonth />
      </HStack>
      <AddEvent />
    </Flex>
  );
}
