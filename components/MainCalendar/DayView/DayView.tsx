import * as dayjs from "dayjs";
import calendarStore from "../../../app/store/calendarStore";
import styles from "./DayView.module.scss";

export default function DayView({ day, rInd, handleClick }) {
  const { events } = calendarStore();
  return (
    <li className={styles.day} onClick={handleClick}>
      {rInd === 0 && <h4>{day.format("ddd").toUpperCase()}</h4>}
      <div className={styles.innerWrapper}>
        <p
          className={
            day.format("DD-MM-YY") === dayjs().format("DD-MM-YY")
              ? styles.highlight
              : ""
          }
        >
          {day.date() === 1 ? day.format("MMM D") : day.format("D")}
        </p>
        <>
          {events && events.length > 0 && (
            <div className={styles.event}>
              {events.map((event, id) => {
                if (event.date === day.format("DD/MM/YYYY")) {
                  return <p key={id}>{event.title.slice(0, 10)}</p>;
                }
              })}
            </div>
          )}
        </>
      </div>
    </li>
  );
}
