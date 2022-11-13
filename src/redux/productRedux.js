import { createSlice } from "@reduxjs/toolkit"

export const productSlice = createSlice({
    name: "product",
    initialState: {
        products: [],
        isFetching: false,
        error: false,
    },

    reducers: {
        //GET ALL
        getProductStart: (state) => {
            state.isFetching = true;
            state.error = false;
        },

        getProductSuccess: (state, action) => {
            state.isFetching = false;
            state.error = false;
            state.products = action.payload;
        },

        getProductFailure: (state, action) => {
            state.isFetching = false;
            state.error = action.payload;
        },

        //DELETE
        deleteProductStart: (state) => {
            state.isFetching = true;
            state.error = false;
        },

        deleteProductSuccess: (state, action) => {
            state.isFetching = false;
            state.error = false;
            //will delete one item at 1 index 
            state.products.splice(
                state.products.findIndex((item) => item.id === action.payload.id) - 1, 1
            );
        },

        deleteProductFailure: (state, action) => {
            state.isFetching = false;
            state.error = action.payload;
        },

        //UPDATE
        updateProductStart: (state) => {
            state.isFetching = true;
            state.error = false;
        },

        updateProductSuccess: (state, action) => {
            state.isFetching = false;
            state.error = false;
            // console.log(action.payload)
            state.products[state.products.findIndex((item) => item.id === action.payload.id)] = action.payload
        },

        updateProductFailure: (state, action) => {
            state.isFetching = false;
            state.error = action.payload;
        },

        //ADD
        addProductStart: (state) => {
            state.isFetching = true;
            state.error = false;
        },

        addProductSuccess: (state, action) => {
            state.isFetching = false;
            state.error = false;
            state.products.push(action.payload)
        },

        addProductFailure: (state, action) => {
            state.isFetching = false;
            state.error = action.payload;
        }
    }
});

export const { getProductStart, getProductSuccess, getProductFailure, deleteProductStart, deleteProductSuccess, deleteProductFailure, updateProductStart, updateProductSuccess, updateProductFailure, addProductStart, addProductSuccess, addProductFailure } = productSlice.actions

export default productSlice.reducer