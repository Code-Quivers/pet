/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import InvoiceSection from "@/components/invoice/InvoiceSection";
import { useRetrievePaymentInfoMutation } from "@/redux/api/features/payment/stripePaymentApi";
import { useSearchParams } from "next/navigation";
import React, { useEffect } from "react";

interface PaymentDoneProps {
  params: {
    orderId: string;
  };
}

const PaymentDone: React.FC<PaymentDoneProps> = ({ params }) => {
  const orderId = params.orderId;
  const searchParams = useSearchParams();
  const payment_intent = searchParams.get("payment_intent");
  // const payment_intent_client_secret = searchParams.get("payment_intent_client_secret");
  const [retrievePaymentInfo, { data, isLoading, isError, isSuccess }] =
    useRetrievePaymentInfoMutation();
  useEffect(() => {
    if (orderId && payment_intent) {
      retrievePaymentInfo({ orderId, paymentIntentId: payment_intent });
    }
  }, [orderId, payment_intent]);

  return (
    <section>
      <InvoiceSection
        paymentIntent={!!payment_intent}
        isLoading={isLoading}
        isSuccess={isSuccess}
        invoiceId={payment_intent ? payment_intent : orderId}
      />

      {/* </div> */}
    </section>
  );
};

export default PaymentDone;
