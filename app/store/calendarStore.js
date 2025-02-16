"use client"; // Ensure Zustand store runs only on the client

import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

const calendarStore = create(
  devtools(
    persist(
      (set) => ({
        currMonth: new Date().getMonth(),
        setMonth: (month) => set({ currMonth: month }),

        currYear: new Date().getFullYear(),
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
      { name: "calendar_view" }
    )
  )
);

export default calendarStore;
