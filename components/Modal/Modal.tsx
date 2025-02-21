"use client"; // Ensure Zustand store runs only on the client

import dayjs from "dayjs";
import { useCallback, useEffect, useState } from "react";
import { IoCloseSharp } from "react-icons/io5";
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
  const [isUpdate, setIsUpdate] = useState(false);

  useEffect(() => {
    //sets the event for updation
    if (selectedEvent) {
      setTitle(selectedEvent.title);
      setDesc(selectedEvent.description);
    }
  }, [selectedEvent]);

  //for accurate error messages
  const checkError = (title: string, desc: string) => {
    if (!title.trim()) setErrorMessage("Title is required.");
    if (!desc.trim()) setErrorMessage("Description is required.");
    if (!title.trim() && !desc.trim())
      setErrorMessage("Title and description are required.");
    setShowError(true);
  };

  //for event addition
  const handleAddEvent = useCallback(() => {
    if (title.trim() && desc.trim()) {
      addEvent({
        id:
          dayjs(userSelectedDate).format("DDMMYYYY") +
          (Math.random() + 1).toString(36).substring(7),
        date: dayjs(userSelectedDate).format("DD/MM/YYYY"),
        title: title.trim(),
        description: desc.trim(),
      });
      setShowError(false);
      closeModal();
      return;
    }
    checkError(title, desc);
  }, [title, desc, addEvent, userSelectedDate, closeModal]);

  //for event updation
  const handleUpdateEvent = useCallback(() => {
    if (title.trim() && desc.trim()) {
      updateEvent({
        id: selectedEvent?.id ?? "",
        date: selectedEvent?.date ?? "",
        title: title.trim(),
        description: desc.trim(),
      });
      setShowError(false);
      setIsUpdate(false);
      closeModal();
      return;
    }
    checkError(title, desc);
  }, [title, desc, updateEvent, selectedEvent, closeModal]);

  //for event deletion
  const handleDeleteEvent = useCallback(
    (id: string) => {
      console.log(id);
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
        <div className={styles.closeIcon} onClick={closeModal}>
          <IoCloseSharp size={30} />
        </div>
        <h2>
          {selectedEvent
            ? `Event for ${selectedEvent?.date}`
            : `Add Event for ${dayjs(userSelectedDate)?.format("DD/MM/YYYY")}`}
        </h2>
        {(!selectedEvent || (selectedEvent && isUpdate)) && (
          <>
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
          </>
        )}
        {selectedEvent && !isUpdate && (
          <>
            <div>
              <div className={styles.eventDetail}>
                <p className={styles.head}>Title</p>
                <div className={styles.info}>
                  <p>{title}</p>
                </div>
              </div>
              <div className={styles.eventDetail}>
                <p className={styles.head}>Description</p>
                <div className={styles.info}>
                  <p>{desc}</p>
                </div>
              </div>
            </div>
          </>
        )}
        {showError && <p className={styles.error}>{errorMessage}</p>}
        <div className={styles.btnWrapperCtn}>
          {selectedEvent ? (
            isUpdate ? (
              <button onClick={handleUpdateEvent}>Update</button>
            ) : (
              <button onClick={() => setIsUpdate(true)}>Edit</button>
            )
          ) : (
            <button onClick={handleAddEvent}>Add Event</button>
          )}
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
