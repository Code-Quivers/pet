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
      invalidatesTags: [tagTypes.product, tagTypes.categories],
    }),
    updateProduct: builder.mutation({
      query: ({ data, productId }) => ({
        url: `${PRODUCT_API}/${productId}`,
        method: "PATCH",
        data: data,
        contentType: "multipart/form-data",
      }),
      invalidatesTags: [tagTypes.product, tagTypes.categories],
    }),

    getProduct: builder.query({
      query: (arg: Record<string, any>) => ({
        url: `${PRODUCT_API}`,
        method: "GET",
        params: arg,
      }),
      providesTags: [tagTypes.product, tagTypes.categories],
    }),
    getSingleProduct: builder.query({
      query: (productId: string) => ({
        url: `${PRODUCT_API}/${productId}`,
        method: "GET",
      }),
      providesTags: [tagTypes.product],
    }),
    getSingleVariant: builder.query({
      query: (variantId: string) => ({
        url: `/tag/get-single-variant/${variantId}`,
        method: "GET",
      }),
      providesTags: [tagTypes.product],
    }),

    updateProductVariation: builder.mutation({
      query: ({ data, variantId }) => ({
        url: `${PRODUCT_API}/variant/${variantId}`,
        method: "PATCH",
        data: data,
        contentType: "multipart/form-data",
      }),
      invalidatesTags: [tagTypes.product],
    }),
  }),
});

export const {
  useAddProductMutation,
  useGetProductQuery,
  useGetSingleProductQuery,
  useUpdateProductMutation,
  useGetSingleVariantQuery,
  useUpdateProductVariationMutation,
} = productApi;
