import React from "react";
import { NavLink } from "react-router-dom";
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
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">All Users</h1>
      {error && <p className="text-red-500">{error}</p>}

      <table className="table-auto md:table-fixed w-full">
        <thead className="content-start border">
          <tr>
            <th className="text-left px-4 py-2">Name</th>
            <th className="text-left px-4 py-2">Email</th>
            <th className="text-left px-4 py-2">Role</th>
            <th className="text-left px-4 py-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr className="odd:bg-gray-200 even:bg-gray-100">
              <td className="px-4 py-2">{user.name}</td>
              <td className="px-4 py-2">{user.email}</td>
              <td className="px-4 py-2">{user.role}</td>
              <td className="px-4 py-2">
                <NavLink
                  to={`/users/${user.id}`}
                  className="text-blue-600 underline"
                >
                  Details
                </NavLink>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageUsersPage;
