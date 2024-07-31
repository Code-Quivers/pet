import React, { useState, useEffect } from "react";
import { loadStripe, StripeElementsOptionsClientSecret } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import StripeCheckoutForm from "@/components/paymentGateway/stripe/StripeCheckoutForm";
import { useGetClientSecretMutation } from "@/redux/api/features/payment/stripePaymentApi";
import { useSelector } from "react-redux";
import { stripePublishableKey } from "@/config/envConfig";

const stripePromise = loadStripe(stripePublishableKey());

interface PaymentMethodStripeProps {
  setPaymentMethod: (method: string) => void;
  paymentMethod: string;
  amountToPaid: number;
}

const PaymentMethodStripe: React.FC<PaymentMethodStripeProps> = ({
  setPaymentMethod,
  paymentMethod,
  amountToPaid,
}) => {
  const [getClientSecret, { data: stripeData, isLoading, isError }] =
    useGetClientSecretMutation();
  const [clientSecret, setClientSecret] = useState("");
  const [orderId, setOrderId] = useState("");
  const cart = useSelector((state: any) => state.cart.cart);
  const deliveryInfo = useSelector((state: any) => state.deliveryInfo);


  const options: StripeElementsOptionsClientSecret = {
    clientSecret,
    appearance:{
      theme:'stripe'
    },
  };

  const handleGetClientSecret = async () => {
    const resp = await getClientSecret({ cart, amountToPaid, deliveryInfo });
    if (resp?.data?.success) {
      console.log(resp.data.data);
      setClientSecret(resp.data?.data?.clientSecret);
      setOrderId(resp.data?.data?.orderId);
    }
    setPaymentMethod("card");
  };

  return (
    <div>
      <div
        className={`relative cursor-pointer border border-b-0 py-6 rounded-t-md ${
          paymentMethod == "card" && "border-black !border-b bg-[#F4F4F4]"
        }`}
        onClick={() => setPaymentMethod("card")}
      >
        <div className="absolute top-1/2 transform -translate-y-1/2 flex gap-3 items-center pl-5">
          <input
            onClick={handleGetClientSecret}
            type="radio"
            name="paymentMethod"
            id="card"
            className="w-5 h-5 text-red-500 cursor-pointer"
            checked={paymentMethod == "card"}
          />
          <div>
            <label
              className="cursor-pointer"
              htmlFor="card"
              onClick={() => setPaymentMethod("card")}
            >
              Card
            </label>
          </div>
        </div>
      </div>
      <div
        className={` ${
          paymentMethod == "card"
            ? "opacity-100 bg-[#F4F4F4] p-6 border border-b-0 transition-all"
            : "max-h-0 opacity-0 overflow-hidden"
        }`}
      >
        {clientSecret && (
          <Elements options={options} stripe={stripePromise}>
            <StripeCheckoutForm orderId={orderId} />
          </Elements>
        )}
      </div>
    </div>
  );
};

export default PaymentMethodStripe;
