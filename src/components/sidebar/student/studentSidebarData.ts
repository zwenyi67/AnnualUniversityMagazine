import { Gauge, LayoutDashboard, Newspaper, User } from "lucide-react";

export const studentSidebarData = [
  {
    routeNames: ["/student/dashboard"],
    name: "Dashboard",
    icon: LayoutDashboard,
  },
  {
    routeNames: ["/student/articles"],
    name: "Articles",
    icon: Newspaper,
  },
  {
    routeNames: [""],
    name: "DropDown Menu",
    icon: Gauge,
    subMenu: [
      {
        routeNames: ["/student/menu1"],
        name: "Menu 1",
        icon: Gauge,
      },
      {
        routeNames: ["/student/menu2"],
        name: "Menu 2",
        icon: Gauge,
      },
    ],
  },
  {
    routeNames: ["/student/profile"],
    name: "Profile",
    icon: User,
  },
];
