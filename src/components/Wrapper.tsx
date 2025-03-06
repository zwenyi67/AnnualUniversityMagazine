import { store } from "@/store";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Provider } from "react-redux";
import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import { Toaster } from "./ui/toaster";

import AuthLayout from "@/layouts/AuthLayout";

import Loader from "@/components/Loader.tsx";
import LoginView from "@/modules/auth/login/LoginView";
import NotFoundView from "@/modules/not-found/NotFoundView";

import ErrorView from "@/modules/error/ErrorView";
import Menu1View from "@/modules/dropdown/Menu1View";
import AdminLayout from "@/layouts/AdminLayout";
import StudentLayout from "@/layouts/StudentLayout";
import CoordinatorLayout from "@/layouts/CoordinatorLayout";
import ManagerLayout from "@/layouts/ManagerLayout";
import GuestLayout from "@/layouts/GuestLayout";
import AdminDashboardView from "@/modules/admin/dashboard/AdminDashboardView";
import ManagerDashboardView from "@/modules/manager/dashboard/ManagerDashboardView";
import CoordinatorDashboardView from "@/modules/coordinator/dashboard/CoordinatorDashboardView";
import StudentDashboardView from "@/modules/student/dashboard/StudentDashboardView";
import HomeView from "@/modules/guest/home/HomeView";
import ManagerView from "@/modules/admin/user-management/manager/ManagerView";
import FacultyView from "@/modules/admin/faculty-management/faculty/FacultyView";
import FacultyFormView from "@/modules/admin/faculty-management/faculty/FacultyFormView";
import ManagerFormView from "@/modules/admin/user-management/manager/ManagerFormView";
import AdminView from "@/modules/admin/user-management/admin/AdminView";
import CoordinatorView from "@/modules/admin/user-management/coordinator/CoordinatorView";
import CoordinatorFormView from "@/modules/admin/user-management/coordinator/CoordinatorFormView";
import StudentView from "@/modules/admin/user-management/student/StudentView";
import StudentFormView from "@/modules/admin/user-management/student/StudentFormView";
import GuestView from "@/modules/admin/user-management/guest/GuestView";
import GuestFormView from "@/modules/admin/user-management/guest/GuestFormView";
import AdminFormView from "@/modules/admin/user-management/admin/AdminFormView";
import { AuthProvider } from "@/store/AuthContext";
import ManagerProfile from "@/modules/manager/profile/ManagerProfile";
import CoordinatorProfile from "@/modules/coordinator/profile/CoordinatorProfile";
import StudentProfile from "@/modules/student/profile/StudentProfile";
import GuestProfile from "@/modules/guest/profile/GuestProfile";
import ReturnLayout from "@/layouts/ReturnLayout";
import StudentArticlesView from "@/modules/student/articles/StudentArticlesView";
import StudentArticleDetailsView from "@/modules/student/articles/chunks/detail/StudentArticleDetailsView";

