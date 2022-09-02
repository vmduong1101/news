import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    changeCategory: ''
}

export const navigationSlice = createSlice({
    name: 'changeCategory',
    initialState,
    reducers: {
        getValue: (state, action) => {
            state.changeCategory = action.payload
        }
    }
})

export const { getValue } = navigationSlice.actions

export default navigationSlice.reducer