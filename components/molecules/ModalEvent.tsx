import {
  ModalOverlay,
  ModalContent,
  ButtonGroup,
  ModalFooter,
  ModalHeader,
  FormControl,
  IconButton,
  ModalBody,
  useConst,
  Button,
  HStack,
  Center,
  Input,
  Modal,
  Stack,
} from "@chakra-ui/react";
import {
  RiPencilLine,
  RiCloseLine,
  RiGroupLine,
  RiTimeLine,
  RiAddLine,
} from "react-icons/ri";
import { useForm } from "react-hook-form";
import { memo } from "react";
import getCurrentDateTime from "@/utils/getCurrentDateTime";
import getFullDateText from "@/utils/getFullDateText";
import useStore from "@/store";

interface ModalEventProps {
  onClose: () => void;
  isOpen: boolean;
}

function ModalEvent({ isOpen, onClose }: ModalEventProps) {
  const currentDate = useStore((state) => state.currentDate) || "";

  const eventInitialState = useConst({
    name: "",
    invitees: [{ email: "" }],
    time: getCurrentDateTime(currentDate),
  });

  const { reset, register, getValues, watch, setValue, handleSubmit } = useForm(
    {
      defaultValues: eventInitialState,
    }
  );

  function resetEvent() {
    reset();
    onClose();
  }

  function addInvitees() {
    setValue("invitees", [{ email: "" }, ...getValues("invitees")]);
  }

  function removeInvitees(inviteesRemovedIndex: number) {
    setValue(
      "invitees",
      getValues("invitees").filter(
        (_item, index) => index !== inviteesRemovedIndex
      )
    );
  }

  function onSubmit(values: any) {
    console.log(values);
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <ModalHeader>
            <FormControl>
              <Input
                {...register("name", {
                  required: "This is required",
                })}
                fontWeight="semibold"
                placeholder="Name"
                variant="flushed"
                color="blue.500"
                fontSize="2xl"
              />
            </FormControl>
          </ModalHeader>
          <ModalBody>
            <HStack spacing="4">
              <Center fontSize="xl">
                <RiTimeLine />
              </Center>
              <HStack w="100%">
                <Input
                  value={getFullDateText(getValues("time"))}
                  variant="flushed"
                  isReadOnly
                />
                <IconButton
                  aria-label="edit-date"
                  variant="ghost"
                  fontSize="xl"
                >
                  <RiPencilLine />
                </IconButton>
              </HStack>
            </HStack>
            <HStack spacing="4" align="start">
              <Center fontSize="xl" mt="3">
                <RiGroupLine />
              </Center>
              <Stack w="100%" spacing="0">
                {watch("invitees").map((_item, index) => (
                  <HStack key={index}>
                    <Input
                      {...register(`invitees.${index}.email`)}
                      placeholder="Add invitees by email"
                      variant="flushed"
                    />
                    <IconButton
                      onClick={() =>
                        index === 0 ? addInvitees() : removeInvitees(index)
                      }
                      aria-label={`${index === 0 ? "add" : "delete"}-invitees`}
                      colorScheme={index === 0 ? "blue" : "red"}
                      variant="ghost"
                      fontSize="xl"
                    >
                      {index === 0 ? <RiAddLine /> : <RiCloseLine />}
                    </IconButton>
                  </HStack>
                ))}
              </Stack>
            </HStack>
          </ModalBody>
          <ModalFooter>
            <ButtonGroup>
              <Button
                onClick={resetEvent}
                colorScheme="gray"
                variant="ghost"
                size="md"
              >
                Cancel
              </Button>
              <Button size="md" type="submit">
                Add Event
              </Button>
            </ButtonGroup>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
}

export default memo(ModalEvent);
