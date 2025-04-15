import {
  Gauge,
  NewspaperIcon,
  User,
} from "lucide-react";

export const guestSidebarData = [
  {
    routeNames: ["/guest/dashboard"],
    name: "Dashboard",
    icon: Gauge,
  },
  {
    routeNames: ["/guest/articles"],
    name: "Articles",
    icon: NewspaperIcon,
  },
  {
    routeNames: ["/guest/profile"],
    name: "Profile",
    icon: User,
  },
];
