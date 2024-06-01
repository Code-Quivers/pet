import { baseApi } from "./api/baseApi";
import { cartSlice } from "./slice/cartSlice";

export const reducer = {
  [baseApi.reducerPath]: baseApi.reducer,
  // field: employeeFiledSlice.reducer,
  cart: cartSlice.reducer,
  // delivery: addDeliverySlice.reducer,
};
