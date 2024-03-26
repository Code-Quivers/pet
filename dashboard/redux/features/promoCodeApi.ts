import { baseApi } from "../api/baseApi";
import { tagTypes } from "../tag-types/tag-types";

const PROMO_QA_API = "/promo-code";

export const promoApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    addPromo: build.mutation({
      query: (data: any) => ({
        url: `${PROMO_QA_API}`,
        method: "POST",
        data: data,
      }),
      invalidatesTags: [tagTypes.promo],
    }),
    getPromo: build.query({
      query: (arg: Record<string, any>) => ({
        url: `${PROMO_QA_API}`,
        method: "GET",
        params: arg,
      }),
      providesTags: [tagTypes.promo],
    }),

    updatePromo: build.mutation({
      query: ({ data, promotionId }) => ({
        url: `${PROMO_QA_API}/${promotionId}`,
        method: "PATCH",
        data: data,
      }),
      invalidatesTags: [tagTypes.promo],
    }),

    deletePromo: build.mutation({
      query: ({ promotionId }) => ({
        url: `${PROMO_QA_API}/${promotionId}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.promo],
    }),
  }),
});

export const {
  useAddPromoMutation,
  useGetPromoQuery,
  useUpdatePromoMutation,
  useDeletePromoMutation,
} = promoApi;
