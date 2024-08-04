import React from "react";
import Image from "next/image";
import PaypalButton from "@/components/paymentGateway/paypal/PaypalButton";

interface PaymentMethodPaypalProps {
  setPaymentMethod: (method: string) => void;
  paymentMethod: string;
  amount: Number;
}

const PaymentMethodPaypal: React.FC<PaymentMethodPaypalProps> = ({
  setPaymentMethod,
  paymentMethod,
  amount,
}) => {
  return (
    <div>
      <div
        className={`${
          paymentMethod == "paypal"
            ? "h-auto opacity-100 bg-[#F4F4F4] p-6 border rounded-b-md border-t-0 transition-all"
            : "max-h-0 opacity-0 overflow-hidden"
        }`}
      ></div>
      <PaypalButton amount={amount} paymentMethod={paymentMethod} />
    </div>
  );
};

export default PaymentMethodPaypal;
