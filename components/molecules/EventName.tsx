import { FormControl, Input, useConst } from "@chakra-ui/react";
import { memo } from "react";

interface EventNameProps {
  register: Function;
}

function EventName({ register }: EventNameProps) {
  const inputPayload = useConst({
    required: true,
  });

  return (
    <FormControl>
      <Input
        {...register("name", inputPayload)}
        fontWeight="semibold"
        placeholder="Name"
        variant="flushed"
        color="blue.500"
        fontSize="2xl"
      />
    </FormControl>
  );
}

export default memo(EventName);
