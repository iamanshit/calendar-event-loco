"use client"; // Ensure Zustand store runs only on the client

import { useCallback, useEffect, useState } from "react";
import calendarStore from "../../app/store/calendarStore";
import styles from "./Modal.module.scss";

export default function EventModal({ onClose }: { onClose: () => void }) {
  const {
    userSelectedDate,
    addEvent,
    updateEvent,
    deleteEvent,
    closeModal,
    selectedEvent,
  } = calendarStore();
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (selectedEvent) {
      setTitle(selectedEvent.title);
      setDesc(selectedEvent.description);
    }
  }, [selectedEvent]);

  const checkError = (title, desc) => {
    if (!title.trim()) setErrorMessage("Title is required.");
    if (!desc.trim()) setErrorMessage("Description is required.");
    if (!title.trim() && !desc.trim())
      setErrorMessage("Title and description are required.");
    setShowError(true);
  };

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
    checkError(title, desc);
  }, [title, desc, userSelectedDate, addEvent, closeModal]);

  const handleUpdateEvent = useCallback(() => {
    if (title.trim() && desc.trim()) {
      updateEvent({
        id: selectedEvent.id,
        date: selectedEvent.date,
        title: title.trim(),
        description: desc.trim(),
      });
      setShowError(false);
      closeModal();
      return;
    }
    checkError(title, desc);
  }, [title, desc, addEvent, selectedEvent, closeModal]);

  const handleDeleteEvent = useCallback(
    (id: number) => {
      deleteEvent(id);
      setShowError(false);
      closeModal();
      setTitle("");
      setDesc("");
    },
    [closeModal, deleteEvent]
  );

  return (
    <div className={styles.modal}>
      <div className={styles.modalContent}>
        <h2>
          {selectedEvent
            ? `Event for ${selectedEvent?.date}`
            : `Add Event for ${userSelectedDate?.format("DD/MM/YYYY")}`}
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
        {showError && <p className={styles.error}>{errorMessage}</p>}
        <div className={styles.btnWrapperCtn}>
          <button onClick={selectedEvent ? handleUpdateEvent : handleAddEvent}>
            {" "}
            {selectedEvent ? "Update" : "Add Event"}
          </button>
          <button
            className={styles.close}
            onClick={
              selectedEvent
                ? () => handleDeleteEvent(selectedEvent?.id)
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
