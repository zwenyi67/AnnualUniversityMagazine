import { Gauge } from "lucide-react";

export const managerSidebarData = [
  {
    routeNames: ["/manager/dashboard"],
    name: "Dashboard",
    icon: Gauge,
  },
  {
    routeNames: [""],
    name: "DropDown Menu",
    icon: Gauge,
    subMenu: [
      {
        routeNames: ["/manager/menu1"],
        name: "Menu 1",
        icon: Gauge,
      },
      {
        routeNames: ["/manager/menu2"],
        name: "Menu 2",
        icon: Gauge,
      },
    ],
  },
];
