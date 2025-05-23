import React from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const TaskCreatePage = () => {
  const [title, setTitle] = React.useState("");
  const [description, SetDescription] = React.useState("");
  const [status, setStatus] = React.useState("pending");
  const [error, setError] = React.useState(null);
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const USER_API = `http://localhost:3000/api/v1/users/${user.id}/tasks`;

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(USER_API, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          task: {
            title,
            description,
            status,
          },
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.errors || "Fail to create a task");
      }

      // const data = await response.json();
      // console.log("Task created:", data);
      toast.success("Task created with success");
      navigate("/tasks");
    } catch (err) {
      setError(err.message);
      toast.error("Fail to create a task");
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Create New Task</h2>
      {error && <p className="text-red-500">{error}</p>}
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
          onChange={(e) => SetDescription(e.target.value)}
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
          Create
        </button>
      </form>
    </div>
  );
};

export default TaskCreatePage;
