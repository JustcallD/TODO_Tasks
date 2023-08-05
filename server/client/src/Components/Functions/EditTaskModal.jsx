import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateTask } from "../../Store/Slices/TaskSlice";
import styles from "./EditTaskModal.module.css";

const EditTaskModal = ({ id, popup, setPopup }) => {
  const tasks = useSelector((state) => state.task.task);
  const dispatch = useDispatch();

  const [condition, setCondition] = useState(false);
  const [task, setTask] = useState({
    title: "",
    description: "",
  });

  useEffect(() => {
   
    setTask(tasks.find((data) => data._id === id));
  }, [tasks, id]);

  const getTask = (e) => {
    setTask({ ...task, [e.target.name]: e.target.value });
  };

  const toggleStatus = () => {
    setCondition(!condition);
    setTask({ ...task, status: !task.status });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateTask(task))
      .then(() => {
        setPopup(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className={styles.popupContainer}>
      <div className={styles.popupContent}>
        <button onClick={() => setPopup(false)}>close</button>
        {task && (
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="name" className={styles.popupContentLabel}>
                Name:
              </label>
              <br />
              <input
                type="text"
                name="title"
                value={task.title || ""}
                onChange={getTask}
                className={styles.popupContentInput}
              />
            </div>
            <div>
              <label htmlFor="description" className={styles.popupContentLabel}>
                Description
              </label>
              <textarea
                name="description"
                value={task.description || ""}
                onChange={getTask}
                className={styles.popupContentTextarea}
              ></textarea>
            </div>
            <div>
              <button type="submit" className={styles.popupContentButton}>
                Submit
              </button>
              <button
                onClick={toggleStatus}
                className={styles.popupContentButton}
              >
                {task.status ? "Mark Incomplete" : "Mark Complete"}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default EditTaskModal;
