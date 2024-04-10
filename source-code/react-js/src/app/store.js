import { configureStore } from "@reduxjs/toolkit";
import sidebarReducer from "../features/sidebar/sidebarSlice.js"
import userRoleReducer from "../features/userRole/userRoleSlice.js"
export default configureStore({
    reducer: {
        sidebar: sidebarReducer,
        userRole: userRoleReducer,
    }
})