import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: 'user',
    initialState: {
        currentUser: null,
        isFetching: false,
        error: null
    },

    reducers: {
        loginStart:(state)=>{
            state.isFetching = true;
        },
        loginSuccess:(state,action)=>{
            state.isFetching = false;
            state.error = false;
            // state.error.msg = "";
            state.currentUser = action.payload;
        },
        loginFailure:(state, action)=>{
            state.isFetching = false;
            state.error = action.payload;
            // state.error.msg = action.payload;
            // console.log(state.error.errors);
        },
        logoutUser:(state)=>{
            state.isFetching = false;
            state.error = false;
            state.currentUser = null;
        }
    }
})

export const {loginStart, loginSuccess, loginFailure, logoutUser} = userSlice.actions;
export default userSlice.reducer