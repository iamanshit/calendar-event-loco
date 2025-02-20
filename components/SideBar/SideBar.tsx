"use client"; // Ensure Zustand store runs only on the client

import dayjs from "dayjs";
import { Fragment, useMemo } from "react";
import calendarStore from "../../app/store/calendarStore";
import styles from "./SideBar.module.scss";

export default function SideBar() {
  const { events }: any = calendarStore();
  const todayFirstTask = useMemo(() => {
    return events.filter(
      (event: any) => event?.date === dayjs().format("DD/MM/YYYY")
    );
  }, [events]);

  const taskDetailsObject = [
    { head: "Date:", value: todayFirstTask[0]?.date },
    { head: "Title:", value: todayFirstTask[0]?.title },
    { head: "Description:", value: todayFirstTask[0]?.description },
  ];
  return (
    <div className={styles.mainContainer}>
      <div className={styles.eventCtn}>
        <div className={styles.heading}>
          <p>Event Quick View</p>
        </div>
        {todayFirstTask && todayFirstTask[0] ? (
          taskDetailsObject.map((item, index) => {
            return (
              <Fragment key={index}>
                <div className={styles.border}></div>
                <div className={styles.eventDetail}>
                  <p className={styles.head}>{item.head}</p>
                  <div className={styles.info}>
                    <p>{item.value}</p>
                  </div>
                </div>
              </Fragment>
            );
          })
        ) : (
          <div className={styles.noEvent}>
            <p>No events scheduled for today.</p>
          </div>
        )}
      </div>
    </div>
  );
}
