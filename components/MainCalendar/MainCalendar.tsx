"use client"; // Ensure Zustand store runs only on the client

import DayView from "@/components/MainCalendar/DayView/DayView";
import Modal from "@/components/Modal/Modal";
import dayjs from "dayjs";
import calendarStore from "../../app/store/calendarStore";
import styles from "./MainCalendar.module.scss";

export default function MainCalendar() {
  const { datesArray, isModalOpen, openModal, closeModal, setDate } =
    calendarStore();

  // sets the date for which event is to be created
  const handleClick = (day: dayjs.Dayjs) => {
    openModal();
    setDate(day);
  };
  return (
    <>
      <div className={styles.container}>
        {datesArray?.map((row, rInd: number) =>
          row?.map((day, colInd: number) => (
            <DayView
              key={colInd}
              day={day}
              rInd={rInd}
              handleClick={(e) => {
                e.preventDefault();
                handleClick(day);
              }}
            />
          ))
        )}
      </div>
      {isModalOpen && <Modal onClose={closeModal} />}
    </>
  );
}
