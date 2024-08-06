import { baseApi } from "./api/baseApi";
import { cartSlice } from "./slice/cartSlice";
import deliveryInfoSlice from "./slice/deliveryInfoSlice";
import paymentInfoReducer from "./slice/paymentSlice";

export const reducer = {
  [baseApi.reducerPath]: baseApi.reducer,
  // field: employeeFiledSlice.reducer,
  cart: cartSlice.reducer,
  deliveryInfo: deliveryInfoSlice,
  paymentInfo: paymentInfoReducer,
};
