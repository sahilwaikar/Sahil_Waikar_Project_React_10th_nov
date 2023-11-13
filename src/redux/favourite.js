import { createSlice } from "@reduxjs/toolkit";

export const favSlice = createSlice({
    name: 'favorite',
    initialState: [],
    reducers: {
        addFavoriteMy: (state,action) => {
            const favoriteToAdd = action.payload;
            state.push(favoriteToAdd);
        },
        removeFromfev: (state, action) => {
            const productToRemove = action.payload;
            state.pop(productToRemove);
        }
    }
})

export const {addFavoriteMy, removeFromfev} = favSlice.actions;

export default favSlice.reducer;