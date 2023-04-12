import { extendTheme } from "@chakra-ui/react";
import colorScheme from "./colorScheme";
import size from "./size";

const theme = extendTheme(colorScheme, size);

export default theme;
