import Image from "next/image";
import paypalLogo from "../../../../public/images/checkout/checkout-paypal.svg";
import { useState } from "react";

const PaymentMethod = () => {
  const [paymentMethod, setPaymentMethod] = useState("");
  return (
    <>
      <div className="mt-5">
        <h3 className="font-bold text-xl">PAYMENT METHOD</h3>
        <p className="text-sm text-gray-500 mb-3 mt-1">
          All transactions are secure and encrypted.
        </p>

        <section>
          <div>
            <div
              className={`relative cursor-pointer border border-b-0 py-6 rounded-t-md ${
                paymentMethod == "card" && "border-black !border-b bg-[#F4F4F4]"
              }`}
              onClick={() => setPaymentMethod("card")}
            >
              {/* <label
                        onClick={() => setPaymentMethod("card")}
                        htmlFor="card"
                        className="border border-b-0 py-6 block rounded-t-md"
                      ></label> */}
              <div className="absolute top-1/2 transform -translate-y-1/2 flex gap-3 items-center pl-5">
                <input
                  onClick={() => setPaymentMethod("card")}
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
                  ? "max-h-[100px] opacity-100 bg-[#F4F4F4] p-6 border border-b-0 transition-all"
                  : "max-h-0 opacity-0 overflow-hidden"
              }`}
            >
              <p>
                {`After clicking "Pay with PayPal", you will be redirected
                        to PayPal to complete your purchase securely.`}
              </p>
            </div>
          </div>

          <div>
            <div
              className={`relative border py-6 cursor-pointer ${
                paymentMethod == "paypal" && "border-black bg-[#F4F4F4]"
              }`}
              onClick={() => setPaymentMethod("paypal")}
            >
              {/* <label
                        onClick={() => setPaymentMethod("paypal")}
                        htmlFor="paypal"
                        className="border py-6 block"
                      ></label> */}
              <div className="absolute top-1/2 transform -translate-y-1/2 flex gap-3 justify-between w-full items-center pl-5">
                <div className="flex items-center">
                  <input
                    onClick={() => setPaymentMethod("paypal")}
                    type="radio"
                    name="paymentMethod"
                    id="paypal"
                    className="w-5 h-5 text-red-500 cursor-pointer"
                    checked={paymentMethod == "paypal"}
                  />
                  <label
                    className="cursor-pointer pl-3"
                    htmlFor="paypal"
                    onClick={() => setPaymentMethod("paypal")}
                  >
                    Paypal
                  </label>
                </div>
                <div className="flex items-center pr-3">
                  <Image
                    className="w-20 h-20"
                    src={paypalLogo}
                    alt="Paypal Logo"
                    width={500}
                    height={500}
                  />
                </div>
              </div>
            </div>
            <div
              className={`${
                paymentMethod == "paypal"
                  ? "h-auto opacity-100 bg-[#F4F4F4] p-6 border rounded-b-md border-t-0 transition-all"
                  : "max-h-0 opacity-0 overflow-hidden"
              }`}
            >
              <p>
                {` After clicking "Pay with PayPal", you will be redirected
                        to PayPal to complete your purchase securely.`}
              </p>
            </div>
          </div>
        </section>
        <div className="mt-10">
          {paymentMethod == "card" && (
            <button
              className="w-full bg-black text-white py-[18px] rounded-full text-xl font-bold"
              type="submit"
            >
              Pay now
            </button>
          )}
          {paymentMethod == "paypal" && (
            <button
              className="w-full bg-black text-white py-[18px] rounded-full text-xl font-bold"
              type="submit"
            >
              Pay with PayPal
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default PaymentMethod;
