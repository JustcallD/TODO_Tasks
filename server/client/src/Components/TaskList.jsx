import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { taskList } from "../Store/Slices/TaskSlice";
import Card from "./Card";
import EditTaskModal from "./Functions/EditTaskModal";
import DeleteTaskModal from "./Functions/DeleteTaskModal";

// Import the CSS module file
import styles from "./TaskList.module.css";
import { Link } from "react-router-dom";

const TaskList = () => {
  const dispatch = useDispatch();
  const { task, isLoading } = useSelector((state) => state.task);
  const [id, setId] = useState();
  const [popup, setPopup] = useState(false);
  const [deletePopup, setDeletePopup] = useState(false);

  useEffect(() => {
    dispatch(taskList());
  }, [dispatch]);

  if (isLoading) {
    return <h2>Loading...</h2>;
  }

  return (
    <>
      {popup && <EditTaskModal id={id} popup={popup} setPopup={setPopup} />}
      {deletePopup && (
        <DeleteTaskModal
          id={id}
          deletePopup={deletePopup}
          setDeletePopup={setDeletePopup}
        />
      )}
      <h2 className={styles.taskListTitle}>Task List</h2>
      <Link to={"/addTask"}>
        <button className={styles.addButton}>Add Task</button>
      </Link>

      <div className={styles.taskList}>
        {task &&
          task.map((data, i) => (
            <Card
              key={i}
              title={data.title}
              description={data.description}
              status={data.status}
              onUpdate={() => [setId(data._id), setPopup(true)]}
              onDelete={() => [setId(data._id), setDeletePopup(true)]}
            />
          ))}
      </div>
    </>
  );
};

export default TaskList;
