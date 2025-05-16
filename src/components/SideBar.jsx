import { NavLink, useNavigate } from "react-router-dom";
import { ListChecks, User, UserPlus, LogOut } from "lucide-react";
import { useAuth } from "../auth/AuthContext";

const SideBar = () => {
  const navLinkClass = ({ isActive }) =>
    `flex items-center gap-2 px-4 py-2 rounded text-white hover:bg-gray-500 transition ${
      isActive ? "bg-gray-400 font-semibold" : "text-gray-700"
    }`;

  const navButtonClass =
    "flex items-center gap-2 px-4 py-2 rounded text-white hover-gray-500 transition w-full";

  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <aside className="w-50  border-r bg-blue-500 h-full p-4">
      <h2 className="text-xl font-bold mb-6">Task Dashboard</h2>

      {user && (
        <p className="text-white mb-6">
          Welcome, <strong>{user.name}</strong>
        </p>
      )}

      <nav className="flex flex-col space-y-2">
        <NavLink to="/tasks" className={navLinkClass}>
          <ListChecks size={18} />
          Task List
        </NavLink>

        <NavLink to="/profile" className={navLinkClass}>
          <User size={18} />
          Profile
        </NavLink>

        {user.role === "admin" && (
          <NavLink to="/admin/users/new" className={navLinkClass}>
            <UserPlus size={18} />
            New User
          </NavLink>
        )}

        <button onClick={handleLogout} className={navButtonClass}>
          <LogOut size={18} />
          Logout
        </button>
      </nav>
    </aside>
  );
};

export default SideBar;
