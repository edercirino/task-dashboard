import { Outlet } from "react-router-dom";
import SideBar from "../components/SideBar";

const DashboardLayout = () => {
  return (
    <div className="flex h-screen">
      <SideBar />
      <div className="flex-1 p-6 overflow-y-auto">
        <Outlet />
      </div>
    </div>
  );
};

export default DashboardLayout;
