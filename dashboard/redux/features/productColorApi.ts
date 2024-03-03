import { baseApi } from "../api/baseApi";
import { tagTypes } from "../tag-types/tag-types";

const PRODUCT_COLOR_API = "/color-varient";

export const productColorApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    addProductColor: build.mutation({
      query: (data: any) => ({
        url: `${PRODUCT_COLOR_API}`,
        method: "POST",
        data: data,
      }),
      invalidatesTags: [tagTypes.productColor],
    }),
    getProductColor: build.query({
      query: (arg: Record<string, any>) => ({
        url: `${PRODUCT_COLOR_API}`,
        method: "GET",
        params: arg,
      }),
      providesTags: [tagTypes.productColor],
    }),
  }),
});

export const { useAddProductColorMutation, useGetProductColorQuery } =
  productColorApi;
