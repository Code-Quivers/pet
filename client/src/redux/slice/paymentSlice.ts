import { getFromLocalStorage, setToLocalStorage } from "@/utils/local-storage";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  orderId: "",
};

export const paymentSlice = createSlice({
  name: "paymentInfo",
  initialState,
  reducers: {
    setOrderId: (state: any, action: any) => {
      state.orderId = action.payload;
    },
  },
});
export const { setOrderId } = paymentSlice.actions;
export default paymentSlice.reducer;
