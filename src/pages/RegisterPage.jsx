import React from "react";
import { useNavigate } from "react-router-dom";
import ErrorMessage from "../components/ui/ErrorMessage";

const RegisterPage = () => {
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [password_confirmation, setPasswordConfirmation] = React.useState("");
  const [role, setRole] = React.useState("user");
  const [errorMessage, setErrorMessage] = React.useState("");

  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setErrorMessage("");

    const newUser = {
      name,
      email,
      role,
      password,
      password_confirmation: password_confirmation,
    };

    if (!name || !email || !password || !password_confirmation) {
      setErrorMessage("Please fill in all fields");
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/api/v1/signup", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ user: newUser }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.errors?.join(", ") || "Registration failed");
      }

      navigate("/tasks");
    } catch (err) {
      console.error("Register error:", err.message);
      setErrorMessage(err.message || "Error creating user");
    }
  }
  return (
    <div className="flex items-center justify-center h-screen">
      <form
        onSubmit={handleSubmit}
        className="bg-gray-50 p-8 rounded shadow-md 2-full max-2-sm"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>
        {errorMessage && <ErrorMessage message={errorMessage} />}

        <div className="mb-4">
          <label className="block text-sm font-medium">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1 p-2 w-full border rounded"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 p-2 w-full border rounded"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium">Role</label>
          <select
            name="role"
            id="role"
            value={role}
            className="w-full border px-3 py-2 rounded"
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="admin">Admin</option>
            <option value="user">User</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 p-2 w-full border rounded"
            required
          />
        </div>
        <div className="block text-sm font-medium">
          <label className="block text-sm font-medium">
            Password Confirmation
          </label>
          <input
            type="password"
            value={password_confirmation}
            onChange={(e) => setPasswordConfirmation(e.target.value)}
            className="mt-1 p-2 w-full border rounded"
            required
          />
        </div>

        <button
          type="submit"
          className="
          w-full bg-green-600 text-white block mt-4 py-2 rounded hover:bg-green-700"
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default RegisterPage;
