import { baseApi } from "@/redux/api/baseApi"; 
import { tagTypes } from "../tag-types/tag-types";
const EVENT_API = "/subEvent";

const subEventApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // create Item
    addSubEvent: builder.mutation({
      query: (data) => ({
        url: `${EVENT_API}`,
        method: "POST",
        data: data,
      }),
      invalidatesTags: [tagTypes.events],
    }),

     
  }),
});

export const { useAddSubEventMutation,   } = subEventApi;
