import Header from "@/components/Header/Header";
import MainCalendar from "@/components/MainCalendar/MainCalendar";
import SideBar from "@/components/SideBar/SideBar";

import styles from "./calendar.module.scss";
export default function Calendar() {
  return (
    <div className={styles.mainContainer}>
      <div className={styles.appShell}>
        <Header></Header>
        <div className={styles.wrapper}>
          <SideBar />
          <MainCalendar />
        </div>
      </div>
    </div>
  );
}
