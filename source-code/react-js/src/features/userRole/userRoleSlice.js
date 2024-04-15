import { createSlice } from "@reduxjs/toolkit";
import { current } from "@reduxjs/toolkit";
import { AdminNavs, CoachNavs } from "./user-navs";
export const userRoleSlice = createSlice({
    name: "userRole",
    initialState: {
        currentUserRole: "admin",
        currentSidebarNavListItems: AdminNavs.sideBar,
        currentSidebarNavList: AdminNavs.sideBar,
    },
    reducers: {
        toggleUserChanged: (state, action) => {
            state.currentUserRole = action;
        },
        sideBarNavListElements: (state) => {
            switch (state.currentUserRole) {
                case "coach":
                    return state.currentSidebarNavList = CoachNavs.sidebar;
                case "admin":
                    return state.currentSidebarNavList = AdminNavs.sideBar;
                default:
                    state.currentSidebarNavList = CoachNavs.sidebar;
            }
        },
        filterSideBarNavListElements: (state, action) => {
            if (action.payload && action.payload.trim() !== "") {
                state.currentSidebarNavList = current(
                    state.currentSidebarNavListItems
                ).filter((item) =>
                    item.label.toLowerCase().startsWith(action.payload.toLowerCase())
                );
            } else {
                state.currentSidebarNavList = state.currentSidebarNavListItems;
            }
        },
    },
});
export const { toggleUserChanged, filterSideBarNavListElements } =
userRoleSlice.actions;
export default userRoleSlice.reducer;