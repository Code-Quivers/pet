
import { tagTypes } from "@/redux/tag-types";
import { baseApi } from "../baseApi";


const REPORT_API = "/payments";

export const paymentReportApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getSinglePaymentReport: build.query({
      query: (paymentPlatformId) => ({
        url: `${REPORT_API}/${paymentPlatformId}`,
        method: "GET",
      }),
      providesTags: [tagTypes.report, tagTypes.paypal, tagTypes.orders],
    }),

  }),
});

export const {
    useGetSinglePaymentReportQuery,
} = paymentReportApi;
