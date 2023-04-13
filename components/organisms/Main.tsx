import { Grid } from "@chakra-ui/react";
import AllDaysName from "../molecules/AllDaysName";
import MonthCalendar from "../molecules/MonthCalendar";

export default function Section() {
  return (
    <Grid templateColumns="repeat(7, 1fr)" as="main">
      <AllDaysName />
      <MonthCalendar />
    </Grid>
  );
}
