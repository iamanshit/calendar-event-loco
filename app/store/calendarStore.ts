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
        setMonth: (index: any) => {
          set({ datesArray: getDaysOfCurrentMonth(index), currMonth: index });
        },

        isModalOpen: false,
        openModal: () => set({ isModalOpen: true }),
        closeModal: () => set({ isModalOpen: false }),

        userSelectedDate: null,
        setDate: (date: any) => set({ userSelectedDate: date }),

        selectedEvent: null,
        fetchSelectedEvent: (event: any) =>
          set({ isModalOpen: true, selectedEvent: event }),

        events: [],

        addEvent: (event: any) =>
          set((state: any) => ({ events: state.events.concat(event) })),

        updateEvent: (updatedEvent: any) =>
          set((state: any) => ({
            events: state.events.map((event: any) =>
              event.id === updatedEvent.id ? updatedEvent : event
            ),
            selectedEvent: null,
          })),

        deleteEvent: (id: number) =>
          set((state: any) => ({
            events: state.events.filter((event: any) => event.id !== id),
            selectedEvent: null,
          })),
      }),
      { name: "calendar-storage" }
    )
  )
);

export default calendarStore;
