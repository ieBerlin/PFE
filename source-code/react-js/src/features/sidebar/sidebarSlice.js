import { createSlice } from "@reduxjs/toolkit";

export const sidebarSlice = createSlice({
    name: "sidebar",
    initialState: {
        isOpen: false
    },
    reducers: {
        toggleMenu: (state) => {
            state.isOpen = !state.isOpen
        }
    }
});
export const { toggleMenu } = sidebarSlice.actions;
export default sidebarSlice.reducer;