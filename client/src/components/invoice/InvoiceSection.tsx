/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { fileUrlKey } from "@/helpers/config/envConfig";
import { useGetSinglePaymentReportQuery } from "@/redux/api/features/paymentReportApi";
import Image from "next/image";

interface InvoicePageProps {
  paymentIntent: boolean | null;
  isLoading: boolean;
  isSuccess: boolean | null;
  invoiceId: string;
}

const InvoiceSection = ({
  paymentIntent,
  isLoading: initialLoading,
  isSuccess,
  invoiceId,
}: InvoicePageProps) => {
  const {
    data: order,
    isLoading: isLoadingInvoice,
    isSuccess: isSuccessInvoice,
    error,
    isError,
  } = useGetSinglePaymentReportQuery(invoiceId, {
    skip: paymentIntent ? !paymentIntent || !isSuccess : false,
  });

  const orderData = order?.data?.order;

  const isLoading = initialLoading || isLoadingInvoice;
  const isDataAvailable = !isLoading && isSuccessInvoice && orderData;

  return (
    <div className="bg-[#F4F5FA] min-h-screen pt-10">
      {isLoading && (
        <div className="flex justify-center items-center min-h-[50vh]">
          Loading Invoice...
        </div>
      )}

      {isError && !isLoading && error && (
        <div className="flex justify-center items-center min-h-[50vh] text-red-600">
          Failed to load invoice. Please try again.
        </div>
      )}

      {!isLoading && !isError && isDataAvailable && (
        <main className="max-w-4xl mx-auto">
          <div className="bg-white p-10 rounded">
            <h1>Invoice Data</h1>
            {/* Render invoice details here, using orderData */}

            <section>
              {orderData?.cartItems?.map((item: any, index: number) => (
                <div
                  key={index}
                  className="grid sm:grid-cols-12 grid-cols-2 border-b py-4"
                >
                  <Image
                    src={`${fileUrlKey()}/${item?.image}`}
                    width={500}
                    height={500}
                    alt=""
                    className="sm:col-span-2 w-20 h-20 rounded"
                  />
                  <div className="sm:col-span-8">
                    <h1>{item?.productName}</h1>
                    <p className="hidden sm:block">
                      Quantity: {item?.quantity}
                    </p>
                    <div className="sm:hidden">
                      <p>Quantity: {item?.quantity}</p>
                      <p>
                        {item?.totalPrice?.toLocaleString("en-US", {
                          style: "currency",
                          currency: "USD",
                        })}
                      </p>
                    </div>
                    <p>Color: {item?.color?.name}</p>
                  </div>
                  <p className="sm:col-span-2 text-right hidden sm:block">
                    {item?.totalPrice?.toLocaleString("en-US", {
                      style: "currency",
                      currency: "USD",
                    })}
                  </p>
                </div>
              ))}
            </section>
            <section className="grid grid-cols-2">
              <div>
                <div className="flex justify-between py-1">
                  <p>Subtotal</p>
                  <p>
                    {(60).toLocaleString("en-US", {
                      style: "currency",
                      currency: "USD",
                    })}
                  </p>
                </div>
                <div className="flex justify-between py-1">
                  <p>Shipping</p>
                  <p>
                    {(5).toLocaleString("en-US", {
                      style: "currency",
                      currency: "USD",
                    })}
                  </p>
                </div>
                <div className="flex justify-between py-1">
                  <p>Tax</p>
                  <p>
                    {(5).toLocaleString("en-US", {
                      style: "currency",
                      currency: "USD",
                    })}
                  </p>
                </div>
                <div className="flex justify-between py-1">
                  <p>Total</p>
                  <p>
                    {(70).toLocaleString("en-US", {
                      style: "currency",
                      currency: "USD",
                    })}
                  </p>
                </div>
              </div>
            </section>
          </div>
        </main>
      )}
    </div>
  );
};
export default InvoiceSection;
