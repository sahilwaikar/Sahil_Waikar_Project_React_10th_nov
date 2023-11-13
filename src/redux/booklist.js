import { createSlice } from "@reduxjs/toolkit";

const bookSlice = createSlice({
    name: 'booklist',
    initialState: [],
    reducers: {
        addBook: (state,action) => {
            let bookToAdd = action.payload;
            bookToAdd.map((book)=>{
                state.push(book);
            })
        }
    }
})

export const {addBook} = bookSlice.actions;

export default bookSlice.reducer;