import { FcCalendar } from "react-icons/fc";
import { MdNavigateBefore, MdNavigateNext } from "react-icons/md";
import styles from "./Header.module.scss";

export default function Header() {
  return (
    <div className={styles.mainContainer}>
      <div className={styles.mainHead}>
        <div className={styles.left}>
          <div className={styles.appNameBadg}>
            <FcCalendar size={30} />
            <h2 className={styles.appName}>Calendar</h2>
            <div className={styles.nav}>
              <button className={styles.button}>Today</button>
              <MdNavigateBefore size={30} />
              <MdNavigateNext size={30} />
            </div>
          </div>
        </div>
        <div className={styles.currDate}>
          <p>23 January 2024</p>
        </div>
        <div className={styles.right}>
          <button className={styles.button}>Create Event</button>
        </div>
      </div>
    </div>
  );
}
