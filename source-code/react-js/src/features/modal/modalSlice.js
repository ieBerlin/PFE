import { createSlice } from "@reduxjs/toolkit";

const modalSlice = createSlice({
    name: "modal",
    initialState: {
        type: undefined,
    },
    reducers: {
        setModalType(state, action) {
            state.type = action.payload;
        },
    },
});
export const { setModalType } = modalSlice.actions;
export default modalSlice.reducer;