import { localStorageName, todayDate } from "@/utils/constants";
import { persist, createJSONStorage } from "zustand/middleware";
import { create } from "zustand";
import moment from "moment";

interface Store {
  currentDate: string;
  setTodayDate: () => void;
  setPrevMonth: () => void;
  setNextMonth: () => void;
}

const useStore = create(
  persist<Partial<Store>>(
    (set, get) => ({
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
      partialize: () => ({}),
    }
  )
);

export default useStore;
