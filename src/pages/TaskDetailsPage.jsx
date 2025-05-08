import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const TaskDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [task, setTask] = React.useState(null);

  useEffect(() => {
    const fakeTask = {
      id,
      title: "Task title being viewed",
    };
    setTask(fakeTask);
  }, [id]);

  const handleBack = () => {
    navigate("/tasks");
  };

  const handleEdit = () => {
    navigate(`/tasks/${id}/edit`);
  };

  if (!task) return <p className="p-4">Loading...</p>;
  return (
    <div className="p-4 max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">Task Details</h2>

      <div className="bg-white shadow rounded p-4 border">
        <p className="text-lg">
          <span className="font-semibold">Title:</span> {task.title}
        </p>
      </div>

      <div className="mt-4 flex justify-between">
        <button
          onClick={handleBack}
          className="px-4 py-2 bg-gray-300 text-gray-800 rounded"
        >
          Back
        </button>

        <button
          onClick={handleEdit}
          className="px-4 py-2 bg-blue-600 text-white rounded"
        >
          Edit
        </button>
      </div>
    </div>
  );
};

export default TaskDetailsPage;
