import {
  ModalOverlay,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalBody,
  Modal,
} from "@chakra-ui/react";
import { defaultvalueEmptyString } from "@/utils/constants";
import { memo, useCallback, useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import { get } from "lodash";

import EventInvitees from "./EventInvitees";
import EventActions from "./EventActions";
import EventName from "./EventName";
import EventTime from "./EventTime";
import useStore from "@/store";

interface EventModalProps {
  onClose: () => void;
  isOpen: boolean;
  date: string;
  data?: any;
}

function EventModal({ isOpen, onClose, date, data }: EventModalProps) {
  const getEventList = useStore((state) => state.getEventList);
  const deleteEvent = useStore((state) => state.deleteEvent);
  const editEvent = useStore((state) => state.editEvent);
  const addEvent = useStore((state) => state.addEvent);

  const eventInitialState = useMemo(
    () =>
      data
        ? {
            ...data,
            invitees: [{ email: defaultvalueEmptyString }, ...data.invitees],
          }
        : {
            name: defaultvalueEmptyString,
            invitees: [{ email: defaultvalueEmptyString }],
            time: date,
          },
    [data, date]
  );

  const { handleSubmit, getValues, setValue, register, reset, watch } = useForm(
    {
      defaultValues: eventInitialState,
    }
  );

  const resetEvent = useCallback(() => {
    reset();
    onClose();
  }, [onClose, reset]);

  function addInvitees() {
    const newInviteesValue = [
      { email: defaultvalueEmptyString },
      ...getValues("invitees"),
    ];

    setValue("invitees", newInviteesValue);
  }

  function removeInvitees(inviteesRemovedIndex: number) {
    const newInviteesValue = getValues("invitees").filter(
      (_item: any, index: number) => index !== inviteesRemovedIndex
    );

    setValue("invitees", newInviteesValue);
  }

  function onSubmit(value: any) {
    const invitees = value.invitees.filter(
      (_item: any, index: number) => index !== 0
    );

    const payload = { ...value, invitees };

    if (window) {
      const buttonType: any = get(window, "event.submitter.name");

      switch (buttonType) {
        case "edit":
          const { index, ...dataPayload } = payload;
          editEvent?.(data, dataPayload);
          reset({
            ...dataPayload,
            invitees: [{ email: defaultvalueEmptyString }, ...invitees],
          });
          break;
        case "delete":
          deleteEvent?.(data);
          break;
        case "add":
          addEvent?.(payload);
          break;
        default:
          resetEvent();
          break;
      }
    }

    resetEvent();
  }

  useEffect(() => {
    !data && setValue("time", date);
  }, [data, date, setValue]);

  const isActionDisable = useMemo(() => {
    const events = getEventList?.(watch("time")) || [];

    return events?.length >= 2 && data?.time !== watch("time");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getEventList, watch("time")]);

  return (
    <Modal {...{ isOpen, onClose }}>
      <ModalOverlay />
      <ModalContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <ModalHeader>
            <EventName {...{ register }} />
          </ModalHeader>
          <ModalBody>
            <EventTime {...{ register, watch }} />
            <EventInvitees
              {...{ removeInvitees, addInvitees, register, watch }}
            />
          </ModalBody>
          <ModalFooter>
            <EventActions
              isDeletable={data ? true : false}
              {...{ resetEvent, isActionDisable }}
            />
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
}

export default memo(EventModal);
