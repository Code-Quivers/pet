import { baseApi } from "@/redux/api/baseApi"; 
import { tagTypes } from "../tag-types/tag-types";
const OPTIONAL_PRODUCT_API = "/optional-items";

const optionalProductsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
  
    addOptionalProducts: builder.mutation({
      query: (data) => ({
        url: `${OPTIONAL_PRODUCT_API}`,
        method: "POST",
        data: data,
      }),
      invalidatesTags: [tagTypes.product,tagTypes.batchProduct,tagTypes.optionalProducts],
    }),
    getOptionalProducts: builder.query({
      query: (arg: Record<string, any>) => ({
        url: `${OPTIONAL_PRODUCT_API}`,
        method: "GET",
        params: arg,
      }),
      providesTags:[tagTypes.product,tagTypes.batchProduct,tagTypes.optionalProducts],
    }),
   
  }),
});

export const { useAddOptionalProductsMutation,  useGetOptionalProductsQuery } = optionalProductsApi;
