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
  console.log(order, "order");
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
              <h1 className="font-bold sm:text-3xl text-xl">
                Your Order Confirmed
              </h1>
              <div className="mt-3 mb-5">
                <h4 className="font-semibold ">
                  Hello {orderData?.deliveryInfo?.firstName},
                </h4>
                <p className="text-sm">
                  Your order has been confirmed. You will receive an email with
                  your order details.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-4 border-y py-3 border-gray-200">
                <div>
                  <p className="font-medium text-gray-500 text-xs">
                    Order Date
                  </p>
                  <p className="font-semibold text-xs">12 Jan, 2024</p>
                </div>
                <div>
                  <p className="text-xs">Order No</p>
                  <p className="text-xs">{order?.data?.paymentPlatformId}</p>
                </div>
                <div>
                  <p className="text-xs">Payment</p>
                  <p className="text-xs">{order?.data?.paymentPlatform}</p>
                </div>
                <div className="text-xs">
                  {/* <p>Shipping Address</p> */}
                  <div>
                    <p>600 Montogo st</p>
                    <p>San Francisco, CA 94103</p>
                  </div>
                </div>
              </div>

              <section>
                {orderData?.cartItems?.map((item: any, index: number) => (
                  <div
                    key={index}
                    className="grid grid-cols-12 border-b py-4 gap-3"
                  >
                    <Image
                      src={`${fileUrlKey()}/${item?.image}`}
                      width={500}
                      height={500}
                      alt=""
                      className="col-span-3  rounded"
                    />
                    <div className="col-span-7">
                      <h1 className="font-bold">{item?.productName}</h1>
                      {/* <p className="hidden sm:block">
                        Quantity: {item?.quantity}
                      </p> */}
                      <div className="text-sm">
                        <p>Quantity: {item?.quantity}</p>
                        <p>
                          Price:{" "}
                          {item?.price?.toLocaleString("en-US", {
                            style: "currency",
                            currency: "USD",
                          })}
                        </p>
                      </div>
                      <p className="text-sm">Color: {item?.color?.name}</p>
                    </div>
                    <p className="col-span-2 text-right ">
                      {item?.totalPrice?.toLocaleString("en-US", {
                        style: "currency",
                        currency: "USD",
                      })}
                    </p>
                  </div>
                ))}

                {/* <div className="grid grid-cols-12 border-b py-4">
              <Image src="" alt="" className="col-span-2" />
              <div className="col-span-8">
                <h1>Mens sports cap</h1>
                <p>Quantity: 1</p>
                <p>Color: Dark blue</p>
              </div>
              <p className="col-span-2 text-right">
                {(20).toLocaleString("en-US", {
                  style: "currency",
                  currency: "USD",
                })}
              </p>
            </div> */}
              </section>
              <section className="grid grid-cols-2">
                <div></div>
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
