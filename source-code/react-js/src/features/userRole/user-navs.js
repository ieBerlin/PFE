import dashboardSvg from "/icons/dashboard-5-svgrepo-com.svg";
import classesSvg from "/icons/guide-svgrepo-com.svg";
import coachesSvg from "/icons/trainer-svgrepo-com.svg";
import equipmentsSvg from "/icons/dumbbells-2-svgrepo-com.svg";
import reportsSvg from "/icons/reports-svgrepo-com.svg";
import usersSvg from "/icons/users-svgrepo-com.svg";
import paymentsSvg from "/icons/payment-svgrepo-com.svg";
export const AdminNavs = {
    sideBar: [{
            id: 1,
            label: "Dashboard",
            href: "/dashboard",
            labelSvg: dashboardSvg,
        },
        {
            id: 2,
            label: "Classes",
            href: "/classes",
            labelSvg: coachesSvg,
        },
        {
            id: 3,
            label: "Users",
            href: "/users",
            labelSvg: usersSvg,
        }, {
            id: 4,
            label: "Coaches",
            href: "/coaches",
            labelSvg: coachesSvg,
        },

        {
            id: 5,
            label: "Payments",
            href: "/payments",
            labelSvg: paymentsSvg,
        },
        {
            id: 6,
            label: "Equipments",
            href: "/equipments/page",
            labelSvg: equipmentsSvg,
        },

        {
            id: 7,
            label: "Reports",
            href: "/reports",
            labelSvg: reportsSvg,
        }
    ],
};
export const CoachNavs = {
    sidebar: [{
            id: 1,
            label: "Dashboard",
            href: "/dashboard",
            labelSvg: dashboardSvg,
        },
        {
            id: 2,
            label: "My Classes",
            href: "/classes",
            labelSvg: classesSvg,
        },
        {
            id: 3,
            label: "My Clients",
            href: "/clients",
            labelSvg: usersSvg,
        },

        {
            id: 4,
            label: "Reports",
            href: "/reports",
            labelSvg: reportsSvg,
        },
    ],
};

export const MemberNavs = {
    sidebar: [{
            id: 1,
            label: "Dashboard",
            href: "/dashboard",
            labelSvg: dashboardSvg,
        },
        {
            id: 2,
            label: "Classes",
            href: "/classes",
            labelSvg: classesSvg,
        },
        {
            id: 3,
            label: "Coaches",
            href: "/coaches",
            labelSvg: coachesSvg,
        },
        {
            id: 4,
            label: "Equipments",
            href: "/equipmentes/page",
            labelSvg: equipmentsSvg,
        },
    ],
};