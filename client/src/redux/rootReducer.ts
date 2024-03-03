import { baseApi } from "./api/baseApi";
import { addDeliverySlice } from "./slice/addDeliverySlice";
import { employeeFiledSlice } from "./slice/addEmployeeFieldSlice";

export const reducer = {
  [baseApi.reducerPath]: baseApi.reducer,
  // field: employeeFiledSlice.reducer,
  delivery: addDeliverySlice.reducer,
};
