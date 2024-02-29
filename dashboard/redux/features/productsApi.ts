import { baseApi } from "@/redux/api/baseApi"; 
import { tagTypes } from "../tag-types/tag-types";
const PRODUCT_API = "/product";

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
      invalidatesTags: [tagTypes.product,tagTypes.categories,tagTypes.subCategories],
    }),
    updateProduct: builder.mutation({
      query: ({data,productId}) => ({
        url: `${PRODUCT_API}/${productId}`,
        method: "PATCH",
        data: data,
        contentType: "multipart/form-data",
      }),
      invalidatesTags: [tagTypes.product,tagTypes.categories,tagTypes.subCategories],
    }),

    getProduct: builder.query({
      query: (arg: Record<string, any>) => ({
        url: `${PRODUCT_API}`,
        method: "GET",
        params: arg,
      }),
      providesTags: [tagTypes.product,tagTypes.categories,tagTypes.subCategories],
    }),
  }),
});

export const { useAddProductMutation, useGetProductQuery ,useUpdateProductMutation} = productApi;
