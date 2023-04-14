import { localStorageName, todayDate } from "@/utils/constants";
import { persist, createJSONStorage } from "zustand/middleware";
import { chain, cloneDeep, compact, findIndex } from "lodash";
import { create } from "zustand";

import moment from "moment";

interface Event {
  invitees: { email: string }[];
  index?: number;
  events: any[];
  name: string;
  time: string;
}
interface Store {
  currentDate: string;
  eventList: { id: string; events: Event[] }[];
  getEventList: (date: string) => Event[];
  editEvent: (data: any, Paylod: Event) => void;
  addEvent: (payload: Event) => void;
  deleteEvent: (data: any) => void;
  setTodayDate: () => void;
  setPrevMonth: () => void;
  setNextMonth: () => void;
}

const useStore = create(
  persist<Partial<Store>>(
    (set, get) => ({
      eventList: [],
      currentDate: todayDate,
      getEventList: (date) => {
        const curentID = moment(date).format("YYYYMMDD");
        const events: any = chain(get().eventList)
          .filter({ id: curentID })
          .head()
          .get("events", [])
          .value();

        return events;
      },
      addEvent: (payload) => {
        const eventId = moment(payload.time).format("YYYYMMDD");
        const eventIndex = findIndex(get().eventList, { id: eventId });

        const newEventList = cloneDeep(get().eventList) || [];

        if (eventIndex === -1) {
          newEventList.push({ id: eventId, events: [payload] });
        } else {
          newEventList[eventIndex].events.push(payload);
        }

        set({ eventList: newEventList });
      },
      deleteEvent: (data) => {
        const eventId = moment(data.time).format("YYYYMMDD");
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
      editEvent: (data, { index, ...payload }) => {
        const oldEventId = moment(data.time).format("YYYYMMDD");
        const newEventId = moment(payload.time).format("YYYYMMDD");
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
