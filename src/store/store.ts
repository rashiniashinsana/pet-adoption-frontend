import { configureStore } from "@reduxjs/toolkit/react";
import AdopterSlice from "../slice/AdopterSlice.ts";

const store = configureStore({
    reducer: {
        adopter: AdopterSlice,

    },
});


export default store;


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
