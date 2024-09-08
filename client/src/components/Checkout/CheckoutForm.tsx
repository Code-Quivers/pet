"use client";
import { useEffect, useMemo, useRef, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { Elements } from "@stripe/react-stripe-js";
import StripeCheckoutForm from "../paymentGateway/stripe/StripeCheckoutForm";
import CheckoutDeliveryForm from "./CheckoutDeliveryForm";
import { useGetClientSecretMutation } from "@/redux/api/features/payment/stripePaymentApi";
import { stripePublishableKey } from "@/config/envConfig";
import PaymentMethodPaypal from "./CheckoutComponents/PaymentMethodPaypal";
import { loadStripe } from "@stripe/stripe-js";
import { ICheckoutDeliveryForm } from "@/types/forms/checkoutTypes";
import {
  useAddCaptureMutation,
  useCreatePaymentMutation,
} from "@/redux/api/features/paypal/paypalApi";
import { useRouter } from "next/navigation";
import CheckoutPaypalSelectRadio from "./CheckoutPaypalSelectRadio";
import CheckoutCardSelectRadio from "./CheckoutCardSelectRadio";
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

  const [createPayment] = useCreatePaymentMutation();

  const [addCapture] = useAddCaptureMutation();

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
                    className="w-full bg-black disabled:bg-gray-400 text-white py-[10px] rounded-full mt-16 text-xl font-bold"
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
              <div className="mt-20 mb-28">
                {paymentMethod === "paypal" && (
                  <PayPalButton
                    createPayment={createPayment}
                    addCapture={addCapture}
                  />
                )}

                {/* <div className="mt-20">
                  {paymentMethod === "paypal" && (
                    <PayPalScriptProvider
                      options={{ clientId: "test", components: "buttons" }}
                    >
                      <PayPalButtons
                        className="mt-20"
                        style={{
                          layout: "vertical", // Use vertical for single button
                          color: "blue", // Customize button color (optional)
                          shape: "pill", // Use rect shape (optional)
                          label: "pay", // Use "checkout" (optional)
                        }}
                        fundingSource="paypal" // This ensures only PayPal button is shown
                        createOrder={async (data, actions) => {
                          // Call your server to set up the transaction
                          try {
                            const paymentObj = {
                              price: 100,
                              currency: "USD",
                              quantity: 1,
                            };

                            const response = await createPayment(paymentObj);

                            if (response && response.data) {
                              // Return PayPal order ID
                              return response.data?.data?.id;
                            } else {
                              console.error(
                                "Unexpected response structure:",
                                response
                              );
                              throw new Error("Failed to create order");
                            }
                          } catch (error) {
                            console.error(
                              "Error creating PayPal order:",
                              error
                            );
                            throw error;
                          }
                        }}
                        onApprove={async (data, actions) => {
                          // Call your server to finalize the transaction
                          try {
                            const confirmResponse = await confirmPayment(
                              data.orderID
                            );

                            if (confirmResponse && confirmResponse.data) {
                              const orderData = confirmResponse.data;

                              const errorDetail =
                                Array.isArray(orderData.details) &&
                                orderData.details[0];

                              if (
                                errorDetail &&
                                errorDetail.issue === "INSTRUMENT_DECLINED"
                              ) {
                                return actions.restart();
                              }

                              if (errorDetail) {
                                let msg =
                                  "Sorry, your transaction could not be processed.";
                                if (errorDetail.description)
                                  msg += "\n\n" + errorDetail.description;
                                if (orderData.debug_id)
                                  msg += " (" + orderData.debug_id + ")";
                                return alert(msg);
                              }

                              console.log(
                                "Capture result",
                                orderData,
                                JSON.stringify(orderData, null, 2)
                              );
                              const transaction =
                                orderData.purchase_units[0].payments
                                  .captures[0];
                              alert(
                                "Transaction " +
                                  transaction.status +
                                  ": " +
                                  transaction.id +
                                  "\n\nSee console for all available details"
                              );

                              if (transaction.status === "COMPLETED") {
                                // Use your Next.js router to navigate if required
                                // router.push("/");
                              }
                            } else {
                              console.error(
                                "Unexpected response structure:",
                                confirmResponse
                              );
                            }
                          } catch (error) {
                            console.error(
                              "Error confirming PayPal payment:",
                              error
                            );
                          }
                        }}
                      />
                    </PayPalScriptProvider>
                  )}
                </div> */}
              </div>
            </section>
          </div>
        </form>
      </FormProvider>
    </div>
  );
};

export default CheckoutForm;
