import { Gauge } from "lucide-react";

export const adminSidebarData = [
  {
    routeNames: ["/admin/dashboard"],
    name: "Dashboard",
    icon: Gauge,
  },
  {
    routeNames: [""],
    name: "DropDown Menu",
    icon: Gauge,
    subMenu: [
      {
        routeNames: ["/admin/menu1"],
        name: "Menu 1",
        icon: Gauge,
      },
      {
        routeNames: ["/admin/menu2"],
        name: "Menu 2",
        icon: Gauge,
      },
    ],
  },
];
