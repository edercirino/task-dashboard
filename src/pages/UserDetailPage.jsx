import React from "react";
import { useParams, useNavigate } from "react-router-dom";

const UserDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [user, setUser] = React.useState(null);
  const [tasks, setTasks] = React.useState([]);
  const [error, setError] = React.useState(null);

  const USER_API = `http://localhost:3000/api/v1/users/${id}`;
  const TASKS_API = `http://localhost:3000/api/v1/users/${id}/tasks`;

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
          navigate("/manage-users");
        })
        .then((data) => setTasks(data))
        .catch((err) => setError(err.message));
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
        {tasks.length === 0 ? (
          <p>This user doesn't have tasks</p>
        ) : (
          <ul className="list-disc list-inside space-y-1">
            {tasks.map((task) => (
              <li key={task.id}>{task.title}</li>
            ))}
          </ul>
        )}
      </div>

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
