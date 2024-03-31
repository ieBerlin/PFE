import { configureStore } from "@reduxjs/toolkit";
import sidebarReducer from "../features/sidebar/sidebarSlice.js"
export default configureStore({
    reducer: {
        sidebar: sidebarReducer
    }
})