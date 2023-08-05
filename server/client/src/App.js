import React from "react";
import { Routes, Route } from "react-router-dom";
import AddTask from "./Components/AddTask";
import TaskList from "./Components/TaskList";
import DeleteTaskModal from "./Components/Functions/DeleteTaskModal";
import EditTaskModal from "./Components/Functions/EditTaskModal";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/addTask" element={<AddTask />} />
        <Route path="/" element={<TaskList />} />
        <Route path="/delete" element={<DeleteTaskModal />} />
        <Route path="/update/:id" element={<EditTaskModal />} />
      </Routes>
    </>
  );
};

export default App;
