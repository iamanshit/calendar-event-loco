"use client";
import { useEffect, useState } from "react";
import useCalendarStore from "../../app/store/calendarStore";
import styles from "./Modal.module.scss";

const EventModal = ({ onClose }) => {
  const { userSelectedDate, addEvent, deleteEvent, closeModal, selectedEvent } =
    useCalendarStore();
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const error = "Something missing from event details";
  const [showError, setShowError] = useState(false);

  useEffect(() => {
    if (selectedEvent) {
      setTitle(selectedEvent.title);
      setDesc(selectedEvent.description);
    }
  }, [selectedEvent]);

  const handleAddEvent = () => {
    if (title.trim() !== "" && desc.trim() !== "") {
      addEvent({
        id:
          userSelectedDate.format("DDMMYYYY") +
          (Math.random() + 1).toString(36).substring(7),
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

  const handleUpdateEvent = () => {
    if (title.trim() !== "" && desc.trim() !== "") {
      addEvent({
        id: selectedEvent.id,
        date: selectedEvent.date,
        title: title.trim(),
        description: desc.trim(),
      });
      setShowError(false);
      closeModal();
      return;
    }
    setShowError(true);
  };

  const handleDeleteEvent = (id) => {
    deleteEvent(id);
    setShowError(false);
    closeModal();
    setTitle("");
    setDesc("");
  };

  return (
    <div className={styles.modal}>
      <div className={styles.modalContent}>
        <h2>
          {selectedEvent
            ? `Event for ${selectedEvent?.date}`
            : `Add Event for ${userSelectedDate.format("DD/MM/YYYY")}`}
        </h2>
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
          <button onClick={selectedEvent ? handleUpdateEvent : handleAddEvent}>
            {" "}
            {selectedEvent ? "Update" : "Add Event"}
          </button>
          <button
            className={styles.close}
            onClick={
              selectedEvent
                ? () => handleDeleteEvent(selectedEvent.id)
                : onClose
            }
          >
            {selectedEvent ? "Delete" : "Close"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default EventModal;
