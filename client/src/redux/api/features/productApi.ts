import { baseApi } from "@/redux/api/baseApi";
import { tagTypes } from "@/redux/tag-types";
const PRODUCT_API = "/product-batch";

const productApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // create Item
    addProduct: builder.mutation({
      query: (data) => ({
        url: `${PRODUCT_API}`,
        method: "POST",
        data: data,
        contentType: "multipart/form-data",
      }),
      invalidatesTags: [tagTypes.product],
    }),

    getProduct: builder.query({
      query: (arg: Record<string, any>) => ({
        url: `${PRODUCT_API}`,
        method: "GET",
        params: arg,
      }),
      providesTags: [tagTypes.product],
    }),
  }),
});

export const { useAddProductMutation, useGetProductQuery } = productApi;
