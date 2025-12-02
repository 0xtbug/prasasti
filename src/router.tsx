import { createBrowserRouter, Navigate } from "react-router-dom";
import Home from "@/pages/Home";
import AdminLogin from "@/pages/AdminLogin";
import StudentLogin from "@/pages/StudentLogin";
import CreateRecord from "@/pages/CreateRecord";
import VerifyRecord from "@/pages/VerifyRecord";
import Navbar from "@/components/Navbar";
import { isAdminAuthenticated, isStudentAuthenticated } from "./lib/auth";

const ProtectedAdminRoute = ({ children }: { children: React.ReactNode }) => {
  if (!isAdminAuthenticated()) {
    return <Navigate to="/admin-login" replace />;
  }
  return <>{children}</>;
};

const ProtectedStudentRoute = ({ children }: { children: React.ReactNode }) => {
  if (!isStudentAuthenticated()) {
    return <Navigate to="/student-login" replace />;
  }
  return <>{children}</>;
};

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Navbar />
      {children}
    </>
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout><Home /></Layout>,
  },
  {
    path: "/admin-login",
    element: <AdminLogin />,
  },
  {
    path: "/student-login",
    element: <StudentLogin />,
  },
  {
    path: "/create",
    element: (
      <ProtectedAdminRoute>
        <Layout><CreateRecord /></Layout>
      </ProtectedAdminRoute>
    ),
  },
  {
    path: "/verify",
    element: (
      <ProtectedStudentRoute>
        <Layout><VerifyRecord /></Layout>
      </ProtectedStudentRoute>
    ),
  },
]);

export default router;
