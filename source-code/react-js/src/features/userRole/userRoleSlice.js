import { createSlice } from "@reduxjs/toolkit";
import dashboardSvg from "/icons/dashboard-5-svgrepo-com.svg";
import classesSvg from "/icons/guide-svgrepo-com.svg";
import coachesSvg from "/icons/trainer-svgrepo-com.svg";
import equipmentsSvg from "/icons/dumbbells-2-svgrepo-com.svg";
import reportsSvg from "/icons/reports-svgrepo-com.svg";
import usersSvg from "/icons/users-svgrepo-com.svg";
import paymentsSvg from "/icons/payment-svgrepo-com.svg";
import adsSvg from "/icons/ads-svgrepo-com.svg";
import { current } from "@reduxjs/toolkit"
export const userRoleSlice = createSlice({
    name: "userRole",
    initialState: {
        currentUserRole: null,
        currentSidebarNavListItems: [{
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
            },

            {
                id: 4,
                label: "Payments",
                href: "/payments",
                labelSvg: paymentsSvg,
            },
            {
                id: 5,
                label: "Equipments",
                href: "/equipments",
                labelSvg: equipmentsSvg,
            },
            {
                id: 6,
                label: "Advertisements",
                href: "/ads",
                labelSvg: adsSvg,
            },
            {
                id: 7,
                label: "Reports",
                href: "/reports",
                labelSvg: reportsSvg,
            }
        ],
        currentSidebarNavList: [{
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
            },

            {
                id: 4,
                label: "Payments",
                href: "/payments",
                labelSvg: paymentsSvg,
            },
            {
                id: 5,
                label: "Equipments",
                href: "/equipments",
                labelSvg: equipmentsSvg,
            },
            {
                id: 6,
                label: "Advertisements",
                href: "/ads",
                labelSvg: adsSvg,
            },
            {
                id: 7,
                label: "Reports",
                href: "/reports",
                labelSvg: reportsSvg,
            }

        ],
    },
    reducers: {
        toggleUserChanged: (state, payload) => {
            state.currentUserRole = payload;
        },
        sideBarNavListElements: (state) => {
            switch (state.currentUserRole) {
                default: state.currentSidebarNavList = [{
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
                        href: "/equipmentes",
                        labelSvg: equipmentsSvg,
                    },
                ];
                break;
                case "coach":
                        state.currentSidebarNavList = [{
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
                    ];
                    break;
                case "manager":
                        state.currentSidebarNavList = [{
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
                            label: "Users",
                            href: "/users",
                            labelSvg: usersSvg,
                        },
                        {
                            id: 4,
                            label: "Payments",
                            href: "/payments",
                            labelSvg: paymentsSvg,
                        },
                        {
                            id: 5,
                            label: "Equipments",
                            href: "/equipments",
                            labelSvg: equipmentsSvg,
                        },
                        {
                            id: 6,
                            label: "Advertisements",
                            href: "/ads",
                            labelSvg: adsSvg,
                        },
                        {
                            id: 7,
                            label: "Reports",
                            href: "/reports",
                            labelSvg: reportsSvg,
                        },
                    ];
                    break;
                case "admin":
                        return [{
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
                        },

                        {
                            id: 4,
                            label: "Payments",
                            href: "/payments",
                            labelSvg: paymentsSvg,
                        },
                        {
                            id: 5,
                            label: "Equipments",
                            href: "/equipments",
                            labelSvg: equipmentsSvg,
                        },
                        {
                            id: 6,
                            label: "Advertisements",
                            href: "/ads",
                            labelSvg: adsSvg,
                        },
                        {
                            id: 7,
                            label: "Reports",
                            href: "/reports",
                            labelSvg: reportsSvg,
                        },



                    ];

            }

        },
        filterSideBarNavListElements: (state, action) => {
            console.log("hi")
            if (action.payload && action.payload.trim() !== '') {

                state.currentSidebarNavList = current(state.currentSidebarNavListItems).filter(item =>
                    item.label.toLowerCase().startsWith(action.payload.toLowerCase())
                )
            } else {
                state.currentSidebarNavList = state.currentSidebarNavListItems
            }

        }
    },
});
export const { toggleUserChanged, filterSideBarNavListElements } = userRoleSlice.actions;
export default userRoleSlice.reducer;