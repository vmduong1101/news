import { configureStore } from '@reduxjs/toolkit'
import productReducer from './../Pages/Home/homeSlice'

const rootReducer = {
    products: productReducer,
}

const store = configureStore({
    reducer: rootReducer,
})

export default store