import { baseApi } from "../api/baseApi";
import { tagTypes } from "../tag-types/tag-types";

const AUTH_URL = "/auth";

export const authApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    dashboardLogin: build.mutation({
      query: (data: any) => ({
        url: `${AUTH_URL}/dashboard-login`,
        method: "POST",
        data: data,
      }),
      invalidatesTags: [tagTypes.user],
    }),
    createUser: build.mutation({
      query: ({ data }: any) => ({
        url: `${AUTH_URL}/create-user`,
        method: "POST",
        data,
      }),
      invalidatesTags: [tagTypes.user],
    }),
  }),
});

export const { useDashboardLoginMutation, useCreateUserMutation } = authApi;
