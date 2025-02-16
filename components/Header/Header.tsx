"use client";

import * as dayjs from "dayjs";
import { FcCalendar } from "react-icons/fc";
import { MdNavigateBefore, MdNavigateNext } from "react-icons/md";
import calendarStore from "../../app/store/calendarStore";
import styles from "./Header.module.scss";

export default function Header() {
  const { setMonth, currMonth } = calendarStore();

  const getCurrMonth = () => {
    setMonth(dayjs().month());
  };

  const getPrvMonth = () => {
    setMonth(currMonth - 1);
  };

  const getNxtMonth = () => {
    setMonth(currMonth + 1);
  };
  return (
    <div className={styles.mainContainer}>
      <div className={styles.mainHead}>
        <div className={styles.left}>
          <div className={styles.appNameBadg}>
            <FcCalendar size={30} />
            <h2 className={styles.appName}>Calendar</h2>
            <div className={styles.nav}>
              <button className={styles.button} onClick={getCurrMonth}>
                Today
              </button>
              <MdNavigateBefore onClick={getPrvMonth} size={30} />
              <MdNavigateNext onClick={getNxtMonth} size={30} />
            </div>
          </div>
        </div>
        <div className={styles.currDate}>
          <p>
            {dayjs(new Date(dayjs().year(), currMonth)).format("MMMM YYYY")}
          </p>
        </div>
      </div>
    </div>
  );
}
