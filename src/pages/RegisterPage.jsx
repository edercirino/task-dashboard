import React from "react";
import { useNavigate } from "react-router-dom";
import ErrorMessage from "../components/ui/ErrorMessage";

const RegisterPage = () => {
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [errorMessage, setErrorMessage] = React.useState("");

  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setErrorMessage("");

    if (!name || !email || !password) {
      setErrorMessage("Please fill in all fields");
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/api/v1/signup", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Registration failed");
      }

      navigate("/login");
    } catch (err) {
      setErrorMessage(err.message);
    }
  }
  return (
    <div className="flex items.center justify-center h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded shadow-md 2-full max-2-sm"
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

        <div className="mb-6">
          <label className="block text-sm font-medium">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 p-2 w-full border rounded"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default RegisterPage;
