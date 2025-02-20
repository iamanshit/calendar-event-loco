"use client";
import { useCallback, useEffect, useState } from "react";
import useCalendarStore from "../../app/store/calendarStore";
import styles from "./Modal.module.scss";

export default function EventModal({ onClose }: { onClose: () => void }) {
  const { userSelectedDate, addEvent, deleteEvent, closeModal, selectedEvent } =
    useCalendarStore();
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (
      selectedEvent &&
      (selectedEvent.title !== title || selectedEvent.description !== desc)
    ) {
      setTitle(selectedEvent.title);
      setDesc(selectedEvent.description);
    }
  }, [selectedEvent, title, desc]);

  const handleAddEvent = useCallback(() => {
    if (title.trim() && desc.trim()) {
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
    if (!title.trim()) setErrorMessage("Title is required.");
    if (!desc.trim()) setErrorMessage("Description is required.");
    setShowError(true);
  }, [title, desc, userSelectedDate, addEvent, closeModal]);

  const handleUpdateEvent = () => {
    if (title.trim() && desc.trim()) {
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
    if (!title.trim()) setErrorMessage("Title is required.");
    if (!desc.trim()) setErrorMessage("Description is required.");
    setShowError(true);
  };

  const handleDeleteEvent = (id: number) => {
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
}
