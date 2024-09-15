import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  value: 0,
};

export const fetchCart = createAsyncThunk(
  "cart/fatchCart",
  async (params, thunkAPI) => {
    try {
      const token = localStorage.getItem("access_token");
      const { data } = await axios.get("http://localhost:3000/carts", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return data.length;
    } catch (error) {}
  }
);

export const counterSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },

    decrement: (state) => {
      state.value = state.value <= 0 ? 0 : state.value - 1;
    },
    resetCart: (state) => {
      state.value = 0;
    },

    showCount: (state) => {
      return state.value;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCart.pending, (state, action) => {})
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.value = action.payload;
      })
      .addCase(fetchCart.rejected, (state, action) => {});
  },
});

// Action creators are generated for each case reducer function
export const { increment, decrement, resetCart, showCount } =
  counterSlice.actions;

export default counterSlice.reducer;
