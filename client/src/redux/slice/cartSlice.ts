import { getFromLocalStorage, setToLocalStorage } from "@/utils/local-storage";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cart: [],
  payAmount: {},
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCartFromLocalStorage: (state, action) => {
      const storedCart = getFromLocalStorage("cart");
      const existingCart = storedCart ? JSON.parse(storedCart) : [];
      state.cart = existingCart;

      const getPayAmount = getFromLocalStorage("payAmount");
      const existingPayAmount = getPayAmount ? JSON.parse(getPayAmount) : {};
      state.payAmount = existingPayAmount;
    },

    addToCart: (state: any, action: any) => {
      const itemInCart = state.cart.find(
        (item: any) => item.variantId === action?.payload?.product?.variantId
      );
      if (itemInCart) {
        itemInCart.quantity = itemInCart.quantity + action?.payload?.quantity;
        setToLocalStorage("cart", JSON.stringify(state.cart));
      } else {
        state.cart.push({
          ...action?.payload?.product,
          quantity: action?.payload?.quantity,
        });
        setToLocalStorage("cart", JSON.stringify(state.cart));
      }
    },

    incrementQuantity: (state: any, action: any) => {
      const itemInCart = state?.cart?.find(
        (item: any) => item.variantId === action.payload
      );
      itemInCart.quantity++;
      setToLocalStorage("cart", JSON.stringify(state.cart));
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
      setToLocalStorage("cart", JSON.stringify(state.cart));
    },

    removeItem: (state: any, action: any) => {
      const removeItem = state?.cart?.filter(
        (item: any) => item.variantId !== action.payload
      );
      state.cart = removeItem;
      setToLocalStorage("cart", JSON.stringify(state.cart));
    },

    addPayAmount: (state: any, action: any) => {
      state.payAmount = action.payload;
      setToLocalStorage("payAmount", JSON.stringify(state.payAmount));
    },
  },
});
export const {
  addToCart,
  incrementQuantity,
  decrementQuantity,
  removeItem,
  addPayAmount,
  setCartFromLocalStorage,
} = cartSlice.actions;
export default cartSlice.reducer;
