import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AdoptionRequest } from "../model/AdoptionRequest.ts"; // Assuming the model is defined
import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:3000/adoptionRequest",
});

const initialState: AdoptionRequest[] = [];

// Async Thunks for actions

// To save a new adoption request
export const saveAdoptionRequest = createAsyncThunk(
    "adoptionRequest/save",
    async (adoptionRequest: AdoptionRequest, { rejectWithValue }) => {
        try {
            const response = await api.post("/add", adoptionRequest);
            return response.data; // Ensure response.data is the adoption request you want to add
        } catch (error: any) {
            console.error("Save request error:", error);
            return rejectWithValue(error.response?.data || "Unexpected error");
        }
    }
);

// To fetch all adoption requests
export const getAllAdoptionRequests = createAsyncThunk(
    "adoptionRequest/getAll",
    async (_, { rejectWithValue }) => {
        try {
            const response = await api.get("/");
            return response.data;
        } catch (error: any) {
            console.error("Get all requests error:", error);
            return rejectWithValue(error.response?.data || "Unexpected error");
        }
    }
);

// To approve an adoption request
export const approveAdoptionRequest = createAsyncThunk(
    "adoptionRequest/approve",
    async ({ adopter_id, pet_id }: { adopter_id: string; pet_id: string }, { rejectWithValue }) => {
        try {
            const response = await api.put(`/approve/${adopter_id}/${pet_id}`);
            return response.data;
        } catch (error: any) {
            console.error("Approve request error:", error);
            return rejectWithValue(error.response?.data || "Unexpected error");
        }
    }
);

// To reject an adoption request
export const rejectAdoptionRequest = createAsyncThunk(
    "adoptionRequest/reject",
    async ({ adopter_id, pet_id }: { adopter_id: string; pet_id: string }, { rejectWithValue }) => {
        try {
            await api.delete(`/remove/${adopter_id}/${pet_id}`);
            return { adopter_id, pet_id }; // Return the adopter_id and pet_id to remove the request from the state
        } catch (error: any) {
            console.error("Reject request error:", error);
            return rejectWithValue(error.response?.data || "Unexpected error");
        }
    }
);

const adoptionRequestSlice = createSlice({
    name: "adoptionRequest",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Add new adoption request
            .addCase(saveAdoptionRequest.fulfilled, (state, action) => {
                if (action.payload) {
                    state.push(action.payload); // Add the new adoption request to the state
                }
            })
            // Fetch all adoption requests
            .addCase(getAllAdoptionRequests.fulfilled, (_, action) => {
                return action.payload;
            })
            // Handle adoption request approval
            .addCase(approveAdoptionRequest.fulfilled, (state, action) => {
                const index = state.findIndex(
                    (req) => req.adopter_id === action.payload.adopter_id && req.pet_id === action.payload.pet_id
                );
                if (index !== -1) state[index].status = "approved"; // Update status
            })
            // Handle adoption request rejection
            .addCase(rejectAdoptionRequest.fulfilled, (state, action) => {
                return state.filter(
                    (req) => req.adopter_id !== action.payload.adopter_id || req.pet_id !== action.payload.pet_id
                ); // Remove rejected request
            });
    },
});

export default adoptionRequestSlice.reducer;
