import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import TaskForm from "../components/tasks/TaskForm";

const TaskEditPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [task, setTask] = useState(null);

  useEffect(() => {
    const fakeTask = { id, title: "Edit this task title" };
    setTask(fakeTask);
  }, [id]);

  const handleSubmit = (data) => {
    console.log("Update task:", { id, ...data });

    navigate("/tasks");
  };

  const handleCancel = () => {
    navigate("/tasks");
  };

  if (!task) return <p className="p-4">Loading...</p>;

  return (
    <div className="p-4 max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">Edit Task</h2>
      <TaskForm
        initialValues={task}
        onSubmit={handleSubmit}
        onCancel={handleCancel}
      />
    </div>
  );
};

export default TaskEditPage;
