import { baseApi } from "@/redux/api/baseApi";
import { tagTypes } from "@/redux/tag-types";

const PROMO_CODE_API = "/promo-code";
const PROMOTION_OFFER_API = "/promo-code/promotionalOffer";

export const promoApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getPromo: build.query({
      query: (arg: Record<string, any>) => ({
        url: `${PROMO_CODE_API}`,
        method: "GET",
        params: arg,
      }),
      providesTags: [tagTypes.promo],
    }),
    getPromotionalOffer: build.query({
      query: (arg: Record<string, any>) => ({
        url: `${PROMOTION_OFFER_API}`,
        method: "GET",
        params: arg,
      }),
      providesTags: [tagTypes.promo, tagTypes.promotionalOffer],
    }),
  }),
});

export const { useGetPromoQuery, useGetPromotionalOfferQuery } = promoApi;
