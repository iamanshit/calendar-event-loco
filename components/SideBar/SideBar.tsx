"use client"; // Ensure Zustand store runs only on the client

import dayjs from "dayjs";
import useCalendarStore from "../../app/store/calendarStore";
import styles from "./SideBar.module.scss";

export default function SideBar() {
  const { events } = useCalendarStore();
  const todayFirstTask = events.filter((event: any) => {
    return event.date === dayjs(new Date()).format("DD/MM/YYYY");
  });
  console.log(todayFirstTask);
  return (
    <div className={styles.mainContainer}>
      <div className={styles.eventCtn}>
        <div className={styles.heading}>
          <p>Event Quick View</p>
        </div>
        {todayFirstTask[0] ? (
          <>
            <div className={styles.eventDetail}>
              <p className={styles.title}>
                <span>Title:</span> {todayFirstTask[0].title}
              </p>
              <p className={styles.date}>
                <span>Date:</span> {todayFirstTask[0].date}
              </p>
            </div>
            <div className={styles.description}>
              <p>
                <span>Description:</span> {todayFirstTask[0].description}
              </p>
            </div>
          </>
        ) : (
          <div className={styles.noEvent}>
            <p>No events scheduled for today.</p>
          </div>
        )}
      </div>
    </div>
  );
}
