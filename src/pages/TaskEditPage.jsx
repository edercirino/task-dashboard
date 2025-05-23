import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const TaskEditPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [status, setStatus] = React.useState("pending");
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
        setTitle(data.title);
        setDescription(data.description);
        setStatus(data.status);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchTask();
  }, [TASK_API, token]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(TASK_API, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          task: { title, description, status },
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Failed to update task");
      }

      toast.success("Task updated successfully!");
      navigate(`/tasks/${id}`);
    } catch (err) {
      setError(err.message);
      toast.error("Task was NOT update");
    }
  };

  if (error) return <p className="text-red-600 text-center">{error}</p>;

  return (
    <div className="max-w-xl mx-auto p-4 bg-white border rounded shadow">
      <h2 className="text-xl font-bold mb-4">Edit Task</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border rounded w-full p-2"
        />

        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="border rounded w-full p-2"
        />

        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="border rounded w-full p-2"
        >
          <option value="pending">Pending</option>
          <option value="done">Done</option>
        </select>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default TaskEditPage;
