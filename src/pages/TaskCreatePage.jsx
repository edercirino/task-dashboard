import React from "react";
import { useNavigate } from "react-router-dom";
import TaskForm from "../components/tasks/TaskForm";

const TaskCreatePage = () => {
  const navigate = useNavigate();

  const handleSubmit = (data) => {
    console.log("New Task:", data);

    navigate("/tasks");
  };

  const handleCancel = () => {
    navigate("/tasks");
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">New Task</h2>
      <TaskForm onSubmit={handleSubmit} onCancel={handleCancel} />
    </div>
  );
};

export default TaskCreatePage;
