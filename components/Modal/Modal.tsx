"use client";
import { useState } from "react";
import useCalendarStore from "../../app/store/calendarStore";
import styles from "./Modal.module.scss";

const EventModal = ({ onClose }) => {
  const { userSelectedDate, addEvent, closeModal } = useCalendarStore();
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const error = "Something missing from event details";
  const [showError, setShowError] = useState(false);

  const handleAddEvent = () => {
    if (title.trim() !== "" && desc.trim() !== "") {
      addEvent({
        id: userSelectedDate.format("DDMMYYYY"),
        date: userSelectedDate.format("DD/MM/YYYY"),
        title: title.trim(),
        description: desc.trim(),
      });
      setShowError(false);
      closeModal();
      return;
    }
    setShowError(true);
  };

  // const handleDelete = (id) => {
  //   deleteEvent(id);
  // };

  return (
    <div className={styles.modal}>
      <div className={styles.modalContent}>
        <h2>Add Event for {userSelectedDate.format("DD/MM/YYYY")}</h2>
        <input
          type="text"
          placeholder="Event Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="text"
          placeholder="Event Description"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
        />
        {showError && (
          <div className={styles.error}>
            <p>{error}</p>
          </div>
        )}
        <div className={styles.btnWrapperCtn}>
          <button onClick={handleAddEvent}>Add Event</button>
          <button className={styles.close} onClick={onClose}>
            Close
          </button>
        </div>
        {/* <div className="event-list">
          {events
            .filter((e) => e.date === date)
            .map((event) => (
              <div key={event.id} className="event-item">
                <span>{event.title}</span>
                <button>X</button>
              </div>
            ))}
        </div> */}
      </div>
    </div>
  );
};

export default EventModal;