const router = createBrowserRouter([
  {
    // Admin Layout
    path: "/admin",
    element: <AdminLayout />,
    errorElement: <ErrorView />,
    children: [
      {
        index: true,
        element: <Navigate to="dashboard" replace />,
      },
      // Dashboard Start
      {
        path: "dashboard",
        element: <AdminDashboardView />,
      },
      // User Management
      // Admin
      {
        path: "user-management/admins",
        element: <AdminView />,
      },
      {
        path: "user-management/admins/create",
        element: <AdminFormView />,
      },
      {
        path: "user-management/admins/:id/edit",
        element: <AdminFormView />,
      },
      // Manager
      {
        path: "user-management/managers",
        element: <ManagerView />,
      },
      {
        path: "user-management/managers/create",
        element: <ManagerFormView />,
      },
      {
        path: "user-management/managers/:id/edit",
        element: <ManagerFormView />,
      },
      // Coordinator
      {
        path: "user-management/coordinators",
        element: <CoordinatorView />,
      },
      {
        path: "user-management/coordinators/create",
        element: <CoordinatorFormView />,
      },
      {
        path: "user-management/coordinators/:id/edit",
        element: <CoordinatorFormView />,
      },
      // Student
      {
        path: "user-management/students",
        element: <StudentView />,
      },
      {
        path: "user-management/students/create",
        element: <StudentFormView />,
      },
      {
        path: "user-management/students/:id/edit",
        element: <StudentFormView />,
      },
      // Guest
      {
        path: "user-management/guests",
        element: <GuestView />,
      },
      {
        path: "user-management/guests/create",
        element: <GuestFormView />,
      },
      {
        path: "user-management/guests/:id/edit",
        element: <GuestFormView />,
      },
      // User Management End

      // Faculty Management
      {
        path: "faculty-management/faculties",
        element: <FacultyView />,
      },
      {
        path: "faculty-management/faculties/create",
        element: <FacultyFormView />,
      },
      {
        path: "faculty-management/faculties/:id/edit",
        element: <FacultyFormView />,
      },
    ],
  },
  {
    // Manager Layout
    path: "/manager",
    element: <ManagerLayout />,
    errorElement: <ErrorView />,
    children: [
      {
        index: true,
        element: <Navigate to="dashboard" replace />,
      },
      // Dashboard Start
      {
        path: "dashboard",
        element: <ManagerDashboardView />,
      },
      {
        path: "profile",
        element: <ManagerProfile />,
      },
      {
        path: "menu1",
        element: <Menu1View />,
      },
      {
        path: "menu2",
        element: <Menu1View />,
      },
    ],
  },
  {
    // Coordinator Layout
    path: "/coordinator",
    element: <CoordinatorLayout />,
    errorElement: <ErrorView />,
    children: [
      {
        index: true,
        element: <Navigate to="dashboard" replace />,
      },
      // Dashboard Start
      {
        path: "dashboard",
        element: <CoordinatorDashboardView />,
      },
      {
        path: "profile",
        element: <CoordinatorProfile />,
      },
      {
        path: "menu1",
        element: <Menu1View />,
      },
      {
        path: "menu2",
        element: <Menu1View />,
      },
    ],
  },
  {
    // Student
    path: "/student",
    element: <StudentLayout />,
    errorElement: <ErrorView />,
    children: [
      {
        index: true,
        element: <Navigate to="dashboard" replace />,
      },
      // Dashboard Start
      {
        path: "dashboard",
        element: <StudentDashboardView />,
      },
      // Articles
      {
        path: "articles",
        element: <StudentArticlesView />,
      },
      {
        path: "articles/details/:id",
        element: <StudentArticleDetailsView />,
      },
      {
        path: "profile",
        element: <StudentProfile />,
      },
      {
        path: "menu1",
        element: <Menu1View />,
      },
      {
        path: "menu2",
        element: <Menu1View />,
      },
    ],
  },
  {
    // Guest Layout
    path: "/guest",
    element: <GuestLayout />,
    errorElement: <ErrorView />,
    children: [
      {
        index: true,
        element: <Navigate to="dashboard" replace />,
      },
      // Dashboard Start
      {
        path: "dashboard",
        element: <HomeView />,
      },
      {
        path: "profile",
        element: <GuestProfile />,
      },
      {
        path: "menu1",
        element: <Menu1View />,
      },
      {
        path: "menu2",
        element: <Menu1View />,
      },
    ],
  },
  {
    path: "/auth",
    element: <AuthLayout />,
    children: [
      {
        index: true,
        element: <Navigate to="login" replace />,
      },
      {
        path: "login",
        element: <LoginView />,
      },
    ],
  },
  {
    path: "/",
    element: <ReturnLayout />,
    children: [
      
    ],
  },
  
  {
    path: "*",
    element: <NotFoundView />,
  },
]);

const Wrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: import.meta.env.DEV ? false : "always", // close refetch on window focus in development
      },
    },
  });

  return (
    <>
      <AuthProvider>
        <Provider store={store}>
          <QueryClientProvider client={queryClient}>
            <Loader />
            <Toaster />
            <RouterProvider router={router}></RouterProvider>
            <ReactQueryDevtools initialIsOpen={false} />
          </QueryClientProvider>
        </Provider>
      </AuthProvider>
    </>
  );
};

export default Wrapper;
