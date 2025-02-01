import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { AdopterModel } from "../model/AdopterModel.ts";

const initialState: AdopterModel[] = [];

const api = axios.create({
    baseURL: "http://localhost:3000/adopter"
});

export const saveAdopter = createAsyncThunk(
    "adopter/saveAdopter",
    async (adopter: AdopterModel, { rejectWithValue }) => {
        try {
            const response = await api.post("/add", adopter);
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data || "Error saving adopter");
        }
    }
);

export const getAllAdopters = createAsyncThunk(
    "adopter/getAllAdopter",
    async (_, { rejectWithValue }) => {
        try {
            const response = await api.get("/all");
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data || "Error fetching adopters");
        }
    }
);

export const updateAdopter = createAsyncThunk(
    "adopter/updateAdopter",
    async (adopter: AdopterModel, { rejectWithValue }) => {
        try {
            const response = await api.put(`/update/${adopter.adopter_id}`, adopter);
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data || "Error updating adopter");
        }
    }
);

export const deleteAdopter = createAsyncThunk(
    "adopter/removeAdopter",
    async (adopter_id: string, { rejectWithValue }) => {
        try {
            await api.delete(`/remove/${adopter_id}`);
            return adopter_id;
        } catch (error: any) {
            return rejectWithValue(error.response?.data || "Error deleting adopter");
        }
    }
);

const AdopterSlice = createSlice({
    name: "adopter",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(saveAdopter.fulfilled, (state, action) => {
                state.push(action.payload);
                alert("Adopter saved successfully");
            })
            .addCase(saveAdopter.rejected, (_, action) => {
                alert(action.payload || "Error saving adopter");
            });

        builder
            .addCase(getAllAdopters.fulfilled, (_, action) => {
                return action.payload;
            })
            .addCase(getAllAdopters.rejected, (_, action) => {
                alert(action.payload || "Error fetching adopters");
            });

        builder
            .addCase(updateAdopter.fulfilled, (state, action) => {
                const index = state.findIndex((adopter) => adopter.adopter_id === action.payload.adopter_id);
                if (index !== -1) {
                    state[index] = action.payload;
                    alert("Adopter updated successfully");
                }
            })
            .addCase(updateAdopter.rejected, (_, action) => {
                alert(action.payload || "Error updating adopter");
            });

        builder
            .addCase(deleteAdopter.fulfilled, (state, action) => {
                const index = state.findIndex((adopter) => adopter.adopter_id === action.payload);
                if (index !== -1) {
                    state.splice(index, 1);
                    alert("Adopter deleted successfully");
                }
            })
            .addCase(deleteAdopter.rejected, (_, action) => {
                alert(action.payload || "Error deleting adopter");
            });
    }
});

export default AdopterSlice.reducer;
