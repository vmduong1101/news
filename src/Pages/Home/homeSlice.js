import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { useReducer } from "react";
import { addProductApi, deleteProductApi, getProductApi } from "../../Components/Api/productApi";



export const fetchProductThunk = createAsyncThunk(
    'product/fetchProduct', async () => {
        const response = await getProductApi.getAllProduct()
        return response
    }
)

export const addProductThunk = createAsyncThunk(
    'product/fetchAddProduct', async (payload) => {
        const response = await addProductApi.addProduct(payload)
        console.log('payload', payload)
        console.log('res', response)
        return response
    }
)

export const deleteProductThunk = createAsyncThunk(
    'product/fetchDeleteProduct', async (id) => {
        const response = await deleteProductApi.deleteProduct(id)
        return response
    }
)
const productSlice = createSlice({
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
    initialState: {
        data: [],
        loading: false,
        error: ''
    },
    reducers: {
    },
    extraReducers: {
        [fetchProductThunk.pending]: state => {
            state.loading = true;
        },
        [fetchProductThunk.fulfilled]: (state, action) => {
            state.loading = false;
            state.data = action.payload
        },
        [fetchProductThunk.rejected]: state => {
            state.loading = false;
            state.error = ''
        },
        //Add
        [addProductThunk.pending]: state => {
            state.loading = true;
        },
        [addProductThunk.fulfilled]: (state, action) => {
            state.loading = false;
            state.data = action.payload.params
            console.log(action)
        },
        [addProductThunk.rejected]: state => {
            state.loading = false;
            state.error = ''
        },
        //Delete

        [deleteProductThunk.pending]: state => {
            state.loading = true;
        },
        [deleteProductThunk.fulfilled]: (state, action) => {
            state.loading = false;
            state.data = action.payload
        },
        [deleteProductThunk.rejected]: state => {
            state.loading = false;
            state.error = ''
        }
    }

})

const { reducer: productReducer } = productSlice
export default productReducer;
