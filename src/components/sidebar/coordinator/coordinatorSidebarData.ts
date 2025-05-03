import { Gauge, BookText, Users, BellDot, User } from "lucide-react";

export const coordinatorSidebarData = [
  {
    routeNames: ["/coordinator/dashboard"],
    name: "Dashboard",
    icon: Gauge,
  },
  {
    routeNames: ["/coordinator/articles"],
    name: "Articles",
    icon: BookText,
  },
  {
    routeNames: ["/coordinator/students"],
    name: "Students",
    icon: Users,
  },
  {
    routeNames: ["/coordinator/guests"],
    name: "Guests",
    icon: Users,
  },
  {
    routeNames: ["/coordinator/notifications"],
    name: "Notifications",
    icon: BellDot,
  },
  {
    routeNames: ["/coordinator/profile"],
    name: "Profile",
    icon: User,
  },
];
