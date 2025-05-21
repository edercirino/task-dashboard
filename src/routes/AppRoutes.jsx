import { Routes, Route } from "react-router-dom";
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
import EditUserPage from "../pages/EditUserPage";
import ManageUsersPage from "../pages/ManageUsersPage";
import UserDetailPage from "../pages/UserDetailPage";

const AppRoute = () => {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />

      <Route
        path="/"
        element={
          <PrivateRoute>
            <DashboardLayout />
          </PrivateRoute>
        }
      >
        <Route path="tasks" element={<TaskListPage />} />
        <Route path="tasks/new" element={<TaskCreatePage />} />
        <Route path="tasks/:id/edit" element={<TaskEditPage />} />
        <Route path="tasks/:id" element={<TaskDetailsPage />} />
        <Route path="profile" element={<ProfilePage />} />
        <Route path="profile/edit" element={<EditProfilePage />} />
        <Route path="/users/:id/edit" element={<EditUserPage />} />
        <Route path="/admin/users" element={<ManageUsersPage />} />
        <Route path="admin/users/new" element={<RegisterPage />} />
        <Route path="/user/:id" element={<UserDetailPage />} />
      </Route>
    </Routes>
  );
};

export default AppRoute;
