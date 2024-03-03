import { baseApi } from "@/redux/api/baseApi"; 
import { tagTypes } from "../tag-types/tag-types";
const SLOT_API = "/slot";

const slotApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // create Item
    addSlot: builder.mutation({
      query: (data) => ({
        url: `${SLOT_API}`,
        method: "POST",
        data: data,
      }),
      invalidatesTags: [tagTypes.slots],
    }),
  editSlot: builder.mutation({
      query: ({slotId,data}) => ({
        url: `${SLOT_API}/${slotId}`,
        method: "PATCH",
        data: data,
      }),
      invalidatesTags: [tagTypes.slots],
    }),

    getSlot: builder.query({
      query: (arg: Record<string, any>) => ({
        url: `${SLOT_API}`,
        method: "GET",
        params: arg,
      }),
      providesTags: [tagTypes.slots],
    }),
  }),
});

export const { useAddSlotMutation, useGetSlotQuery,useEditSlotMutation } = slotApi;
