// components/PayPalButton.js
"use client";
import { useCreatePaymentMutation } from "@/redux/api/features/paypal/paypalApi";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useFormContext } from "react-hook-form";
import { useSelector } from "react-redux";
import { Notification, useToaster } from "rsuite";

const PayPalButton = ({ addCapture, totalAmount, orderPayAmount }: any) => {
  console.log(totalAmount, "totalAmount");
  const router = useRouter();
  const toaster = useToaster();
  const [createPayment] = useCreatePaymentMutation();

  const { cart } = useSelector((state: any) => state.cart);

  const { getValues, trigger } = useFormContext();

  const showNotification = (
    message: string,
    type: "info" | "success" | "warning" | "error"
  ) => {
    toaster.push(
      <Notification
        header={type === "error" ? "Error" : "Success"}
        type={type}
        closable
      >
        <h4 className="font-semibold">{message}</h4>
      </Notification>,
      { placement: "bottomStart", duration: 5000 }
    );
  };

  return (
    <PayPalScriptProvider
      options={{
        clientId:
          "AQKRyS5-yXyQJSnljgnG4IVPRfgKUOeYzSGVOsSCLMTuO7Rm8NLgYFc2s8r8IYIFvcK6WDpsc2VQQk3G",
        currency: "USD",
        intent: "capture",
        components: "buttons",
      }}
    >
      <PayPalButtons
        style={{
          layout: "vertical",
          color: "blue",
          shape: "pill",
          label: "pay",
        }}
        fundingSource="paypal" // This ensures only PayPal button is shown
        createOrder={async (data: any, actions: any) => {
          // Validate form data
          const isValid = await trigger();
          // Access form data
          const cartDataObj = getValues();

          //Call your server to set up the transaction

          const cartData = {
            ...cartDataObj,
            cart: cart,
            orderPayAmount,
          };
          // console.log("Cart data", cartData);
          if (isValid) {
            try {
              const paymentData = {
                price: totalAmount,
                currency: "USD",
                quantity: 1,
              };

              const response = await createPayment({
                paymentData,
                cartData,
              }).unwrap();

              if (response && response?.data) {
                // Return PayPal order ID
                return response?.data?.id;
              } else {
                showNotification("Unexpected response structure", "error");
                console.error("Unexpected response structure:", response);
                // throw new Error("Failed to create order");
              }
            } catch (error) {
              showNotification("Error creating PayPal order", "error");
              console.error("Error creating PayPal order:", error);
              throw error;
            }
          }
        }}
        onApprove={async (data, actions) => {
          // Call your server to finalize the transaction
          const dataObj = {
            orderID: data?.orderID,
          };

          // console.log("Data obj", dataObj);

          try {
            const confirmResponse = await addCapture(dataObj);

            if (confirmResponse && confirmResponse.data) {
              const orderData = confirmResponse.data;

              const errorDetail =
                Array.isArray(orderData.details) && orderData.details[0];

              if (errorDetail && errorDetail.issue === "INSTRUMENT_DECLINED") {
                return actions.restart();
              }

              if (errorDetail) {
                let msg = "Sorry, your transaction could not be processed.";
                if (errorDetail.description)
                  msg += "\n\n" + errorDetail.description;
                if (orderData.debug_id) msg += " (" + orderData.debug_id + ")";
                showNotification(msg, "error");

                return alert(msg);
              }

              // console.log("id", orderData);

              if (orderData?.data?.paymentStatus === "COMPLETED") {
                // Use your Next.js router to navigate if required
                showNotification("Payment Completed", "success");

                router.push(
                  `/payment-done/${orderData?.data?.platformTransactionId}`
                );
              }
            } else {
              showNotification("Unexpected response structure", "error");
              console.error("Unexpected response structure:", confirmResponse);
            }
          } catch (error) {
            showNotification("Error confirming PayPal payment", "error");
            console.error("Error confirming PayPal payment:", error);
          }
        }}
      />
    </PayPalScriptProvider>
  );
};

export default PayPalButton;
