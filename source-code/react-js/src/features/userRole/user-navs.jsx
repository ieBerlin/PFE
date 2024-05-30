import {
  DocumentArrowUpIcon,
  UserGroupIcon,
  Square3Stack3DIcon,
  ClipboardDocumentListIcon,
  BanknotesIcon,
  Cog8ToothIcon,
  ChartBarIcon,
  Cog6ToothIcon,
} from "@heroicons/react/24/solid";

const sidebarSvgClasses = "w-7 h-7 text-gray-600 group-hover:text-blue-600";
const profileDropDownMenuSvgClasses = "w-5 h-5";
const AdminNavs = {
  sidebar: [
    {
      id: 1,
      label: "Dashboard",
      href: "/dashboard",
      labelSvg: <ChartBarIcon className={sidebarSvgClasses} />, // Add svgClasses here
    },
    {
      id: 2,
      label: "Classes",
      href: "/classes",
      labelSvg: <Square3Stack3DIcon className={sidebarSvgClasses} />, // Add svgClasses here
    },
    {
      id: 3,
      label: "Users",
      href: "/users",
      labelSvg: <UserGroupIcon className={sidebarSvgClasses} />, // Add svgClasses here
    },

    {
      id: 4,
      label: "Payments",
      href: "/payments",
      labelSvg: <BanknotesIcon className={sidebarSvgClasses} />, // Add svgClasses here
    },
    {
      id: 5,
      label: "Equipments",
      href: "/equipments",
      labelSvg: <Cog8ToothIcon className={sidebarSvgClasses} />, // Add svgClasses here
    },
    {
      id: 6,
      label: "Reports",
      href: "/reports",
      labelSvg: <DocumentArrowUpIcon className={sidebarSvgClasses} />, // Add svgClasses here
    },
  ],
  dropDownMenu: [
    {
      id: 1,
      label: "Dashboard",
      href: "/dashboard",
      labelSvg: <ChartBarIcon className={profileDropDownMenuSvgClasses} />,
    },
    {
      id: 2,
      label: "Coaches",
      href: "/coaches",
      labelSvg: (
        <ClipboardDocumentListIcon className={profileDropDownMenuSvgClasses} />
      ),
    },
    {
      id: 3,
      label: "Equipments",
      href: "/equipments",
      labelSvg: <Cog6ToothIcon className={profileDropDownMenuSvgClasses} />,
    },
    {
      id: 4,
      label: "Payments",
      href: "/payments",
      labelSvg: <BanknotesIcon className={profileDropDownMenuSvgClasses} />,
    },
    {
      id: 5,
      label: "Reports",
      href: "/reports",
      labelSvg: (
        <DocumentArrowUpIcon className={profileDropDownMenuSvgClasses} />
      ),
    },
  ],
};

const CoachNavs = {
  sidebar: [
    {
      id: 1,
      label: "Overview",
      href: "/overview",
      labelSvg: <ChartBarIcon className={sidebarSvgClasses} />, // Add svgClasses here
    },

    {
      id: 2,
      label: "My Clients",
      href: "/clients",
      labelSvg: <UserGroupIcon className={sidebarSvgClasses} />, // Add svgClasses here
    },
  ],
  dropDownMenu: [
    {
      id: 1,
      label: "Overview",
      href: "/overview",
      labelSvg: <ChartBarIcon className={profileDropDownMenuSvgClasses} />,
    },

    {
      id: 2,
      label: "My clients",
      href: "/clients",
      labelSvg: <BanknotesIcon className={profileDropDownMenuSvgClasses} />,
    },
  ],
};

const MemberNavs = {
  sidebar: [
    {
      id: 1,
      label: "Overview",
      href: "/overview",
      labelSvg: <ChartBarIcon className={sidebarSvgClasses} />, // Add svgClasses here
    },
    {
      id: 2,
      label: "Classes",
      href: "/classes",
      labelSvg: <Square3Stack3DIcon className={sidebarSvgClasses} />, // Add svgClasses here
    },
    {
      id: 3,
      label: "Coaches",
      href: "/coaches",
      labelSvg: <ClipboardDocumentListIcon className={sidebarSvgClasses} />, // Add svgClasses here
    },
    {
      id: 4,
      label: "Equipments",
      href: "/equipments",
      labelSvg: <Cog8ToothIcon className={sidebarSvgClasses} />, // Add svgClasses here
    },
  ],
  dropDownMenu: [
    {
      id: 1,
      label: "Overview",
      href: "/overview",
      labelSvg: <ChartBarIcon className={profileDropDownMenuSvgClasses} />,
    },

    {
      id: 2,
      label: "Classes",
      href: "/classes",
      labelSvg: <Cog6ToothIcon className={profileDropDownMenuSvgClasses} />,
    },
    {
      id: 3,
      label: "Coaches",
      href: "/coaches",
      labelSvg: <BanknotesIcon className={profileDropDownMenuSvgClasses} />,
    },
    {
      id: 4,
      label: "Reports",
      href: "/reports",
      labelSvg: <BanknotesIcon className={profileDropDownMenuSvgClasses} />,
    },
  ],
};

export function defineUserNavs(type) {
  switch (type) {
    case "admin":
      return { ...AdminNavs };
    case "coach":
      return { ...CoachNavs };
    case "member":
      return { ...MemberNavs };
  }
}
