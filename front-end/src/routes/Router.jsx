import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import Loader from "../layouts/loader/Loader";
import PrivateRoute from "../utils/PrivateRoute";
import RoleBaseRoute from "../utils/RoleBaseRoute";
import DashboardContent from "../views/ui/DashboardContent";
import WelcomeEmployee from "../views/ui_employee/WelcomeEmployee";
import Departments from "../components/Departments/Departments";
import CreateDepartments from "../components/Departments/CreateDepartments";
import Employees from "../components/Employees/Employees";
import CreateEmployees from "../components/Employees/CreateEmployees";
import Attendance from "../components/EmployeeFunction/Attendence";
import CompanyIntro from "../views/CompanyIntro";
import Apply from "../views/ui_applicant/Apply";
import AdminApplications from "../components/Applications/AdminApplication";
import Profile from "../components/EmployeeFunction/Profile";
import LandingPage from "../views/ui_applicant/LandingPage";
import NotificationBell from "../views/NoficationBell";
import AttendanceManager from "../components/Attendance/AttendanceManager";
const Login = lazy(() => import("../views/Login"));
const Dashboard = lazy(() => import("../layouts/FullLayout"));
const DashboardEmployee = lazy(() =>
  import("../layouts_employee/FullLayoutEmployee")
);
const Router = () => {
  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        {/* <Route path="/" element={<Navigate to="/admin-dashboard" />} /> */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/apply" element={<Apply />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/admin-dashboard"
          element={
            <PrivateRoute>
              <RoleBaseRoute requiredRole={["admin"]}>
                <Dashboard />
              </RoleBaseRoute>
            </PrivateRoute>
          }
        >
          <Route index element={<DashboardContent />} />
          <Route path="departments" element={<Departments />} />
          <Route path="create-departments" element={<CreateDepartments />} />
          <Route path="employees" element={<Employees />} />
          <Route path="create-employees" element={<CreateEmployees />} />
          <Route path="applicants" element={<AdminApplications />} />
          <Route path="attendanceManager" element={<AttendanceManager />} />
        </Route>
        <Route
          path="/employee-dashboard"
          element={
            <PrivateRoute>
              <RoleBaseRoute requiredRole={["admin", "employee"]}>
                <DashboardEmployee />
              </RoleBaseRoute>
            </PrivateRoute>
          }
        >
          <Route index element={<NotificationBell />} />
          <Route
            path="/employee-dashboard/Attendence"
            element={<Attendance />}
          />
          <Route path="/employee-dashboard/profile/:id" element={<Profile />} />
        </Route>
        <Route path="*" element={<Login />} />
      </Routes>
    </Suspense>
  );
};

export default Router;
