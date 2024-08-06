import { baseApi } from "@/redux/api/baseApi";
import { tagTypes } from "@/redux/tag-types";

export const paypalPaymentApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getPaypalOrderData: builder.mutation({
      query: (data) => ({
        url: `/payment-paypal/pay`,
        method: "POST",
        data: JSON.stringify(data),
        contentType: "application/json",
      }),
      //   invalidatesTags: [tagTypes.properties, tagTypes.propertyOwner],
    }),
    capturePaypalPayment: builder.mutation({
      query: (paymentInfo) => ({
        url: `/payment-paypal/capture`,
        method: "POST",
        data: JSON.stringify(paymentInfo),
        contentType: "application/json",
      }),
      //   invalidatesTags: [tagTypes.properties, tagTypes.propertyOwner],
    }),
  }),
});

export const {
  useGetPaypalOrderDataMutation,
  useCapturePaypalPaymentMutation,
} = paypalPaymentApi;
