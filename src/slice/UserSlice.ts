import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {User} from "../model/User.ts";

const initialState : User[] = [{
    email: "rashi@gmail.com",
    password: "1234567890",
    role: "Manager"
}]
// TODO: add role for user
const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        addUser(state, action){
            state.push(action.payload)
        } ,
        loginUser(state, action : PayloadAction<{ email : string , password : string }>) {
            const { email , password } = action.payload
            const user = state.find((user) => user.email === email && user.password === password );
            if (!user){
                throw new Error('User not found ')
            }
        }
    }
})

export const {addUser , loginUser } = userSlice.actions
export default userSlice.reducer