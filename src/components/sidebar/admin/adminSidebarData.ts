import {
  FileClockIcon,
  Gauge,
  School,
  Settings2Icon,
  User,
  Users,
} from "lucide-react";

export const adminSidebarData = [
  {
    routeNames: ["/admin/dashboard"],
    name: "Dashboard",
    icon: Gauge,
  },
  {
    routeNames: [""],
    name: "User Management",
    icon: Users,
    subMenu: [
      {
        routeNames: ["/admin/user-management/admins"],
        name: "Admin",
        icon: User,
      },
      {
        routeNames: ["/admin/user-management/managers"],
        name: "Manager",
        icon: User,
      },
      {
        routeNames: ["/admin/user-management/coordinators"],
        name: "Coordinator",
        icon: User,
      },
      {
        routeNames: ["/admin/user-management/students"],
        name: "Student",
        icon: User,
      },
      {
        routeNames: ["/admin/user-management/guests"],
        name: "Guest",
        icon: User,
      },
    ],
  },
  {
    routeNames: ["/admin/faculty-management/faculties"],
    name: "Faculty Management",
    icon: School,
  },
  {
    routeNames: ["/admin/log-management/logs"],
    name: "Log Management",
    icon: FileClockIcon,
  },
  {
    routeNames: ["/admin/system-setting"],
    name: "System Setting",
    icon: Settings2Icon,
  },
  {
    routeNames: ["/admin/profile"],
    name: "Profile",
    icon: User,
  },
];
