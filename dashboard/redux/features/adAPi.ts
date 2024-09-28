import { baseApi } from "../api/baseApi";
import { tagTypes } from "../tag-types/tag-types";

const AD_API = "/advertisement";

export const adApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    addAdvertisement: build.mutation({
      query: (data: any) => ({
        url: `${AD_API}`,
        method: "POST",
        data: data,
      }),
      invalidatesTags: [tagTypes.advertisement],
    }),
    getAdvertisement: build.query({
      query: (arg: Record<string, any>) => ({
        url: `${AD_API}`,
        method: "GET",
        params: arg,
      }),
      providesTags: [tagTypes.advertisement],
    }),

    updateAdvertisement: build.mutation({
      query: ({ data, adId }) => ({
        url: `${AD_API}/${adId}`,
        method: "PATCH",
        data: data,
      }),
      invalidatesTags: [tagTypes.advertisement],
    }),

    deleteAdvertisement: build.mutation({
      query: ({ adId }) => ({
        url: `${AD_API}/${adId}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.advertisement],
    }),
  }),
});

export const {
    useAddAdvertisementMutation,
    useGetAdvertisementQuery,
    useUpdateAdvertisementMutation,
    useDeleteAdvertisementMutation,
} = adApi;
