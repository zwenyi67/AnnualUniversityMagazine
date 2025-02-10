export type SidebarItemType = {
  routeNames: string[];
  name: string;
  icon: ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
  >;
  subMenu?: SidebarSubItemType[];
};

export type SidebarSubItemType = {
  routeNames: string[];
  name: string;
  icon: ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
  >;
};
