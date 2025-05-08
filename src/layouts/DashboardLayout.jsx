import React from "react";
import { Link, Outlet } from "react-router-dom";

const DashboardLayout = () => {
  return (
    <div className="flex h-screen">
      <aside className="w-64 bg-gray-800 text-white flex flex-coll p-4">
        <h1 className="text-2xl font-bold mb-8">My Tasks</h1>

        <nav className="flex flex-col gap-4">
          <Link to="/tasks" className="hover:text-blue-400">
            Task List
          </Link>
          <Link to="/profile" className="hover:text-blue-400">
            Profile
          </Link>
        </nav>
      </aside>

      <main className="flex-1 bg-gray-100 p-6 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;
