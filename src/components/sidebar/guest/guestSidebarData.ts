import {
  Gauge,
} from "lucide-react";

export const guestSidebarData = [
  {
    routeNames: ["/dashboard"],
    name: "Dashboard",
    icon: Gauge,
  },
  {
    routeNames: [""],
    name: "DropDown Menu",
    icon: Gauge,
    subMenu: [
      {
        routeNames: ["/menu1"],
        name: "Menu 1",
        icon: Gauge,
      },
      {
        routeNames: ["/menu2"],
        name: "Menu 2",
        icon: Gauge,
      },
    ],
  },
];
