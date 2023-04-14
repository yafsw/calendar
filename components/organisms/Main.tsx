import { Grid } from "@chakra-ui/react";

import MonthCalendar from "../molecules/MonthCalendar";
import AllDaysName from "../molecules/AllDaysName";

export default function Section() {
  return (
    <Grid templateColumns="repeat(7, 1fr)" as="main">
      <AllDaysName />
      <MonthCalendar />
    </Grid>
  );
}
