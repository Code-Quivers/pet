import React from "react";
const CheckoutCardSelectRadio = ({
  paymentMethod,
  setPaymentMethod,
}: {
  paymentMethod: string;
  setPaymentMethod: (method: string) => void;
}) => {
  return (
    <div
      className={`relative cursor-pointer border border-b-0 py-6 rounded-t-md ${
        paymentMethod == "card_payment" && "border-black !border-b bg-[#F4F4F4]"
      }`}
      onClick={() => setPaymentMethod("card_payment")}
    >
      <div className="absolute top-1/2 transform -translate-y-1/2 flex gap-3 items-center pl-5">
        <input
          type="radio"
          name="paymentMethod"
          id="card_payment"
          className="w-5 h-5 text-red-500 cursor-pointer"
          checked={paymentMethod == "card_payment"}
        />
        <div>
          <label
            className="cursor-pointer"
            htmlFor="card_payment"
            // onClick={() => setPaymentMethod("card_payment")}
          >
            Card
          </label>
        </div>
      </div>
    </div>
  );
};

export default CheckoutCardSelectRadio;
