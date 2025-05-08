import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "../pages/LoginPage";
import PrivateRoute from "./PrivateRoute";
import DashboardLayout from "../layouts/DashboardLayout";
import TaskListPage from "../pages/TaskListPage";
import TaskCreatePage from "../pages/TaskCreatePage";
import TaskEditPage from "../pages/TaskEditPage";
import TaskDetailsPage from "../pages/TaskDetailsPage";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />

      <Route
        path="/task"
        element={
          // <PrivateRoute>
          //   <DashboardLayout />
          // </PrivateRoute>
          <DashboardLayout />
        }
      />
      <Route path="tasks" element={<TaskListPage />} />
      <Route path="profile" element={<h1>Profile Page</h1>} />
      <Route path="tasks/new" element={<TaskCreatePage />} />
      <Route path="tasks/:id/edit" element={<TaskEditPage />} />
      <Route path="task/:id" element={<TaskDetailsPage />} />
    </Routes>
  );
};

export default AppRoutes;
