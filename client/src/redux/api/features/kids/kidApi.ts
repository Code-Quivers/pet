import { tagTypes } from "@/redux/tag-types";
import { baseApi } from "../../baseApi";

const KID_API = "/tag";

export const kidApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    addKid: build.mutation({
      query: (data: any) => ({
        url: `/kid`,
        method: "POST",
        data: data,
        contentType: "multipart/form-data",
      }),
      invalidatesTags: [tagTypes.kids],
    }),
    getKidProfile: build.query({
      query: ({ code }: { code: string }) => ({
        url: `${KID_API}/${code}`,
        method: "GET",
      }),
      providesTags: [tagTypes.kids],
    }),
    getAvailableBarCode: build.query({
      query: (code) => ({
        url: `${KID_API}/barcode`,
        method: "GET",
        params: code,
      }),
      providesTags: [tagTypes.kids],
    }),
  }),
});

export const {
  useAddKidMutation,
  useGetKidProfileQuery,
  useGetAvailableBarCodeQuery,
} = kidApi;
