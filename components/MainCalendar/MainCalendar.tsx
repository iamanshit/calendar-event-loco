"use client";

import { Fragment } from "react";
import calendarStore from "../../app/store/calendarStore";
import Modal from "../Modal/Modal";
import DayView from "./DayView/DayView";
import styles from "./MainCalendar.module.scss";

export default function MainCalendar() {
  const { datesArray, isModalOpen, openModal, closeModal, setDate } =
    calendarStore();

  const handleClick = (day) => {
    openModal();
    setDate(day);
  };
  return (
    <>
      <div className={styles.container}>
        {datesArray.map((row, rInd) =>
          row.map((day, colInd) => (
            <Fragment key={colInd}>
              <DayView
                day={day}
                rInd={rInd}
                handleClick={(e) => {
                  e.preventDefault();
                  handleClick(day);
                }}
                openModal={openModal}
              />
            </Fragment>
          ))
        )}
      </div>
      {isModalOpen && <Modal onClose={closeModal} />}
    </>
  );
}
