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
          set((state) => ({
            events: [
              ...state.events.filter((evnt) => evnt.id !== event.id),
              event,
            ],
          })),
        deleteEvent: (id) =>
          set((state) => ({
            events: state.events.filter((event) => event.id !== id),
            selectedEvent: null,
          })),
      }),
      { name: "calendar_view", skipHydration: true }
    )
  )
);

export default calendarStore;
