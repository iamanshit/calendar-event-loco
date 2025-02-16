"use client";

import "./MainCalendar.scss";

const MainCalendar = () => {
  return (
    <div className="container">
      <div className="calendar">
        {[...Array(5)].map((e, ind) =>
          [...Array(7)].map((e, i) => (
            <div key={i} className="day">
              {i}
              <div key={i} className="event">
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
