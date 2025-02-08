import { createSlice, PayloadAction} from "@reduxjs/toolkit";
import { Adopter } from "../model/Adopter.ts";
import adopterDummyData from "../dummydata/AdopterDummyData.ts";

const initialState: Adopter[] = adopterDummyData;
//
// const api = axios.create({
//     baseURL: "http://localhost:3000/adopter"
// });

// export const saveAdopter = createAsyncThunk(
//     'adopter/saveAdopter',
//     async (adopter: Adopter) => {
//         try {
//             const response = await api.post("/add", adopter);
//             return response.data;
//         } catch (error) {
//             return console.log('error', error)
//         }
//     }
// );
//
// export const getAllAdopters = createAsyncThunk(
//     'adopter/getAllAdopter',
//     async () => {
//         try {
//             const response = await api.get("/all");
//             return response.data;
//         } catch (error) {
//         return console.log('error', error)
//         }
//     }
// );
//
// export const updateAdopter = createAsyncThunk(
//     'adopter/updateAdopter',
//     async (adopter: Adopter) => {
//         try {
//             const response = await api.put(`/update/${adopter.adopter_id}`, adopter);
//             return response.data;
//         } catch (error) {
//             return console.log('error', error)
//         }
//     }
// );
//
// export const deleteAdopter = createAsyncThunk(
//     'adopter/removeAdopter',
//     async (adopter_id: string) => {
//         try {
//             const response = await api.delete(`/remove/${adopter_id}`);
//             return response.data;
//         } catch (error) {
//           return console.log('error', error)
//         }
//     }
// );

const AdopterSlice = createSlice({
    name: 'adopter',
    initialState,
    reducers: {
        saveAdopter: (state, action: PayloadAction<Adopter>) => {
            state.push(action.payload);
        },
        deleteAdopter: (state, action: PayloadAction<string>) => {
            return state.filter(adopter => adopter.adopter_id !== action.payload);
        },
        updateAdopter: (state, action: PayloadAction<Adopter>) => {
            const index = state.findIndex(adopter => adopter.adopter_id === action.payload.adopter_id);
            if (index !== -1) {
                state[index] = action.payload;
            }
            return state;
        }
    },
});

export const { saveAdopter, deleteAdopter, updateAdopter } = AdopterSlice.actions;
export default AdopterSlice.reducer;
