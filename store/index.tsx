import { localStorageName, todayDate } from "@/utils/constants";
import { persist, createJSONStorage } from "zustand/middleware";
import { create } from "zustand";
import { chain } from "lodash";
import moment from "moment";

interface Event {
  name: string;
  time: string;
  invitees: { email: string }[];
}
interface Store {
  eventList: { id: string; events: Event[] }[];
  currentDate: string;
  getEventList: (date: string) => Event[];
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
        const events = chain(get().eventList)
          .filter({ id: curentID })
          .head()
          .get("events", [])
          .value();

        return events;
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
      partialize: () => ({}),
    }
  )
);

export default useStore;
