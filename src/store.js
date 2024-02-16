import { configureStore } from "@reduxjs/toolkit";
import themeReducer from "./redux/ThemeSlice";

export const store = configureStore({
    reducer: {
        theme: themeReducer,
    },
})