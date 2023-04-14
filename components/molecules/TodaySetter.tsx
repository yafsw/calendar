import { Button } from "@chakra-ui/react";

import useStore from "@/store";

export default function TodaySetter() {
  const setTodayDate = useStore((state) => state.setTodayDate);

  return (
    <Button variant="outline" onClick={setTodayDate}>
      Today
    </Button>
  );
}
