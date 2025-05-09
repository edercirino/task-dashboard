import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const EditProfilePage = () => {
  const navigate = useNavigate();

  const [name, setName] = React.useState("Luke Doe");
  const [email, setEmail] = React.useState("luke@example.com");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const updateUser = {
      name,
      email,
      ...(password && { password }),
    };

    console.log("Atualizando o usuário com:", updateUser);

    navigate("/profile");
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded shadow">
      <h1 className="text-2xl font-bold mb-4">Edit Profile</h1>

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
