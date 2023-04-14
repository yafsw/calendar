import { Button, ButtonGroup, Flex, Tooltip } from "@chakra-ui/react";
import { memo } from "react";

interface EventActionsProps {
  isActionDisable: boolean;
  isDeletable: boolean;
  resetEvent: any;
}

function EventActions({
  isDeletable = false,
  isActionDisable,
  resetEvent,
}: EventActionsProps) {
  return (
    <Flex
      w={isDeletable ? "100%" : "fit-content"}
      justify="space-between"
      align="center"
    >
      {isDeletable && (
        <Button colorScheme="red" variant="outline" type="submit" name="delete">
          Delete
        </Button>
      )}
      <ButtonGroup>
        <Button
          onClick={resetEvent}
          colorScheme="gray"
          variant="ghost"
          type="submit"
          name="close"
          size="md"
        >
          Cancel
        </Button>
        <Tooltip hasArrow label={isActionDisable && "Max 3 events per day"}>
          <Button
            isDisabled={isDeletable ? false : isActionDisable}
            name={isDeletable ? "edit" : "add"}
            type="submit"
            size="md"
          >
            {isDeletable ? "Edit" : "Add"} Event
          </Button>
        </Tooltip>
      </ButtonGroup>
    </Flex>
  );
}

export default memo(EventActions);
