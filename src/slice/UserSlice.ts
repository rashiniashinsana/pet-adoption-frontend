import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {User} from "../model/User.ts";
import axios from "axios";

const initialState : User[] = []

const api = axios.create({
    baseURL: "http://localhost:3000/user"
});

export const addUser = createAsyncThunk(
    'user/addUser',
    async (user: User, { rejectWithValue }) => {
        try {
            const response = await api.post("/add", user);
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data || "An error occurred");
        }
    }
);

export const loginUser = createAsyncThunk(
    'user/loginUser',
    async (user: User, { rejectWithValue }) => {
        try {
            const response = await api.post("/login", user);
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data || "Invalid credentials");
        }
    }
);

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(addUser.fulfilled, (state, action) => {
                state.push(action.payload);
            })
            .addCase(addUser.rejected, (_state, action) => {
                console.error("Add User Error:", action.payload);
            })
            .addCase(loginUser.fulfilled, (_state, action) => {
                return [action.payload]; // Replace with logged-in user data
            })
            .addCase(loginUser.rejected, (_state, action) => {
                console.error("Login Error:", action.payload);
            });
    },
});


export default userSlice.reducer