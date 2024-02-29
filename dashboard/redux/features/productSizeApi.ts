import { baseApi } from "@/redux/api/baseApi";
import { tagTypes } from "../tag-types/tag-types";
const PRODUCT_SIZE_API = "/size-varient";

const productSizeApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // create product
    addProductSize: builder.mutation({
      query: (data) => ({
        url: `${PRODUCT_SIZE_API}`,
        method: "POST",
        data: data,
      }),
      invalidatesTags: [tagTypes.productSize],
    }),
    getProductSize: builder.query({
      query: (arg: Record<string, any>) => ({
        url: `${PRODUCT_SIZE_API}`,
        method: "GET",
        params: arg,
      }),
      providesTags: [tagTypes.productSize],
    }),
    updateProductSize: builder.mutation({
      query: ({ data }) => ({
        url: `${PRODUCT_SIZE_API}/${data?.batchId}`,
        method: "PATCH",
        data: data?.data,
      }),
      invalidatesTags: [tagTypes.productSize],
    }),
  }),
});

export const {
  useAddProductSizeMutation,
  useGetProductSizeQuery,
  useUpdateProductSizeMutation,
} = productSizeApi;
