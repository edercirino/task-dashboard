import React from "react";

const TaskForm = ({ onSubmit, onCancel }) => {
  const [title, setTitle] = React.useState("");
  const [description, SetDescription] = React.useState("");
  const [status, setStatus] = React.useState("pending");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ title, description, status });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="title" className="block font-semibold mb-1">
          Task Title
        </label>
        <input
          id="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border rounded px-3 py-2"
          required
        />
      </div>

      <div>
        <label htmlFor="description" className="block font-semibold mb-1">
          Description
        </label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => SetDescription(e.target.value)}
          className="w-full border rounded px-3 py-2"
          rows="4"
        />
      </div>

      <div>
        <label htmlFor="status" className="block font-semibold mb-1">
          Status
        </label>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="border rounded w-full p-2"
        >
          <option value="pending">Pending</option>
          <option value="done">Done</option>
        </select>
      </div>

      <div className="flex justify-between">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 bg-gray-300 text-gray-800 rounded"
        >
          Cancel
        </button>

        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded"
        >
          Save Task
        </button>
      </div>
    </form>
  );
};

export default TaskForm;
