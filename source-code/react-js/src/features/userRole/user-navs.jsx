import {
  DocumentArrowUpIcon,
  UserGroupIcon,
  Square3Stack3DIcon,
  ClipboardDocumentListIcon,
  BanknotesIcon,
  Cog8ToothIcon,
  ChartBarIcon,
} from "@heroicons/react/24/outline";

const svgClasses = "w-7 h-7 text-gray-600 group-hover:text-blue-600";

const AdminNavs = {
  sidebar: [
    {
      id: 1,
      label: "Dashboard",
      href: "/dashboard",
      labelSvg: <ChartBarIcon className={svgClasses} />, // Add svgClasses here
    },
    {
      id: 2,
      label: "Classes",
      href: "/classes",
      labelSvg: <Square3Stack3DIcon className={svgClasses} />, // Add svgClasses here
    },
    {
      id: 3,
      label: "Users",
      href: "/users",
      labelSvg: <UserGroupIcon className={svgClasses} />, // Add svgClasses here
    },
    {
      id: 4,
      label: "Coaches",
      href: "/coaches",
      labelSvg: <ClipboardDocumentListIcon className={svgClasses} />, // Add svgClasses here
    },
    {
      id: 5,
      label: "Payments",
      href: "/payments",
      labelSvg: <BanknotesIcon className={svgClasses} />, // Add svgClasses here
    },
    {
      id: 6,
      label: "Equipments",
      href: "/equipments",
      labelSvg: <Cog8ToothIcon className={svgClasses} />, // Add svgClasses here
    },
    {
      id: 7,
      label: "Reports",
      href: "/reports",
      labelSvg: <DocumentArrowUpIcon className={svgClasses} />, // Add svgClasses here
    },
  ],
};

const CoachNavs = {
  sidebar: [
    {
      id: 1,
      label: "Dashboard",
      href: "/dashboard",
      labelSvg: <ChartBarIcon className={svgClasses} />, // Add svgClasses here
    },
    {
      id: 2,
      label: "My Classes",
      href: "/classes",
      labelSvg: <Square3Stack3DIcon className={svgClasses} />, // Add svgClasses here
    },
    {
      id: 3,
      label: "My Clients",
      href: "/clients",
      labelSvg: <UserGroupIcon className={svgClasses} />, // Add svgClasses here
    },
    {
      id: 4,
      label: "Reports",
      href: "/reports",
      labelSvg: <DocumentArrowUpIcon className={svgClasses} />, // Add svgClasses here
    },
  ],
};

const MemberNavs = {
  sidebar: [
    {
      id: 1,
      label: "Dashboard",
      href: "/dashboard",
      labelSvg: <ChartBarIcon className={svgClasses} />, // Add svgClasses here
    },
    {
      id: 2,
      label: "Classes",
      href: "/classes",
      labelSvg: <Square3Stack3DIcon className={svgClasses} />, // Add svgClasses here
    },
    {
      id: 3,
      label: "Coaches",
      href: "/coaches",
      labelSvg: <ClipboardDocumentListIcon className={svgClasses} />, // Add svgClasses here
    },
    {
      id: 4,
      label: "Equipments",
      href: "/equipments",
      labelSvg: <Cog8ToothIcon className={svgClasses} />, // Add svgClasses here
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
