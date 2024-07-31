import { baseApi } from "@/redux/api/baseApi";
import { tagTypes } from "@/redux/tag-types";

export const stripePaymentApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getClientSecret: builder.mutation({
      query: (paymentInfo) => ({
        url: `/payment-stripe/create-payment-intent`,
        method: "POST",
        data: JSON.stringify(paymentInfo),
        contentType: "application/json",
      }),
    //   invalidatesTags: [tagTypes.properties, tagTypes.propertyOwner],
    }),

    retrivePaymentInfo: builder.mutation({
      query: (data) => ({
        url: `/payment-stripe/retrive-payment-info`,
        method: "POST",
        data: JSON.stringify(data),
        contentType: "application/json",
      }),
      // invalidatesTags: [tagTypes.properties, tagTypes.propertyOwner],
    }),

    // retriveTenantPaymentInfo: builder.mutation({
    //   query: (data) => ({
    //     url: `/payment-stripe/retrive-tenant-payment-info`,
    //     method: "POST",
    //     data: JSON.stringify(data),
    //     contentType: "application/json",
    //   }),
    //   // invalidatesTags: [tagTypes.properties],
    // }),

    // createConnectedAccount: builder.mutation({
    //   query: (data) => ({
    //     url: `/payment-stripe/create-connected-account`,
    //     method: "POST",
    //     data: JSON.stringify(data),
    //     contentType: "application/json",
    //   }),
    //   invalidatesTags: [tagTypes.properties, tagTypes.propertyOwner],
    // }),

    // createAccountLink: builder.mutation({
    //   query: (data) => ({
    //     url: `/payment-stripe/create-account-link`,
    //     method: "POST",
    //     data: JSON.stringify(data),
    //     contentType: "application/json",
    //   }),
    //   invalidatesTags: [tagTypes.properties, tagTypes.propertyOwner],
    // }),
  }),
});

export const {
  useGetClientSecretMutation, 
  useRetrivePaymentInfoMutation,
} = stripePaymentApi;