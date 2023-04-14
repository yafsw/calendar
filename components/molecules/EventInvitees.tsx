import {
  FormControl,
  IconButton,
  Center,
  HStack,
  Input,
  Stack,
} from "@chakra-ui/react";
import { RiAddLine, RiCloseLine, RiGroupLine } from "react-icons/ri";
import { memo } from "react";

interface EventInviteesProps {
  removeInvitees: Function;
  addInvitees: Function;
  register: Function;
  watch: Function;
}

function EventInvitees({
  removeInvitees,
  addInvitees,
  register,
  watch,
}: EventInviteesProps) {
  return (
    <HStack spacing="4" align="start">
      <Center fontSize="xl" mt="3">
        <RiGroupLine />
      </Center>
      <Stack w="100%" spacing="0">
        {watch("invitees").map((_item: any, index: number) => (
          <HStack key={index}>
            <FormControl>
              <Input
                {...register(`invitees.${index}.email`)}
                placeholder="Add invitees by email"
                variant="flushed"
                type="email"
              />
            </FormControl>
            <IconButton
              onClick={() =>
                index === 0 ? addInvitees() : removeInvitees(index)
              }
              aria-label={`${index === 0 ? "add" : "delete"}-invitees`}
              colorScheme={index === 0 ? "blue" : "red"}
              isDisabled={
                index === 0 ? watch("invitees")[0].email === "" : false
              }
              variant="ghost"
              fontSize="xl"
            >
              {index === 0 ? <RiAddLine /> : <RiCloseLine />}
            </IconButton>
          </HStack>
        ))}
      </Stack>
    </HStack>
  );
}

export default memo(EventInvitees);
