import React, { useEffect, useState, useMemo } from "react";
import {
  loadStripe,
  StripeElementsOptionsClientSecret,
} from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import StripeCheckoutForm from "@/components/paymentGateway/stripe/StripeCheckoutForm";
import { useGetClientSecretMutation } from "@/redux/api/features/payment/stripePaymentApi";
import { useSelector } from "react-redux";
import { stripePublishableKey } from "@/config/envConfig";
const stripePromise = loadStripe(stripePublishableKey());

interface PaymentMethodStripeProps {
  paymentMethod: string;
  amountToPaid: number;
  setIsComponentLoading: (method: boolean) => void;
  setIsStripeLoading: (method: boolean) => void;
  ref: any;
}

const PaymentMethodStripe: React.FC<PaymentMethodStripeProps> = ({
  paymentMethod,
  amountToPaid,
  setIsComponentLoading,
  setIsStripeLoading,
  ref,
}) => {
  const [getClientSecret, { data: stripeData, isLoading, isError }] =
    useGetClientSecretMutation();
  const [clientSecret, setClientSecret] = useState("");
  const [orderId, setOrderId] = useState("");
  const cart = useSelector((state: any) => state.cart.cart);
  const deliveryInfo = useSelector((state: any) => state.deliveryInfo);

  const options: StripeElementsOptionsClientSecret = useMemo(
    () => ({
      clientSecret,
      appearance: {
        theme: "stripe",
      },
    }),
    [clientSecret]
  );

  const handleGetClientSecret = async () => {
    const resp = await getClientSecret({ cart, amountToPaid, deliveryInfo });
    if (resp?.data?.success) {
      console.log(resp.data.data);
      setClientSecret(resp.data?.data?.clientSecret);
      setOrderId(resp.data?.data?.orderId);
      setIsComponentLoading(false);
    }
  };

  useEffect(() => {
    if (paymentMethod === "card_payment") {
      handleGetClientSecret();
    }
  }, []);

  // ! -------------------------

  return (
    <div>
      <div
        className={`transition-all ${
          paymentMethod === "card_payment"
            ? "min-h-[200px] opacity-100 bg-[#F4F4F4] p-6 border border-b-0"
            : "h-0 opacity-0 overflow-hidden"
        }`}
      >
        {clientSecret && (
          <Elements options={options} stripe={stripePromise}>
            <StripeCheckoutForm
              ref={ref}
              orderId={orderId}
              setIsStripeLoading={setIsStripeLoading}
            />
          </Elements>
        )}
      </div>
    </div>
  );
};

export default PaymentMethodStripe;
