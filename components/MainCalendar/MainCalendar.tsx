"use client";

import styles from "./MainCalendar.module.scss";

const MainCalendar = () => {
  return (
    <div className={styles.container}>
      <div className={styles.calendar}>
        {[...Array(5)].map((e, ind) =>
          [...Array(7)].map((e, i) => (
            <div key={i} className={styles.day}>
              {i}
              <div key={i} className={styles.event}>
                <p>event name</p>
                <p>event name</p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default MainCalendar;
