import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import { Pet } from "../model/Pet.ts";
import petDummyData from "../dummydata/PetDummyData.ts";
import axios from "axios";

const initialState: Pet[] = petDummyData;

const api = axios.create({
    baseURL: "http://localhost:3000/pet"
});

export const savePet = createAsyncThunk(
    'pet/savePet',
    async (pet: Pet) => {
        try {
            const response = await api.post('/add', pet);
            return response.data;
        } catch (error) {
            console.error('error', error)
        }
    }
);

export const getAllPets = createAsyncThunk(
    'pet/getAllPets',
    async () => {
        try {
            const response = await api.get('/all');
            return response.data;
        } catch (error) {
            return console.log('error', error)
        }
    }
);

export const updatePet = createAsyncThunk(
    'pet/updatePet',
    async (pet: Pet) => {
        try {
            const response = await api.put(`/update/${pet.pet_id}`, pet);
            return response.data;
        } catch (error) {
            return console.log('error', error)
        }
    }
);

export const deletePet = createAsyncThunk(
    'pet/removePet',
    async (pet_id: string) => {
        try {
            const response = await api.delete(`/remove/${pet_id}`);
            return response.data;
        } catch (error) {
            return console.log('error', error);
        }
    }
);

const PetSlice = createSlice({
    name: 'pet',
    initialState,
    reducers: {

        savePet: (state, action) => {
            state.push(action.payload);
        },
        updatePet: (state, action) => {
            return state.map((pet: Pet) => pet.pet_id === action.payload.pet_id
                ? action.payload
                : pet
            );
        },
        deletePet: (state, action : PayloadAction<string>) => {
            return state.filter((pet: Pet) => pet.pet_id !== action.payload );
        }
    },
});

export default PetSlice.reducer;
