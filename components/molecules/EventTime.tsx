import {
  useBoolean,
  IconButton,
  Center,
  HStack,
  Input,
  Flex,
} from "@chakra-ui/react";
import { RiEyeLine, RiPencilLine, RiTimeLine } from "react-icons/ri";
import { memo } from "react";

import getFullDateText from "@/utils/getFullDateText";

interface EventTimeProps {
  register: Function;
  watch: Function;
}

function EventTime({ register, watch }: EventTimeProps) {
  const [isEdit, setIsEdit] = useBoolean();

  return (
    <HStack spacing="4">
      <Center fontSize="xl">
        <RiTimeLine />
      </Center>
      <Flex gap="8px" w="100%">
        <Input
          {...register("time")}
          display={isEdit ? "initial" : "none"}
          type="datetime-local"
          variant="flushed"
        />
        <Input
          value={getFullDateText(watch("time"))}
          display={isEdit ? "none" : "initial"}
          variant="flushed"
          isReadOnly
        />
        <IconButton
          onClick={setIsEdit.toggle}
          aria-label="edit-date"
          variant="ghost"
          fontSize="xl"
        >
          {isEdit ? <RiEyeLine /> : <RiPencilLine />}
        </IconButton>
      </Flex>
    </HStack>
  );
}

export default memo(EventTime);
