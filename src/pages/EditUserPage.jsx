import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const EditUserPage = () => {
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");

  const { id } = useParams();
  const navigate = useNavigate();

  const [userData, setUserData] = React.useState({
    name: "",
    email: "",
    role: "user",
  });
  const [error, setError] = React.useState(null);

  const USER_API = `http://localhost:3000/api/v1/users/${id}`;

  useEffect(() => {
    fetch(USER_API, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Fail to load user data");
        return res.json();
      })
      .then((data) => {
        setUserData({
          name: data.name,
          email: data.email,
          role: data.role,
        });
      })
      .catch((err) => setError(err.message));
  }, [id]);

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const updateUser = {
      ...userData,
    };

    if (password && confirmPassword) {
      updateUser.password = password;
      updateUser.password_confirmation = confirmPassword;
    }

    if (password && password !== confirmPassword) {
      setError("Passwords DO NOT match");
      return;
    }

    fetch(USER_API, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({ user: userData }),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Fail to update user");
        return res.json();
      })
      .then(() => {
        navigate(`/user/${id}`);
      })
      .catch((err) => setError(err.message));
  };

  if (error) return <p className="text-red-600">{error}</p>;

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Edit User</h1>

      <form onSubmit={handleSubmit} className="spacy-y-4">
        <div>
          <label className="block font-medium">Name</label>
          <input
            type="text"
            name="name"
            value={userData.name}
            onChange={handleChange}
            className="w-full p-2 mb-2 border rounded"
            required
          />
        </div>

        <div>
          <label className="block font-medium">Email</label>
          <input
            type="email"
            name="email"
            value={userData.email}
            onChange={handleChange}
            className="w-full p-2 mb-2 border rounded"
            required
          />
        </div>

        <div>
          <label className="block font-semibold">New Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border mb-2 px-3 py-2 rounded"
          />
        </div>

        <div>
          <label className="block font-semibold">Confirm New Password</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full border mb-2 px-3 py-2 rounded"
          />
        </div>

        <div>
          <label className="block font-medium">Role</label>
          <select
            name="role"
            value={userData.role}
            onChange={handleChange}
            className="w-full p-2 mb-2 border rounded"
          >
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
        </div>
        <div className="flex gap-4 mt-4">
          <button
            type="submit"
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          >
            Save
          </button>

          <button
            type="button"
            onClick={() => navigate(`/user/${id}`)}
            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditUserPage;
