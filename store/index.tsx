import { dateIDFormat, localStorageName, todayDate } from "@/utils/constants";
import { persist, createJSONStorage } from "zustand/middleware";
import { chain, cloneDeep, compact, findIndex } from "lodash";
import { create } from "zustand";

import moment from "moment";

interface Event {
  invitees: { email: string }[];
  index?: number;
  name: string;
  time: string;
}
interface Store {
  eventList: { id: string; events: Event[] }[];
  getEventList: (date: string) => Event[];
  deleteEvent: (data: any) => void;
  addEvent: (payload: Event) => void;
  editEvent: (data: any, Paylod: Event) => void;

  currentDate: string;
  setTodayDate: () => void;
  setPrevMonth: () => void;
  setNextMonth: () => void;
}

const useStore = create(
  persist<Partial<Store>>(
    (set, get) => ({
      eventList: [],
      getEventList: (date) => {
        const curentID = moment(date).format(dateIDFormat);
        const events: any = chain(get().eventList)
          .filter({ id: curentID })
          .head()
          .get("events", [])
          .value();

        return events;
      },
      deleteEvent: (data) => {
        const eventId = moment(data.time).format(dateIDFormat);
        const eventIndex = findIndex(get().eventList, { id: eventId });

        const newEventList = cloneDeep(get().eventList) || [];

        delete newEventList[eventIndex].events[data.index];

        newEventList[eventIndex].events = compact(
          newEventList[eventIndex].events
        );

        newEventList[eventIndex].events.length === 0 &&
          delete newEventList[eventIndex];

        set({ eventList: compact(newEventList) });
      },
      addEvent: (payload) => {
        const eventId = moment(payload.time).format(dateIDFormat);
        const eventIndex = findIndex(get().eventList, { id: eventId });

        const newEventList = cloneDeep(get().eventList) || [];

        if (eventIndex === -1) {
          newEventList.push({ id: eventId, events: [payload] });
        } else {
          newEventList[eventIndex].events.push(payload);
        }

        set({ eventList: newEventList });
      },
      editEvent: (data, { index, ...payload }) => {
        const oldEventId = moment(data.time).format(dateIDFormat);
        const newEventId = moment(payload.time).format(dateIDFormat);
        const oldEventIndex = findIndex(get().eventList, { id: oldEventId });
        const newEventIndex = findIndex(get().eventList, { id: newEventId });

        const newEventList = cloneDeep(get().eventList) || [];

        if (newEventIndex === -1) {
          newEventList.push({ id: newEventId, events: [payload] });

          delete newEventList[oldEventIndex].events[data.index];

          newEventList[oldEventIndex].events = compact(
            newEventList[oldEventIndex].events
          );

          newEventList[oldEventIndex].events.length === 0 &&
            delete newEventList[oldEventIndex];
        } else {
          newEventList[oldEventIndex].events[data.index] = payload;
        }

        set({ eventList: compact(newEventList) });
      },

      currentDate: todayDate,
      setTodayDate: () => set({ currentDate: todayDate }),
      setPrevMonth: () =>
        set({
          currentDate: moment(get().currentDate)
            .add(-1, "months")
            .toISOString(),
        }),
      setNextMonth: () =>
        set({
          currentDate: moment(get().currentDate)
            .add(+1, "months")
            .toISOString(),
        }),
    }),

    {
      name: localStorageName, // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ eventList: state.eventList }),
    }
  )
);

export default useStore;
