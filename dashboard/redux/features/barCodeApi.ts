import { baseApi } from "../api/baseApi";
import { tagTypes } from "../tag-types/tag-types";

const BARCODE_API = "/tag";

export const barCodeApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getBarcode: builder.query({
      query: (arg: Record<string, any>) => ({
        url: `${BARCODE_API}`,
        method: "GET",
        params: arg,
      }),
      providesTags: [tagTypes.tag],
    }),

    getBarcodeForPrint: builder.query({
      query: (arg: Record<string, any>) => ({
        url: `${BARCODE_API}/barcode-print`,
        method: "GET",
        params: arg,
      }),
      providesTags: [tagTypes.tag],
    }),

    getSingleBarcode: builder.query({
      query: (barcodeCode: string | undefined) => ({
        url: `${BARCODE_API}/${barcodeCode}`,
        method: "GET",
      }),
      providesTags: [tagTypes.tag],
    }),
  }),
});

export const {
  useGetBarcodeQuery,
  useGetSingleBarcodeQuery,
  useGetBarcodeForPrintQuery,
} = barCodeApi;
