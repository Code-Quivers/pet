/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { fileUrlKey } from "@/helpers/config/envConfig";
import { useRetrivePaymentInfoMutation } from "@/redux/api/features/payment/stripePaymentApi";
import { useGetSinglePaymentReportQuery } from "@/redux/api/features/paymentReportApi";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import React, { useEffect } from "react";

interface PaymentDoneProps {
  params: {
    orderId: string;
  };
}

const PaymentDone: React.FC<PaymentDoneProps> = ({ params }) => {
  const searchParams = useSearchParams();
  const payment_intent = searchParams.get("payment_intent");
  const orderId = params.orderId;

  // const payment_intent_client_secret = searchParams.get("payment_intent_client_secret");
  const [retrievePaymentInfo, { data, isLoading, isError }] =
    useRetrivePaymentInfoMutation();

  useEffect(() => {
    if (orderId && payment_intent) {
      retrievePaymentInfo({ orderId, paymentIntentId: payment_intent });
    }
  }, [orderId, payment_intent]);


  let paymentId;
  if (payment_intent) {
    paymentId = payment_intent;
  } else if (orderId) {
    paymentId = orderId;
  }
  const invoiceId = paymentId;
  // const orderId = paymentId;
  console.log(invoiceId, "orderId");

  const { data: order } = useGetSinglePaymentReportQuery(invoiceId as any);
  console.log(order, "orderData");
  const detailsOrder = order?.data;
  const { order: orderData } = detailsOrder || {};

  return (
    <div className="bg-[#F4F5FA] min-h-screen pt-10">
      <main className="max-w-4xl mx-auto">
        <div className=" bg-white p-10 rounded">
          <h1 className="font-bold sm:text-3xl text-lg">
            Your Order Confirmed
          </h1>
          <div>
            <h4 className="font-semibold ">Hello Rafi,</h4>
            <p>
              Your order has been confirmed. You will receive an email with your
              order details.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4 border-y py-3 border-gray-200">
            <div>
              <p className="font-medium text-gray-500 text-xs">Order Date</p>
              <p className="font-semibold text-xs">12 Jan, 2024</p>
            </div>
            <div>
              <p className="text-xs">Order No</p>
              <p className="text-xs">NO6382768366</p>
            </div>
            <div>
              <p className="text-xs">Payment</p>
              <p className="text-xs">Paypal</p>
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
                  <p className="hidden sm:block">Quantity: {item?.quantity}</p>
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
    </div>
  );
};

export default PaymentDone;
