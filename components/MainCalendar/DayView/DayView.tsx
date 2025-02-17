import * as dayjs from "dayjs";
import styles from "./DayView.module.scss";
export default function DayView({ day, rInd, handleClick }) {
  return (
    <li className={styles.day} onClick={handleClick}>
      {rInd === 0 && <h4>{day.format("ddd").toUpperCase()}</h4>}
      <p
        className={
          day.format("DD-MM-YY") === dayjs().format("DD-MM-YY")
            ? styles.highlight
            : ""
        }
      >
        {day.date() === 1 ? day.format("MMM D") : day.format("D")}
      </p>
      <div className={styles.event}>
        <p>event name</p>
        <p>event name</p>
      </div>
    </li>
  );
}
