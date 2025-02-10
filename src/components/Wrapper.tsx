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

const router = createBrowserRouter([
  {
    // Guest Layout
    path: "/",
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
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <Loader />
          <Toaster />
          <RouterProvider router={router}></RouterProvider>
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </Provider>
    </>
  );
};

export default Wrapper;
