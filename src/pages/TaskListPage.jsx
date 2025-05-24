import React from "react";
import { Link } from "react-router-dom";
import { Edit, Trash2 } from "lucide-react";
import { toast } from "react-toastify";

const TaskListPage = () => {
  const [tasks, setTasks] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [, setError] = React.useState(null);

  const fetchTasks = async () => {
    try {
      const token = localStorage.getItem("token");
      const user = JSON.parse(localStorage.getItem("user"));
      const userId = user?.id;
      const TASK_URL = `http://localhost:3000/api/v1/users/${userId}/tasks`;

      const response = await fetch(TASK_URL, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch tasks");
      }

      const data = await response.json();
      setTasks(data);
    } catch (error) {
      console.error(error);
      alert("Error to load tasks");
    } finally {
      setLoading(false);
    }
  };

  const deleteTask = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this task?"
    );
    if (!confirmed) return;

    try {
      const token = localStorage.getItem("token");
      const user = JSON.parse(localStorage.getItem("user"));
      const userId = user?.id;
      const TASK_URL = `http://localhost:3000/api/v1/users/${userId}/tasks/${id}`;

      const response = await fetch(TASK_URL, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to delete task");
      }

      setTasks((prev) => prev.filter((task) => task.id !== id));
      toast.success("Task deleted successfully!");
    } catch (error) {
      console.log(error);
      alert("Failed to delete task!");
    }
  };

  React.useEffect(() => {
    fetchTasks();
  }, []);

  if (loading) {
    return <p className="text-center">Loading...</p>;
  }

  const toggleTaskStatus = async (task) => {
    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user"));
    const newStatus = task.status === "done" ? "pending" : "done";
    const TASK_API = `http://localhost:3000/api/v1/users/${user.id}/tasks/${task.id}`;

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
            status: newStatus,
          },
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to update task status");
      }

      const updatedTask = await response.json();
      setTasks((prev) => prev.map((t) => (t.id === task.id ? updatedTask : t)));
      toast.success(`Task marked as ${newStatus}`);
    } catch (err) {
      setError(err.message);
      toast.error("Could not update task status");
    }
  };

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Task List - My Tasks</h1>
        <div>
          <Link
            to="/tasks/new"
            className="bg-green-600 hover:bg-green-800 text-white px-4 py-2 rounded"
          >
            New Task
          </Link>
        </div>
      </div>

      {tasks.length === 0 ? (
        <p>No tasks found.</p>
      ) : (
        <ul className="space-y-2">
          {tasks.map((task) => (
            <li
              key={task.id}
              className="bg-white border shadow rounded p-4 flex justify-between mb-2"
            >
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={task.status === "done"}
                  onChange={() => toggleTaskStatus(task)}
                />
                <Link
                  to={`/tasks/${task.id}`}
                  className={`text-blue-600 hover:underline ${
                    task.status === "done" ? "line-through text-gray-500" : ""
                  }`}
                >
                  {task.title}
                </Link>
              </div>

              <div className="flex gap-3 text-sm">
                <Link
                  to={`/tasks/${task.id}/edit`}
                  className="px-2 py-1 rounded text-gray-600 hover:underline"
                  title="Edit Task"
                >
                  <Edit size={18} />
                </Link>
                <button
                  onClick={() => deleteTask(task.id)}
                  className="px-2 py-1 rounded text-red-600 hover:underline"
                  title="Delete task"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TaskListPage;
