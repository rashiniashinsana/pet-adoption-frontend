
import PetSlice from "../slice/PetSlice.ts";
import AdoptionRequestSlice from "../slice/AdoptionRequestSlice.ts";
import {configureStore} from "@reduxjs/toolkit";
import UserSlice from "../slice/UserSlice.ts";
import adopterSlice from "../slice/AdopterSlice.ts";

const store = configureStore({
    reducer: {
        user: UserSlice,
        adopter: adopterSlice,
        pet: PetSlice,
        request: AdoptionRequestSlice

    },
    middleware  : (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false,
    }),
});

export default store;


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
