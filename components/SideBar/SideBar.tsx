import styles from "./SideBar.module.scss";
export default function SideBar() {
  return (
    <div className={styles.mainContainer}>
      <div className={styles.eventCtn}>
        <div className={styles.heading}>
          <p>Event Quick View</p>
        </div>
        <div className={styles.eventDetail}>
          <p className={styles.title}>
            <span>Title:</span> Get groceries
          </p>
          <p className={styles.date}>
            <span>Date:</span> 23/04/2024
          </p>
          <p className={styles.time}>
            <span>Start Time:</span> 13:00
          </p>
          <p className={styles.time}>
            <span>End Time:</span> 14:00
          </p>
        </div>
        <div className={styles.description}>
          <p>
            <span>Description:</span> Go to mart and get groceries.
          </p>
        </div>
      </div>
    </div>
  );
}
