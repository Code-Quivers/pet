import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cart: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state: any, action: any) => {
      const itemInCart = state.cart.find(
        (item: any) => item.variantId === action?.payload?.product?.variantId
      );
      if (itemInCart) {
        itemInCart.quantity = itemInCart.quantity + action?.payload?.quantity;
      } else {
        state.cart.push({
          ...action?.payload?.product,
          quantity: action?.payload?.quantity,
        });
      }
    },

    incrementQuantity: (state: any, action: any) => {
      const itemInCart = state?.cart?.find(
        (item: any) => item.variantId === action.payload
      );
      itemInCart.quantity++;
    },

    decrementQuantity: (state: any, action: any) => {
      const itemInCart = state?.cart?.find(
        (item: any) => item.variantId === action.payload
      );
      if (itemInCart.quantity === 1) {
        itemInCart.quantity = 1;
      } else {
        itemInCart.quantity--;
      }
    },

    removeItem: (state: any, action: any) => {
      const removeItem = state?.cart?.filter(
        (item: any) => item.variantId !== action.payload
      );
      state.cart = removeItem;
    },
  },
});
export const { addToCart, incrementQuantity, decrementQuantity, removeItem } =
  cartSlice.actions;
export default cartSlice.reducer;
