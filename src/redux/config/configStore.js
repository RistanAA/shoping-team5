import { configureStore } from "@reduxjs/toolkit";
import items from "../modules/items";

const store = configureStore({
    reducer: {
        items: items,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
})
export default store;
