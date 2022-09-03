import { configureStore } from '@reduxjs/toolkit'
import productReducer from './../Pages/Home/homeSlice'
import navigationSlice from './../Components/Navigation/navigationSlice'
import cartReducer from '../Pages/Cart/cartSlice'

const rootReducer = {
    products: productReducer,
    changeValue: navigationSlice,
    cart: cartReducer,
}

const store = configureStore({
    reducer: rootReducer,
})

export default store