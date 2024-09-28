
import { tagTypes } from "@/redux/tag-types";
import { baseApi } from "../baseApi";


const AD_API = "/advertisement";

export const adApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getAdvertisement: build.query({
      query: (arg: Record<string, any>) => ({
        url: `${AD_API}`,
        method: "GET",
        params: arg,
      }),
      providesTags: [tagTypes.advertisement],
    }),

  }),
});

export const {
    useGetAdvertisementQuery,
} = adApi;
