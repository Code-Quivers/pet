import { baseApi } from "../api/baseApi";
import { tagTypes } from "../tag-types/tag-types";

 
const HALL_URL = "/hall";

export const hallApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createHall: build.mutation({
      query: (data : any) => ({
        url: `${HALL_URL}`,
        method: "POST",
        data: data,
      }),
      invalidatesTags: [tagTypes.halls, ],
    }),
    getAllHalls: build.query({
      query: (arg: Record<string, any>) => ({
        url: `${HALL_URL}`,
        method: "GET",
        params:arg
      }),
      providesTags: [tagTypes.halls, ],
    }),
  }),
});

export const {  useCreateHallMutation,useGetAllHallsQuery } = hallApi;
