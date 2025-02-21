"use client"; // Ensure Zustand store runs only on the client

import dayjs from "dayjs";
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { getDaysOfCurrentMonth } from "../../utils/getMonthDays";

export type CalendarEventType = {
  id: string;
  title: string;
  date: string | number;
  description: string;
};

type CalendarStore = {
  datesArray: dayjs.Dayjs[][];
  currMonth: number;
  setMonth: (index: number) => void;
  isModalOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
  userSelectedDate: dayjs.Dayjs | null;
  setDate: (date: dayjs.Dayjs) => void;
  selectedEvent: CalendarEventType | null;
  fetchSelectedEvent: (event: any) => void;
  events: CalendarEventType[];
  addEvent: (event: CalendarEventType) => void;
  updateEvent: (event: CalendarEventType) => void;
  deleteEvent: (id: string) => void;
};

const calendarStore = create<CalendarStore>()(
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
        closeModal: () => set({ isModalOpen: false, selectedEvent: null }),

        userSelectedDate: null,
        setDate: (date) => set({ userSelectedDate: date }),

        selectedEvent: null,
        fetchSelectedEvent: (event) =>
          set({ isModalOpen: true, selectedEvent: event }),

        events: [],

        addEvent: (event) =>
          set((state) => ({ events: state.events.concat(event) })),

        updateEvent: (updatedEvent) =>
          set((state: any) => ({
            events: state.events.map((event: CalendarEventType) =>
              event.id === updatedEvent.id ? updatedEvent : event
            ),
            selectedEvent: null,
          })),

        deleteEvent: (id) =>
          set((state) => ({
            events: state.events.filter(
              (event: CalendarEventType) => event.id !== id
            ),
            selectedEvent: null,
          })),
      }),
      { name: "calendar-storage" }
    )
  )
);

export default calendarStore;
