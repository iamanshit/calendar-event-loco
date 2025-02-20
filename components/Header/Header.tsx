"use client"; // Ensure Zustand store runs only on the client

import dayjs from "dayjs";
import { useCallback } from "react";
import { FcCalendar } from "react-icons/fc";
import { MdNavigateBefore, MdNavigateNext } from "react-icons/md";
import calendarStore from "../../app/store/calendarStore";
import styles from "./Header.module.scss";

export default function Header() {
  const { setMonth, currMonth }: any = calendarStore();

  const getChangedMonth = useCallback(
    (offset: number) => {
      setMonth(currMonth + offset);
    },
    [currMonth, setMonth]
  );

  return (
    <div className={styles.mainContainer}>
      <div className={styles.mainHead}>
        <div className={styles.left}>
          <div className={styles.appNameBadg}>
            <FcCalendar size={30} />
            <h2 className={styles.appName}>Calendar</h2>
            <div className={styles.nav}>
              <button
                className={styles.button}
                onClick={() => setMonth(dayjs().month())}
              >
                Today
              </button>
              <MdNavigateBefore onClick={() => getChangedMonth(-1)} size={30} />
              <MdNavigateNext onClick={() => getChangedMonth(1)} size={30} />
            </div>
          </div>
        </div>
        <div className={styles.currDate}>
          <p>
            {dayjs(new Date(dayjs().year(), currMonth, dayjs().date())).format(
              "DD MMMM YYYY"
            )}
          </p>
        </div>
      </div>
    </div>
  );
}
