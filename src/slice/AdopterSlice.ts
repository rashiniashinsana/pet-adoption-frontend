import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Adopter } from "../model/Adopter.ts";
import axios from "axios";

const initialState: Adopter[] = [];

const api = axios.create({
    baseURL: "http://localhost:3000/adopter",
});

export const saveAdopter = createAsyncThunk(
    "adopter/saveAdopter",
    async (adopter: Adopter, { rejectWithValue }) => {
        try {
            const response = await api.post("/add", adopter);
            return response.data;
        } catch (error) {
            console.error("Save Adopter Error:", error);
            return rejectWithValue(error);
        }
    }
);

export const getAllAdopters = createAsyncThunk(
    "adopter/getAllAdopters",
    async (_, { rejectWithValue }) => {
        try {
            const response = await api.get("/");
            return response.data;
        } catch (error) {
            console.error("Get All Adopters Error:", error);
            return rejectWithValue(error);
        }
    }
);

export const updateAdopter = createAsyncThunk(
    "adopter/updateAdopter",
    async (adopter: Adopter, { rejectWithValue }) => {
        try {
            const response = await api.put(`/update/${adopter.adopter_id}`, adopter);
            return response.data;
        } catch (error) {
            console.error("Update Adopter Error:", error);
            return rejectWithValue(error);
        }
    }
);

export const deleteAdopter = createAsyncThunk(
    "adopter/deleteAdopter",
    async (adopter_id: string, { rejectWithValue }) => {
        try {
            await api.delete(`/delete/${adopter_id}`);
            return adopter_id; // return the adopter_id for deletion in state
        } catch (error) {
            console.error("Delete Adopter Error:", error);
            return rejectWithValue(error);
        }
    }
);

const adopterSlice = createSlice({
    name: "adopter",
    initialState,
    reducers: {},
    extraReducers: (builder) => {

        builder// @ts-ignore
            .addCase(getAllAdopters.fulfilled, (state, action: PayloadAction<Adopter[]>) => {
                return action.payload; // Replace the state with the fetched adopters
            })
            .addCase(saveAdopter.fulfilled, (state, action: PayloadAction<Adopter>) => {
                state.push(action.payload); // Add the new adopter to the state
            })
            .addCase(updateAdopter.fulfilled, (state, action: PayloadAction<Adopter>) => {
                return state.map((adopter) =>
                    adopter.adopter_id === action.payload.adopter_id ? action.payload : adopter
                ); // Update the adopter in the state
            })
            .addCase(deleteAdopter.fulfilled, (state, action: PayloadAction<string>) => {
                return state.filter((adopter) => adopter.adopter_id !== action.payload); // Remove adopter from the state
            });
    },
});

export default adopterSlice.reducer;
