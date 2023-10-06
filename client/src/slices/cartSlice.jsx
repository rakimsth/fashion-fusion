import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cart: [],
  quantity: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      // Check if existing item is being added
      const itemInCart = state.cart.find(
        (item) => item.id === action.payload.id
      );
      if (itemInCart) {
        itemInCart.quantity++;
        state.quantity++;
      } else {
        state.cart.push({ ...action.payload, quantity: 1 });
        state.quantity++;
      }
    },
    removeItem: (state, action) => {
      const removedItem = state.cart.filter(
        (item) => item.id !== action.payload
      );
      state.cart = removedItem;
      state.quantity = state.cart.reduce((acc, obj) => {
        return acc + obj.quantity;
      }, 0);
    },
    increaseQuantity: (state, action) => {
      const existingItem = state.cart.find(
        (item) => item.id === action.payload
      );
      if (existingItem) {
        existingItem.quantity++;
        state.quantity++;
      }
    },
    decreaseQuantity: (state, action) => {
      const existingItem = state.cart.find(
        (item) => item.id === action.payload
      );
      if (existingItem.quantity === 1) {
        existingItem.quantity = 1;
      } else {
        existingItem.quantity--;
        state.quantity--;
      }
    },
  },
});

export const { addToCart, removeItem, increaseQuantity, decreaseQuantity } =
  cartSlice.actions;

export const cartReducer = cartSlice.reducer;
