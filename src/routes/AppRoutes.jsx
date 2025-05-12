import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "../pages/LoginPage";
import PrivateRoute from "./PrivateRoute";
import DashboardLayout from "../layouts/DashboardLayout";
import TaskListPage from "../pages/TaskListPage";
import TaskCreatePage from "../pages/TaskCreatePage";
import TaskEditPage from "../pages/TaskEditPage";
import TaskDetailsPage from "../pages/TaskDetailsPage";
import ProfilePage from "../pages/ProfilePage";
import EditProfilePage from "../pages/EditProfilePage";
import RegisterPage from "../pages/RegisterPage";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />

      <Route
        path="/"
        element={
          // <PrivateRoute>
          //   <DashboardLayout />
          // </PrivateRoute>
          <DashboardLayout />
        }
      />
      <Route path="/" element={<DashboardLayout />}>
        <Route path="tasks" element={<TaskListPage />} />
        <Route path="tasks/new" element={<TaskCreatePage />} />
        <Route path="tasks/:id/edit" element={<TaskEditPage />} />
        <Route path="tasks/:id" element={<TaskDetailsPage />} />
        <Route path="profile" element={<ProfilePage />} />
        <Route path="profile/edit" element={<EditProfilePage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
