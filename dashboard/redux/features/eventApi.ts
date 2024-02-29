import { baseApi } from "@/redux/api/baseApi"; 
import { tagTypes } from "../tag-types/tag-types";
const EVENT_API = "/event";

const eventApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // create Item
    addEvent: builder.mutation({
      query: (data) => ({
        url: `${EVENT_API}`,
        method: "POST",
        data: data,
      }),
      invalidatesTags: [tagTypes.events],
    }),
   updateEvent: builder.mutation({
      query: ({data,eventId}) => ({
        url: `${EVENT_API}/${eventId}`,
        method: "PATCH",
        data: data,
      }),
      invalidatesTags: [tagTypes.events],
    }),

    getAllEvents: builder.query({
      query: (arg: Record<string, any>) => ({
        url: `${EVENT_API}/allEvent`,
        method: "GET",
        params: arg,
      }),
      providesTags: [tagTypes.events],
    }),
  }),
});

export const { useAddEventMutation, useGetAllEventsQuery,useUpdateEventMutation } = eventApi;
