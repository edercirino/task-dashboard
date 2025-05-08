import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from ",,/pages/LoginPage";
import PrivateRoute from "./PrivateRoute";
import DashboardLayout from "../layouts/DashboardLayout";

function TaskListPage() {
  return <h1 className="text-2xl font-bold p-4">Task List</h1>;
}

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />

      <Route
        path="/task"
        element={
          <PrivateRoute>
            <DashboardLayout />
          </PrivateRoute>
        }
      />
      <Route path="tasks" element={TaskListPage} />
      <Route path="profile" element={<h1>Profile Page</h1>} />
    </Routes>
  );
};

export default AppRoutes;
