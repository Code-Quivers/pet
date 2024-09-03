"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { Elements } from "@stripe/react-stripe-js";
import StripeCheckoutForm from "../paymentGateway/stripe/StripeCheckoutForm";
import CheckoutDeliveryForm from "./CheckoutDeliveryForm";
import CheckoutCardSelectRadio from "./CheckoutCardSelectRadio";
import CheckoutPaypalSelectRadio from "./CheckoutPaypalSelectRadio";
import { useGetClientSecretMutation } from "@/redux/api/features/payment/stripePaymentApi";
import { stripePublishableKey } from "@/config/envConfig";
import PaymentMethodPaypal from "./CheckoutComponents/PaymentMethodPaypal";
import { loadStripe } from "@stripe/stripe-js";
import { ICheckoutDeliveryForm } from "@/types/forms/checkoutTypes";
import { Button } from "rsuite";
import {
  useConfirmPaymentMutation,
  useCreatePaymentMutation,
} from "@/redux/api/features/paypal/paypalApi";
import { useRouter } from "next/navigation";
import PayPalButton from "./CheckoutComponents/PaypalButton";

const stripePromise = loadStripe(stripePublishableKey());

const CheckoutForm = ({ totalAmount }: { totalAmount: number }) => {
  const router = useRouter();

  const [paymentMethod, setPaymentMethod] = useState("card_payment");
  const [isComponentLoading, setIsComponentLoading] = useState<boolean>(true);
  const [isStripeLoading, setIsStripeLoading] = useState<boolean>(false);
  const [clientSecret, setClientSecret] = useState("");
  const childSubmitRef = useRef(null);
  const methods = useForm<ICheckoutDeliveryForm>();
  //
  const {
    control,
    formState: { errors },
    handleSubmit,
    getValues,
  } = methods;

  const [getClientSecret, { data: stripeData, isLoading, isError }] =
    useGetClientSecretMutation();
  console.log("stripe data from intent:", stripeData);

  const options: any = useMemo(
    () => ({
      clientSecret,
      appearance: {
        theme: "stripe",
      },
    }),
    [clientSecret]
  );

  // --- generate client secret on initial load
  const handleGetClientSecret = async () => {
    const resp = await getClientSecret({
      amountToPaid: totalAmount,
    });
    if (resp?.data?.success) {
      setClientSecret(resp.data?.data?.clientSecret);
      setIsComponentLoading(false);
    }
  };

  useEffect(() => {
    if (paymentMethod === "card_payment") {
      handleGetClientSecret();
    }
  }, []);
  // -----

  const handleSubmitFromParent = async (data: any) => {
    if (childSubmitRef.current) {
      console.log("Current ref:", childSubmitRef.current); // Check what is logged
      const childData = await childSubmitRef.current.handleChildSubmit();
      if (!childData.success) {
        console.error("Child component submission failed:", childData.error);
        return;
      }
    } else {
      console.error("Ref is not set correctly.");
    }

    console.log("Parent form data:", data);
  };

  const [createPayment, { data, error }] = useCreatePaymentMutation();

  const [confirmPayment] = useConfirmPaymentMutation();

  const handlePaypalPayment = async () => {
    try {
      const paymentObj = {
        price: 100,
        currency: "USD",
        quantity: 1,
      };

      if (error) {
        console.error("Error creating PayPal payment:", error);
        return;
      }
      const response = await createPayment(paymentObj);

      console.log("response", response);

      if (response && response.data) {
        // Open the PayPal approval URL in a new popup window
        const approvalUrl = response.data?.data?.approvalUrl;
        if (approvalUrl) {
          window.open(approvalUrl, "PayPal Approval", "width=800,height=600");
        } else {
          console.error("Approval URL not found in the response:", response);
        }
      } else {
        console.error("Unexpected response structure:", response);
      }

      if (response.data?.data?.id) {
        const confirmData = response.data?.data?.id;
        console.log("confirmData", confirmData);

        const confirmResponse = await confirmPayment(confirmData);

        console.log("confirmResponse", confirmResponse);

        if ((confirmResponse.data.data = "COMPLETED")) {
          router.push("/");
        }
      }
    } catch (error) {
      console.error("Error handling PayPal payment:", error);
    }
  };

  return (
    <div>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(handleSubmitFromParent)}>
          <div>
            <CheckoutDeliveryForm control={control} errors={errors} />
          </div>
          <div className="mt-5">
            <div>
              <h3 className="font-bold text-xl">PAYMENT METHOD</h3>
              <p className="text-sm text-gray-500 mb-3 mt-1">
                All transactions are secure and encrypted.
              </p>
            </div>
            <section>
              <div>
                <CheckoutCardSelectRadio
                  paymentMethod={paymentMethod}
                  setPaymentMethod={setPaymentMethod}
                />
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
                        intentId={stripeData?.data?.intentId}
                        amountToPaid={totalAmount}
                        ref={childSubmitRef}
                        setIsStripeLoading={setIsStripeLoading}
                      />
                    </Elements>
                  )}
                </div>
              </div>
              <div>
                <CheckoutPaypalSelectRadio
                  paymentMethod={paymentMethod}
                  setPaymentMethod={setPaymentMethod}
                />
                <PaymentMethodPaypal
                  setPaymentMethod={setPaymentMethod}
                  paymentMethod={paymentMethod}
                />
              </div>
              <div>
                {paymentMethod === "card_payment" && (
                  <button
                    type="submit"
                    disabled={isComponentLoading || isStripeLoading}
                    className="w-full bg-black disabled:bg-gray-400 text-white py-[10px] rounded-full mt-5 text-xl font-bold"
                  >
                    <span>
                      {isComponentLoading ? (
                        <div className="spinner">Loading</div>
                      ) : (
                        "Pay with Stripe"
                      )}
                    </span>
                  </button>
                )}
              </div>
              <div>
                {paymentMethod === "paypal" && (
                  <div className="w-full bg-blue-500 disabled:bg-gray-400 text-white py-[10px] rounded-full mt-5 text-xl font-bold">
                    <span>
                      {isComponentLoading ? (
                        <div className="spinner">Loading</div>
                      ) : (
                        <PayPalButton
                          createPayment={createPayment}
                          confirmPayment={confirmPayment}
                        />
                      )}
                    </span>
                  </div>
                )}
              </div>
            </section>
          </div>
        </form>
      </FormProvider>
      <div></div>
    </div>
  );
};

export default CheckoutForm;
