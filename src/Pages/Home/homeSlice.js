import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const product = createSlice({
    name: 'products',
    // initialState: [{
    //     id: '1',
    //     name: '',
    //     price: 0,
    //     category: '',
    //     img: '',
    //     des: {
    //         cpu: '',
    //         ram: '',
    //         rom: '',
    //         rearCamera: '',
    //         frontCamera: '',
    //         pin: '',
    //         pluggin: '',
    //     }
    // }],
    initialState: [],
    reducers: {
    },
    extraReducers: builder => {
        builder
            .addCase(fetchProduct.fulfilled, (state, action) => {
                state.push(action.payload)
            })
    }

})
export const fetchProduct = createAsyncThunk(
    'product/fetchProduct', async (id) => {
        const response = await fetch('https://630f636737925634188e6484.mockapi.io/product/');
        const data = await response.json()
        return data
    }
)
const { reducer, actions } = product
export const { addProduct } = actions
export default reducer;
