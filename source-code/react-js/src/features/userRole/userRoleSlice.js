import { createSlice } from "@reduxjs/toolkit";

export const userRoleSlice = createSlice({
  name: "userRole",
  initialState: {
    userRole: undefined,
  },
  reducers: {
    changeUserRole(state, action) {
      state.userRole = action.payload;
    },
  },
});
export const { changeUserRole } = userRoleSlice.actions;
export default userRoleSlice.reducer;
