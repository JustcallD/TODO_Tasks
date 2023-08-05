import React from "react";
import { useDispatch } from "react-redux";
import { deleteTask } from "../../Store/Slices/TaskSlice";
import styles from "./DeleteTaskModal.module.css"; 

const DeleteTaskModal = ({ id,setDeletePopup }) => {
  const dispatch = useDispatch();

  const handleDeleteTask = () => {
    dispatch(deleteTask(id));
    setDeletePopup(false);
  };

  const handleCancelDelete = () => {
    setDeletePopup(false);
  };

  return (
    <div className={styles.deleteModalContainer}>
      <h2 className={styles.deleteModalTitle}>Confirm Delete</h2>
      <p className={styles.deleteModalContent}>
        Are you sure you want to delete this task?
      </p>
      <div className={styles.deleteModalButtons}>
        <button className={styles.yesButton} onClick={handleDeleteTask}>
          Yes, Delete
        </button>
        <button className={styles.noButton} onClick={handleCancelDelete}>
          No, Cancel
        </button>
      </div>
    </div>
  );
};

export default DeleteTaskModal;

