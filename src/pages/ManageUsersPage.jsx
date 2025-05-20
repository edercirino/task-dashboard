import React from "react";

const ManageUsersPage = () => {
  const [users, setUsers] = React.useState([]);
  const [error, setError] = React.useState(null);

  const API_URL = "http://localhost:3000/api/v1/users";

  React.useEffect(() => {
    fetch(API_URL, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Fail to find users");
        }
        return res.json();
      })
      .then((data) => setUsers(data))
      .catch((err) => setError(err.message));
  }, []);

  return (
    <div className="p6">
      <h1 className="text-2xl font-bold mb-4">All Users</h1>
      {error && <p className="text-red-500">{error}</p>}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {users.map((user) => (
          <div
            key={user.id}
            className="border rounded p-4 shadow hover:bg-gray-50"
          >
            <p>
              <strong>Name:</strong> {user.name}
            </p>
            <p>
              <strong>Email:</strong> {user.email}
            </p>
            <p>
              <strong>Role:</strong> {user.role}
            </p>
            <button
              className="mt-2 text-blue-600 underline"
              onClick={() => {
                window.localtin.href = `/users/${user.id}`;
              }}
            >
              Details
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManageUsersPage;
