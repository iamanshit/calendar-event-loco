"use client";

import { Fragment } from "react";
import calendarStore from "../../app/store/calendarStore";
import DayView from "./DayView/DayView";
import styles from "./MainCalendar.module.scss";

export default function MainCalendar() {
  const { datesArray } = calendarStore();

  return (
    <div className={styles.container}>
      <div className={styles.calendar}>
        {datesArray.map((row, rInd) =>
          row.map((day, colInd) => (
            <Fragment key={colInd}>
              <DayView day={day} rInd={rInd} />
            </Fragment>
          ))
        )}
      </div>
    </div>
  );
}
