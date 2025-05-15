import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

const EditProfilePage = () => {
  const navigate = useNavigate();
  const { user, token, login } = useAuth();

  const [name, setName] = React.useState(user.name);
  const [email, setEmail] = React.useState(user.email);
  const [password, setPassword] = React.useState("");
  const [role, setRole] = React.useState(user.role);
  const [error, setError] = React.useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const updateUser = {
      name,
      email,
      role,
      ...(password && { password }),
    };

    try {
      const response = await fetch("http://localhost:3000/api/v1/profile", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ user: updateUser }),
      });

      if (!response.ok) {
        throw new Error("Error to update profile.");
      }
      const data = await response.json();

      login(token, data.user);

      navigate("/profile");
    } catch (err) {
      console.error("Error to update:", err.message);
      setError(err.message || "Error to update profile");
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded shadow">
      <h1 className="text-2xl font-bold mb-4">Edit Profile</h1>

      {error && <p className="text-red-500 mb-2">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Name</label>
          <input
            className="w-full border px-3 py-2 mb-2 rounded"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <div>
            <label className="block text-sm font-medium">Email</label>
            <input
              className="w-full border px-3 py-2 mb-2 rounded"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium">
              Password <span className="text-gray-500 text-sm">(optional)</span>
            </label>
            <input
              className="w-full border px-3 py-2 mb-2 rounded"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Leave blanck to keep current password"
            />

            <div>
              <label for="role" className="block text-sm font-medium">
                Role
              </label>
              <select
                name="role"
                id="role"
                value={role}
                className="w-full border px-3 py-2 mb-2 rounded"
                onChange={(e) => setRole(e.target.value)}
              >
                <option value="admin">Admin</option>
                <option value="user">user</option>
              </select>
            </div>
            <button
              type="submit"
              className="bg-blue-600 
              text-white px-4 py-2 rounded hover:bg-blue-700 transition"
            >
              Save Changes
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default EditProfilePage;
