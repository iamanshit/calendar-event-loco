"use client"; // Ensure Zustand store runs only on the client

import DayView from "@/components/MainCalendar/DayView/DayView";
import Modal from "@/components/Modal/Modal";
import calendarStore from "../../app/store/calendarStore";
import styles from "./MainCalendar.module.scss";

export default function MainCalendar() {
  const { datesArray, isModalOpen, openModal, closeModal, setDate } =
    calendarStore();

  const handleClick = (day: any) => {
    openModal();
    setDate(day);
  };
  return (
    <>
      <div className={styles.container}>
        {datesArray?.map((row: any, rInd: number) =>
          row?.map((day: any, colInd: number) => (
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
