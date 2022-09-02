import { configureStore } from '@reduxjs/toolkit'
import productReducer from './../Pages/Home/homeSlice'
import navigationSlice from './../Components/Navigation/navigationSlice'

const rootReducer = {
    products: productReducer,
    changeValue: navigationSlice,
}

const store = configureStore({
    reducer: rootReducer,
})

export default store