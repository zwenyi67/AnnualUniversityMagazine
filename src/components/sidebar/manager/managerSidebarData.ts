import { BellDot, Gauge, User } from "lucide-react";

export const managerSidebarData = [
  {
    routeNames: ["/manager/dashboard"],
    name: "Dashboard",
    icon: Gauge,
  },
  {
    routeNames: ["/manager/articles"],
    name: "Articles",
    icon: User,
  },
  {
    routeNames: ["/manager/notifications"],
    name: "Notifications",
    icon: BellDot,
  },
  {
    routeNames: ["/manager/profile"],
    name: "Profile",
    icon: User,
  },
];
