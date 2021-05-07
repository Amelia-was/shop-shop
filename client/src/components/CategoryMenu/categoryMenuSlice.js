import { createSlice } from '@reduxjs/toolkit';

export const categoryMenuSlice = createSlice({
    name: 'categoryMenu',
    initialState: {
        categories: [],
        currentCategory: ''
    },
    reducers: {
        updateCategories: (state, action) => {
            state.categories = action.categories;
        },
        updateCurrentCategory: (state, action) => {
            state.currentCategory = action.currentCategory;
        }
    }
});

export const { updateCategories, updateCurrentCategory } = categoryMenuSlice.actions;

export default categoryMenuSlice.reducer;