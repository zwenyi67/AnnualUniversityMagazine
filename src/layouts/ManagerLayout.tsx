import { useAuth } from "@/hooks";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import ProfileBox from "./common/ProfileBox";
import { useState } from "react";
import { Menu as MenuIcon, X as XIcon } from "lucide-react";
import { Cross1Icon } from "@radix-ui/react-icons";
import ManagerSidebar from "@/components/sidebar/manager/ManagerSidebar";
import { useUserData } from "@/store/AuthContext";

const ManagerLayout = () => {
  const { isAuthenticated, role } = useAuth();
  const {userData} = useUserData();
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);

  if (!userData?.is_password_change && location.pathname !== "/manager/profile") {
    return <Navigate to="/manager/profile" replace />;
  }

  if (!isAuthenticated) {
    return <Navigate to={"/auth/login"} state={{ from: location }} replace />;
  }

  if (role === "student" ) {
    return <Navigate to="/stuent/dashboard" />;
  }

  if (role === "coordinator" ) {
    return <Navigate to="/coordinator/dashboard" />;
  }

  if (role === "admin" ) {
    return <Navigate to="/admin/dashboard" />;
  }

  if (role === "guest" ) {
    return <Navigate to="/" />;
  }

  return (
    <div className="h-screen flex overflow-hidden">
      {/* Sidebar */}

      {/* Desktop Sidebar */}
      <div className="hidden lg:block">
        <div className="lg:flex flex-col hidden min-h-svh bg-gray-100 h-full transition-all duration-300 lg:min-w-[280px] shadow-lg">
          <div className="flex flex-col items-center justify-center h-20">
            <div className="">Template</div>
          </div>
          <ManagerSidebar />
        </div>
      </div>

      {/* Mobile Sidebar */}
      {isSidebarOpen &&
        <div className="block lg:hidden fixed top-0 left-0 w-[280px] h-full bg-gray-100 z-[100] shadow-lg">
          <div className="py-4">
            <div className="flex justify-between mb-10 px-3">
              <button onClick={toggleSidebar}>
                <Cross1Icon />
              </button>
            </div>
            <div>
              <ManagerSidebar />
            </div>
          </div>
        </div>
      }


      {/* Main Content */}
      <main className="flex flex-col w-full overflow-y-auto">
        {/* Header */}
        <nav className="flex items-center justify-between p-3 bg-white shadow-md z-[50] sticky top-0">
          <button
            onClick={toggleSidebar}
            aria-label="Toggle Sidebar"
            className="lg:hidden"
          >
            {isSidebarOpen ? (
              <XIcon className="w-6 h-6 text-gray-600" />
            ) : (
              <MenuIcon className="w-6 h-6 text-gray-600" />
            )}
          </button>
          <div className="ml-auto flex items-center">
            <ProfileBox />
          </div>
        </nav>

        {/* Outlet for dynamic content */}
        <div className="p-4 z-[1]">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default ManagerLayout;
