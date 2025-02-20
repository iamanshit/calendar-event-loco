"use client"; // Ensure Zustand store runs only on the client

import dayjs from "dayjs";
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { getDaysOfCurrentMonth } from "../../utils/getMonthDays";

const calendarStore = create(
  devtools(
    persist(
      (set) => ({
        datesArray: getDaysOfCurrentMonth(),
        currMonth: dayjs().month(),
        setMonth: (index) => {
          set({ datesArray: getDaysOfCurrentMonth(index), currMonth: index });
        },

        isModalOpen: false,
        openModal: () => set({ isModalOpen: true }),
        closeModal: () => set({ isModalOpen: false }),

        userSelectedDate: null,
        setDate: (date) => set({ userSelectedDate: date }),

        selectedEvent: null,
        fetchSelectedEvent: (event) =>
          set({ isModalOpen: true, selectedEvent: event }),

        events: [],

        addEvent: (event) =>
          set((state) => ({ events: state.events.concat(event) })),

        updateEvent: (updatedEvent) =>
          set((state) => ({
            events: state.events.map((event) =>
              event.id === updatedEvent.id ? updatedEvent : event
            ),
            selectedEvent: null,
          })),

        deleteEvent: (id) =>
          set((state) => ({
            events: state.events.filter((event) => event.id !== id),
            selectedEvent: null,
          })),
      }),
      { name: "calendar-storage", skipHydration: true }
    )
  )
);

export default calendarStore;
