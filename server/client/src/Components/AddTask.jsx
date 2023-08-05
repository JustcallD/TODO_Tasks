import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { createTask } from "../Store/Slices/TaskSlice";
import { useNavigate } from "react-router-dom";

import styles from "./AddTask.module.css";

const AddTask = () => {
  const [tasks, setTasks] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const getTask = (e) => {
    setTasks({ ...tasks, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    console.log(tasks);
  }, [tasks]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(tasks);
    dispatch(createTask(tasks));
    navigate("/");
  };

  return (
    <div className={styles.addTaskContainer}>
      <h2 className={styles.addTaskTitle}>Add Task</h2>
      <form className={styles.addTaskForm} onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Title</label>
          <input type="text" name="title" onChange={getTask} />
          <br />
        </div>
        <div>
          <label htmlFor="description">Description</label>
          <textarea name="description" onChange={getTask} />
        </div>
        <button type="submit">Add Task</button>
      </form>
    </div>
  );
};

export default AddTask;
