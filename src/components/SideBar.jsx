import React from "react";
import { NavLink } from "react-router-dom";
import { ListChecks, User, LogOut } from "lucide-react";

const SideBar = () => {
  const navLinkClass = ({ isActive }) =>
    `flex items-center gap-2 px-4 py-2 rounded text-white hover:bg-gray-500 transition ${
      isActive ? "bg-gray-400 font-semibold" : "text-gray-700"
    }`;

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

        <NavLink to="/login" className={navLinkClass}>
          <LogOut size={18} />
          Logout
        </NavLink>
      </nav>
    </aside>
  );
};

export default SideBar;
