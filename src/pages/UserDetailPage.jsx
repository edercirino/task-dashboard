import React from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import TaskForm from "../components/tasks/TaskForm";
import { useAuth } from "../auth/AuthContext";

const UserDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [user, setUser] = React.useState(null);
  const [tasks, setTasks] = React.useState([]);
  const [error, setError] = React.useState(null);
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  const USER_API = `http://localhost:3000/api/v1/users/${id}`;
  const TASKS_API = `http://localhost:3000/api/v1/users/${id}/tasks`;

  const { user: currentUser } = useAuth();

  React.useEffect(() => {
    fetch(USER_API, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Fail to find User");
        return res.json();
      })
      .then((data) => setUser(data))
      .catch((err) => setError(err.message));

    fetch(TASKS_API, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Fail to get tasks");
        return res.json();
      })
      .then((data) => setTasks(data))
      .catch((err) => setError(err.message));
  }, [id]);

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      fetch(USER_API, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
        .then((res) => {
          if (!res.ok) throw new Error("Fail to delete user");
          navigate("/admin/users");
        })
        .then((data) => setTasks(data))
        .catch((err) => setError(err.message));
    }
  };

  const handleCreateTask = async (taskData) => {
    try {
      const response = await fetch(TASKS_API, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ task: taskData }),
      });

      if (!response.ok) throw new Error("Failed to create task");

      const data = await response.json();

      setTasks((prev) => [...prev, data]);
      setIsModalOpen(false);
    } catch (err) {
      setError(err.message);
    }
  };

  if (error) return <p className="text-red-600">{error}</p>;
  if (!user) return <p>Carregando...</p>;

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold">User Details</h1>

      <div className="border p-4 rounded shadow">
        <p>
          <strong>Name:</strong> {user.name}
        </p>
        <p>
          <strong>Email:</strong> {user.email}
        </p>
        <p>
          <strong>Role:</strong> {user.role}
        </p>

        <div className="mt-4 space-x-2">
          <button
            className="px-4 py-2 bg-yellow-600 text-white rounded hover:bg-yellow-700"
            onClick={() => navigate(`/users/${user.id}/edit`)}
          >
            Edit
          </button>

          <button
            onClick={handleDelete}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            Delete
          </button>
        </div>
      </div>

      <div>
        <h2 className="text-xl font-semibold mt-06 mb-2">Tasks of this user</h2>
        {currentUser?.role === "admin" && (
          <button
            onClick={() => setIsModalOpen(true)}
            className="px-4 py-2 mb-3 bg-green-600 hover:bg-green-800 text-white rounded"
          >
            Create tasks to this user
          </button>
        )}
        {tasks.length === 0 ? (
          <p className="mt-3">This user doesn't have tasks</p>
        ) : (
          <ul className="space-y-3">
            {tasks.map((task) => (
              <li
                key={task.id}
                className="border p-4 rounded shadow bg-white hover:shadow-md transition"
              >
                <p className="text-lg font-medium text-blue-600 hover:underline">
                  <Link
                    to={`/tasks/${task.id}`}
                    state={{ fromUserId: user.id }}
                    className="text-lg font-medium text-blue-600 hover:underline "
                  >
                    {task.title}
                  </Link>
                </p>
                <p className="text-sm text-gray-600">
                  Created at: {new Date(task.created_at).toLocaleString()}
                </p>
                {task.status === "done" && (
                  <p className="text-sm text-green-600">
                    Completed at: {new Date(task.completed_at).toLocaleString()}
                  </p>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black opacity-80 z-50">
          <div className="bg-white p-6 rounded shadow-md w-full max-w-md opacity-100 relative">
            <h2 className="text-xl font-semibold mb-4">Create Task</h2>
            <TaskForm
              onSubmit={handleCreateTask}
              onCancel={() => setIsModalOpen(false)}
              submitText="Create"
            />
          </div>
        </div>
      )}

      <button
        className="mt-6 px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
        onClick={() => navigate("/admin/users")}
      >
        Back to the List
      </button>
    </div>
  );
};

export default UserDetailPage;
