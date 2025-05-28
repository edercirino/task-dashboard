import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

const ProfilePage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleEditProfile = () => {
    navigate("/profile/edit");
  };

  const handleLogout = () => {
    navigate("/login");
  };

  if (!user) return <p>Loading user...</p>;

  return (
    <div className="max-w-xl mx-auto p-6 bg-white shadow rounded">
      <h1 className="text-2xl font-bold mb-4">Profile</h1>

      <div className="space-y-2 mb-6">
        <div className="space-y-2 mb-6">
          <strong>Name:</strong> {user.name}
        </div>
        <div>
          <strong>Email:</strong> {user.email}
        </div>
        <div>
          <strong>Role:</strong>
          {""}
          <span className="uppercase text-sm bg-gray-100 px-2 py-0.5 rounded ">
            {user.role}
          </span>
        </div>
      </div>

      <div className="space-y-3">
        <button
          onClick={handleEditProfile}
          className="w-full px-4 py-2 bg-yellow-500 text-white rounded
          hover:bg-yellow-700 transition"
        >
          Edit Profile
        </button>

        <button
          onClick={handleLogout}
          className="w-full px-4 py-2 bg-red-600 text-white rounded
           hover:bg-red-700 transition"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default ProfilePage;
