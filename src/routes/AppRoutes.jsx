import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from ",,/pages/LoginPage";
import PrivateRoute from "./PrivateRoute";

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
            <TaskListPage />
          </PrivateRoute>
        }
      />

      <Route path="*" element={<Navigate to="/Login" replace />} />
    </Routes>
  );
};

export default AppRoutes;
