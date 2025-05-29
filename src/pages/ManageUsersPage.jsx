import React from "react";
import { NavLink, Link } from "react-router-dom";
import SearchBar from "../components/SearchBar";

const ManageUsersPage = () => {
  const [users, setUsers] = React.useState([]);
  const [error, setError] = React.useState(null);
  const [query, setQuery] = React.useState("");
  const [loading, setLoading] = React.useState(true);

  const fetchUsers = async (search = "") => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      let API_URL = `http://localhost:3000/api/v1/users`;

      if (search) {
        API_URL += `?query=${encodeURIComponent(search)}`;
      }

      const response = await fetch(API_URL, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Fail to find users");
      }

      const data = await response.json();
      setUsers(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    fetchUsers(query);
  }, [query]);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">All Users</h1>

      <Link
        to={"/admin/users/new/"}
        className="bg-green-600 hover:bg-green-800 text-white px-4 py-2 rounded"
      >
        Add new User
      </Link>

      <div className="mt-3">
        <SearchBar onSearch={(term) => setQuery(term)} />
      </div>

      {error && <p className="text-red-500">{error}</p>}
      {loading ? (
        <p className="text-center">Loading...</p>
      ) : users.length === 0 ? (
        <p>No Users found.</p>
      ) : (
        <table className="table-auto md:table-fixed mt-4 w-full">
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
              <tr key={user.id} className="odd:bg-gray-200 even:bg-gray-100">
                <td className="px-4 py-2">{user.name}</td>
                <td className="px-4 py-2">{user.email}</td>
                <td className="px-4 py-2">{user.role}</td>
                <td className="px-4 py-2">
                  <NavLink
                    to={`/user/${user.id}`}
                    className="text-blue-600 underline"
                  >
                    Details
                  </NavLink>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ManageUsersPage;
