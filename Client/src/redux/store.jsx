import { configureStore } from '@reduxjs/toolkit'
import cartReducer from "./counterSlice";

export const store = configureStore({
  reducer: {
   countCart: cartReducer
  },
})

