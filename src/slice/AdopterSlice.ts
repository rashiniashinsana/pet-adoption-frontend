import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import { Adopter } from "../model/Adopter.ts";
import adopterDummyData from "../dummydata/AdopterDummyData.ts";
import axios from "axios";


const initialState: Adopter[] = adopterDummyData;

const api = axios.create({
    baseURL: "http://localhost:3000/adopter"
});

export const saveAdopter = createAsyncThunk(
    'adopter/saveAdopter',
    async (adopter: Adopter) => {
        try {
            const response = await api.post("/add", adopter);
            return response.data;
        } catch (error) {
            return console.log('error', error)
        }
    }
);

export const getAllAdopters = createAsyncThunk(
    'adopter/getAllAdopter',
    async () => {
        try {
            const response = await api.get("/all");
            return response.data;
        } catch (error) {
        return console.log('error', error)
        }
    }
);

export const updateAdopter = createAsyncThunk(
    'adopter/updateAdopter',
    async (adopter: Adopter) => {
        try {
            const response = await api.put(`/update/${adopter.adopter_id}`, adopter);
            return response.data;
        } catch (error) {
            return console.log('error', error)
        }
    }
);

export const deleteAdopter = createAsyncThunk(
    'adopter/removeAdopter',
    async (adopter_id: string) => {
        try {
            const response = await api.delete(`/remove/${adopter_id}`);
            return response.data;
        } catch (error) {
          return console.log('error', error)
        }
    }
);

const adopterSlice = createSlice({
    name: 'adopter',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(saveAdopter.fulfilled, (state, action) => {
                state.push(action.payload);
                alert("Adopter saved successfully.");
            })
            .addCase(getAllAdopters.fulfilled, (state, action) => {
                action.payload.forEach((adopter: Adopter) => {
                    state.push(adopter);
                });
            })
            .addCase(updateAdopter.fulfilled, (state, action) => {
                const index = state.findIndex((adopter:Adopter) => adopter.adopter_id === action.payload.adopter_id);
                state[index] = action.payload;
                alert("Adopter updated successfully.");
            })
            .addCase(deleteAdopter.fulfilled, (state, action) => {
                const index = state.findIndex((adopter:Adopter) => adopter.adopter_id === action.payload.adopter_id);
                state.splice(index, 1);
            });

        }
});

export default adopterSlice.reducer;
