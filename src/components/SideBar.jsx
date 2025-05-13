import React from "react";
import { Navigate, NavLink, useNavigate } from "react-router-dom";
import { ListChecks, User, LogOut } from "lucide-react";
import { useAuth } from "../auth/AuthContext";

const SideBar = () => {
  const navLinkClass = ({ isActive }) =>
    `flex items-center gap-2 px-4 py-2 rounded text-white hover:bg-gray-500 transition ${
      isActive ? "bg-gray-400 font-semibold" : "text-gray-700"
    }`;

  const navButtonClass =
    "flex items-center gap-2 px-4 py-2 rounded text-white hover-gray-500 transition w-full";

  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <aside className="2-64  border-r bg-blue-500 h-full p-4">
      <h2 className="text-xl font-bold mb-6">Task Dashboard</h2>

      <nav className="flex flex-col space-y-2">
        <NavLink to="/tasks" className={navLinkClass}>
          <ListChecks size={18} />
          Task List
        </NavLink>

        <NavLink to="/profile" className={navLinkClass}>
          <User size={18} />
          Profile
        </NavLink>

        <button onClick={handleLogout} className={navButtonClass}>
          <LogOut size={18} />
          Logout
        </button>
      </nav>
    </aside>
  );
};

export default SideBar;
