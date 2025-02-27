import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Pet } from "../model/Pet.ts";
import axios from "axios";

const initialState: Pet[] = []; // Start with an empty array instead of dummy data

const api = axios.create({
    baseURL: "http://localhost:3000/pet",
});

// Async actions for API calls
export const savePet = createAsyncThunk(
    "pet/savePet",
    async (pet: Pet, { rejectWithValue }) => {
        try {
            const response = await api.post("/add", pet);
            return response.data;
        } catch (error) {
            console.error("Save Pet Error:", error);
            return rejectWithValue(error);
        }
    }
);

export const getAllPets = createAsyncThunk(
    "pet/getAllPets",
    async (_, { rejectWithValue }) => {
        try {
            const response = await api.get("/all");
            return response.data;
        } catch (error) {
            console.error("Get All Pets Error:", error);
            return rejectWithValue(error);
        }
    }
);

export const updatePet = createAsyncThunk(
    "pet/updatePet",
    async (pet: Pet, { rejectWithValue }) => {
        try {
            const response = await api.put(`/update/${pet.pet_id}`, pet);
            return response.data;
        } catch (error) {
            console.error("Update Pet Error:", error);
            return rejectWithValue(error);
        }
    }
);

export const deletePet = createAsyncThunk(
    "pet/deletePet",
    async (pet_id: string, { rejectWithValue }) => {
        try {
            await api.delete(`/delete/${pet_id}`);
            return pet_id;
        } catch (error) {
            console.error("Delete Pet Error:", error);
            return rejectWithValue(error);
        }
    }
);

// Redux Slice
const PetSlice = createSlice({
    name: "pet",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getAllPets.fulfilled, (_state, action: PayloadAction<Pet[]>) => {
                return action.payload;
            })
            .addCase(savePet.fulfilled, (state, action: PayloadAction<Pet>) => {
                state.push(action.payload);
            })
            .addCase(updatePet.fulfilled, (state, action: PayloadAction<Pet>) => {
                return state.map((pet) =>
                    pet.pet_id === action.payload.pet_id ? action.payload : pet
                );
            })
            .addCase(deletePet.fulfilled, (state, action: PayloadAction<string>) => {
                return state.filter((pet) => pet.pet_id !== action.payload);
            })
            // Handle rejected cases for better debugging
            .addCase(getAllPets.rejected, (_, action) => {
                console.error("Get All Pets Failed:", action.error);
            })
            .addCase(savePet.rejected, (_, action) => {
                console.error("Save Pet Failed:", action.error);
            })
            .addCase(updatePet.rejected, (_, action) => {
                console.error("Update Pet Failed:", action.error);
            })
            .addCase(deletePet.rejected, (_, action) => {
                console.error("Delete Pet Failed:", action.error);
            });
    },
});

export default PetSlice.reducer;
