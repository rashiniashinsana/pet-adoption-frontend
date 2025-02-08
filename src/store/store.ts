import AdopterSlice from "../slice/AdopterSlice.ts";
import PetSlice from "../slice/PetSlice.ts";
import AdoptionRequestSlice from "../slice/AdoptionRequestSlice.ts";
import {configureStore} from "@reduxjs/toolkit";

const store = configureStore({
    reducer: {
        adopter: AdopterSlice,
        pet: PetSlice,
        request: AdoptionRequestSlice

    },
});

export default store;


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
