import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Pet } from "../model/Pet.ts";
import petDummyData from "../dummydata/PetDummyData.ts";
import axios from "axios";

const initialState: Pet[] = petDummyData;

const api = axios.create({
    baseURL: "http://localhost:3000/pet",
});

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
            });
    },
});

export default PetSlice.reducer;
