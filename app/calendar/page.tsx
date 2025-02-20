import Header from "@/components/Header/Header";
import dynamic from "next/dynamic";
import styles from "./calendar.module.scss";

const MainCalendar = dynamic(
  () => import("@/components/MainCalendar/MainCalendar")
);
const SideBar = dynamic(() => import("@/components/SideBar/SideBar"));

export default function Calendar() {
  return (
    <div className={styles.mainContainer}>
      <div className={styles.appShell}>
        <Header />
        <div className={styles.wrapper}>
          <SideBar />
          <MainCalendar />
        </div>
      </div>
    </div>
  );
}
