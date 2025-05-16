import React from "react";
import { useAuth } from "../auth/AuthContext";
import { Outlet } from "react-router-dom";
import SideBar from "../components/SideBar";

const DashboardLayout = () => {
  const { user } = useAuth();
  console.log("User in DashboardLayout:", user);

  return (
    <div className="flex h-screen">
      {user && user.role === "admin" && <SideBar />}
      <div className="flex-1 p-6 overflow-y-auto">
        <Outlet />
      </div>
    </div>
  );
};

export default DashboardLayout;
