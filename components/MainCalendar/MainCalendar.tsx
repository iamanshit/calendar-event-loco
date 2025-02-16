"use client";

import { getMonth } from "@/utils/getMonthDays";
import { Fragment } from "react";
import DayView from "./DayView/DayView";
import styles from "./MainCalendar.module.scss";
const MainCalendar = () => {
  const dateArray = getMonth();

  return (
    <div className={styles.container}>
      <div className={styles.calendar}>
        {dateArray.map((row, rInd) =>
          row.map((day, colInd) => (
            <Fragment key={colInd}>
              <DayView day={day} rInd={rInd} />
            </Fragment>
          ))
        )}
      </div>
    </div>
  );
};

export default MainCalendar;
