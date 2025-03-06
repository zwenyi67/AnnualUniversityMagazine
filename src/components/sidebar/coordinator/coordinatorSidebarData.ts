import {
  Gauge,
  User,
} from "lucide-react";

export const coordinatorSidebarData = [
  {
    routeNames: ["/coordinator/dashboard"],
    name: "Dashboard",
    icon: Gauge,
  },
  {
    routeNames: [""],
    name: "DropDown Menu",
    icon: Gauge,
    subMenu: [
      {
        routeNames: ["/coordinator/menu1"],
        name: "Menu 1",
        icon: Gauge,
      },
      {
        routeNames: ["/coordinator/menu2"],
        name: "Menu 2",
        icon: Gauge,
      },
    ],
  },
  {
    routeNames: ["/coordinator/profile"],
    name: "Profile",
    icon: User,
  },
];
