import { AlertTriangle, ChevronRightIcon } from "lucide-react";
import { NavLink } from "react-router-dom";
import { useState } from "react";
import { coordinatorSidebarData } from "./coordinatorSidebarData";
import { SidebarItemType, SidebarSubItemType } from "../type";
import { useUserData } from "@/store/AuthContext";
import { useLocation } from "react-router-dom";

const CoordinatorSidebar = () => {
  const [openSubMenus, setOpenSubMenus] = useState<Record<string, boolean>>({});
  const { userData } = useUserData();
  const location = useLocation(); 

  const toggleSubMenu = (itemName: string) => {
    setOpenSubMenus((prev) => ({
      ...prev,
      [itemName]: !prev[itemName],
    }));
  };

  const ActiveMainMenu = (item: SidebarItemType): string => {
    const currentPath = location.pathname; // Use location from react-router instead of window.location

    // Check if any submenu is active
    if (item.subMenu) {
      const isSubMenuActive = item.subMenu.some((subMenu: SidebarSubItemType) =>
        subMenu.routeNames.some((path: string) => currentPath.startsWith(path))
      );

      if (isSubMenuActive) {
        return "bg-secondary hover:bg-secondary/90 text-secondary-foreground shadow";
      }
    }

    // Check if the main menu itself is active
    const paths: string[] = item.routeNames || [];

    // Skip items with empty route arrays or only empty routes
    if (paths.length === 0 || (paths.length === 1 && paths[0] === "")) {
      return "";
    }

    // Check if the current path matches any of the route paths
    const isActive = paths.some(
      (path) => path && path !== "" && currentPath.startsWith(path)
    );

    return isActive
      ? "bg-secondary hover:bg-secondary/90 text-secondary-foreground shadow"
      : "";
  };

  return (
    <div className="h-full">
      <div className="px-3">
        {coordinatorSidebarData.map((item) => (
          <div key={item.name} className={`flex flex-col`}>
            <div
              className={`p-2 rounded-sm cursor-pointer ${ActiveMainMenu(item)} 
            ${openSubMenus[item.name] ? "" : "hover:bg-accent mb-3"}`}
            >
              {/* Main Menu */}
              {item.routeNames[0] === "" ? (
                <div
                  className="flex items-center justify-between"
                  onClick={() => toggleSubMenu(item.name)}
                >
                  <div className="flex items-center gap-2">
                    {item.icon && <item.icon className="w-4 h-4" />}
                    <p className="text-[13px]">{item.name}</p>
                  </div>
                  <ChevronRightIcon
                    className={`w-4 h-4 transform transition-transform ${
                      openSubMenus[item.name] ? "rotate-90" : ""
                    }`}
                  />
                </div>
              ) : (
                <NavLink to={item.routeNames[0]}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {item.icon && <item.icon className="w-4 h-4" />}
                      <p className="text-[13px]">{item.name}</p>
                    </div>
                    {/* Show Exclamation Icon if Password is not Changed */}
                    {item.name === "Profile" &&
                      !userData?.is_password_change && (
                        <AlertTriangle className="w-4 h-4 text-primary animate-pulse" />
                      )}
                  </div>
                </NavLink>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CoordinatorSidebar;
