"use client"; // Ensure Zustand store runs only on the client

import dayjs from "dayjs";
import calendarStore, {
  CalendarEventType,
} from "../../../app/store/calendarStore";
import styles from "./DayView.module.scss";

type DayViewProps = {
  day: dayjs.Dayjs;
  rInd: number;
  handleClick: (e: any) => void;
};

export default function DayView({ day, rInd, handleClick }: DayViewProps) {
  const { events, fetchSelectedEvent }: any = calendarStore();
  const dayObject = dayjs(day);

  const handleOnEventClick = (event: CalendarEventType) => {
    fetchSelectedEvent(event);
  };

  return (
    <li
      key={dayObject.format("DD-MM-YYYY")}
      className={`${styles.day} ${styles.fadeIn}`}
      onClick={handleClick}
    >
      {rInd === 0 && <h4>{dayObject.format("ddd").toUpperCase()}</h4>}
      <div className={styles.innerWrapper}>
        <p
          className={
            dayObject.format("DD-MM-YY") === dayjs().format("DD-MM-YY")
              ? styles.highlight
              : ""
          }
        >
          {dayObject.date() === 1
            ? dayObject.format("MMM D")
            : dayObject.format("D")}
        </p>
        <>
          {events && events?.length > 0 && (
            <div className={styles.event}>
              {events.map((event: CalendarEventType, id: number) => {
                if (event?.date.toString() === dayObject.format("DD/MM/YYYY")) {
                  return (
                    <p
                      onClick={(e) => {
                        e.stopPropagation();
                        handleOnEventClick(event);
                      }}
                      key={id}
                    >
                      {event?.title.slice(0, 10)}
                    </p>
                  );
                }
              })}
            </div>
          )}
        </>
      </div>
    </li>
  );
}
