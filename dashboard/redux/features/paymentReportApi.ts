import { baseApi } from "@/redux/api/baseApi";
import { tagTypes } from "../tag-types/tag-types";
const REPORT_API = "/payments";

const paymentReportApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllPaymentsReport: builder.query({
      query: (arg: Record<string, any>) => ({
        url: `${REPORT_API}`,
        method: "GET",
        params: arg,
      }),
      providesTags: [tagTypes.payment, tagTypes.report],
    }),
  }),
});

export const { useGetAllPaymentsReportQuery } = paymentReportApi;
