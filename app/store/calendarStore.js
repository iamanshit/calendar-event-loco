"use client"; // Ensure Zustand store runs only on the client

import * as dayjs from "dayjs";
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

const calendarStore = create(
  devtools(
    persist(
      (set) => ({
        currMonth: dayjs().month(),
        setMonth: (month) => set({ currMonth: month }),

        currYear: dayjs().year(),
        setYear: (year) => set({ currYear: year }),

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
