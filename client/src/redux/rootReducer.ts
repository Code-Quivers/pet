import { baseApi } from "./api/baseApi";
import { addDeliverySlice } from "./slice/addDeliverySlice";
import { employeeFiledSlice } from "./slice/addEmployeeFieldSlice";
import { cartSlice } from "./slice/cartSlice";

export const reducer = {
  [baseApi.reducerPath]: baseApi.reducer,
  // field: employeeFiledSlice.reducer,
  cart: cartSlice.reducer,
  // delivery: addDeliverySlice.reducer,
};
