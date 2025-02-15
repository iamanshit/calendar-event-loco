import Link from "next/link";
import { FcCalendar } from "react-icons/fc";
import styles from "./home.module.scss";

export default function Home() {
  return (
    <div className={styles.mainContainer}>
      <div className={styles.wrapper}>
        <h1 className={styles.mainHeading}>
          Let&apos;s make this day productive
          <span>
            <FcCalendar />
          </span>
        </h1>
        <Link href={"/calendar"}>
          <button className={styles.button}>Get Started</button>
        </Link>
      </div>
    </div>
  );
}
