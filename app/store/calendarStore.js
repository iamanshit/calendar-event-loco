"use client"; // Ensure Zustand store runs only on the client

import * as dayjs from "dayjs";
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { getMonth } from "../../utils/getMonthDays";

const calendarStore = create(
  devtools(
    persist(
      (set) => ({
        datesArray: getMonth(),
        currMonth: dayjs().month(),
        setMonth: (index) => {
          set({ datesArray: getMonth(index), currMonth: index });
        },
        events: [],

        addEvent: (event) =>
          set((state) => ({
            events: [...state.events, event],
          })),

        updateEvent: (event) =>
          set((state) => ({
            events: [...state.events, (state.events[event.id] = event)],
          })),

        deleteEvent: (id) =>
          set((state) => ({
            events: state.events.filter((event) => event.id !== id),
          })),
      }),
      { name: "calendar_view", skipHydration: true }
    )
  )
);

export default calendarStore;
