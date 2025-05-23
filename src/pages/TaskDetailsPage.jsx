import React from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { Edit, Trash2, ArrowLeft } from "lucide-react";
import { toast } from "react-toastify";

const TaskDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [task, setTask] = React.useState(null);
  const [error, setError] = React.useState(null);

  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));

  const TASK_API = `http://localhost:3000/api/v1/users/${user.id}/tasks/${id}`;

  React.useEffect(() => {
    const fetchTask = async () => {
      try {
        const response = await fetch(TASK_API, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch task");
        }

        const data = await response.json();
        setTask(data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchTask();
  }, [TASK_API, token]);

  const deleteTask = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this task"
    );
    if (!confirmed) return;

    try {
      const response = await fetch(TASK_API, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to delete task");
      }

      navigate("/tasks");
    } catch (err) {
      setError(err.message);
    }
  };

  if (error) return <p className="text-red-600 text-center">{error}</p>;
  if (!task) return <p className="text-center">Loading...</p>;

  const markAsDone = async () => {
    try {
      const response = await fetch(TASK_API, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          task: {
            title: task.title,
            description: task.description,
            status: "done",
          },
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to update status");
      }

      const updatedTask = await response.json();
      setTask(updatedTask);
      toast.success("Task marked as done!");
    } catch (err) {
      toast.error("Failed to update task status.");
      setError(err.message);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-4 bg-white border rounded shadow">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">{task.title}</h1>
        <div className="flex gap-2">
          <Link
            to={`/tasks/${task.id}/edit`}
            className="text-blue-600 hover:underline"
            title="Edit task"
          >
            <Edit size={20} />
          </Link>
          <button
            onClick={deleteTask}
            className="text-red-600 hover:underline"
            title="Delete task"
          >
            <Trash2 size={20} />
          </button>
        </div>
      </div>

      <p className="mb-2 text-gray-700">{task.description}</p>

      <p className="mb-2">
        <strong>Status:</strong>{" "}
        <span
          className={`inline-block px-2 py-1 rounded text-white ${
            task.status === "done" ? "bg-green-600" : "bg-yellow-600"
          }`}
        >
          {task.status}
        </span>
      </p>

      {task.status === "pending" && (
        <button
          onClick={markAsDone}
          className="mt-2 bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
        >
          Mark as Done
        </button>
      )}

      <p className="text-sm text-gray-500">
        Created at: {new Date(task.created_at).toLocaleString()}
      </p>

      <button
        onClick={() => navigate("/tasks")}
        className="mt-4 flex items-center gap-1 text-blue-600 hover:underline"
      >
        <ArrowLeft size={18} /> Back to List
      </button>
    </div>
  );
};

export default TaskDetailsPage;
