import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { addCartApi, deleteCartApi, editCartApi, getCartApi } from "../../Components/Api/cartApi";


export const getcartThunk = createAsyncThunk(
    'cart/getCart', async () => {
        const response = await getCartApi.getCart()
        return response
    }
)
export const addCartThunk = createAsyncThunk(
    'cart/fetchAddCart', async (payload) => {
        const response = await addCartApi.addCart(payload)
        return response
    }
)

export const deleteCartThunk = createAsyncThunk(
    'cart/fetchDeleteCart', async (id) => {
        const response = await deleteCartApi.deleteCart(id)
        return response
    }
)

export const editCartThunk = createAsyncThunk(
    'cart/fetchEditCart', async (payload) => {
        console.log(payload)
        const response = await editCartApi.editCart(payload)
        return response
    }
)




const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        data: [],
        loading: false,
        error: ''
    },
    reducers: {
    },
    extraReducers: {
        //Fetch
        [getcartThunk.pending]: state => {
            state.loading = true;
        },
        [getcartThunk.fulfilled]: (state, action) => {
            state.loading = false;
            state.data = action.payload
        },
        [getcartThunk.rejected]: state => {
            state.loading = false;
            state.error = ''
        },
        //Add
        [addCartThunk.pending]: state => {
            state.loading = true;
        },
        [addCartThunk.fulfilled]: (state, action) => {
            state.loading = false;
            state.data = action.payload
        },
        [addCartThunk.rejected]: state => {
            state.loading = false;
            state.error = ''
        },
        //Add
        [deleteCartThunk.pending]: state => {
            state.loading = true;
        },
        [deleteCartThunk.fulfilled]: (state, action) => {
            console.log(action)
            state.loading = false;
            state.data = state.data.filter(item => item.id != action.payload.id)
        },
        [deleteCartThunk.rejected]: state => {
            state.loading = false;
            state.error = ''
        },
        //Edit
        [editCartThunk.pending]: state => {
            state.loading = true;
        },
        [editCartThunk.fulfilled]: (state, action) => {
            state.loading = false;
            state.data = action.payload
        },
        [editCartThunk.rejected]: state => {
            state.loading = false;
            state.error = ''
        },
    }

})

const { reducer: cartReducer } = cartSlice
export default cartReducer;
