import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { PetModel } from "../model/PetModel.ts";

const initialState: PetModel[] = [];

const api = axios.create({
    baseURL: "http://localhost:3000/pet"
});

export const savePet = createAsyncThunk(
    "pet/savePet",
    async (pet: PetModel, { rejectWithValue }) => {
        try {
            const response = await api.post("/add", pet);
            return response.data;
        } catch (error: any) {
            console.error("Error saving pet:", error);
            return rejectWithValue(error.response?.data || "Error saving pet");
        }
    }
);

export const getAllPets = createAsyncThunk(
    "pet/getAllPets",
    async (_, { rejectWithValue }) => {
        try {
            const response = await api.get("/all");
            return response.data;
        } catch (error: any) {
            console.error("Error fetching pets:", error);
            return rejectWithValue(error.response?.data || "Error fetching pets");
        }
    }
);

export const updatePet = createAsyncThunk(
    "pet/updatePet",
    async (pet: PetModel, { rejectWithValue }) => {
        try {
            const response = await api.put(`/update/${pet.pet_id}`, pet);
            return response.data;
        } catch (error: any) {
            console.error("Error updating pet:", error);
            return rejectWithValue(error.response?.data || "Error updating pet");
        }
    }
);

export const deletePet = createAsyncThunk(
    "pet/removePet",
    async (pet_id: string, { rejectWithValue }) => {
        try {
            await api.delete(`/remove/${pet_id}`);
            return pet_id;
        } catch (error: any) {
            console.error("Error deleting pet:", error);
            return rejectWithValue(error.response?.data || "Error deleting pet");
        }
    }
);

const PetSlice = createSlice({
    name: "pet",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(savePet.fulfilled, (state, action) => {
                state.push(action.payload);
                alert("Pet saved successfully");
            })
            .addCase(savePet.rejected, (_, action) => {
                alert(action.payload || "Error saving pet");
            });

        builder
            .addCase(getAllPets.fulfilled, (_, action) => {
                return action.payload;
            })
            .addCase(getAllPets.rejected, (_, action) => {
                alert(action.payload || "Error fetching pets");
            });

        builder
            .addCase(updatePet.fulfilled, (state, action) => {
                const index = state.findIndex((pet) => pet.pet_id === action.payload.pet_id);
                if (index !== -1) {
                    state[index] = action.payload;
                    alert("Pet updated successfully");
                }
            })
            .addCase(updatePet.rejected, (_, action) => {
                alert(action.payload || "Error updating pet");
            });

        builder
            .addCase(deletePet.fulfilled, (state, action) => {
                return state.filter((pet) => pet.pet_id !== action.payload);
            })
            .addCase(deletePet.rejected, (_, action) => {
                alert(action.payload || "Error deleting pet");
            });
    }
});

export default PetSlice.reducer;
