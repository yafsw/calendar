import { defaultComponentColorScheme } from "@/utils/constants";
import { withDefaultColorScheme } from "@chakra-ui/react";

const colorScheme = withDefaultColorScheme({
  colorScheme: defaultComponentColorScheme,
});

export default colorScheme;
