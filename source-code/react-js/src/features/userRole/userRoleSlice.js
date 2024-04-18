import { createSlice, current } from "@reduxjs/toolkit";

export const userRoleSlice = createSlice({
    name: "userRole",
    initialState: {
        userRole: undefined,
    },
    reducers: {


        filterSideBarNavListElements(state, action) {
            if (action.payload && action.payload.trim() !== "") {
                state.currentSidebarNavList = current(
                    state.defineUserNavs(state.userRole)
                ).filter((item) =>
                    item.label.toLowerCase().startsWith(action.payload.toLowerCase())
                );
            } else {
                state.currentSidebarNavList = state.currentSidebarNavListItems;
            }
        },
    },
});
export const {
    getCurrentDrawerItems,
    filterSideBarNavListElements,
} = userRoleSlice.actions;
export default userRoleSlice.reducer;