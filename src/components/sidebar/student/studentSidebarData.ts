import { LayoutDashboard, Newspaper, User } from "lucide-react";

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
    routeNames: ["/student/profile"],
    name: "Profile",
    icon: User,
  },
];
