import {  createSlice } from "@reduxjs/toolkit";
import {AdoptionRequest} from "../model/AdoptionRequest.ts";
import adoptionRequestDummyData from "../dummydata/AdoptionRequestDummyData.ts";

const initialState: AdoptionRequest[] = adoptionRequestDummyData;

// const api = axios.create({
//     baseURL: "http://localhost:3000/adoptionRequest"
// });
//
// export const saveAdoptionRequest = createAsyncThunk(
//     'adoptionRequest/save',
//     async (adoptionRequest: AdoptionRequest) => {
//         try {
//             const response = await api.post('/add',adoptionRequest);
//             return response.data;
//         } catch (error) {
//             return console.log('error', error)
//         }
//     }
// );
//
// export const getAllAdoptionRequests = createAsyncThunk(
//     'adoptionRequest/getAll',
//     async () => {
//         try {
//             const response = await api.get('/all');
//             return response.data;
//         } catch (error) {
//             return console.error('error', error)
//         }
//     }
// );
//
// export const approveAdoptionRequest = createAsyncThunk(
//     'adoptionRequest/approve',
//     async (adoptionRequest: AdoptionRequest) => {
//         try {
//             const response = await api.put(`/approve/${adoptionRequest.adopter_id}/${adoptionRequest.pet_id}`, adoptionRequest);
//             return response.data;
//         } catch (error) {
//             return console.error('error', error)
//         }
//     }
// );
//
// export const rejectAdoptionRequest = createAsyncThunk(
//     'adoptionRequest/reject',
//     async ({ adopter_id, pet_id }: { adopter_id: string; pet_id: string }) => {
//         try {
//             await api.delete(`/remove/${adopter_id}/${pet_id}`);
//             return { adopter_id, pet_id };
//         } catch (error) {
//             return console.error('error', error);
//         }
//     }
// );
//
// export const sendAdoptionEmail = createAsyncThunk(
//     "adoptionRequest/sendAdoptionEmail",
//     async ({ adopterEmail, status }, thunkAPI) => {
//         try {
//             await axios.post("/api/send-email", { adopterEmail, status });
//         } catch (error) {
//             return thunkAPI.rejectWithValue(error.response.data);
//         }
//     }
// );

const AdoptionRequestSlice = createSlice({
    name: "adoptionRequest",
    initialState,
    reducers: {
        saveAdoptionRequest: (state, action) => {
            state.push(action.payload);
        },

        // approveAdoptionRequest: (state, action) => {
        //     const index = state.findIndex(
        //         (adoptionRequest) =>
        //             adoptionRequest.adopter_id === action.payload.adopter_id &&
        //             adoptionRequest.pet_id === action.payload.pet_id
        //     );
        //     if (index !== -1) {
        //         state[index].status = "approved";
        //         thunkAPI.dispatch(sendAdoptionEmail({ adopterEmail: action.payload.email, status: "approved" }));
        //
        //         // Here, you should also update the pet's status to "locked"
        //         thunkAPI.dispatch(lockPet(action.payload.pet_id));
        //     }
        // },
        // rejectAdoptionRequest: (state, action) => {
        //     thunkAPI.dispatch(sendAdoptionEmail({ adopterEmail: action.payload.email, status: "rejected" }));
        //     return state.filter(
        //         (adoptionRequest) =>
        //             adoptionRequest.adopter_id !== action.payload.adopter_id &&
        //             adoptionRequest.pet_id !== action.payload.pet_id
        //     );
        // },

        approveAdoptionRequest: (state, action) => {
            const index = state.findIndex((adoptionRequest) => adoptionRequest.adopter_id === action.payload.adopter_id && adoptionRequest.pet_id === action.payload.pet_id);
            state[index].status = "approved";
        },
        rejectAdoptionRequest: (state, action) => {
            return state.filter((adoptionRequest) => adoptionRequest.adopter_id !== action.payload.adopter_id && adoptionRequest.pet_id !== action.payload.pet_id);
        },
    },

});

export default AdoptionRequestSlice.reducer;
export const { saveAdoptionRequest, approveAdoptionRequest, rejectAdoptionRequest } = AdoptionRequestSlice.actions;