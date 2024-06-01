import { baseApi } from "@/redux/api/baseApi";
import { tagTypes } from "../tag-types/tag-types";
const ORDER_API = "/orders";

const orderApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // create Item
    addOrder: builder.mutation({
      query: (data) => ({
        url: `${ORDER_API}`,
        method: "POST",
        data: data,
      }),
      invalidatesTags: [tagTypes.orders],
    }),
    updateOrder: builder.mutation({
      query: ({ data, orderId }) => ({
        url: `${ORDER_API}/${orderId}`,
        method: "PATCH",
        data: data,
      }),
      invalidatesTags: [tagTypes.orders],
    }),
    updateOrderStatus: builder.mutation({
      query: ({ data, orderId }) => ({
        url: `${ORDER_API}/status/${orderId}`,
        method: "PATCH",
        data: data,
      }),
      invalidatesTags: [tagTypes.orders],
    }),

    getAllOrders: builder.query({
      query: (arg: Record<string, any>) => ({
        url: `${ORDER_API}`,
        method: "GET",
        params: arg,
      }),
      providesTags: [tagTypes.orders],
    }),

    getMonthWiseOrders: builder.query({
      query: (arg: Record<string, any>) => ({
        url: `${ORDER_API}/monthWise`,
        method: "GET",
        params: arg,
      }),
      providesTags: [tagTypes.orders],
    }),
  }),
});

export const {
  useAddOrderMutation,
  useUpdateOrderMutation,
  useUpdateOrderStatusMutation,
  useGetAllOrdersQuery,
  useGetMonthWiseOrdersQuery,
} = orderApi;
