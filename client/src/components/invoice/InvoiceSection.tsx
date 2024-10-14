/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { fileUrlKey } from "@/helpers/config/envConfig";
import { useGetSinglePaymentReportQuery } from "@/redux/api/features/paymentReportApi";
import Image from "next/image";
import InvoicePdfDownload from "./InvoicePdfDownload";

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
  // console.log(order, "order");
  const orderData = order?.data?.order;

  const isLoading = initialLoading || isLoadingInvoice;
  const isDataAvailable = !isLoading && isSuccessInvoice && orderData;

  return (
    <div className="bg-[#F4F5FA] min-h-screen sm:pt-10">
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
        <>
          <main className="max-w-4xl mx-auto">
            <div className=" bg-white sm:p-10 p-5 rounded min-h-screen">
              <div className="flex justify-between items-center">
                <h1 className="font-bold sm:text-3xl text-xl">
                  Your Order Confirmed
                </h1>
                <InvoicePdfDownload orderId={order?.data?.order?.orderId} />
              </div>
              <div className="mt-3 mb-5">
                <h4 className="font-semibold">
                  Hello {orderData?.deliveryInfo?.firstName},
                </h4>
                <p>
                  Your order has been confirmed. You will receive an email with
                  your order details.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-4 border-t py-3 border-gray-200">
                <div>
                  <p className="font-medium text-gray-500 ">Order Date</p>
                  <p className="font-semibold ">12 Jan, 2024</p>
                </div>
                <div>
                  <p className="">Order No</p>
                  <p className=" font-semibold">
                    {order?.data?.paymentPlatformId}
                  </p>
                </div>
                <div>
                  <p className="">Payment</p>
                  <p className=" font-semibold">
                    {order?.data?.paymentPlatform}
                  </p>
                </div>
                <div className="">
                  {/* <p>Shipping Address</p> */}
                  <div>
                    <p>600 Montogo st</p>
                    <p>San Francisco, CA 94103</p>
                  </div>
                </div>
              </div>

              <header className="grid grid-cols-12 border-y py-2 font-semibold">
                <h1 className="col-span-6">Item</h1>
                <h1 className="col-span-2">Quantity</h1>
                <h1 className="col-span-2">Price</h1>
                <h1 className="col-span-2 text-right">Amount</h1>
              </header>

              <section>
                {orderData?.cartItems?.map((item: any, index: number) => (
                  <div
                    key={index}
                    className="grid grid-cols-12 border-b py-3 items-center"
                  >
                    <div className="col-span-6">
                      <h1 className="font-bold">{item?.productName}</h1>
                      <p className="">Color: {item?.color?.name}</p>
                    </div>

                    <div className="col-span-2">
                      <p>{item?.quantity}</p>
                    </div>

                    <div className=" col-span-2">
                      <p>
                        {item?.price?.toLocaleString("en-US", {
                          style: "currency",
                          currency: "USD",
                        })}
                      </p>
                    </div>

                    <div className="col-span-2">
                      <p className="col-span-3 text-right">
                        {item?.totalPrice?.toLocaleString("en-US", {
                          style: "currency",
                          currency: "USD",
                        })}
                      </p>
                    </div>
                    {/* <Image
                      src={`${fileUrlKey()}/${item?.image}`}
                      width={500}
                      height={500}
                      alt=""
                      className="col-span-3 rounded"
                    /> */}
                  </div>
                ))}
              </section>
              <section className="grid grid-cols-2">
                <div></div>
                <div>
                  <div className="flex justify-between py-1">
                    <p>Subtotal</p>
                    <p>
                      {orderData?.subTotal?.toLocaleString("en-US", {
                        style: "currency",
                        currency: "USD",
                      })}
                    </p>
                  </div>
                  <div className="flex justify-between py-1">
                    <p>Tax</p>
                    <p>
                      {orderData?.tax?.toLocaleString("en-US", {
                        style: "currency",
                        currency: "USD",
                      })}
                    </p>
                  </div>
                  <div className="flex justify-between py-1 font-bold">
                    <p>Total</p>
                    <p>
                      {order?.data?.amountPaid?.toLocaleString("en-US", {
                        style: "currency",
                        currency: "USD",
                      })}
                    </p>
                  </div>
                </div>
              </section>

              <footer></footer>
            </div>
          </main>
        </>
      )}
    </div>
  );
};
export default InvoiceSection;

{
  /* <main className="max-w-4xl mx-auto">
<div className="bg-white p-10 rounded">
  <h1>Invoice Data</h1>


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
</main> */
}
