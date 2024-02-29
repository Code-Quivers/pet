import { baseApi } from "@/redux/api/baseApi";
import { tagTypes } from "../tag-types/tag-types";
const BATCH_PRODUCT_API = "/product-batch";

const batchProductApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // create product
    addBatchProduct: builder.mutation({
      query: (data) => ({
        url: `${BATCH_PRODUCT_API}`,
        method: "POST",
        data: data,
      }),
      invalidatesTags: [tagTypes.product, tagTypes.batchProduct],
    }),
    getBatchProducts: builder.query({
      query: (arg: Record<string, any>) => ({
        url: `${BATCH_PRODUCT_API}`,
        method: "GET",
        params: arg,
      }),
      providesTags: [tagTypes.product, tagTypes.batchProduct],
    }),
    updateBatchProduct: builder.mutation({
      query: ({ data }) => ({
        url: `${BATCH_PRODUCT_API}/${data?.batchId}`,
        method: "PATCH",
        data: data?.data,
      }),
      invalidatesTags: [tagTypes.product, tagTypes.batchProduct],
    }),
  }),
});

export const {
  useAddBatchProductMutation,
  useGetBatchProductsQuery,
  useUpdateBatchProductMutation,
} = batchProductApi;
